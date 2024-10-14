"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import axios from "axios";
import { useThemeStore } from "@/store";
import { useTheme } from "next-themes";
import { themes } from "@/config/thems";
import { api } from "@/config/axios.config";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const UserStats = ({ height = 250 }) => {
  const { theme: config, setTheme: setConfig, isRtl } = useThemeStore();
  const { theme: mode } = useTheme();
  const theme = themes.find((theme) => theme.name === config);

  const [series, setSeries] = useState([0, 0]);

  // Fetch data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/tasks"); 
        const data = response.data.elements;

     
        const midaniahCount = data.filter((item: any) => item.department.group.type === "ميدانية").length;
        const siriahCount = data.filter((item: any) => item.department.group.type === "سرية").length;

        
        setSeries([midaniahCount, siriahCount]);
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
    labels: ["الميدانية", "السرية"],
    dataLabels: {
      enabled: false,
    },
    colors: [
      `hsl(${theme?.cssVars[mode === "dark" ? "dark" : "light"].primary})`,
      `hsl(${theme?.cssVars[mode === "dark" ? "dark" : "light"].info})`,
    ],
    tooltip: {
      theme: mode === "dark" ? "dark" : "light",
      fontFamily: "Cairo",
      labels: {
        fontFamily: "Cairo",
      },
    },
    stroke: {
      width: 0,
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            name: {
              show: true,
              fontSize: "14px",
              fontWeight: 600,
              colors: `hsl(${theme?.cssVars[mode === "dark" || mode === "system" ? "dark" : "light"].chartLabel})`,
            },
            value: {
              show: true,
              fontSize: "14px",
              fontFamily: "Cairo",
              fontWeight: 600,
              color: `hsl(${theme?.cssVars[mode === "dark" || mode === "system" ? "dark" : "light"].chartLabel})`,
            },
            total: {
              show: true,
              label: "المجموع",
              fontFamily: "Cairo",
              fontSize: "16px",
              fontWeight: 600,
              color: `hsl(${theme?.cssVars[mode === "dark" || mode === "system" ? "dark" : "light"].chartLabel})`,
            },
          },
        },
      },
    },
    legend: {
      fontFamily: "Cairo",
      position: "bottom",
      labels: {
        colors: `hsl(${theme?.cssVars[mode === "dark" || mode === "system" ? "dark" : "light"].chartLabel})`,
        fontFamily: "Cairo",
      },
      itemMargin: {
        horizontal: 10,
        vertical: 8,
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
      series={series}
      type="donut"
      height={height}
      width={"100%"}
    />
  );
};

export default UserStats;
