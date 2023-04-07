'use client';

import { useEffect, useState } from "react"

export default function Followees() {

    const mockId = "642493784def0c7b76c40167"

    const [followees, setFollowees] = useState([])

    useEffect(() => {
        fetch(`http://localhost:5000/api/user/followees/${mockId}`)
        .then(res => res.json())
        .then(data => {
            if (data.msg === "Success") {
                let followers = data.data
                //console.log(price);
                setFollowees(data.data)
            } else {
                console.log("Error")
                console.log(data)
            }
        })
    },[])


    return (
        <div>
            <div className='font-semibold text-lg'>Followees:</div>
            {followees.map((followeesObj) => 
                <div key={followeesObj._id}>{followeesObj.following_list}</div>
            )
            }
        </div>
    )

}