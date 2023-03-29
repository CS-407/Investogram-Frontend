'use client';

export default function AcceptFollowButton() {

    const mockUser = {
        id: '63e8451d540fd8c730cb98b4'
    }

    const followUser = () => {
        console.log("Follow user")
        /*
        fetch(`http://localhost:8080/api/user/follow/${mockUser.id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        }
        )
        .then(res => res.json())
        .then(data => {
            if (data.msg === "Success") {
                console.log("Success")
                console.log(data)
            } else {
                console.log("Error")
                console.log(data)
            }
        });
        */
    }

  return (
    <button 
        className="flex items-center justify-center px-2 py-1 mx-1 text-base font-medium leading-6 text-white whitespace-no-wrap bg-green-500 border-2 border-transparent rounded-lg shadow-sm hover:bg-transparent hover:text-green-500 hover:border-green-500 focus:outline-none"
        onClick={() => followUser()}>
        Accept
    </button>
  )
}

