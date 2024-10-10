"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import axios from "axios";
import { useThemeStore } from "@/store";
import { useTheme } from "next-themes";
import { themes } from "@/config/thems";
import { api } from "@/config/axios.config";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const roleMapping: { [key: string]: string } = {
  inspector: "مفتش",
  qualityObserver: "مراقب جودة",
  reviewer: "مراجع",
  admin: "مسؤول",  // Added admin role mapping
  // Add more mappings as needed
};

const UserDeviceReport = ({ height = 250 }) => {
  const { theme: config, isRtl } = useThemeStore();
  const { theme: mode } = useTheme();
  const theme = themes.find((theme) => theme.name === config);

  const [labels, setLabels] = useState<string[]>([]);
  const [series, setSeries] = useState<number[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/users`);
        const elements = response.data.elements;

        const roleCountMap: { [role: string]: number } = {};

        elements.forEach((element: any) => {
          const role = element.role;
          const arabicRole = roleMapping[role] || role; // Fallback to original if not mapped

          if (!roleCountMap[arabicRole]) {
            roleCountMap[arabicRole] = 0;
          }
          roleCountMap[arabicRole] += 1;
        });

        const newLabels = Object.keys(roleCountMap);
        const newSeries = Object.values(roleCountMap);

        setLabels(newLabels);
        setSeries(newSeries);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const options: any = {
    chart: {
      toolbar: {
        show: false,
      },
    },
    labels: labels.length ? labels : ["مفتش", "مراقب جودة", "مراجع", "مسؤول"], // Fallback to default
    dataLabels: {
      enabled: false,
      fontFamily: "Cairo",
    },
    colors: [
      `hsl(${theme?.cssVars[mode === "dark" ? "dark" : "light"].primary})`,
      "#FF9E69", "#FFD1A7"
    ],
    tooltip: {
      theme: mode === "dark" ? "dark" : "light",
    },
    stroke: {
      width: 0
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            fontFamily: "Cairo",
            name: {
              show: true,
              fontSize: "24px",
              fontFamily: "Cairo",
              fontWeight: 500,
              color: `hsl(${theme?.cssVars[mode === "dark" ? "dark" : "light"].chartLabel})`,
            },
            value: {
              show: true,
              fontSize: "18px",
              fontFamily: "Cairo",
              fontWeight: 600,
              color: `hsl(${theme?.cssVars[mode === "dark" ? "dark" : "light"].chartLabel})`,
            },
            total: {
              show: true,
              label: "المجموع",
              fontSize: "16px",
              fontFamily: "Cairo",
              fontWeight: 600,
              color: `hsl(${theme?.cssVars[mode === "dark" ? "dark" : "light"].chartLabel})`,
            },
          },
        },
      },
    },
    legend: {
      position: "bottom",
      fontFamily: "Cairo",
      labels: {
        fontFamily: "Cairo",
        colors: `hsl(${theme?.cssVars[mode === "dark" ? "dark" : "light"].chartLabel})`,
      },
      itemMargin: {
        horizontal: 5,
        vertical: 5,
      },
      markers: {
        width: 10,
        height: 10,
        radius: 10,
        offsetX: isRtl ? 5 : -5,
      },
    },
    padding: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    },
  };

  return (
    <Chart
      options={options}
      series={series.length ? series : [2200, 800, 700, 300]} // Adjust default series if needed
      type="donut"
      height={height}
      width={"100%"}
    />
  );
};

export default UserDeviceReport;
