"use client";

import { BASE_URL } from "@/util/globals";
import { Post } from "@/util/types";
import axios from "axios";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

import NewComment from "@/components/blog/newComment";

const initialPost: Post = {
	_id: "64416b0d14cac46eff9fde61",
	user_id: "642493784def0c7b76c40167",
	type: "Experience",
	content:
		"I joined this site a few days back and have had a great time so far! Although I definitely need to get better to figuring out when and how much money to invest. Additionally, it looks like stocks are fluctuating a lot due to the current economic siege.",
	likes: 0,
	timestamp: 0,
	comments: [],
};

const page = () => {
	const [post, setPost] = useState<Post>(initialPost);

	const params = usePathname();
	const pid = params ? params.split("/")[2] : "";

	// useEffect(() => {
	// 	axios
	// 		.get(`${BASE_URL}/api/blog/${pid}`)
	// 		.then((res) => {
	// 			console.log(res.data);
	// 		})
	// 		.catch((err) => {
	// 			if (err.response && err.response.data && err.response.data.msg) {
	// 				console.log(err.response.data.msg);
	// 			} else {
	// 				console.log("Trouble contacting server");
	// 			}
	// 		});
	// }, []);

	const addComment = (comment: string) => {
		axios
			.post(
				`${BASE_URL}/api/blog/${pid}/comment`,
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
		<div>
			<h1>{post.timestamp}</h1>
			<p>{post.content}</p>
			<NewComment addComment={addComment} />
		</div>
	);
};

export default page;
