

export interface TimeSheet {
    id?: number;
    date: Date;
    hoursWorked: number;
    tasks: string;
    comments?: string;
    status: string;
   
}
