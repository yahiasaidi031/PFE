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


  app.put("/user/:id/block", async (req, res) => {
    try {
        const userId = req.params.id;
        await service.blockUser(userId);

        return res.status(200).json({ message: 'User blocked successfully' });
    } catch (err) {
        console.error(err);
        if (err instanceof APIError) {
            return res.status(err.statusCode).json({ error: err.message });
        }
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});


  app.put("/user/:id/unblock", async (req, res) => {
    try {
      const userId = req.params.id;
      await service.unblockUser(userId);

      return res.status(200).json({ message: 'User unblocked successfully' });
    } catch (err) {
      console.error(err);
      if (err instanceof APIError) {
        return res.status(err.statusCode).json({ error: err.message });
      }
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
 
  app.post('/user/send-reset-otp', async (req, res) => {
    try {
      const { email } = req.body;
      if (!email) throw new Error("An email is required");
      const createdPasswordResetOTP = await service.sendPasswordResetOTPEmail(email);
      res.status(200).json(createdPasswordResetOTP);
    } catch (error) {
      res.status(400).send(error.message);
    }
  });

  app.post('/user/reset-password', async (req, res) => {

      try {
        const result = await service.ResetPassword(req.body);
        // Send the success response
        res.status(200).send(result);
    } catch (err) {
        console.error('Request Error:', err);

        // Check if a response has already been sent
        if (res.headersSent) {
            return; // Exit early if headers are already sent
        }

        // Handle API errors consistently
        if (err instanceof APIError) {
            res.status(err.statusCode).send({ message: err.message });
        } else {
            res.status(500).send({ message: 'Internal Server Error' });
        }
    
  }
  });



  app.put("/user/:id/role", async (req, res) => {
    const { id } = req.params;
    const { role } = req.body;

    if (!['user', 'admin', 'responsable'].includes(role)) {
      return res.status(400).json({ error: 'Invalid role' });
    }

    try {
      const { data } = await service.UpdateUserRole(id, role);
      return res.status(200).json(data);
    } catch (err) {
      console.error(err);
      if (err instanceof APIError) {
        return res.status(err.statusCode).json({ error: err.message });
      }
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  app.post("/contact", async (req, res) => {
    try {

        const { name, email, phone, object, message } = req.body;
        const { data } = await service.MakeContact({ name, email, phone, object, message });
        return res.status(201).json(data);
    } catch (err) {
        console.error(err);
        if (err instanceof APIError) {
            return res.status(err.statusCode).json({ error: err.message });
        }
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

  
  app.get("/contacts", async (req, res) => {
    try {
      const { data } = await service.GetAllContacts();
      return res.status(200).json(data);
    } catch (err) {
      console.error(err);
      if (err instanceof APIError) {
        return res.status(err.statusCode).json({ error: err.message });
      }
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  




}
