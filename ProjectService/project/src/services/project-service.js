const { ProjectRepository } = require("../database");
const { FormateData } = require("../utils");
const { APIError, BadRequestError } = require('../utils/app-errors')


class ProjectService {
  constructor() {
      this.Repository = new ProjectRepository();
  }

  async CreateProject(userData) {
      try {
          const ProjectResult = await this.Repository.CreateProject(userData);
          return FormateData (ProjectResult);
      } catch (error) {
          throw new Error(error.message);
      }
  }


    async getAllProjects() {
      try {
          const projects = await this.Repository.getAllProjects();
          return projects;
      } catch (error) {
          throw new Error(error.message);
      }
  }

  


}

module.exports = ProjectService;