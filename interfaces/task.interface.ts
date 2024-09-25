import {User} from "@/interfaces/user.interface";
import {TaskStatusEnum} from "@/interfaces/task-status.enum";

export interface Task {
    id: number;
    title: string;
    importance: string;
    startDate: Date;
    endDate: Date;
    inspector: User;
    reviewer: User;
    qualityController: User;
    termsValues: TermsValue[];
    status: TaskStatusEnum;
    notes: Note[];
    inspectionStartDate?: Date;
    inspectionEndDate?: Date;
    reviewStartDate?: Date;
    reviewEndDate?: Date;
    qualityControlStartDate?: Date;
    qualityControlEndDate?: Date;
    client: Client;
    establishmentDetail: EstablishmentDetail;
    department: Department;
}

export interface TermsValue {
    id: number;
    name: string;
    value: boolean;
    task: Task;
}


export interface Client {
    id: number;
    name: string;
    phone_number?: string;
    email?: string;
    national_id?: string;
    address?: string;
    tasks: Task[];
}

export interface EstablishmentDetail {
    address: string;
}


export interface Note {
    id: number;
    title: string;
    content: string;
    task: Task;
}


export interface Department {
    id: number;
    name: string;
    tasks: Task[];
}
