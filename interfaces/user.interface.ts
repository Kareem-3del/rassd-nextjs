import {Task} from "@/interfaces/task.interface";
import {UserRoles} from "@/interfaces/roles.enum";

export interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    nationalId: string;
    password: string;
    sendLoginInfo: boolean;
    inspectorTasks?: Task[];
    reviewerTasks?: Task[];
    qualityControllerTasks?: Task[];
    isTFAEnabled: boolean;
    googleId?: string;
    role: UserRoles | string;
    avatar?: string;
    tasksCompleted: number;
    tasksRejected: number;
    tasksInProgress: number;
}
