const UserService = require("../services/user-service");
const UserAuth = require("./middlewares/authuser");
const authuadmin = require("./middlewares/authuadmin");
const APIError = require('../utils/app-errors').APIError;
const{SubscribeMessage} = require('../utils')

module.exports = (app, channel) => {
  const service = new UserService();
  SubscribeMessage(channel,service);

  app.post("/user/signup", async (req, res) => {
    try {
        const { firstname, lastname, email, password, isEnterprise, phone, companyName, companyRegistrationNumber } = req.body;
        const { data } = await service.SignUp({  firstname, lastname, email, password, isEnterprise, phone, companyName, companyRegistrationNumber });
        return res.status(200).json(data); 
    } catch (err) {
      
        console.error(err); 
        if (err instanceof APIError) {
            return res.status(err.statusCode).json({ error: err.message }); 
        }
        return res.status(500).json({ error: 'Internal Server Error' }); 
}});


  app.post("/user/login", async (req, res, next) => {
    try {
      const { email, password } = req.body;

      const { data } = await service.SignIn({ email, password });

      return res.json(data);
    } catch (err) {
      next(err);
    }
  });


  app.get("/user/profile",authuadmin, async (req, res, next) => {
    try {
      const { data } = await service.GetAllUser();
      return res.json(data);
    } catch (err) {
      next(err);
    }
  });

  
};
