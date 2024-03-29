"use client";

import "./globals.css";
import Navbar from "@/components/navbar/navbar";
import { AuthContextProvider } from "../context/AuthContext";

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html>
			<body>
				<AuthContextProvider>
					<Navbar />
					{children}
				</AuthContextProvider>
			</body>
		</html>
	);
}
