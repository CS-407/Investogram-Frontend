import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from './page.module.css'
import PopularStocks from "@/components/popular-stocks/popularStocks"

import React from 'react';

export default function popular_stocks() {
  

    return (
      <main className="">
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
  