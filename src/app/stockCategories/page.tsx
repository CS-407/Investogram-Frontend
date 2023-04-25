import { StockCategories } from '@/components/stock/stockCategories'
import React from 'react'

const page = () => {
  return (
    <main className="p-5 bg-white">
			<div className="flex-none flex justify-center items-center flex-col rounded-lg shadow-lg bg-investogram_yellow py-4 text-investogram_navy">
				<h1 className="text-5xl font-bold mt-4 mb-4">
					Stock Categories
				</h1>
				<p>
					View the different categories of stocks we have on Investogram!
				</p>
			</div>
            <StockCategories />
		</main>
  )
}

export default page