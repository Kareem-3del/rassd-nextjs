import { useDepartments } from "@/rassd/hooks/useDepartments";
import { useGroups } from "@/rassd/hooks/useGroups";
import { useEffect, useState } from "react";
import Select, { SingleValue } from "react-select";

interface DepartmentSelectorProps {
  value?: string; // ID of the selected department
  onChange?: (value: string) => void; // Callback for when the selected department changes
}

export const DepartmentSelector = ({
  value,
  onChange,
}: DepartmentSelectorProps) => {
  const { fetchDepartments, departments, loading } = useDepartments();
  const [selectedValue, setSelectedValue] =
    useState<SingleValue<{ value: string; label: string }>>(null);

  useEffect(() => {
    fetchDepartments();
  }, []);

  const options = departments.map((department) => ({
    value: String(department.id),
    label: department.name,
  }))

  return (
    <Select
      className="react-select"
      classNamePrefix="select"
      placeholder="اختر القسم"
      options={options}
      isLoading={loading}
      value={selectedValue} // Use selectedValue state for the Select component's value
      onChange={(
        selectedOption: SingleValue<{ value: string; label: string }>
      ) => {
        setSelectedValue(selectedOption); // Update state
        if (onChange && selectedOption?.value) {
          onChange(selectedOption.value); // Call the onChange prop with the new value
        }
      }}
    />
  );
};
