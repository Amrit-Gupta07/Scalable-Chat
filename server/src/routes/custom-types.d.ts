interface AuthUser{
    name: string;
    email: string;
    id: number;
    google_id: string;
    image?: string;
}

declare namespace Express {
    export interface Request {
        user?: AuthUser;
    }
}