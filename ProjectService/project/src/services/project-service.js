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
            const updatedProject = await this.Repository.updateProject(projectId, updatedData);
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
        // Utilisez le nom de queue utilisé dans l'autre service (QUEUE_NAME)
        const queueName = 'QUEUE_NAME';
    
        // Déclarez la queue avec durabilité
        const appQueue = await channel.assertQueue(queueName, { durable: true });
    
        // Lie la queue à l'exchange avec la clé de routage PAIMENT_BINDING_KEY
        channel.bindQueue(appQueue.queue, EXCHANGE_NAME, PAIMENT_BINDING_KEY);
    
        // Consomme les messages de la queue
        channel.consume(appQueue.queue, async (msg) => {
            if (msg !== null) {
                try {
                    // Parsez les données du message
                    const paymentData = JSON.parse(msg.content.toString());
                    const { userId, compagneCollectId, montant } = paymentData;
    
                    // Trouvez le projet correspondant au compagneCollectId
                    const project = await this.Repository.findCompagnieCollectById(compagneCollectId);
    
                    // Si le projet existe, mettez à jour le montant
                    if (project) {
                        project.montant += montant;
    
                        await this.Repository.updatecompagnieMontant(project.id, project.montant);
    
                        // Accuser réception du message
                        channel.ack(msg);
                    } else {
                        console.error(`Aucun projet trouvé pour compagneCollectId : ${compagneCollectId}`);
                        // Ne pas accuser réception du message si le projet n'existe pas
                    }
                } catch (error) {
                    console.error('Erreur lors de la consommation du paiement :', error);
                }
            }
        });
    }
    
    }

    module.exports = ProjectService;