"use client";

import Link from "next/link";
import React, { useContext } from "react";
import { usePathname, useRouter } from "next/navigation";

import AuthContext from "@/context/AuthContext";
import ProfileDropdown from "@/components/profile/profileDropdown";

const Navbar = () => {
	const authCtx = useContext(AuthContext);
	const router = useRouter();
	const pathname = usePathname();

	const logoUnauthorized = () => {
		return (
			<ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
				<p className="block hover:underline py-2 pl-3 pr-4 text-white bg-investogram_yellow rounded md:p-0 md:dark:text-blue-500">
					<img className="h-10" src={"/images/logo-remove-bg.png"}></img>
				</p>
			</ul>
		);
	};

	const navLinks = () => {
		return (
			<ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
				<li>
					<p className="block hover:underline py-2 pl-3 pr-4 text-white bg-investogram_yellow rounded md:p-0 md:dark:text-blue-500">
						<Link href="/">
							<img className="h-10" src={"/images/logo-remove-bg.png"}></img>
						</Link>
					</p>
				</li>
				<li>
					<Link href={"/globalstocks"}>
						<p
							className={`block ${
								pathname == "/globalstocks" ? "font-bold" : ""
							} hover:underline py-2 pl-3 pr-4 mt-2 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-investogram_yellow`}
						>
							Global Stocks
						</p>
					</Link>
				</li>
				<li>
					<Link href={"/globalusers"}>
						<p
							className={`block ${
								pathname == "/globalusers" ? "font-bold" : ""
							} hover:underline py-2 pl-3 pr-4 mt-2 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-investogram_yellow`}
						>
							Global Users
						</p>
					</Link>
				</li>
				<li>
					<Link href={"/leaderboard"}>
						<p
							className={`block ${
								pathname == "/leaderboard" ? "font-bold" : ""
							} hover:underline py-2 pl-3 pr-4 mt-2 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-investogram_yellow`}
						>
							Leaderboard
						</p>
					</Link>
				</li>
			</ul>
		);
	};

	return (
		<nav className="bg-gray dark:bg-gray-900 w-full sticky z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
			<div className="flex flex-wrap items-center justify-between mx-auto p-4">
				{authCtx.isAuth ? navLinks() : logoUnauthorized()}
				{authCtx.isAuth ? (
					<ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
						<li className="my-auto">
							<ProfileDropdown />
						</li>
						<li>
							<button
								className="text-white bg-investogram_navy hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-investogram_navy text-investogram_yellow dark:hover:bg-investogram_lightblue dark:focus:ring-blue-800"
								onClick={() => {
									authCtx.logout();
									router.push("/auth/login");
								}}
							>
								Logout
							</button>
						</li>
					</ul>
				) : (
					<Link href={"/auth/login"}>
						<p className="text-white bg-blue-700 hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
							Login
						</p>
					</Link>
				)}
			</div>
		</nav>
	);
};

export default Navbar;
