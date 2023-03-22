'use client';

import { ResponsiveLine } from '@nivo/line'

export default function StockGraph() {

    const stockData = [
        {
            id: "stockPrices",
            data: [
            { x: "2019-05-29" , y: 120 },
            { x: "2019-06-29" , y: 123 },
            { x: "2019-07-29" , y: 115 },
            { x: "2019-08-29" , y: 130 }
            ]
        }
    ];



    

    return (
        <div className='w-4/5'>
            <div className='h-96'>
                <ResponsiveLine
                    data={stockData}
                    margin={{ top: 50, right: 60, bottom: 50, left: 120 }}
                    xScale={{
                        type: "time",
                        format: "%Y-%m-%d",
                        precision: "day"
                        }}
                        xFormat="time:%m/%d"
                    yScale={{
                        type: "linear",
                        min: "auto",
                        max: "auto",
                        stacked: false,
                        reverse: false
                    }}
                    axisBottom={{
                        format: "%m/%d",
                        legend: "Date",
                        legendOffset: 40,
                        legendPosition: "middle"
                    }}
                    axisLeft={{
                        legend: "Stock Price",
                        legendOffset: -40,
                        legendPosition: "middle"
                    }}
                    pointSize={10}
                    pointColor="black"
                    colors={ ['#000000']}
                    pointBorderWidth={2}
                    pointBorderColor={{ from: "serieColor" }}
                    useMesh={true}
                />
            </div>
        </div>
        

    )
  
}
  