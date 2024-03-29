"use client";

import { BASE_URL } from "@/util/globals";
import { dateConverter, dateToString } from "@/util/HelperFunctions";
import { Post } from "@/util/types";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const page = () => {
	const [blogPosts, setBlogPosts] = useState<Post[]>([]);

	useEffect(() => {
		axios
			.get(`${BASE_URL}/api/blog`, {
				headers: {
					Authorization: "Bearer " + localStorage.getItem("token"),
				},
			})
			.then((res) => {
				console.log(res.data.posts);
				setBlogPosts(res.data.posts);
			})
			.catch((err) => {
				if (err.response && err.response.data && err.response.data.msg) {
					console.log(err.response.data.msg);
				} else {
					console.log("Trouble contacting server");
				}
			});
	}, []);

	return (
		<main className="p-5">
			<div className="flex-none flex justify-center items-center flex-col rounded-lg shadow-lg bg-investogram_yellow py-4 text-investogram_navy">
				<h1 className="text-5xl font-bold mt-4 mb-4">InvestoBlog</h1>
				<p className="text-investogram_navy">
					Click on a post to see the discussion or create a new post here!
				</p>
			</div>

		<div className="flex flex-col align-middle">
			<div className="flex flex-row p-5">
							<Link href={"/blog/new"}>
								<button className="flex items-center justify-center px-4 py-2 text-base font-medium leading-6 text-white bg-black border border-transparent rounded-full shadow-sm hover:bg-transparent hover:text-black hover:border-black focus:outline-none">
									Create New Post
								</button>
							</Link>
						</div>
			{blogPosts.map((post) => (
				<div
					key={post._id}
					className="mt-4 ml-4 mr-4 p-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600"
				>
					<p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-bold">
						Posted on {dateToString(dateConverter(post.timestamp))}
					</p>
					<p className="truncate">{post.content}</p>
					<Link href={`/blog/${post._id}`}>
						<p className="inline-block bg-fuchsia-400 hover:bg-fuchsia-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mt-2">
							Visit Blog Page
						</p>
					</Link>
				</div>
			))}
		</div>
		</main>
	);
};

export default page;
