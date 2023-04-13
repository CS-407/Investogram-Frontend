import SearchStock from "@/components/stock/searchStock";

export default function globalstocks() {
    return (
        <main
				className="p-5"
				style={{ backgroundColor: "#f5f5f5"}}
			>
                <div
						className="flex-none flex justify-center items-center flex-col rounded-lg shadow-lg"
						style={{ backgroundColor: "#FDE698", padding: "20px" }}
					>
        <h1
							className="text-5xl font-bold mt-4 mb-4"
							style={{ color: "#364F6B"}}
				>Global Stocks</h1>
                <p>Navigate to a stock page you see here or use the search bar to find a stock!</p>
                </div>
                <SearchStock />
        </main>
        
    )
}