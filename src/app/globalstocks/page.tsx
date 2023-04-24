import SearchStock from "@/components/stock/searchStock";
import { StockCategories } from "@/components/stock/stockCategories";

export default function globalstocks() {
	return (
		<main className="p-5 bg-white">
			<div className="flex-none flex justify-center items-center flex-col rounded-lg shadow-lg bg-investogram_yellow py-4 text-investogram_navy">
				<h1 className="text-5xl font-bold mt-4 mb-4">
					Global Stocks
				</h1>
				<p className="text-gray-500">
					Click on the stock ticker to navigate to a stock page or use the search bar to find a
					stock!
				</p>
			</div>
			<StockCategories />
			<SearchStock />
		</main>
	);
}
