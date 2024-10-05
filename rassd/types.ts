import { TaskStatusEnum } from "@/interfaces";

// Establishment Detail-related types
export interface EstablishmentDetail {
    "address": string,
    "district": string,
    "city": string,
    "region": string
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
    created_at : Date,
    updated_at : Date
}

// User-related types (assuming the User entity structure)
export interface User {
    avatar: string | null;
    createdAt: string; // ISO date string
    deletedAt: string | null; // ISO date string or null
    email: string;
    online : boolean,
    firstName: string;
    googleId: string | null;
    id: number;
    isTFAEnabled: boolean;
    lastName: string;
    nationalId: string;
    phoneNumber: string;
    restoredAt: string | null; // ISO date string or null
    role: string; // e.g., "inspector"
    tasksCompleted: number;
    tasksInProgress: number;
    tasksRejected: number;
    tfaSecret: string | null;
    updated_at: string; // ISO date string
}


// TermsValues-related types
export interface TermsValues {
    id: number;
    term: Term;
    termId: number;
    value: string;
    files: string[];
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
