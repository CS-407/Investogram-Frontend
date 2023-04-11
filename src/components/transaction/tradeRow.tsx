import { currencyConverter, dateConverter, dateToString } from "@/util/HelperFunctions"

export function TradeRow(props: any) {
    let trade = props.props
    return (
        <div className='flex justify-between'>
            <div className='px-2'>
                <div className='font-bold'> {trade.stock_id.stock_name} {trade.buy ? "Bought" : "Sold"} </div>
                <div className='text-sm'> {dateToString(dateConverter(trade.timestamp))}</div>
            </div>
            <div className='text-right px-2'>
                <div className='font-bold'>${currencyConverter(trade.amount_usd)}</div>
                <div className='text-sm'>{trade.no_of_shares} share{trade.no_of_shares > 1 ? "s":""} at ${currencyConverter(trade.stock_price_id.current_price)}</div>
            </div>
        </div>
    )
}