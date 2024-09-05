    const { Project, Avancement, Compagniecollect,Category,Tags} = require("../models/index");
    const Joi = require('joi');

    class ProjectRepository {
        async CreateProject(userData) {
            const projectSchemaJoi = Joi.object({
                title: Joi.string().required(),
                description: Joi.string().required(),
                category: Joi.string().required(),
                objective: Joi.string(),
                tags: Joi.string(),
                image: Joi.string().allow(null),
                avancements: Joi.array().items(Joi.object({
                    title: Joi.string().required(),
                    description: Joi.string(),
                    image: Joi.string().allow(null),
                    video: Joi.string()
                })), 
                compagniecollect: Joi.array().items(Joi.object({
                    montant: Joi.number().required(),
                    objectivemontant: Joi.string().required()
                })).required()
            });
        
            try {
                const validatedData = await projectSchemaJoi.validateAsync(userData);
        
                // Create or find Category
                let category = await Category.findOne({ content: validatedData.category });
                if (!category) {
                    category = new Category({ content: validatedData.category });
                    await category.save();
                }
        
                // Create or find Tags
                let tags = await Tags.findOne({ tag: validatedData.tags });
                if (!tags) {
                    tags = new Tags({ tag: validatedData.tags });
                    await tags.save();
                }
        
                // Create the Project with references to Category and Tags
                const newProject = new Project({
                    ...validatedData,
                    category: validatedData.category, 
                    tags: validatedData.tags 
                });
        
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
                const projects = await Project.find()
                    .populate('category')
                    .populate('tags')
                    .populate('avancements')
                    .populate('compagniecollect');
                return projects;
            } catch (error) {
                throw new Error(error.message);
            }
        }


    async CreateAvancement(projectId, avancementData) {
        try {
            // Assurez-vous que l'ID du projet est valide
            const project = await Project.findById(projectId);
            if (!project) {
                throw new Error('Project not found');
            }

            avancementData.projectId = projectId;
            const newAvancement = new Avancement(avancementData);
            const savedAvancement = await newAvancement.save();

            await Project.findByIdAndUpdate(projectId, { $push: { avancements: savedAvancement._id } });

            return savedAvancement;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async GetAvancements(projectId) {
        try {
            const project = await Project.findById(projectId).populate('Avancements');
            if (!project) {
                throw new Error('Project not found');
            }
            return project.avancements;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async  UpdateAvancement(avancementId, avancementData) {
        try {
            const updatedAvancement = await Avancement.findByIdAndUpdate(avancementId, avancementData, { new: true });
            return updatedAvancement;
        } catch (error) {
            throw new Error(error.message);
        }
    }
    async  DeleteAvancement(avancementId) {
        try {
            const deletedAvancement = await Avancement.findByIdAndDelete(avancementId);
            if (deletedAvancement) {
                await Project.updateOne({ Avancements: avancementId }, { $pull: { Avancements: avancementId } });
            }
            return deletedAvancement;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async UpdateProject(projectId, updatedData) {
        try {
          
            const project = await Project.findById(projectId);
            if (!project) {
                throw new Error("Project not found");
            }
    
            if (typeof updatedData.category === 'string') {
                const categoryContent = updatedData.category;
                let category = await Category.findOne({ content: categoryContent });
                if (!category) {
                    category = new Category({
                        content: categoryContent
                    });
                    await category.save();
                }
                updatedData.category = category._id; 
            } else {
                updatedData.category = null;
            }
    
          
            if (typeof updatedData.tags === 'string') {
                const tagContent = updatedData.tags;
                let tag = await Tags.findOne({ tag: tagContent });
                if (!tag) {
                    tag = new Tags({ tag: tagContent }); 
                    await tag.save();
                }
                updatedData.tags = tag._id; 
            } else {
                updatedData.tags = null; 
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
    
    async getAllAvancementsWithProjectTitle() {
        try {
            const avancements = await Avancement.find().populate('projectId', 'title');
            console.log('Avancements trouvés:', avancements);
    
            const formattedAvancements = avancements.map(avancement => {
                console.log('Avancement:', avancement);
                return {
                    id: avancement._id, 
                    title: avancement.title,
                    description: avancement.description,
                    image: avancement.image,
                    video: avancement.video,
                    projectId: avancement.projectId ? avancement.projectId._id : null,
                    projectTitle: avancement.projectId ? avancement.projectId.title : 'Unknown',
                    createdAt: avancement.createdAt,
                    updatedAt: avancement.updatedAt
                };
            });
    
            return formattedAvancements;
        } catch (error) {
            throw new Error(`Erreur lors de la récupération des avancements: ${error.message}`);
        }
    }
       
    async FindProjects(query) {
        try {
            const projects = await Project.find(query);
            return projects;
        } catch (error) {
            throw new Error(error.message);
        }
    }


    async getProjectsByHighestMontant() {
        try {
            const projects = await Project.aggregate([
                {
                    $lookup: {
                        from: 'compagniecollects',
                        localField: 'compagniecollect',
                        foreignField: '_id',
                        as: 'compagniecollectDetails'
                    }
                },
                {
                    $unwind: {
                        path: '$compagniecollectDetails',
                        preserveNullAndEmptyArrays: true
                    }
                },
                {
                    $group: {
                        _id: '$_id',
                        title: { $first: '$title' },
                        description: { $first: '$description' },
                        category: { $first: '$category' },
                        objective: { $first: '$objective' },
                        tags: { $first: '$tags' },
                        image: { $first: '$image' },
                        avancements: { $first: '$avancements' },
                        compagniecollect: { $push: '$compagniecollectDetails' },
                        highestMontant: { $max: '$compagniecollectDetails.montant' }
                    }
                },
                {
                    $sort: { highestMontant: -1 }
                }
            ]);

            return projects;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async CreateCategory(categoryData) {
        try {
            
            const existingCategory = await Category.findOne({ content: categoryData.content });
            if (existingCategory) {
                throw new Error('Category with this value already exists');
            }
    
         
            const category = new Category(categoryData);
            const savedCategory = await category.save();
            return savedCategory;
        } catch (error) {
            throw new Error(error.message);
        }
    }
    async UpdateCategory(categoryId, updatedData) {
        try {
            const updatedCategory = await Category.findByIdAndUpdate(categoryId, updatedData, { new: true });
            return updatedCategory;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async DeleteCategory(categoryId) {
        try {
            const deletedCategory = await Category.findByIdAndDelete(categoryId);
            return deletedCategory;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async GetAllCategories() {
        try {
            const categories = await Category.find();
            return categories;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async CreateTag(tagData) {
        try {
            const existingTag = await Tags.findOne({ tag: tagData.tag });
            if (existingTag) {
                throw new Error('Tag with this value already exists');
            }
            const tag = new Tags(tagData);
            const savedTag = await tag.save();
            return savedTag;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async UpdateTag(tagId, updatedData) {
        try {
            const tag = await Tags.findById(tagId);
            if (!tag) {
                throw new Error("Tag not found");
            }
            tag.tag = updatedData.tag;
            const updatedTag = await tag.save();
            return updatedTag;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async DeleteTag(tagId) {
        try {
            const deletedTag = await Tags.findByIdAndDelete(tagId);
            if (!deletedTag) {
                throw new Error("Tag not found");
            }
            return deletedTag;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async GetAllTags() {
        try {
            const tags = await Tags.find();
            return tags;
        } catch (error) {
            throw new Error(error.message);
        }
    }
}







    
    
   
    module.exports = ProjectRepository;
