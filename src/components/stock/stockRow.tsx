"use client";

import { Stock } from "@/util/types";
import Link from "next/link";

interface StockRowProps {
    stock: Stock;
}

export function StockRow(props: any) {

    const stock = props.stock;

	return (
        <div key={stock._id}>
            <Link
                href={`/stock/${stock._id}`}
                className="block w-64 px-1 py-1 rounded-lg hover:bg-investogram_yellow"
            >
                <p className="hover:underline">
                    {stock.stock_name} ({stock.stock_ticker})
                </p>
            </Link>
        </div>
	);
}
