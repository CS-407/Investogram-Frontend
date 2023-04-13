import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from './page.module.css'
import Header from './header'
import PopularStocks from '@/components/stock/popularStocks'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className={styles.main}>
      <div>Hello</div>
      <table>
        <PopularStocks/> 
      </table>
    </main>
  )
}
