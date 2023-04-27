import SearchStock from "@/components/stock/searchStock";
import { StockCategories } from "@/components/stock/stockCategories";
import Link from "next/link";

export default function globalstocks() {
	return (
		<main className="p-5 bg-white">
			<div className="flex-none flex justify-center items-center flex-col rounded-lg shadow-lg bg-investogram_yellow py-4 text-investogram_navy">
				<h1 className="text-5xl font-bold mt-4 mb-4">Global Stocks</h1>
				<p className="text-gray-500">
					Click on the stock ticker to navigate to a stock page or use the
					search bar to find a stock!
				</p>
			</div>
			<div className="mt-2 w-full flex flex-row justify-center rounded-lg shadow-lg bg-investogram_navy py-4">
				<Link className="mr-2" href={"/stockCategories"}>
					<p className="bg-gray-100 hover:bg-gray-300 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">View Stock Categories</p>
				</Link>
				<Link className="ml-2" href={"/sortedStocks"}>
					<p className="bg-gray-100 hover:bg-gray-300 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">View Sorted Stocks</p>
				</Link>
			</div>
			<SearchStock />
		</main>
	);
}
