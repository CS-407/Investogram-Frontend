import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from './page.module.css'
import Header from './header'
import PopularStocks from "@/components/popular-stocks/popularStocks"

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main>
      <div>Home</div>
      <div> 
          <h1> Popular Stocks </h1>
      </div>
      <div>
          <tbody>
            <PopularStocks />
          </tbody>
      </div>
    </main>
  )
}
