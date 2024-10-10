"use client";
import SectionHeader, { SectionTitle } from "../_components/section-header";
import { VisitsFilter } from "@/components/visits-filter";
import { CompletedForms } from "./_components/completed-tasks";
import { useEffect, useState } from "react";
import useTasks from "@/hooks/useTasks";
import { TaskStatusEnum } from "@/interfaces";
import { GroupType } from "@/rassd/types";
import {AuditDepartmentSendedForms} from "@/app/[lang]/(dashboard)/my-tasks/_components/audit-department-sended-forms";

const CompletedFormsPage = () => {
  const [filter, setFilter] = useState({
    "field-visit": false,
    "secret-visit": false,
  });


  return (
    <div>
      <div className="flex justify-between items-center">
        <SectionHeader>
          <SectionTitle>"قائمة الاستمارات المكتملة"</SectionTitle>
        </SectionHeader>
        <VisitsFilter onFilterChanged={setFilter} />
      </div>
      <AuditDepartmentSendedForms completed />
    </div>
  );
};

export default CompletedFormsPage;
