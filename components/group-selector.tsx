import { useGroups } from "@/rassd/hooks/useGroups";
import { useEffect, useState } from "react";
import Select, { SingleValue } from "react-select";

interface GroupSelectorProps {
  value?: string; // ID of the selected group
  onChange?: (value: string) => void; // Callback for when the selected group changes
  type?: "secret" | "field"; // Type to fetch groups
}

export const GroupSelector = ({
  value,
  onChange,
  type = "secret",
}: GroupSelectorProps) => {
  const { fetchGroups, groups, loading } = useGroups(type);
  const [selectedValue, setSelectedValue] =
    useState<SingleValue<{ value: string; label: string }>>(null);

  useEffect(() => {
    fetchGroups(type);
    console.log("Type:", type);
  }, [type]);

  useEffect(() => {
    console.log(type);
    // Map groups to options whenever groups are fetched or changed
    const options = groups
      .filter((group) => group.type === (type === "field" ? "ميدانية" : "سرية"))
      .map((group) => ({
        value: String(group.id), // Convert id to string
        label: group.name,
      }));

    // Set the selected value based on the incoming value prop
    const selectedOption = options.find(
      (option) => String(option.value) === String(value)
    );
    setSelectedValue(selectedOption || null);
    console.log("Selected value:", selectedOption, "Value:", value);
  }, [groups, value]);

  // This variable contains the available options for the select component
  const options = groups
    .filter((group) => group.type === (type === "field" ? "ميدانية" : "سرية"))
    .map((group) => ({
      value: String(group.id), // Convert id to string
      label: group.name,
    }));

  return (
    <Select
      className="react-select"
      classNamePrefix="select"
      placeholder="اختر مجموعة"
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
