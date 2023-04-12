"use client";

import { BASE_URL } from "@/util/globals";
import axios from "axios";
import React, { useState } from "react";

const NewPost = () => {
	const [content, setContent] = useState<string>("");

	const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setContent(e.target.value);
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		
        axios.post(`${BASE_URL}/api/blog`, {
            content: content
        } ,{
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then((response) => {
            console.log(response.data.msg);
            alert("Post created successfully");
            setContent("");
        }
        ).catch((err) => {
            if (err.response && err.response.data && err.response.data.msg) {
                alert(err.response.data.msg);
            } else {
                alert("Trouble Contacting Server");
            }
        });
	};

	return (
		<div className="flex w-80">
			<form className="m-5 w-full bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 text-center" onSubmit={handleSubmit}>
				<textarea className="block border rounded w-full py-2 px-3 text-gray-700 mb-4 focus:shadow-outline" placeholder="Write about your experience" />
				<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">Submit</button>
			</form>
		</div>
	);
};

export default NewPost;
