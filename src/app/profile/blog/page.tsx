"use client";

import { BASE_URL } from "@/util/globals";
import { Post } from "@/util/types";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Blog = () => {
    const [blogPosts, setBlogPosts] = useState<Post[]>();
	
    useEffect(() => {
        axios.get(`${BASE_URL}/api/blog/`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then((response) => {
            console.log(response.data);
            setBlogPosts(response.data.posts);
        }).catch((error) => {
            console.log(error);
        });
    }, []);
	
    return <div>Blog Page</div>;
};

export default Blog;
