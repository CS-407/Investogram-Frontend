'use client';

import React, { useState } from "react";
import axios from "axios";
import { User } from "@/util/types";
const currentUser = '6423aca17506151eaa626245';

export default function DeleteButton() {

const executeDelete = async () => {
    console.log("Check executeDelete");
    fetch('http://localhost:5000/api/user/deleteAcc', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            user_id: currentUser
        })
    })
    .then(res => res.json())
    .then(data => {
        console.log(data)
        if (data.msg === "Success") {
            setDeleteSucess(true);
        } else {
            setDeleteFail(true);
        }
        executeResult();
    })
};

function VisibleButton() {
    return (
        <div className='flex-col py-2 px-2'>
                        <button 
                        className="flex-row items-center justify-center px-4 py-2 text-2xl font-semibold leading-6 text-white whitespace-no-wrap bg-green-500 border-2 border-transparent rounded-full shadow-sm hover:bg-transparent hover:text-green-500 hover:border-green-500 focus:outline-none"
                        onClick={
                            () => {
                                console.log("Delete Account")
                                executeDelete();
                            }
                        }
                        >
                            <div className='flex justify-center'>
                                Delete
                            </div>
                        </button>
                        
        </div>
    )
}


const [deleteSucess, setDeleteSucess] = useState(false);
const [deleteFail, setDeleteFail] = useState(false);

const executeResult = async() => {
    if (deleteSucess) {
        return (
            <div className="inline-block border-solid rounded-md border-2 bg-green-500 align-middle text-center">
                <div className='text-lg font-bold text-white p-2'>Delete Success</div>
            </div>
        )
    } else {
        return (
            <div className="inline-block border-solid rounded-md border-2 bg-green-500 align-middle text-center">
            <div className='text-lg font-bold text-white p-2'>Delete Fail</div>
        </div>
        )
    }
}
    return (
        <main>
            <VisibleButton />
        </main>
    )
};