'use client';
export interface FollowButtonProps {
    otherUser: string;
    updateStatus: Function;
}

export default function AcceptFollowButton(props: FollowButtonProps) {

    const otherUser = props.otherUser;

    const followUser = () => {
        fetch(`http://localhost:8080/api/user/follow/accept/${otherUser}`, {
            method: 'POST',
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token"),
                'Content-Type': 'application/json',
            }
        }
        )
        .then(res => res.json())
        .then(data => {
            if (data.msg === "Success") {
                props.updateStatus(otherUser, true)
                console.log("Success")
                console.log(data)
            } else {
                props.updateStatus(otherUser, false)
                console.log("Error")
                console.log(data)
            }
        });
    }

  return (
    <button 
        className="flex items-center justify-center px-2 py-1 mx-1 text-base font-medium leading-6 text-white whitespace-no-wrap bg-green-500 border-2 border-transparent rounded-lg shadow-sm hover:bg-transparent hover:text-green-500 hover:border-green-500 focus:outline-none"
        onClick={() => followUser()}>
        Accept
    </button>
  )
}

