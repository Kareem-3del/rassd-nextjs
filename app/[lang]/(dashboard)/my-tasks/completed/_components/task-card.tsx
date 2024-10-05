import { Card } from "@/components/ui/card";
import { DotSperator } from "@/components/dot-sperator";
import { FormVisitTypeBadge } from "@/components/form-visit-type-badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { getTaskStautsWord } from "@/lib/utils";
import { Task } from "@/rassd/types";
import { TaskTerms } from "@/components/task-form/task-terms";

interface CompletedTaskCardProps extends Task {}

export const CompletedTaskCard = (task: CompletedTaskCardProps) => {
  return (
    <Card className="px-10 py-[26px] rounded-[30px]">
      <Separator className="md:hidden my-5" />
      <FormVisitTypeBadge
        type={task.department.group.type}
        className="mx-auto md:hidden"
      />

      <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-4 pt-5">
        {/* Right Side */}
        <div>
          <Link
            href={`/my-tasks/${task.id}`}
            className="text-base mx-auto md:mx-[initial] text-black font-extrabold pb-5 text-center md:text-start hover:text-success max-w-max block"
          >
            {task.id} #
          </Link>
          <Link
            href={`/my-tasks/${task.id}`}
            className="text-base mx-auto md:mx-[initial] text-primary font-extrabold text-center md:text-start hover:text-success max-w-max block"
          >
            {task.title}
          </Link>
          <div className="flex flex-wrap items-center gap-[10px] md:gap-4 pt-5 justify-center md:justify-start">
            <div className="text-[#B1B1B1] text-xs font-extrabold">
              {task.establishmentDetail.address}
            </div>
            <DotSperator className="bg-[#D9D9D9]" />
            <div className="text-[#B1B1B1] text-xs font-extrabold">
              {/* {task.establishmentDetail.} */}
            </div>
            {task.startDate ? (
              <>
                <DotSperator className="bg-[#D9D9D9]" />
                <div className="text-[#B1B1B1] text-xs font-extrabold">
                  {task.startDate?.toLocaleString("ar-EG", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </div>
              </>
            ) : null}
            <DotSperator className="bg-[#D9D9D9]" />
            <div className="text-[#B1B1B1] text-xs font-extrabold">
              {getTaskStautsWord(task.status)}
            </div>
            {task.department?.terms?.length > 0 ? (
              <>
                <DotSperator className="bg-[#D9D9D9]" />
                <div className="text-[#B1B1B1] text-xs font-extrabold">
                  {task.department.terms.length} بندًا
                </div>
              </>
            ) : null}
          </div>
        </div>

        {/* Left Side */}
        <div className="w-full md:w-[initial]">
          <FormVisitTypeBadge
            type={task.department.group.type}
            className="mr-auto hidden md:flex"
          />

          <TaskActions {...task}/>

          <TaskProgress progress={100} />
        </div>
      </div>
    </Card>
  );
};

interface TaskActionsProps extends Task {}

const TaskActions = (task: TaskActionsProps) => {
  return (
    <div className="mt-[10px] mx-auto flex justify-center">
        <TaskTerms facilityOwnerSignature="" inspectorSignature="" {...task} />
    </div>
  );
};

interface TaskProgressProps {
  progress: number;
}

const TaskProgress = ({ progress }: TaskProgressProps) => {
  return (
    <div className="space-y-1.5 mt-3">
      <div className="flex items-center justify-between text-[10px] text-[#6BACA1] font-extrabold">
        <span>نسبة الإنجاز</span>
        <span>{progress}%</span>
      </div>
      <Progress
        value={progress}
        className=" [&>div]:bg-[#00866F] h-2 rounded-[20px]"
      />
    </div>
  );
};
