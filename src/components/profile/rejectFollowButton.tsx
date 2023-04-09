'use client';
import { BASE_URL } from '../../util/globals';
import { FollowButtonProps } from './acceptFollowButton';

export default function RejectFollowButton(props: FollowButtonProps) {
    
    const otherUser = props.otherUser;

    const rejectUser = () => {
        console.log("Reject user")
        fetch(`${BASE_URL}/api/user/follow/${otherUser}`, {
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
        className="flex items-center justify-center px-2 py-1 mx-1 text-base font-medium leading-6 text-white whitespace-no-wrap bg-red-500 border-2 border-transparent rounded-lg shadow-sm hover:bg-transparent hover:text-red-500 hover:border-red-500 focus:outline-none"
        onClick={() => rejectUser()}>
        Reject
    </button>
  )
}

