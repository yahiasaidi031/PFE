const ProjectService = require("../services/project-service");
const UserAuth = require("./middlewares/authuser");
const authuadmin = require("./middlewares/authuadmin");
const APIError = require('../utils/app-errors').APIError
const { APP_SECRET,MESSAGE_BROKER_URL,EXCHANGE_NAME, USER_BINDING_KEY } = require("../config");
const {PublishMessage} = require ('../utils')

module.exports = (app, channel) => {
    const service = new ProjectService();

app.post("/project/create",authuadmin, async (req, res, next) => {
    try {
        const { title, description, category, objective, tags, image, avancements, companie } = req.body;

        const { data } = await service.CreateProject({
            title,
            description,
            category,
            objective,
            tags,
            image,
            avancements,
            companie
        });
        PublishMessage(channel, USER_BINDING_KEY, JSON.stringify(data))
        return res.json(data);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});


app.get("/project", async (req, res, next) => {
  try {
      const projects = await service.getAllProjects();
      return res.json(projects);
  } catch (error) {
      return res.status(500).json({ error: error.message });
  }
});
  
}
