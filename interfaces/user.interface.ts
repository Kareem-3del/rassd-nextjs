import {Task} from "@/interfaces/task.interface";
import {UserRoles} from "@/interfaces/roles.enum";

export interface User {
    id: number;
    name: string;
    email: string;
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
