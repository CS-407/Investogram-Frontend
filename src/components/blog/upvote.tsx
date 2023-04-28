'use client'

interface Fields {
    password: string;
}
import React, { useContext, useState } from "react";
import axios from "axios";
import AuthContext from "@/context/AuthContext";
import { BASE_URL } from "@/util/globals";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

const UpvoteButton = (props: React.PropsWithChildren<{ upvoteBlog: (like: number) => void }>) => {
    const [like, setLike] = useState(1),
        [isLike, setisLike] = useState(true);
    const [hasliked, setHasliked] = useState(false);

    const params = usePathname();
    const pid = params ? params.split("/")[2] : "";

    const handleChange = () => {
        setLike(isLike ? -1 : 1);
        setisLike(!isLike);
        props.upvoteBlog(like);
    };

    const checkLiked = () => {
        axios
            .get(`${BASE_URL}/api/blog/hasliked/${pid}`, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            })
            .then((res) => {
                console.log(res.data.isLiked);
                setHasliked(res.data.isLiked);
            })
            .catch((err) => {
                if (err.response && err.response.data && err.response.data.msg) {
                    console.log(err.response.data.msg);
                } else {
                    console.log("Trouble contacting server");
                }
            });
    };
    return (
        <div className="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
            <button type="button" className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-green-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-500"
                onClick={handleChange}>
                    {isLike ? "Unlike" : "Like"}
            </button>
        </div>
    )
}

// instead of Like = {like}, do Like = {calcNumlikes}, so it calculates new number everytime
export default UpvoteButton;