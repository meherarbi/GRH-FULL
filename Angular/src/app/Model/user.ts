export interface User {
    id: number;
    email: string;
    roles: string[];
    password?: string;
    firstName?: string;
    lastName?: string;
    address?: string;
    phoneNumber?: string;
    }