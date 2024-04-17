    const { Project, Avancement, Compagniecollect } = require("../models/index");
    const Joi = require('joi');

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
            compagniecollect: Joi.array().items(Joi.object({
                montant: Joi.number().required(),
                objectivemontant: Joi.string().required()
            })).required()
        });
    
        try {
            const validatedData = await projectSchemaJoi.validateAsync(userData);
    
            const newProject = new Project(validatedData);
    
            if (validatedData.avancements) {
                const avancements = await Avancement.insertMany(validatedData.avancements);
                newProject.avancements = avancements.map(avancement => avancement._id);
            }
    
            if (validatedData.compagniecollect) {
                const compagniecollect = await Compagniecollect.insertMany(validatedData.compagniecollect);
                newProject.compagniecollect = compagniecollect.map(compagnieC => compagnieC._id);
            }

            const savedProject = await newProject.save();
    
            return savedProject;
        } catch (error) {
            throw new Error(error.message);
        }
    }   

    async getAllProjects() {
        try {
            const projects = await Project.find().populate('avancements').populate('compagniecollect');
            return projects;
        } catch (error) {
            throw new Error(error.message);
        }
    }



    async CreateAvancement(projectId, avancementData) {
        try {
            const newAvancement = new Avancement(avancementData);
            newAvancement.project = projectId;
            const savedAvancement = await newAvancement.save();
            await Project.findByIdAndUpdate(projectId, { $push: { avancements: savedAvancement._id } });

            return savedAvancement;
        } catch (error) {
            throw new Error(error.message);
        }
    }



    async updateProject(projectId, updatedData) {
        try {
            const project = await Project.findById(projectId);

            if (!project) {
                throw new Error("Project not found");
            }
            for (let key in updatedData) {
                if (key !== '_id' && updatedData.hasOwnProperty(key)) {
                    project[key] = updatedData[key];
                }
            }
            const updatedProject = await project.save();

            return updatedProject;
        } catch (error) {
            throw new Error(error.message);
        }
    }
    async deleteProject(projectId) {
        try {
            const deletedProject = await Project.findByIdAndDelete(projectId);

            if (!deletedProject) {
                throw new Error("Project not found");
            }
            await Avancement.deleteMany({ project: projectId });

            await Compagniecollect.deleteMany({ project: projectId });

            return deletedProject;
        } catch (error) {
            throw new Error(error.message);
        }
    }
    async updateAvancement(avancementId, updatedData) {
        try {
            const avancement = await Avancement.findById(avancementId);

            if (!avancement) {
                throw new Error("Avancement not found");
            }

            for (let key in updatedData) {
                if (key !== '_id' && updatedData.hasOwnProperty(key)) {
                    avancement[key] = updatedData[key];
                }
            }

            const updatedAvancement = await avancement.save();

            return updatedAvancement;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async findCompagnieCollectById(compagneCollectId) {
        try {
            const compagnieCollect = await Compagniecollect.findById(compagneCollectId).populate('project');
            return compagnieCollect;
        } catch (error) {
            
            throw new Error(`Erreur lors de la recherche de la compagnie collectée par ID : ${error.message}`);
        }
    }
    async updatecompagnieMontant(compagnieId, newMontant) {
        try {
            // Trouver le projet dans la base de données en utilisant l'ID du projet
            const compagnie = await this.findCompagnieCollectById(compagnieId);
            if (!compagnie) {
                throw new Error(`Projet avec l'ID ${compagnieId} introuvable`);
            }

            // Mettre à jour le montant du projet
            compagnie.montant = newMontant;

            // Enregistrer les modifications dans la base de données
            await compagnie.save();
        } catch (error) {
            console.error('Erreur lors de la mise à jour du montant du projet:', error);
            throw error;
        }
    }
    
    }

    module.exports = ProjectRepository;
