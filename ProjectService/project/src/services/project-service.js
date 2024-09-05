    const { ProjectRepository } = require("../database");
    const { FormateData } = require("../utils");
    const { APIError, BadRequestError } = require('../utils/app-errors')
    const {  PAIMENT_BINDING_KEY ,EXCHANGE_NAME} = require("../config");
   
   

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
    async CreateAvancement(projectId, avancementData) {
        try {
            const avancementResult = await this.Repository.CreateAvancement(projectId, avancementData);
            return FormateData(avancementResult);
        } catch (error) {
            throw new Error(error.message);
        }
    }


    async  UpdateAvancement(avancementId, avancementData) {
        try {
            const avancementResult = await this.Repository.UpdateAvancement(avancementId, avancementData);
            return FormateData(avancementResult);
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async DeleteAvancement(avancementId) {
        if (!avancementId) {
            throw new Error('avancementId is required');
        }
        console.log('avancementId:', avancementId);  // Debugging line
        try {
            const avancementResult = await this.Repository.DeleteAvancement(avancementId);
            return FormateData(avancementResult);
        } catch (error) {
            throw new Error(error.message);
        }
    }


        async getAvancementsByProjectId(projectId) {
            try {
                const avancements = await Repository.getAvancementsByProjectId(projectId);
                return avancements;
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



    async updateProject(projectId, updatedData) {
        try {
            const updatedProject = await this.Repository.UpdateProject(projectId, updatedData);
            return FormateData(updatedProject);
        } catch (error) {
            throw new Error(error.message);
        }
    }


    async deleteProject(projectId) {
        try {
            const deletedProject = await this.Repository.deleteProject(projectId);
            return FormateData(deletedProject);
        } catch (error) {
            throw new Error(error.message);
        }
    }
   

    async consumePayments(channel) {
        const queueName = 'QUEUE_NAME';
    
        const appQueue = await channel.assertQueue(queueName, { durable: true });
    
        channel.bindQueue(appQueue.queue, EXCHANGE_NAME, PAIMENT_BINDING_KEY);
    
        // Consomme les messages de la queue
        channel.consume(appQueue.queue, async (msg) => {
            if (msg !== null) {
                try {
                    const paymentData = JSON.parse(msg.content.toString());
                    const { userId, compagneCollectId, montant } = paymentData;
    
                    const project = await this.Repository.findCompagnieCollectById(compagneCollectId);
    
                    if (project) {
                        project.montant += montant;
    
                        await this.Repository.updatecompagnieMontant(project.id, project.montant);
                        channel.ack(msg);
                    } else {
                        console.error(`Aucun projet trouvé pour compagneCollectId : ${compagneCollectId}`);
                    }
                } catch (error) {
                    console.error('Erreur lors de la consommation du paiement :', error);
                }
            }   
        },{ noAck: false });    
    }
    

    async getAllAvancements() {
        try {
            const avancements = await this.Repository.getAllAvancementsWithProjectTitle();
            return FormateData(avancements);
        } catch (err) {
            throw new APIError('Data not found', err);
        }
    }

    async GetProjects(query) {
        try {
            const projects = await this.Repository.FindProjects(query);
            return FormateData(projects);
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async getProjectsByHighestMontant() {
        try {
            const projects = await this.Repository.getProjectsByHighestMontant();
            return FormateData(projects);
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async CreateCategory(categoryData) {
        try {
            const category = await this.Repository.CreateCategory(categoryData);
            return FormateData(category);
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async UpdateCategory(categoryId, updatedData) {
        try {
            const updatedCategory = await this.Repository.UpdateCategory(categoryId, updatedData);
            return FormateData(updatedCategory);
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async DeleteCategory(categoryId) {
        try {
            const deletedCategory = await this.Repository.DeleteCategory(categoryId);
            return FormateData(deletedCategory);
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async GetAllCategories() {
        try {
            const categories = await this.Repository.GetAllCategories();
            return FormateData(categories);
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async CreateTag(tagData) {
        try {
            const tagResult = await this.Repository.CreateTag(tagData);
            return FormateData(tagResult);
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async UpdateTag(tagId, updatedData) {
        try {
            const updatedTag = await this.Repository.UpdateTag(tagId, updatedData);
            return FormateData(updatedTag);
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async DeleteTag(tagId) {
        try {
            const deletedTag = await this.Repository.DeleteTag(tagId);
            return FormateData(deletedTag);
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async GetAllTags() {
        try {
            const tags = await this.Repository.GetAllTags();
            return FormateData(tags);
        } catch (error) {
            throw new Error(error.message);
        }
    }


    }

    module.exports = ProjectService;