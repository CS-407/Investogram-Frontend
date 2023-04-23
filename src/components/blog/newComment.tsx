'use client';

import React, { useState } from "react";

const newComment = (props: React.PropsWithChildren<{ addComment: (comment: string) => void }>) => {
	const [comment, setComment] = useState<string>('');

	const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setComment(e.target.value);
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
        
        props.addComment(comment);
        setComment('');
	};

	return (
		<form onSubmit={handleSubmit} className="m-2">
			<div className="m-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
				<div className="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
					<textarea
						rows={4}
						className="block w-full p-2 text-sm text-gray-800 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
						placeholder="Write a comment..."
						required
                        onChange={handleChange}
					></textarea>
				</div>
				<div className="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
					<button
						type="submit"
						className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-500"
					>
						Post comment
					</button>
				</div>
			</div>
		</form>
	);
};

export default newComment;
