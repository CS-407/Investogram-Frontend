'use client';

import { useEffect, useState } from "react"

export default function Followers() {

    const mockId = "6424c3da3ae556bf5f740e43"

    const [followers, setFollowers] = useState([])

    useEffect(() => {
        fetch(`http://localhost:5000/api/user/followers/${mockId}`)
        .then(res => res.json())
        .then(data => {
                let followers = data.followers
                //console.log(price);
                setFollowers(data.followers)
        }).catch(err => {
            console.log("Error");
            console.log(err);
        })
    },[])


    return (
        <div>
            <div className='font-semibold text-lg'>Followers:</div>
            {followers.map((followersObj) => 
                <div key={followersObj._id}>{followersObj.username}</div>
            )
            }
        </div>
    )

}