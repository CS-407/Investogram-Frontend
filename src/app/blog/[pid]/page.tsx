"use client";

import { BASE_URL } from "@/util/globals";
import { Post } from "@/util/types";
import axios from "axios";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

import NewComment from "@/components/blog/newComment";
import { dateConverter, dateToString } from "@/util/HelperFunctions";

const initialPost: Post = {
	_id: "64416b0d14cac46eff9fde61",
	user_id: "642493784def0c7b76c40167",
	type: "Experience",
	content: "",
	likes: 0,
	timestamp: 0,
	comments: []
};

const page = () => {
	const [post, setPost] = useState<Post>(initialPost);

	const params = usePathname();
	const pid = params ? params.split("/")[2] : "";

	useEffect(() => {
		axios
			.get(`${BASE_URL}/api/blog/${pid}`, {
				headers: {
					'Authorization': 'Bearer ' + localStorage.getItem('token')
				}
			})
			.then((res) => {
				console.log(res.data.post);
				setPost(res.data.post);
			})
			.catch((err) => {
				if (err.response && err.response.data && err.response.data.msg) {
					console.log(err.response.data.msg);
				} else {
					console.log("Trouble contacting server");
				}
			});
	}, []);

	const addComment = (comment: string) => {
		axios
			.post(
				`${BASE_URL}/api/blog/comment/${pid}`,
				{
					content: comment,
				},
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: "Bearer " + localStorage.getItem("token"),
					},
				}
			)
			.then((res) => {
				setPost({ ...post, comments: [res.data.comment, ...post.comments] });
			})
			.catch((err) => {
				if (err.response && err.response.data && err.response.data.msg) {
					alert(err.response.data.msg);
				} else {
					alert("Trouble contacting server");
				}
			});
	};

	return (
		<div className="p-4">
			{/* Blog Content */}
			<div className="m-4">
				<h1 className="text-sm text-gray-800 font-bold mb-2">Posted on July 23, 2022</h1>
				<p className="">{post.content}</p>
			</div>

			{/* List of comments */}
			<div className="mt-4 flex flex-col">
				{post.comments.map((comment) => (
					<div className="p-6 mb-2 ml-2 mr-2 text-base bg-gray-50 rounded-lg dark:bg-gray-900">
						<footer className="flex justify-between items-center mb-2">
							<div className="flex items-center">
								<p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-bold">
									{comment.user_id.username}
								</p>
								<p className="text-sm text-gray-400 dark:text-gray-400">
									<time>{dateToString(dateConverter(comment.timestamp))}</time>
								</p>
							</div>
						</footer>
						<p className="text-gray-500 dark:text-gray-400">
							{comment.content}
						</p>
					</div>
				))}
			</div>

			{/* Form to add a new comment */}
			<NewComment addComment={addComment} />
		</div>
	);
};

export default page;
