
"use client";
import { useContext, useEffect, useState } from "react";
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from './page.module.css'
import Header from './header'
import Link from "next/link";
import AuthContext from "@/context/AuthContext";
import { usePathname, useRouter } from "next/navigation";


const inter = Inter({ subsets: ['latin'] })


export default function Home() {
  const pathname = usePathname();
  const { user } = useContext(AuthContext);
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
						style={{ backgroundColor: "#FDE698", padding: "20px", marginRight:"20px" }}
					>
            <h1
							className="text-2xl font-bold mt-4 mb-2"
							style={{ color: "#364F6B" }}
						>Popular Stocks</h1>
            <p>This Week</p>

          </div>
          <div
						className="flex-none w-1/3 p-4 flex justify-center items-center flex-col rounded-lg shadow-lg"
						style={{ backgroundColor: "#FDE698", padding: "20px"}}
					>
						<img
							src={"/images/avatar_1.png"}
							alt={`${"your"}'s avatar`}
							className={"flex-center"}
							style={{
								borderRadius: "50%",
								width: "150px",
								height: "150px",
								objectFit: "cover",
							}}
						/>
						<h1
							className="text-2xl font-bold mt-4 mb-2"
							style={{ color: "#364F6B" }}
						>
							<Link href={"/profile"}>
								<p className={`block ${pathname == "/profile" ? "font-bold" : ""} hover:underline py-2 pl-3 pr-4 text-black bg-black-700 rounded md:bg-transparent md:text-black-700 md:p-0 md:dark:text-black-500`} style={{color:"#364F6B"}}>
									{user?.username}
								</p>
							</Link>
						</h1>
            <div className="flex flex-row">
							<div
								className={`followers`}
								style={{ marginRight: "10px", color: "#364F6B" }}
							>
								<p className="inline bg-blue-100 rounded-full px-3 py-1 text-sm font-semibold text-white-700 mr-2 mb-2">
									{user?.followers}
								</p>{" "}
								followers
							</div>
							<div className="following" style={{ color: "#364F6B" }}>
								<p className="inline bg-blue-100 rounded-full px-3 py-1 text-sm font-semibold text-white-700 mr-2 mb-2">
									{user?.following}
								</p>{" "}
								following
							</div>
            </div>
            <div>
            <h1
							className="text-3l font-bold mt-4 mb-2"
							style={{ color: "#364F6B" }}
						>
							{"Leaderboard Position: "}
						</h1>
            </div>
          </div>

      </div>
    </main>
  )
}
