import { useContext, useEffect, useState } from "react";
import AuthContext from "@/context/AuthContext";
import { TradeInfo } from "@/util/types";
import axios from "axios";
import { BASE_URL } from "@/util/globals";

export default function homeProfileComponent() {
	const { user } = useContext(AuthContext);
	const [state, setState] = useState<TradeInfo>();

	useEffect(() => {
		axios
			.get(`${BASE_URL}/api/user/trades/${user?._id}`, {
				headers: {
					Authorization: "Bearer " + localStorage.getItem("token"),
				},
			})
			.then((res) => {
				console.log("trades", res.data.trades);
				console.log("stock_info", res.data.stock_info);
				console.log("monetary_info", res.data.monetary_info);

				setState({
					trades: res.data.trades,
					stock_info: res.data.stock_info,
					monetary_info: res.data.monetary_info,
				});
			})
			.catch((err) => {
				if (err.response && err.response.data && err.response.data.msg) {
					console.log(err.response.data.msg);
				} else {
					console.log("Trouble Contacting Server");
				}
			});
	}, []);

	return (
		<div>
			<main
				className=""
				style={{ backgroundColor: "#f5f5f5", padding: "20px" }}
			>
				<div className="flex flex-row">
					<div
						className="flex-none w-1/3 p-4 flex justify-center items-center flex-col"
						style={{ backgroundColor: "#f5f5f5", padding: "20px" }}
					>
						<img
							src={user ? `/images/avatar_${user?.profile_pic}.png` : "/images/default_profile.jpg"}
							alt={`${user?.username}'s avatar`}
							className={"flex-center"}
							style={{
								borderRadius: "50%",
								width: "150px",
								height: "150px",
								objectFit: "cover",
							}}
						/>
						<h1
							className="text-2xl font-bold mt-4"
							style={{ color: "#364F6B" }}
						>
							{user?.username}
						</h1>
					</div>
				</div>
			</main>
		</div>
	);
}
