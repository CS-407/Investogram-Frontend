"use client";

import { BASE_URL } from "@/util/globals";
import { Post } from "@/util/types";
import axios from "axios";
import { usePathname } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";

import NewComment from "@/components/blog/newComment";
import { dateConverter, dateToString } from "@/util/HelperFunctions";
import AuthContext from "@/context/AuthContext";

const initialPost: Post = {
	_id: "64416b0d14cac46eff9fde61",
	user_id: {
		_id: "64416b0d14cac46eff9fde61",
		username: "test",
	},
	type: "Experience",
	content: "",
	likes: 0,
	timestamp: 0,
	comments: [],
	userlikes: [],
};

const page = () => {
	const [post, setPost] = useState<Post>(initialPost);
	const [isLiked, setIsLiked] = useState(false);

	const { user } = useContext(AuthContext);

	const params = usePathname();
	const pid = params ? params.split("/")[2] : "";

	useEffect(() => {
		axios
			.get(`${BASE_URL}/api/blog/${pid}`, {
				headers: {
					Authorization: "Bearer " + localStorage.getItem("token"),
				},
			})
			.then((res) => {
				setPost(res.data.post);

				const likes_array: string[] = res.data.post.userlikes;
				if (user) {
					likes_array.includes(user._id) ? setIsLiked(true) : setIsLiked(false);
				}
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

	const upvoteBlog = () => {
		axios
			.post(
				`${BASE_URL}/api/blog/like/${pid}`,
				{},
				{
					headers: {
						Authorization: "Bearer " + localStorage.getItem("token"),
					},
				}
			)
			.then((res) => {
				setPost({ ...post, likes: res.data.like });
				setIsLiked(!isLiked);
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
				<h1 className="text-sm text-gray-800 font-bold mb-2">
					Posted by{" "}
					<p className="inline bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 ml-1 mr-2">
						{post.user_id.username}
					</p>{" "}
					on {dateToString(dateConverter(post.timestamp))}
				</h1>
				<p className="text-2xl font-semibold p-5">{post.content}</p>
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
			
			<div className="flex items-center justify-space-around px-3 py-2 dark:border-gray-600">
			<div className="inline bg-blue-100 px-2 py-1 rounded-full m-3">{post.likes} likes</div>
				<button
					type="button"
					className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-green-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-500"
					onClick={upvoteBlog}
				>
					{isLiked ? "Unlike" : "Like"}
				</button>
			</div>
			<NewComment addComment={addComment} />
			
		</div>
	);
};

export default page;
