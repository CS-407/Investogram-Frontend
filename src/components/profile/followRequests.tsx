'use client';

import { User } from "@/util/types";
import React, { useEffect, useState } from "react";
import AcceptFollowButton from "../acceptFollowButton";
import RejectFollowButton from "../rejectFollowButton";

import "./requestStyles.css";

const FollowRequests = () => {
    const [followRequests, setFollowRequests] = useState<Partial<User>[]>();
    
    useEffect(() => {
        fetch("http://localhost:8080/api/user/requests", {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        }).then(res => {
            return res.json();
        }).then(data => {
            setFollowRequests(data.users);
        }).catch(err => {
            console.log(err);
            alert('Trouble contacting server');
        })
    }, []);

	return (
        <div className="requestContainer">
            You have requests from the following users:
            {followRequests?.map(usr => 
            <div className="request" key={usr._id}>
                <p>{usr.username}</p>
                <AcceptFollowButton otherUser={usr._id!}/>
                <RejectFollowButton otherUser={usr._id!}/>
            </div>)}
        </div>
    );
};

export default FollowRequests;
