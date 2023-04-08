"use client";
import { User } from "@/util/types";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "src/util/globals";

import axios from "axios";

const Followers = () => {

  const [followersList, setFollowersList] = useState([]);
  const [followersNumber, setFollowersNumber] = useState(0);

  useEffect(() => {
      axios.get(`${BASE_URL}/api/user/followers`, {
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("token")
      }
      })
      .then(response => {
        const data = response.data;
        setFollowersList(data);
        setFollowersNumber(data.length);
      })
      .catch(error => {
        console.log(error);
        alert('Trouble contacting server');
      })
  }, [])

  return (
    <>
      <h1 className="text-2xl font-bold mt-4">Your Followers</h1>
      <p>Number of followers: {followersNumber}</p>
      <ul>
        {followersList.map((follower, index) => (
          <li key={index}>{follower}</li>
        ))}
      </ul>
    </>
  )
}

export default Followers;