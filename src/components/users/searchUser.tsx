'use client';

import { BASE_URL } from "@/util/globals";
import Link from "next/link";
import React, { useEffect, useState } from "react";

import { User } from '../../util/types';
import "./userStyles.css";

const SearchUser = () => {
    const [users, setUsers] = useState<Partial<User>[]>([]);
    const [filteredUsers, setFilteredUsers] = useState<Partial<User>[]>([]);

    useEffect(() => {
        fetch(`${BASE_URL}/api/global/users`).then(res => {
            return res.json();
        }).then(data => {
            setUsers(data.users);
            setFilteredUsers(data.users);
        }).catch(err => {
            alert('Trouble Contacting Server');
            console.log(err);
        })
    }, []);

    const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.value.length == 0) {
			setFilteredUsers(users);
		} else {
			const filter = e.target.value.toLowerCase();
			const tmp = users.filter((usr) =>
				usr.username?.toLowerCase().startsWith(filter)
			);

			setFilteredUsers(tmp);
		}
	};

	return (
        <div>
            <input className="searchBar" placeholder="Search for Users" onChange={handleFilter}></input>
            <div className="grid">
                {filteredUsers.map((user: Partial<User>) => (
                    <div className="card" key={user._id}>
                        <p className="username">{user.username}</p>
                        <Link href={`/user/${user._id}`}>Visit Profile</Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SearchUser;
