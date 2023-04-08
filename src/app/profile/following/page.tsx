"use client";
import { User } from "@/util/types";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "src/util/globals";

import axios from "axios";

const Following = () => {

  const [followingList, setFollowingList] = useState([]);
  const [followingNumber, setFollowingNumber] = useState(0);

  useEffect(() => {
      axios.get(`${BASE_URL}/api/user/following`, {
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("token")
      }
      })
      .then(response => {
        const data = response.data;
        setFollowingList(data);
        setFollowingNumber(data.length);
      })
      .catch(error => {
        console.log(error);
        alert('Trouble contacting server');
      })
  }, []) // Added an empty dependency array to ensure the useEffect hook is only executed once on component mount.

  return (
    <div>
      <h1 className="text-2xl font-bold mt-4">Users You Follow</h1>
      <p>Number of following: {followingNumber}</p>
      <ul>
        {followingList.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  )
}


export default Following;