"use client";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react";
import { Cup, Eye, Increase, Session } from "@/components/svg";
import { api } from "@/config/axios.config";
import { format, isWithinInterval, subDays } from 'date-fns';

const ReportsArea = () => {
  // State to store the API data
  const [reports, setReports] = useState([
    {
      id: 1,
      name: "مجموع الزيارات الميدانية",
      count: "0", // Initial placeholder values
      rate: "0",
      isUp: true,
      icon: <Session className="h-4 w-4" />,
      color: "primary",
    },
    {
      id: 2,
      name: "مجموع الزيارات السرية",
      count: "0", // Initial placeholder values
      rate: "0",
      isUp: false,
      icon: <Eye className="h-4 w-4" />,
      color: "info",
    },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/tasks");
        const data = response.data.elements;


        const today = new Date();


        const thirtyDaysAgo = subDays(today, 30);


        const recentTasks = data.filter((task:any) => {
          const createdAt = new Date(task.created_at);
          return isWithinInterval(createdAt, { start: thirtyDaysAgo, end: today });
        });


        const midaniahCount = recentTasks.filter(
          (item:any) => item.department.group.type === "ميدانية"
        ).length;

        const siriahCount = recentTasks.filter(
          (item:any) => item.department.group.type === "سرية"
        ).length;

    
        const totalTasksLastMonth = data.filter((item:any) =>
          isWithinInterval(new Date(item.created_at), { start: subDays(today, 60), end: thirtyDaysAgo })
        ).length;

        const midaniahRate:any = totalTasksLastMonth > 0 
          ? ((midaniahCount / totalTasksLastMonth) * 100).toFixed(2) 
          : 0;

        const siriahRate:any = totalTasksLastMonth > 0 
          ? ((siriahCount / totalTasksLastMonth) * 100).toFixed(2) 
          : 0;


        setReports([
          {
            id: 1,
            name: "مجموع الزيارات الميدانية",
            count: midaniahCount.toString(),
            rate: midaniahRate.toString(),
            isUp: midaniahRate > 0,
            icon: <Session className="h-4 w-4" />,
            color: "primary",
          },
          {
            id: 2,
            name: "مجموع الزيارات السرية",
            count: siriahCount.toString(),
            rate: siriahRate.toString(),
            isUp: siriahRate > 0,
            icon: <Eye className="h-4 w-4" />,
            color: "info",
          },
        ]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {reports.map((item, index) => (
        <Card key={`report-card-${index}`}>
          <CardHeader className="flex-col-reverse sm:flex-row flex-wrap gap-2 border-none mb-0 pb-0">
            <span className="text-sm font-medium text-default-900 flex-1">
              {item.name}
            </span>
            <span
              className={cn(
                "flex-none h-9 w-9 flex justify-center items-center bg-default-100 rounded-full",
                {
                  "bg-primary bg-opacity-10 text-primary": item.color === "primary",
                  "bg-info bg-opacity-10 text-info": item.color === "info",
                  "bg-warning bg-opacity-10 text-warning": item.color === "warning",
                  "bg-destructive bg-opacity-10 text-destructive": item.color === "destructive",
                }
              )}
            >
              {item.icon}
            </span>
          </CardHeader>
          <CardContent className="pb-4 px-4">
            <div className="text-2xl font-semibold text-default-900 mb-2.5">
              {item.count}
            </div>
            <div className="flex items-center font-semibold gap-1">
              {item.isUp ? (
                <>
                  <span className="text-success">{item.rate}%</span>
                  <Icon
                    icon="heroicons:arrow-trending-up-16-solid"
                    className="text-success text-xl"
                  />
                </>
              ) : (
                <>
                  <span className="text-destructive">{item.rate}</span>
                  <Icon
                    icon="heroicons:arrow-trending-down-16-solid"
                    className="text-destructive text-xl"
                  />
                </>
              )}
            </div>
            <div className="mt-1 text-xs text-default-600">في اخر 30 يوم</div>
          </CardContent>
        </Card>
      ))}
    </>
  );
};

export default ReportsArea;
