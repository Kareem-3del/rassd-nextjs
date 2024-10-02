import { useGroups } from "@/rassd/hooks/useGroups";
import { useEffect } from "react";
import Select from "react-select";

interface GroupSelectorProps {
    value?: string
    onChange?: (value: string) => void
}

export const GroupSelector = ({
    value,
    onChange,
}: GroupSelectorProps) => {
    const { fetchGroups, groups } = useGroups()

    useEffect(() => {
        fetchGroups()
    }, [])

    return <Select
        className="react-select"
        classNamePrefix="select"
        defaultValue={value}
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