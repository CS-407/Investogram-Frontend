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

		axios
			.post(`${BASE_URL}/api/blog`, { content }, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            })
			.then(() => {
				alert("Post created");
				setContent("");
			})
			.catch((err: any) => {
				if (err.response && err.response.data && err.response.data.msg) {
					alert(err.response.data.msg);
				} else {
					alert("Trouble contacting server");
				}
			});
	};

	return (
		<div className="flex h-1/3 bg-gray-800">
  <div className="m-auto rounded-lg p-6 text-center w-auto max-w-xl bg-gray-800">
    <h1 className="text-2xl mb-4 font-bold">New Post</h1>
    <form className="h-2/3" onSubmit={handleSubmit}>
      <textarea
        className="block w-auto p-1 text-sm text-gray-900 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 h-full resize-none"
        placeholder="Share your thoughts here..."
        value={content}
        onChange={handleChange}
      />
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded m-3 transition-colors duration-300 ease-in-out"
        type="submit"
      >
        Create
      </button>
    </form>
  </div>
</div>

	);
};

export default NewPost;
