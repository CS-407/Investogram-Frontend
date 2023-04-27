"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

interface ProfileDropdown {}

export default function ProfileDropdown(props: ProfileDropdown) {
	const [isOpen, setIsOpen] = useState(false);
	const pathname = usePathname();

	const toggleDropdown = () => {
		setIsOpen(!isOpen);
	};

	return (
		<li className="relative my-auto">
			<div
				className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500 cursor-pointer"
				onClick={toggleDropdown}
			>
				<p
					className={`block ${
						pathname == "/profile" ? "font-bold" : ""
					} hover:underline py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500`}
				>
					Profile
				</p>
			</div>
			{isOpen && (
				<ul className="absolute top-full left-0 z-10 bg-white rounded-md shadow-md">
					<li>
						<Link
							href={"/profile"}
							className="block px-4 py-2 hover:bg-gray-200"
						>
							Profile
						</Link>
					</li>
					<li>
						<Link
							href={"/profile/updateusername"}
							className="block px-4 py-2 hover:bg-gray-200"
						>
							Change Username
						</Link>
					</li>
					<li>
						<Link
							href={"/profile/updatepassword"}
							className="block px-4 py-2 hover:bg-gray-200"
						>
							Change Password
						</Link>
					</li>
					<li>
						<Link
							href={"/profile/changeprofilepic"}
							className="block px-4 py-2 hover:bg-gray-200"
						>
							Change Avatar
						</Link>
					</li>
					<li>
						<Link
							href={"/profile/delete"}
							className="block px-4 py-2 hover:bg-red-200"
						>
							Delete Account
						</Link>
					</li>
				</ul>
			)}
		</li>
	);
}
