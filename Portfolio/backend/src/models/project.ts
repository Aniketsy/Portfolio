export interface Project {
    id: string;
    title: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
}

export class ProjectModel {
    private projects: Project[] = [];

    public addProject(project: Project): void {
        this.projects.push(project);
    }

    public getAllProjects(): Project[] {
        return this.projects;
    }

    public findProjectById(id: string): Project | undefined {
        return this.projects.find(project => project.id === id);
    }

    public updateProject(id: string, updatedProject: Partial<Project>): void {
        const projectIndex = this.projects.findIndex(project => project.id === id);
        if (projectIndex !== -1) {
            this.projects[projectIndex] = { ...this.projects[projectIndex], ...updatedProject };
        }
    }

    public deleteProject(id: string): void {
        this.projects = this.projects.filter(project => project.id !== id);
    }
}