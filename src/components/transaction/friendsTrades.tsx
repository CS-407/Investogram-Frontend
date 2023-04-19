import { BASE_URL } from "@/util/globals";
import axios from "axios";
import { useEffect, useState } from "react";
import { TradeList } from "./tradeList"

export function FriendsTrades(props: any) {
    
    const [friendData, setFriendData] = useState<any[]>([]);
    /*
    useEffect(() => {
		axios
			.get(`${BASE_URL}/api/stock/get/`, {
				headers: {
					"Content-Type": "application/json",
				},
			})
			.then((response) => {
				const data = response.data;
				setFriendData(data);
			})
			.catch((err) => {
				alert("Error getting friend data")
			});
	}, []);
    */


    const friendSection = (friend: any) => {
        return (
            <div>
                <h1>{friend.name}</h1>
                <TradeList trades={friend.trades} />
            </div>
        )
    }

    return (
        <div className="rounded-md p-2 bg-investogram_yellow my-2">
            <h3 className="font-bold text-2xl">Your Friends' Most Recent Trades</h3>
            {friendData.map((friend: any) => friendSection(friend))}
        </div>
            
    )
}