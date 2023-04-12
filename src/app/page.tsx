
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from './page.module.css'
import Header from './header'


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main
				className=""
				style={{ backgroundColor: "#f5f5f5", padding: "20px" }}
			>
        <h1
							className="text-2xl font-bold mt-4 mb-2"
							style={{ color: "#364F6B", marginBottom:"20px" }}
						>Welcome to Investogram!</h1>
      <div className="flex flex-row">
					<div
						className="flex-none w-2/3 p-4 flex justify-center items-center flex-col rounded-lg shadow-lg"
						style={{ backgroundColor: "#FDE698", padding: "20px" }}
					>
            <h1
							className="text-2xl font-bold mt-4 mb-2"
							style={{ color: "#364F6B" }}
						>Popular Stocks</h1>
            <p>This Week</p>

          </div>
          <div
						className="flex-grow w-1/3 p-4 shadow-lg bg-white mx-auto align-middle rounded-lg" style={{ backgroundColor: "#FDE698", marginLeft: "20px"  }}
						>
              User info goes here
            </div>

      </div>
    </main>
  )
}
