const { Project, Avancement, Compagniecollect } = require("../models/index");
const Joi = require('joi');

const {
  APIError,
  BadRequestError,
  STATUS_CODES,
} = require("../../utils/app-errors");


class ProjectRepository {
  async CreateProject(userData) {
      const projectSchemaJoi = Joi.object({
          title: Joi.string().required(),
          description: Joi.string().required(),
          category: Joi.string().required(),
          objective: Joi.string(),
          tags: Joi.string(),
          image: Joi.string(),
          avancements: Joi.array().items(Joi.object({
              title: Joi.string().required(),
              description: Joi.string(),
              image: Joi.string(),
              video: Joi.string()
          })).required(), 
          companie: Joi.object({
              montant: Joi.number().required(),
              objectivemontant: Joi.string().required()
          }).required()
      });
  
      try {
          const validatedData = await projectSchemaJoi.validateAsync(userData);
  
          const newProject = new Project(validatedData);
  
          if (validatedData.avancements) {
              const avancements = await Avancement.insertMany(validatedData.avancements);
              newProject.avancements = avancements.map(avancement => avancement._id);
          }
  
          if (validatedData.companie) {
              const companie = await Compagniecollect.create(validatedData.companie);
              newProject.companie = companie._id;
          }

          const savedProject = await newProject.save();
  
          return savedProject;
      } catch (error) {
          throw new Error(error.message);
      }
  }



  async getAllProjects() {
    try {
        const projects = await Project.find();
        return projects;
    } catch (error) {
        throw new Error(error.message);
    }
}
  
  
}

module.exports = ProjectRepository;
