'use client'

interface Fields {
    password: string;
}
import React, { useContext, useState } from "react";
import axios from "axios";
import AuthContext from "@/context/AuthContext";
import { BASE_URL } from "@/util/globals";

import { useRouter } from "next/navigation";

export default function upvoteButton() {
    function VisibleButton() {
        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const { name, value } = e.target;
        };

        const handleSubmit = (e: React.FormEvent) => {
            e.preventDefault();
        };

        return (
            <div className="flex-col py-2 px-2">
                <h1>Delete Account</h1>
                <div className="ui divider"></div>
                <div className="ui form">
                    <div className="form">
                        <label className="block font-bold mb-2">User password</label>
                        <input
                            type="text"
                            name="password"
                            placeholder="Verify password"
                            className="border w-full py-2 px-3 text-gray-700 mb-3"
                            onChange={handleChange}
                        />
                    </div>
                    <button
                        className="flex-row items-center justify-center px-4 py-2 text-2xl font-semibold leading-6 text-white whitespace-no-wrap bg-green-500 border-2 border-transparent rounded-full shadow-sm hover:bg-transparent hover:text-green-500 hover:border-green-500 focus:outline-none"
                        onClick={() => {
                            console.log("Delete Account");
                            executeUpvote();
                        }}
                    >
                        <div className="flex justify-center">Delete</div>
                    </button>
                </div>
            </div>
        );
    }
}