import { BASE_URL } from "@/util/globals";
import axios from "axios";
import { useEffect, useState } from "react";
import { TradeList } from "./tradeList"

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
			.catch((err) => {
				alert("Error getting friend data")
			});
	}, []);

    const friendSection = (friend: any) => {
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
        <div className="rounded-md p-2 bg-investogram_yellow my-2">
            <h3 className="font-bold text-2xl">Your Friends' Most Recent Trades</h3>
            {friendData.length === 0 && <p>No friends to display 😔</p>}
            <div className="flex flex-row overflow-scroll">
                {friendData.length > 0 && friendData.map((friend: any) => friendSection(friend))}
            </div>
        </div>
            
    )
}