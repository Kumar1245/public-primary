"use client";
import React from "react";
import dynamic from "next/dynamic";
import { useQuery } from "@tanstack/react-query";
import { DASHBOARD_PLEDGE_CHART } from "../../../services/ApiCalls";
import { checkResponse } from "../../../Utilities/commonFunc";
import { useAuth } from "../../../context/AuthContext";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const PledgeOverview = () => {
  const { user } = useAuth();
  const { data: pledgeChart = [], isFetching } = useQuery({
    queryKey: ["pledge-chart"],
    queryFn: async () => {
      const res = await DASHBOARD_PLEDGE_CHART();
      const success = checkResponse({ res });
      return success ? res?.data?.data || [] : [];
    },
    keepPreviousData: true,
    refetchInterval: 10 * 60 * 1000,
    refetchIntervalInBackground: true,
  });

  const categories = pledgeChart.map((item) =>
    item._id === user?._id ? "You" : item.label,
  );
  const values = pledgeChart.map((item) => item.value);
  const totalPledges = values.reduce((sum, v) => sum + v, 0);

  const series = [
    {
      name: "Pledges",
      data: values,
    },
  ];
  const colors = categories.map((label) =>
    label === "You" ? "#13B93D" : "#008ED5",
  );

  const options = {
    chart: {
      type: "bar",
      height: 350,
      toolbar: { show: false },
    },

    plotOptions: {
      bar: {
        columnWidth: "30px",
        borderRadius: 6,
        distributed: true,
      },
    },

    colors,

    dataLabels: {
      enabled: false,
    },

    grid: {
      borderColor: "#eaeaea",
      strokeDashArray: 4,
    },

    xaxis: {
      categories,
      labels: {
        style: {
          colors: "#666",
          fontSize: "12px",
        },
      },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },

    yaxis: {
      labels: {
        style: {
          colors: "#999",
          fontSize: "12px",
        },
      },
    },

    tooltip: {
      custom: function ({ series, seriesIndex, dataPointIndex }) {
        const value = series[seriesIndex][dataPointIndex];
        const label = categories[dataPointIndex];
        const percentage = totalPledges
          ? ((value / totalPledges) * 100).toFixed(1)
          : 0;

        return `
      <div style="
        padding:10px 12px;
        background:#fff;
        box-shadow:0 6px 20px rgba(0,0,0,0.12);
        border-radius:8px;
        font-size:12px;
      ">
        <strong>${label === "You" ? "Your" : label} Pledge Count:</strong><br/>
        ${value} (${percentage}%)
      </div>
    `;
      }, 
    },

    legend: { show: false },
  };

  return (
    <div className="RevenueTrendCard commonCard p-3 shadow-sm">
      <div className="mb-2">
        <h5 className="commonCardHead mb-0">Pledge Overview</h5>
        <span className="text-muted" style={{ fontSize: 12 }}>
          Data auto-refreshes every 10 mins.
        </span>
      </div>

      {isFetching ? (
        <div className="text-center py-5">Loading...</div>
      ) : (
        <ReactApexChart
          options={options}
          series={series}
          type="bar"
          height={350}
        />
      )}
    </div>
  );
};

export default PledgeOverview;
