import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from './page.module.css'
import React from 'react';
import VariousStocks from "@/components/globalstocks2/variousStocks"

export default function globalstocks() {
    return (
        <main className="">
        <div> 
          <h1> Various Stocks </h1>
        </div>
        <div>
          <tbody>
            <VariousStocks />
          </tbody>
        </div>
        
      </main>
    )
}