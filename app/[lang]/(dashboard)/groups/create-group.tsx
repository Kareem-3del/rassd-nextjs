"use client";
import { useGroups } from "@/rassd/hooks/useGroups";
import GroupFormDialog from "./group-form";
import { useMutation } from "@tanstack/react-query";
import { GroupType } from "@/rassd/types";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

const CreateGroupDialog = ({createGroup}: {createGroup: ReturnType<typeof useGroups>["createGroup"]}) => {
    const [open, setOpen] = useState(false);
    const router = useRouter()
    const { mutate, isPending, isSuccess } = useMutation({
        mutationFn: createGroup,
        onSuccess: () => {
            toast.success("تم إنشاء مجموعة جديدة")
            setOpen(false)
        }
    })

    return <GroupFormDialog open={open} setOpen={setOpen} isPending={isPending} onSubmit={data => mutate({
        name: data.name,
        type: data.groupType == "field" ? GroupType.FIELD_VISIT : GroupType.SECRET_VISIT
    })} >
          <Button>
                    إنشاء مجموعة جديدة
                </Button>
    </GroupFormDialog>
};

export default CreateGroupDialog;



