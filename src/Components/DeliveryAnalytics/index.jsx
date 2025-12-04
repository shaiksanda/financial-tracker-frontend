import MainHeader from "../MainHeader";
import Sidebar from "../Sidebar";
import Chart from "react-apexcharts";
import { useGetDeliveryAnalyticsQuery } from "../../services/api";
import { useMediaQuery } from "react-responsive"
import "./index.css";

const DeliveryAnalytics = () => {
  const { data } = useGetDeliveryAnalyticsQuery({ days: 5 });
  const chartData = data?.analytics || [];
  const isMobile = useMediaQuery({ maxWidth: 767 });

  // ---- CHART 1: Total Trips ----

  // ---- CHART 1: Total Trips (Clean Area) ----
  const tripsOptions = {
    chart: {
      toolbar: { show: false },
      dropShadow: {
        enabled: true,
        top: 4,
        left: 2,
        blur: 6,
        opacity: 0.3
      }
    },
    title: {
      text: "Total Trips",
      align: "center",
      style: { fontWeight: 600, fontSize: 20 }
    },
    xaxis: {
      categories: chartData.map(i => i.date),
      labels: { style: { fontSize: "13px" } }
    },
    stroke: {
      curve: "smooth",
      width: 4
    },
    dataLabels: { enabled: true },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.45,
        opacityTo: 0.05,
        stops: [0, 90, 100]
      }
    },
    colors: ["#7265e6"]
  };

  const tripsSeries = [
    { name: "Trips", data: chartData.map(i => i.totalTrips) }
  ];


  // ---- CHART 2: Earnings ----
  const earningsOptions = {
    chart: { toolbar: { show: false } },
    title: {
      text: "Earnings",
      align: "center",
      style: { fontWeight: 600, fontSize: 20 }
    },
    xaxis: { categories: chartData.map(i => i.date) },
    dataLabels: { enabled: true },
    colors: ["#34c38f"]
  };
  const earningsSeries = [
    { name: "Earnings", data: chartData.map(i => i.totalEarnings) }
  ];

  // ---- CHART 3: Distance Covered ----
  // ---- CHART 3: Distance Covered (Area + Line Combo) ----
  const distanceOptions = {
    chart: {
      toolbar: { show: false }
    },
    title: {
      text: "Distance Covered (km)",
      align: "center",
      style: { fontWeight: 600, fontSize: 20 }
    },
    xaxis: {
      categories: chartData.map(i => i.date),
      labels: { style: { fontSize: "13px" } }
    },
    stroke: {
      curve: "smooth",
      width: [3, 0]   // line = 3px, area border = none
    },
    colors: ["#FF7F50", "#FF7F50"],
    dataLabels: { enabled: true },
    fill: {
      type: ["solid", "gradient"],
      gradient: {
        shade: "light",
        opacityFrom: 0.4,
        opacityTo: 0.05,
        stops: [0, 90, 100]
      }
    },
    legend: {
      position: "top",
      horizontalAlign: "right"
    }
  };

  const distanceSeries = [
    {
      name: "Distance Covered",
      type: "line",
      data: chartData.map(i => i.totalDistance)
    },

  ];


  // ---- CHART 4: Delivery Time ----




  // ---- CHART 4: Delivery Time (Area) ----
  const timeOptions = {
    chart: { toolbar: { show: false } },
    title: {
      text: "Delivery Time (mins)",
      align: "center",
      style: { fontWeight: 600, fontSize: 20 }
    },
    xaxis: { categories: chartData.map(i => i.date), labels: { style: { fontSize: "13px" } } },
    stroke: {
      width: [4, 2, 3],
      curve: ["smooth", "straight", "stepline"],
      dashArray: [0, 6, 0]
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "light",
        opacityFrom: 0.4,
        opacityTo: 0.05,
        stops: [0, 90, 100]
      }
    },
    colors: ["#FF6B6B"],
    dataLabels: { enabled: true }
  };

  const timeSeries = [
    { name: "Delivery Time", data: chartData.map(i => i.totalTimeTaken) }
  ];



  // ---- CHART 5: Petrol Cost (Area) ----
  const petrolOptions = {
    chart: { toolbar: { show: false } },
    title: {
      text: "Petrol Cost Per Day",
      align: "center",
      style: { fontWeight: 600, fontSize: 20 }
    },
    xaxis: {
      categories: chartData.map(i => i.date),
      labels: { style: { fontSize: "13px" } }
    },
    yaxis: {
      labels: {
        formatter: val => Math.round(val) // clean integers
      }
    },
    stroke: { curve: "smooth", width: 4 },
    fill: {
      type: "image",
      gradient: {
        shade: "light",
        opacityFrom: 0.1,
        opacityTo: 0.2,
        stops: [0, 90, 100]
      }
    },
    colors: ["red"],
    dataLabels: { enabled: true }
  };

  const petrolSeries = [
    { name: "Petrol Cost", data: chartData.map(i => i.totalPetrolCost) }
  ];


  return (
    <div>
      <MainHeader />
      <Sidebar />
      <main className="main analytics">

        <div className="chart-card">
          <Chart options={tripsOptions} series={tripsSeries} type="area" height={350} />
        </div>

        <div className="chart-card">
          <Chart options={earningsOptions} series={earningsSeries} type="area" height={350} />
        </div>

        <div className="chart-card">
          <Chart options={distanceOptions} series={distanceSeries} type="line" height={350} />
        </div>

        <div className="chart-card">
          <Chart options={timeOptions} series={timeSeries} type="area" height={350} />
        </div>

        <div className="chart-card">
          <Chart options={petrolOptions} series={petrolSeries} type="area" height={350} />
        </div>

      </main>
    </div>
  );
};

export default DeliveryAnalytics;
