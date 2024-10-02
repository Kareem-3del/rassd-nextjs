// Establishment Detail-related types
export interface EstablishmentDetail {
    address: string;
}

// Client-related types
export interface Client {
    id: number;
    name: string;
    phone_number?: string;
    email?: string;
    national_id?: string;
    address?: string;
    tasks: Task[];
}

// Group-related types
export enum GroupType {
    SECRET_VISIT = 'سرية',
    FIELD_VISIT = 'ميدانية',
}

export interface Group {
    id: number;
    name: string;
    type: GroupType;
    departments: Department[];
}

// Department-related types
export interface Department {
    id: number;
    name: string;
    group: Group;
    terms: Term[];
    tasks: Task[];
}

// Term-related types
export interface Term {
    id: number;
    name: string;
    requiredFiles: boolean;
    description: string;
    departments: Department[];
}

// Task Status Enum
export enum TaskStatusEnum {
    Pending = 'Pending',
    InProgress = 'In Progress',
    Completed = 'Completed',
    Canceled = 'Canceled',
}

// Task-related types
export interface Task {
    id: number;
    title: string;
    importance: string;
    startDate: Date;
    endDate: Date;
    inspector: User;
    reviewer: User;
    qualityController: User;
    termsValues: TermsValues[];
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

// User-related types (assuming the User entity structure)
export interface User {
    id: number;
    name: string;
    email: string;
    // Add more fields if needed
}

// TermsValues-related types
export interface TermsValues {
    id: number;
    term: Term;
    value: string;
    task: Task;
}

// Note-related types
export interface Note {
    id: number;
    content: string;
    task: Task;
}


export interface CreateDepartmentDto {
    name: string;
    groupId?: number;
    terms?: Term[];
}

// src/interfaces/update-department.interface.ts
export interface UpdateDepartmentDto {
    name?: string;
    groupId?: number;
    terms?: Term[];
}


export interface CreateTermDto {
    name: string;
    requiredFiles?: boolean;
    description?: string;
}
