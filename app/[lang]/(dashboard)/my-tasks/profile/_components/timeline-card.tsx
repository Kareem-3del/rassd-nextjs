"use client";
import { Card } from "@/components/ui/card"
import { Timeline, TimelineConnector, TimelineContent, TimelineDot, TimelineItem, TimelineSeparator } from "@/components/ui/timeline"
import { UserBadge } from "@/components/user-badge";
import { cn } from "@/lib/utils"
export  type UserEvent = {
  type: "time" | "cureent-missions" | "ended-missions" | "rejected-missions"
  label: string
  value: string | Date
}
interface TimeLineCardProps {
  events: UserEvent[]
}

export const TimelineCard = ({
  events
}: TimeLineCardProps) => {
  return <Card className="p-10 pl-0 rounded-[10px]" style={{
    margin: 0
  }}>
    <Timeline>

    {
      events.map((event, index) => {
        return <div key={index}>
          <TimelineItem>
            <TimelineSeparator >
              <TimelineDot className={cn({
                "bg-black": event.type === "time" || event.type === "rejected-missions",
                "bg-[#6BACA1]": event.type === "cureent-missions",
                "bg-primary": event.type === "ended-missions",
              })} />
              <TimelineConnector />
            </TimelineSeparator >
            <TimelineContent>
              <div className={cn({
              "border-b border-black/5 pb-5": index !== events.length - 1,
            })}>
                
              <UserBadge
                user={
                  {
                    name: "محمد السادس",
                    image: "/images/avatar/avatar-5.jpg",
                    role: "علي جـــــواد"
                  }
                }
              />
              <p className={cn("text-xs font-extrabold mt-4",
                {
                  "text-black": event.type === "time" || event.type === "rejected-missions",
                  "text-[#6BACA1]": event.type === "cureent-missions",
                  "text-primary": event.type === "ended-missions",
                }

              )}>{event.label}</p>
              <p className="text-xs font-extrabold text-[#7B7B7B] mt-[10px]">{
                typeof event.value === "string" ? event.value : event.value.toLocaleDateString()
              }</p>
              </div>

            </TimelineContent>
          </TimelineItem>
        </div>
      })
    }
    </Timeline>
  </Card>
}

