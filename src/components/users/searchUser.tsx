'use client';

import React, { useEffect, useState } from "react";

import { User } from '../../util/types';

const SearchUser = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [filteredUsers, setFilteredUsers] = useState<User[]>([]);

    useEffect(() => {
<<<<<<< Updated upstream
        fetch('http://localhost:3000/api/stocks').then(res => {
=======
        fetch('http://localhost:8080/api/global/users').then(res => {
>>>>>>> Stashed changes
            return res.json();
        }).then(data => {
            setUsers(data);
            setFilteredUsers(data);
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
				usr.username.toLowerCase().startsWith(filter)
			);

			setFilteredUsers(tmp);
		}
	};

	return (
        <div>
            <input placeholder="Search for Users" onChange={handleFilter}></input>
            <div>
                {filteredUsers.map((user: User) => (
                    <div>
                        {user.username}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SearchUser;
