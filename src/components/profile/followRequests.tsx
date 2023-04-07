'use client';

import { User } from "@/util/types";
import React, { useEffect, useState } from "react";
import AcceptFollowButton from "../acceptFollowButton";
import RejectFollowButton from "../rejectFollowButton";

import { BASE_URL } from '../../util/globals';

import "./requestStyles.css";
import axios from "axios";

const FollowRequests = () => {
    const [followRequests, setFollowRequests] = useState<Partial<User>[]>();
    
    useEffect(() => {
        axios.get(`${BASE_URL}/api/user/requests`, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })
        .then(response => {
            const data = response.data;
            setFollowRequests(data.users);
        })
        .catch(error => {
            console.log(error);
            alert('Trouble contacting server');
        });
    }, []);

	return (
        <div className="requestContainer">
            You have requests from the following users:
            {followRequests?.map(usr => 
            <div className="request" key={usr._id}>
                <p>{usr.username}</p>
                <AcceptFollowButton />
                <RejectFollowButton />
            </div>)}
        </div>
    );
};

export default FollowRequests;
