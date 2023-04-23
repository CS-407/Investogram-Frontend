'use client';
import AuthContext from "@/context/AuthContext";
import { useContext, useState } from "react";

export default function ChangeProfilePic() {
    const { user } = useContext(AuthContext);

    const otherOptions = () => {
        let out = Array.from(Array(4), (_, index) => index + 1);
        out = out.filter((x) => x !== selected);
        return out;
    }

	const setPic = user?.profile_pic || 1;
	const [selected, setSelected] = useState<number>(setPic);
	const differentChoice = () => {
		if (selected === setPic) return false;
		return true;
	}
	const resetSelection = () => setSelected(setPic);

    
	return (
		<main className="p-5 bg-white">
			<div className="flex-none flex justify-center items-center flex-col rounded-lg shadow-lg bg-investogram_yellow py-4 text-investogram_navy">
				<h1 className="text-3xl font-bold underline">
					Customize your profile picture!
				</h1>
				<div className="flex flex-row">
					<div className="inline-block text-center px-4">
						<h1 className="text-lg font-bold mx-2">Current Profile Picture:</h1>
						<img
							src={user ? `/images/avatar_${setPic}.png` : "/images/default_profile.jpg"}
							alt={`${user?.username}'s avatar`}
							className="flex-center rounded-full object-cover h-36 w-36 mx-auto"
						/>
					</div>
					<div className="text-center px-4">
						<h1 className="text-lg font-bold mx-2">New Profile Picture:</h1>
						<img
							src={user ? `/images/avatar_${selected}.png` : "/images/default_profile.jpg"}
							alt={`${user?.username}'s avatar`}
							className="flex-center rounded-full object-cover h-36 w-36 mx-auto"
						/>
					</div>

				</div>
                
				<div>
					<h2 className="text-xl font-bold text-center">Other options:</h2>
					<div className="flex flex-row">
						{otherOptions().map((x) => {
							return (
								<button 
									className="text-center px-2 font-bold hover:bg-blue-50 p-1 rounded-lg"
									onClick={() => setSelected(x)}
								>
									<img
										src={user ? `/images/avatar_${x}.png` : "/images/default_profile.jpg"}
										alt={`${user?.username}'s avatar`}
										className="flex-center rounded-full object-cover h-36 w-36 mx-auto"
									/>
									Option {x}
								</button>
							)
						})}
					</div>
				</div>
				<div className="flex flex-row py-2">
					<button
						className="flex items-center justify-center mx-2 px-2 py-1 text-base font-medium leading-6 text-white whitespace-no-wrap enabled:bg-black border-2 border-transparent rounded-full shadow-sm hover:bg-transparent disabled:bg-gray-400 disabled enabled:hover:text-black enabled:hover:border-black enabled:hover:bg-white focus:outline-none"
						disabled={!differentChoice()}
					>
						Save Choice
					</button>
					<button
						className="flex items-center justify-center mx-2 px-2 py-1 text-base font-medium leading-6 text-white whitespace-no-wrap enabled:bg-black border-2 border-transparent rounded-full shadow-sm hover:bg-transparent disabled:bg-gray-400 disabled enabled:hover:text-black enabled:hover:border-black enabled:hover:bg-white focus:outline-none"
						disabled={!differentChoice()}
						onClick={resetSelection}
					>
						Cancel
					</button>
				</div>
			</div>
		</main>
	);
}