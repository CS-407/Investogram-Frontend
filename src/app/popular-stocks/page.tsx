import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from './page.module.css'

export default function popular_stocks() {
    return (
      <main className={styles.main}>
        <div> 
          <h1> Popular Stocks </h1>
        </div>
      </main>
    )
  }
  