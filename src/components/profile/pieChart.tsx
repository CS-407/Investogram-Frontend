import { StockInfo } from "@/util/types";
import { Stock } from "../../util/types";
import { useRef, useEffect } from "react";
import Chart from "chart.js/auto";

interface Props {
  stocks: StockInfo[];
}

const PieChart: React.FC<Props> = ({ stocks }) => {
  const chartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (chartRef.current) {
      const labels = stocks.map((stock) => stock.stock_ticker);
      const data = stocks.map((stock) => stock.current_price);

      new Chart(chartRef.current, {
        type: "pie",
        data: {
          labels: labels,
          datasets: [
            {
              data: data,
              backgroundColor: [
                "#FF6384",
                "#36A2EB",
                "#FFCE56",
                // Add more colors as needed
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          // Add additional options here, such as legend position or chart title
        },
      });
    }
  }, [stocks]);

  return (
    <div>
      <PieChart stocks={[]}></PieChart>
    </div>

  )

};

export default PieChart;
