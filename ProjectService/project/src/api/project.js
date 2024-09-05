const ProjectService = require("../services/project-service");
const UserAuth = require("./middlewares/authuser");
const authuadmin = require("./middlewares/authuadmin");
const APIError = require('../utils/app-errors').APIError
const { APP_SECRET, MESSAGE_BROKER_URL, EXCHANGE_NAME, USER_BINDING_KEY } = require("../config");
const { PublishMessage } = require('../utils')
const multer = require('multer');



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname); // Nom de fichier unique
    }
});

const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        const allowedTypes = ["image/png", "image/jpg", "image/jpeg", "video/mp4", "video/mkv"];
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            console.log("Only jpg, png, mp4, and mkv files are supported!");
            cb(null, false);
        }
    },
    limits: {
        fileSize: 1024 * 1024 * 50 // 50 MB
    }
});





module.exports = (app, channel) => {
    const service = new ProjectService();


    app.post('/project/create', authuadmin, upload.single('image'), async (req, res, next) => {
        try {
            const { title, description, category, objective, tags, avancements, compagniecollect } = req.body;
            
          
            const image = req.file ? req.file.path : null;
    
            const projectData = {
                title,
                description,
                category, // nom de la catégorie
                objective,
                tags, // nom du tag
                image,
                avancements: avancements ? JSON.parse(avancements) : [], // Parser les avancements
                compagniecollect: compagniecollect ? JSON.parse(compagniecollect) : [] // Parser les compagniecollect
            };
    
            // Appeler le service pour créer le projet
            const data = await service.CreateProject(projectData);
    
            // Publier le message
            PublishMessage(channel, USER_BINDING_KEY, JSON.stringify(data));
    
            // Retourner la réponse
            return res.json(data);
        } catch (error) {
            // Gérer les erreurs
            return res.status(500).json({ error: error.message });
        }
    });
    app.get("/projects", async (req, res, next) => {
        try {
            const projects = await service.getAllProjects();
            return res.json(projects);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    })

    app.post('/projects/:projectId/avancements', upload.fields([{ name: 'image', maxCount: 1 }, { name: 'video', maxCount: 1 }]), async (req, res) => {
        try {
            const projectId = req.params.projectId;
            const avancementData = req.body;

            if (req.files['image']) {
                avancementData.image = req.files['image'][0].path;
            }
            if (req.files['video']) {
                avancementData.video = req.files['video'][0].path;
            }

            const avancement = await service.CreateAvancement(projectId, avancementData);

            res.status(201).json(avancement);
        } catch (error) {
            console.error('Error creating avancement:', error);
            res.status(500).json({ error: 'An internal server error occurred' });
        }
    });


    app.put('/avancements/:avancementId', upload.fields([{ name: 'image', maxCount: 1 }, { name: 'video', maxCount: 1 }]), async (req, res) => {
        try {
            const avancementId = req.params.avancementId;
            const avancementData = req.body;

            if (req.files['image']) {
                avancementData.image = req.files['image'][0].path;
            }
            if (req.files['video']) {
                avancementData.video = req.files['video'][0].path;
            }

            const avancement = await service.UpdateAvancement(avancementId, avancementData);

            res.status(200).json(avancement);
        } catch (error) {
            console.error('Error updating avancement:', error);
            res.status(500).json({ error: 'An internal server error occurred' });
        }
    });

    app.delete('/avancements/:avancementId', async (req, res) => {
        try {
            const avancementId = req.params.avancementId;
            const avancement = await service.DeleteAvancement(avancementId);

            if (!avancement) {
                return res.status(404).json({ error: 'Avancement not found' });
            }

            res.status(200).json({ message: 'Avancement deleted successfully' });
        } catch (error) {
            console.error('Error deleting avancement:', error);
            res.status(500).json({ error: 'An internal server error occurred' });
        }
    });


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


    app.get('/projects/:projectId/avancements', async (req, res) => {
        try {
            const projectId = req.params.projectId;
            const avancements = await service.getAvancementsByProjectId(projectId);

            res.status(200).json(avancements);
        } catch (error) {
            console.error('Error fetching avancements:', error);
            res.status(500).json({ error: 'An internal server error occurred' });
        }
    });



    app.get("/avancements", async (req, res) => {
        try {
            const { data } = await service.getAllAvancements();
            return res.status(200).json(data);
        } catch (err) {
            console.error(err);
            if (err instanceof APIError) {
                return res.status(err.statusCode).json({ error: err.message });
            }
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    });


    app.get("/project/search", async (req, res, next) => {
        try {
            const { title, category } = req.query;

            // Vérifiez si ni title ni category ne sont fournis
            if (!title && !category) {
                return res.status(400).json({ message: "Un mot de recherche (titre ou catégorie) est requis" });
            }

            const query = {};
            if (title) query.title = title;
            if (category) query.category = category;

            const projects = await service.GetProjects(query);

            if (projects.length === 0) {
                return res.status(404).json({ message: "Projet n'existe pas" });
            }

            return res.json(projects);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    });


    app.get("/projects/sort-by-highest-montant", async (req, res, next) => {
        try {
            const projects = await service.getProjectsByHighestMontant();
            return res.json(projects);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    });

    app.post('/category/create', async (req, res, next) => {
        try {
            const { content } = req.body;
            const categoryData = { content };
            const data = await service.CreateCategory(categoryData);
            return res.json(data);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    });

    app.put('/category/update/:id', async (req, res, next) => {
        try {
            const categoryId = req.params.id;
            const updatedData = req.body;
            const data = await service.UpdateCategory(categoryId, updatedData);
            return res.json(data);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    });

    
    app.delete('/category/delete/:id', async (req, res, next) => {
        try {
            const categoryId = req.params.id;
            const data = await service.DeleteCategory(categoryId);
            return res.json(data);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    });

  
    app.get('/categories', async (req, res, next) => {
        try {
            const data = await service.GetAllCategories();
            return res.json(data);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    });


    app.post('/tag/create', async (req, res) => {
        try {
            const tagData = req.body;
            const data = await service.CreateTag(tagData);
            return res.json(data);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    });

        app.put('/tag/update/:id', async (req, res) => {
        try {
            const tagId = req.params.id;
            const updatedData = req.body;
            const data = await service.UpdateTag(tagId, updatedData);
            return res.json(data);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    });

  
    app.delete('/tag/delete/:id', async (req, res) => {
        try {
            const tagId = req.params.id;
            const data = await service.DeleteTag(tagId);
            return res.json(data);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    });

  
    app.get('/tags', async (req, res) => {
        try {
            const data = await service.GetAllTags();
            return res.json(data);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    });






}
