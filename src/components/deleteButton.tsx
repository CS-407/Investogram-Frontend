'use client';

import React, { useContext, useState } from "react";
import axios from "axios";
import { User } from "@/util/types";
import AuthContext from "@/context/AuthContext";

//const { logout } = useContext(AuthContext);
import { useRouter } from "next/navigation";


const currentUser = '6425f46907ef6e8dc68ceb06';

export default function DeleteButton() {

const router = useRouter();

const executeDelete = async (password: string) => {
    fetch('http://localhost:5000/api/user/deleteAcc', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            user_id: currentUser,
            password: password
        })
    })
    .then(res => res.json())
    .then(data => {
        if (data.msg === "Success") {
            setDeleteSucess(true);
            router.push("/auth/login");
        } else {
            setDeleteFail(true);
        }
        //logout();
    })
};

interface Fields {
	password: string;
}

function VisibleButton() {
    const initialValues: Fields = { password: "" };

	const [formValues, setFormValues] = useState<Fields>(initialValues);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormValues({ ...formValues, [name]: value });
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
	};
    return (
        <div className='flex-col py-2 px-2'>
				<h1>Reset Username</h1>
				<div className="ui divider"></div>
					<div className="ui form">
						<div className="form">
							<label>User password</label>
							<input
								type="text"
								name="password"
								placeholder="Verify password"
								value={formValues.password}
								onChange={handleChange}
							/>
						</div>
                        <button 
                        className="flex-row items-center justify-center px-4 py-2 text-2xl font-semibold leading-6 text-white whitespace-no-wrap bg-green-500 border-2 border-transparent rounded-full shadow-sm hover:bg-transparent hover:text-green-500 hover:border-green-500 focus:outline-none"
                        onClick={
                            () => {
                                console.log("Delete Account");
                                executeDelete(formValues.password);
                            }
                        }
                        >
                            <div className='flex justify-center'>
                                Delete
                            </div>
                        </button>   
				</div>           
        </div>
    )
}


const [deleteSucess, setDeleteSucess] = useState(false);
const [deleteFail, setDeleteFail] = useState(false);

    return (
        <main>
            <VisibleButton />
            <div className="inline-block border-solid rounded-md border-2 bg-green-500 align-middle text-center">
            <div className='text-lg font-bold text-white p-2'>
                {
                    deleteSucess && 'Delete Success'
                }
                {
                    deleteFail && 'Delete Fail'
                }
            </div>
        </div>
        </main>
        
    )
};