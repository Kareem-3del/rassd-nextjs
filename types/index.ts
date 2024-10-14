export type FormStatus = "Completed" | "Pending" | "Rejected" | "UnderReview";
export type FormVisitType = "field-visit" | "secret-visit";
export type FormCardEntries = {
  id: string;
  user: {
    name: string;
    image: string;
    role: string;
  };
  resumeNumber: string;
  resumeTitle: string;
  resumeArea: string;
  resumeTime: Date;
  formStatus: FormStatus;
  formVisitType: FormVisitType;
  items: number;
  progress: number;
  facilityOwnerSignature: string;
  inspectorSignature: string;
};

export type Question = {
  id: string;
  value: boolean;
  label: string;
  isAcceptFiles?: boolean;
  files?: string[];
  disabled?: boolean;
};

export enum UserRoles {
  SUPER = "super",
  ADMIN = "admin", // مدير
  INSPECTOR = "inspector", // مفتش
  REVIEWER = "reviewer", // مراجع
  QUALITY_CONTROLLER = "quality_controller", // مراقب جودة
  GENERAL_SUPERVISOR = "general_supervisor", // مشرف عام
}

export enum GroupType {
  SECRET_VISIT = "سرية",
  FIELD_VISIT = "ميدانية",
}

export type Group = {
  id: number;
  name: string;
  type: "سرية" | "ميدانية";
};

export type Term = {
  id: string;
  name: string;
//   description: string;
  requiredFiles: boolean;
};
