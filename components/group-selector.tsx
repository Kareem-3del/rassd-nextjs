import { useGroups } from "@/rassd/hooks/useGroups";
import { useEffect } from "react";
import Select from "react-select";

interface GroupSelectorProps {
    value?: string
    onChange?: (value: string) => void
    type?: "secret" | "field"
}

export const GroupSelector = ({
    value,
    onChange,
    type = "secret"
}: GroupSelectorProps) => {
    const { fetchGroups, groups } = useGroups(type)

    useEffect(() => {
        fetchGroups(type)
    }, [type])


    return <Select
        className="react-select"
        classNamePrefix="select"
        // @ts-ignore
        options={groups.map(group => ({
            value: group.id,
            label: group.name
        })) || []}
        onChange={(value) => {
            console.log(value)
            // @ts-ignore
            onChange?.(value.value || "")
        }}

    />
}