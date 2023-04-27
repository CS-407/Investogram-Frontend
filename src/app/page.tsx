"use client";
import { useContext, useEffect } from "react";
import { Inter } from "@next/font/google";
import Link from "next/link";
import AuthContext from "@/context/AuthContext";
import { usePathname, useRouter } from "next/navigation";
import PopularStocks from "@/components/stock/popularStocks";
import { FriendsTrades } from "@/components/transaction/friendsTrades";
import CurrentStockValue from "@/components/profile/currentStockValue";
import AggregateStocks from "@/components/stock/aggregateStocks";

const inter = Inter({ subsets: ["latin"] });


export default function Home() {
	const router = useRouter();

	const pathname = usePathname();
	const { isAuth, user } = useContext(AuthContext);

	useEffect(() => {
		if (!isAuth) {
			router.push("/auth/login");
		}
	}, [isAuth])

	if (!isAuth) {
		return <div></div>;
	}

	return (
		<main className="p-5 bg-white text-investogram_navy">
			{/* start of title */}
			<div className="flex-none p-4">
				<h1 className="text-2xl font-bold mt-4 mb-4 ">
					Welcome to Investogram!
				</h1>
			</div>
			{/* end of title */}

			

			<div className="flex flex-row">
				{/* start of popular stocks component */}
				<div className="flex-none h-1/3 w-2/3 flex justify-center items-center flex-col rounded-lg shadow-lg p-5 bg-investogram_yellow mb-3">
					<h1 className="text-2xl text-center font-bold mt-4 mb-2 p-3 ">
						Popular Stocks
					</h1>

					<PopularStocks />
				</div>
				{/* end of popular stocks component */}

				{/* start of profile component */}
				<div className="flex-none h-1/3 w-1/3 p-4 mx-3 flex justify-center items-center flex-col rounded-lg shadow-lg bg-investogram_lightblue">
					<h1 className="text-2xl text-center font-bold mt-4 mb-2 p-3 ">
						My Profile
					</h1>
					<img
						src={user ? `/images/avatar_${user?.profile_pic}.png` : "/images/default_profile.jpg"}
						alt={`${"your"}'s avatar`}
						className="flex-center rounded-full object-cover h-36 w-36"
					/>
					<h1 className="text-2xl font-bold mt-4 mb-2 ">
						<Link href={"/profile"}>
							<p
								className={`block ${
									pathname == "/profile" ? "font-bold" : ""
								} hover:underline py-2 pl-3 pr-4`}
							>
								{user?.username}
							</p>
						</Link>
					</h1>

					{/* start of followers/following component */}
					<div className="flex flex-row">
						<div className="mx-1">
							<p className="inline bg-blue-100 rounded-full px-3 py-1 mr-1 text-sm font-semibold text-white-700">
								{user?.followers}
							</p>
							followers
						</div>
						<div className="mx-1">
							<p className="inline bg-blue-100 rounded-full px-3 py-1 mr-1 text-sm font-semibold text-white-700">
								{user?.following}
							</p>
							following
						</div>
					</div>
					{/* end of followers/following component */}

					<div>
						<h1 className="text-3l font-bold mt-4 mb-2 ">
							Leaderboard Position:
						</h1>
					</div>

					<div
					className="col-span-2 p-5"
				>
					<Link href={"/blog"}>
						<p className="flex items-center justify-center px-2 py-1 text-base font-medium leading-6 text-white whitespace-no-wrap bg-black border-2 border-transparent rounded-full shadow-sm hover:bg-transparent hover:text-black hover:border-black focus:outline-none">
							My Blog
						</p>
					</Link>
				</div>
				</div>
				{/* end of profile component */}
				
			</div>
			
			<div>
				<FriendsTrades />
			</div>

			{/* start of popular stocks component */}
			<div className="flex-none h-1/3 w-2/3 flex justify-center items-center flex-col rounded-lg shadow-lg p-5 bg-investogram_yellow mb-3">
					<h1 className="text-2xl text-center font-bold mt-4 mb-2 p-3 ">
						Stocks your friends have purchased
					</h1>

					<AggregateStocks />
				</div>
				{/* end of popular stocks component */}

		</main>
	);
}
