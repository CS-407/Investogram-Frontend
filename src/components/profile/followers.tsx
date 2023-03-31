'use client';

import { useEffect, useState } from "react"

export default function Followers() {

    const mockId = "6424c3da3ae556bf5f740e43"

    const [followers, setFollowers] = useState([])

    useEffect(() => {
        fetch(`http://localhost:5000/api/user/followers/${mockId}`)
        .then(res => res.json())
        .then(data => {
            if (data.msg === "Success") {
                let followers = data.data
                //console.log(price);
                setFollowers(data.data)
            } else {
                console.log("Error")
                console.log(data)
            }
        })
    },[])


    return (
        <div>
            <div className='font-semibold text-lg'>Followers:</div>
            {followers.map((followersObj) => 
                <div key={followersObj._id}>{followersObj.followers_list}</div>
            )
            }
        </div>
    )

}