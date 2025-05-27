export class PortfolioController {
    // Method to get all projects
    public async getAllProjects(req, res) {
        try {
            // Logic to retrieve all projects from the database
            res.status(200).json({ message: "Retrieved all projects" });
        } catch (error) {
            res.status(500).json({ message: "Error retrieving projects", error });
        }
    }

    // Method to add a new project
    public async addProject(req, res) {
        try {
            const newProject = req.body;
            // Logic to add the new project to the database
            res.status(201).json({ message: "Project added", project: newProject });
        } catch (error) {
            res.status(500).json({ message: "Error adding project", error });
        }
    }
}