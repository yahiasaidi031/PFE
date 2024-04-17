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
        const { title, description, category, objective, tags, image, avancements, compagniecollect } = req.body;

        const { data } = await service.CreateProject({
            title,
            description,
            category,
            objective,
            tags,
            image,
            avancements,
            compagniecollect
        });
        PublishMessage(channel, USER_BINDING_KEY, JSON.stringify(data))
        return res.json(data);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
})


app.get("/projects", async (req, res, next) => {
  try {
      const projects = await service.getAllProjects();
      return res.json(projects);
  } catch (error) {
      return res.status(500).json({ error: error.message });
  }
})

app.post('/projects/:projectId/avancements', async (req, res) => {
    try {
        const projectId = req.params.projectId;
        
        const avancement = await service.CreateAvancement(projectId, req.body);

        res.status(201).json(avancement);
    } catch (error) {
        console.error('Error creating avancement:', error);
        res.status(500).json({ error: 'An internal server error occurred' });
    }
})



app.put('/project/:projectId', authuadmin, async (req, res) => {
    try {
        const projectId = req.params.projectId;
        const updatedData = req.body;

        const updatedProject = await service.updateProject(projectId, updatedData);

        res.json(updatedProject);
    } catch (error) {
        console.error('Error updating project:', error);
        res.status(500).json({ error: 'An internal server error occurred' });
    }
})


app.delete('/project/:projectId', authuadmin, async (req, res) => {
    try {
        const projectId = req.params.projectId;
        const deletedProject = await service.deleteProject(projectId);
        const response = {
            success: true,
            message: 'Project deleted successfully',
            deletedProject: deletedProject
        };
        
        res.json(response);
    } catch (error) {
        console.error('Error deleting project:', error);
        res.status(500).json({ error: 'An internal server error occurred' });
    }
})
}
