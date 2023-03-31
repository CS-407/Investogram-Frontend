"use client";

import { User } from '@/util/types';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const User = () => {
    const [user, setUser] = useState<User>();

    const params = usePathname();
    const uid = params ? params.split("/")[2] : "";

    useEffect(() => {
        fetch("http://localhost:8080/api/global/user/" + uid).then(res => {
            return res.json();
        }).then(data => {
            setUser(data.user);
        }).catch(err => {
            console.log(err);
            alert('Trouble Contacting Server');
        })
    }, []);

    const handleFollowRequest = () => {
        fetch("http://localhost:8080/api/user/follow/" + uid, {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        }).then(res => {
            if (res.status == 200) {
                alert("Follow Request Sent Successfully");
            } else {
                return res.json();
            }
        }).then(data => {
            alert(data.msg);
        }).catch(err => {
            console.log(err);
            alert("Trouble Contacting Server");
        })
    }

    return (
        <div>
            <p>Username: {user?.username}</p>
            <p>Email: {user?.email}</p>
            <button onClick={handleFollowRequest}>Send Follow Request</button>
        </div>
    )
}

export default User;