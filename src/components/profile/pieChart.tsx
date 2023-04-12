import React, { useRef, useEffect } from "react";
import Chart from 'chart.js/auto';

import { currencyConverter } from "@/util/HelperFunctions";

const PieChart: React.FC = () => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d");
      if (ctx) {
        new Chart(ctx, {
          type: "pie",
          data: {
            labels: ["Revenue", "Loss", "Profit"],
            datasets: [
              {
                data: [
                  Math.floor(Math.random() * 50),
                  Math.floor(Math.random() * 50),
                  Math.floor(Math.random() * 50),
                ],
                backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
              },
            ],
          },
        });
      }
    }
  }, []);

  return (
    <div>
      <canvas ref={chartRef} />
    </div>
  );
};

export default PieChart;
