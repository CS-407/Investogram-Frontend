'use client';

import AuthContext from "@/context/AuthContext";
import { useContext } from "react";
import { FollowButtonProps } from "./acceptFollowButton";

export default function RejectFollowButton(props: FollowButtonProps) {

    const otherUser = props.otherUser;

    const rejectUser = () => {
        fetch(`http://localhost:8080/api/user/follow/reject/${otherUser}/`, {
            method: 'POST',
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token"),
                'Content-Type': 'application/json',
            }
        }
        )
        .then(res => res.json())
        .then(data => {
            if (data.msg === "Success") {
                console.log("Success")
                console.log(data)
            } else {
                console.log("Error")
                console.log(data)
            }
        });
    }

  return (
    <button 
        className="flex items-center justify-center px-2 py-1 mx-1 text-base font-medium leading-6 text-white whitespace-no-wrap bg-red-500 border-2 border-transparent rounded-lg shadow-sm hover:bg-transparent hover:text-red-500 hover:border-red-500 focus:outline-none"
        onClick={() => rejectUser()}>
        Reject
    </button>
  )
}

