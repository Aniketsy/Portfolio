export interface User {
    id: string;
    username: string;
    email: string;
    password: string;
}

export interface Project {
    id: string;
    title: string;
    description: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
}