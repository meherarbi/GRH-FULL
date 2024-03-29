import { Product } from "./product";

export interface PaginatedResponse<T> {
    data: T[];
    totalItems: number;
    currentPage: number;
}

export interface TimeSheet {
    id?: number;
    date: Date;
    hoursWorked: number;
    tasks: string;
    comments?: string;
    status: string;
    product?: { name: string; /* Autres champs du produit si nécessaire */ };
   
}
