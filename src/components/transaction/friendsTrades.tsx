import { BASE_URL } from "@/util/globals";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { TradeList } from "./tradeList"
import AggregateStocks from "../stock/aggregateStocks";

export function FriendsTrades(props: any) {
    
    const [friendData, setFriendData] = useState<any[]>([]);
    
    useEffect(() => {
		axios
			.get(`${BASE_URL}/api/user/friendsTrades/`, {
				headers: {
					"Content-Type": "application/json",
                    Authorization: "Bearer " + localStorage.getItem("token"),
				},
			})
			.then((response) => {
				const data = response.data.data;
				setFriendData(data);
			})
			.catch((err: any) => {
				if (err.response && err.response.data && err.response.data.message) {
                    console.log(err.response.data.msg);
                } else {
                    console.log("Error getting friend data");
                }
			});
	}, []);

    const friendSection = (friend: any) => {
        if (friend.trades.length === 0) return (<></>);
        
        return (
            <div className="p-1 bg-blue-100 mx-1 rounded-lg shadow-lg" key={friend.friend._id}>
                <h1 className="font-bold">{friend.friend.username}</h1>
                <div className="w-64">
                    <TradeList trades={friend.trades} />
                </div>
            </div>
        )
    }

    return (
        <div className="rounded-md p-5 bg-investogram_gray my-2">
            <h3 className="font-bold text-2xl p-1">Your Friends' Most Recent Trades</h3>
            {friendData.length === 0 && <p>No friends to display 😔</p>}
            <div className="flex flex-row overflow-scroll mb-3">
                {friendData.length > 0 && friendData.map((friend: any) => friendSection(friend))}
            </div>
            <Link href="/friendsStocks" className="p-5 px-2 py-1 font-semibold rounded-full inline bg-investogram_yellow hover:underline">See more stocks your friends have bought</Link>
        </div>
            
    )
}