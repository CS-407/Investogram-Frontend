import { useState } from "react"
import { TradeRow } from "./tradeRow"

interface TradeListProps {
    trades: any[]
}


export function TradeList(props: any) {
    const [showAll, setShowAll] = useState(false)

    const trades = props.trades

    const lessTrades = trades.slice(0, 1)

    function Divider() {
        const dividerStyle = 'border-b-2 border-gray-300 my-1'
        return (
            <div className={dividerStyle}> </div>
        )
    }

    let tradesToDisplay = showAll ? trades : lessTrades

    return (
        <div>
            <Divider />
            <div>
                {tradesToDisplay.map((tradeObj: any, idx: number) => 
                    <div key={idx}>
                        <TradeRow props={tradeObj} />
                        <Divider />
                    </div>
                )
                }
            </div>
            <div className="flex justify-center">
                <button 
                    className="flex items-center justify-center px-2 py-1 text-base font-medium leading-6 text-white whitespace-no-wrap bg-black border-2 border-transparent rounded-full shadow-sm hover:bg-transparent hover:text-black hover:border-black focus:outline-none"
                    onClick={() => setShowAll(!showAll)}>
                    {showAll ? "Show Less" : "Show All Trades" }
                </button>
            </div>
        </div>
            
    )
}