import axios from "axios";
import React, { useState } from "react";

const NewPost = () => {
	const [content, setContent] = useState<string>("");

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContent(e.target.value);
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        axios.post("/api/blog", { content }).then(() => {
            alert("Post created");
            setContent("");
        }).catch((err: any) => alert(err));
    }

	return (
		<div>
			<h1>New Post</h1>
            <form onSubmit={handleSubmit}>
                <textarea value={content} onChange={handleChange} />
                <button type="submit">Create</button>
            </form>
		</div>
	);
};

export default NewPost;
