"use client";
import { User } from "@/util/types";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "src/util/globals";

import axios from "axios";

const Followers = () => {
	const [followersList, setFollowersList] = useState<Partial<User>[]>([]);

	useEffect(() => {
		axios
			.get(`${BASE_URL}/api/user/followers`, {
				headers: {
					Authorization: "Bearer " + localStorage.getItem("token"),
				},
			})
			.then((response) => {
				setFollowersList(response.data.followers);
			})
			.catch((error) => {
				console.log(error);
				// alert("Trouble contacting server");
			});
	}, []);

	return (


<>
<h1 className="text-2xl font-bold mt-4" style={{backgroundColor: "#FDE698", padding: "20px"}}>Your Followers</h1>
<p className="text-lg mb-2" style={{color: "#364F6B", padding: "20px"}}>Your Followers: {followersList.length}</p>
<ul className="list-none" style={{padding: "20px"}}>
	{
		followersList.map((usr) =>
			<li id={usr._id} className="mb-2 p-2 bg-gray-100 rounded-lg shadow-sm">
				{usr.username} 
			</li>
		)
	}
</ul>
</>

	);
};

<<<<<<< Updated upstream
export default Followers;
=======
  return (
    <>
      <h1 className="flex-none w-1/3 p-4 flex justify-center items-center flex-col text-2xl font-bold mt-1">Your Followers</h1>
      <p className="flex-none w-1/3 p-4 flex justify-center items-center flex-col text-2xl font-bold mt-1">Number of followers: {followersNumber}</p>
      <ul>
        {followersList.map((follower, index) => (
          <li key={index}>{follower}</li>
        ))}
      </ul>
    </>
  )
}

export default Followers;
>>>>>>> Stashed changes
