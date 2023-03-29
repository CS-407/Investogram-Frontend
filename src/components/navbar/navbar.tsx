"use client";

import Link from "next/link";
import React, { useContext } from "react";
import { useRouter } from 'next/navigation';

import AuthContext from "@/context/AuthContext";

import './navStyles.css';

const Navbar = () => {
    const authCtx = useContext(AuthContext);
	const router = useRouter();

	return (
		<nav className="navbar">
			<div className="navigation">
				<Link href={"/"}>Home</Link>
				<Link href={"/globalstocks"}>Global Stocks</Link>
				<Link href={"/globalusers"}>Global Users</Link>
				{authCtx.isAuth && <Link href={"/profile"}>Profile</Link>}
				{
                    authCtx.isAuth ? 
                    <button className="logoutBtn" onClick={() => {
						authCtx.logout();
						router.push("/auth/login");
					}}>Logout</button> :
                    <Link href={"/auth/login"}>Login</Link>
                }
			</div>
		</nav>
	);
};

export default Navbar;
