import { useUsers } from "@/hooks/useUsers";
import { UserRoles } from "@/interfaces/roles.enum";
import { useGroups } from "@/rassd/hooks/useGroups";
import { useEffect, useState } from "react";
import Select, { SingleValue } from "react-select";

interface IncpectorSelectorProps {
  value?: string; // ID of the selected user
  onChange?: (value: string) => void; // Callback for when the selected user changes
}

export const IncpectorSelector = ({
  value,
  onChange,
}: IncpectorSelectorProps) => {
  const { fetchUsers, users, loading } = useUsers();
  const [selectedValue, setSelectedValue] =
    useState<SingleValue<{ value: string; label: string }>>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    // Map users to options whenever users are fetched or changed
    const options = users
      .filter((user) => user.role === UserRoles.INSPECTOR)
      .map((user) => ({
        value: String(user.id), // Convert id to string
        label: `${user.firstName} ${user.lastName}`,
      }));

    // Set the selected value based on the incoming value prop
    const selectedOption = options.find(
      (option) => String(option.value) === String(value)
    );
    setSelectedValue(selectedOption || null);
    console.log("Selected value:", selectedOption, "Value:", value);
  }, [users, value]);

  // This variable contains the available options for the select component
  const options = users
    .filter((user) => user.role === UserRoles.INSPECTOR)
    .map((user) => ({
      value: String(user.id), // Convert id to string
      label: `${user.firstName} ${user.lastName}`,
    }));

  return (
    <Select
      className="react-select"
      classNamePrefix="select"
      placeholder={"اختار المفتش"}
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
