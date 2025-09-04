import axios from "axios";
import { useEffect, useState } from "react";

interface Note {
    title: string;
    noteBody: string;
    _id: string;
}

interface User {
    username: string;
    email: string;
    notes: Note[];
}

const Dashboard = () => {
    const [refresh, setrefresh] = useState(true);
    const [user, setuser] = useState<User | null>(null);

    const [noteTitle, setnoteTitle] = useState("");

    const [noteBody, setnoteBody] = useState("");
    useEffect(() => {
        async function getuser() {
            const getUserDetail = await axios.get<{ user: User }>(
                "http://localhost:4000/api/v1/user/",
                { withCredentials: true }
            );

            setuser(getUserDetail.data.user);
            console.log(getUserDetail.data.user);
        }
        getuser();
    }, [refresh]);

    const createNote = () => {};

    const submitHandler = async () => {
        await axios.post(
            "http://localhost:4000/api/v1/note/create",
            { title: noteTitle, noteBody },
            { withCredentials: true }
        );

        setnoteTitle("");
        setnoteBody("");
        setrefresh((prev) => !prev);
    };

    const deleteNote = async (e: string) => {
        await axios.delete(`http://localhost:4000/api/v1/note/delete/${e}`, {
            withCredentials: true,
        });

        setnoteTitle("");
        setnoteBody("");
        setrefresh((prev) => !prev);
    };

    return (
        <div className="w-full h-screen p-10 md:p-10 md:pr-40 md:pl-40  flex flex-col gap-10">
            <div className="flex justify-between items-center">
                <span className="flex justify-center items-center">
                    <img
                        src="./icon4x.png"
                        alt=""
                        className="w-6 h-6 md:w-10 md:h-10 mr-6 md:mr-10"
                    />
                    <h1 className="text-2xl md:text-4xl">Dashboard</h1>
                </span>

                <a
                    href="#"
                    className="text-xl md:text-2xl text-[#367AFF]"
                >
                    <u>
                        <b>Sign Out</b>
                    </u>
                </a>
            </div>
            <div className="flex justify-center flex-grow gap-5">
                <div className="flex p-5 md:p-10 box-border justify-center shadow-[4px_4px_5px_5px_rgba(200,200,200)] rounded-xl md:rounded-3xl flex-col">
                    <div className="h-40">
                        <div className="text-2xl">
                            Welcome, {user?.username} !
                        </div>
                        <div className="text-1xl mb-4 text-gray-700">
                            Email: {user?.email.substring(0, 5)}xxxxxxxx@
                            {user?.email.split("@")[1]}
                        </div>
                        <button
                            className="w-80 h-12 md:w-[40vh] md:h-14 rounded-xl bg-[#367AFF] text-white"
                            onClick={createNote}
                        >
                            Create notes
                        </button>
                    </div>
                    <b className="text-4xl mb-4">Notes</b>
                    <div className="flex-1 ">
                        {user?.notes.map((item, index) => (
                            <div
                                key={index}
                                className="w-80 h-12 md:w-[40vh] md:h-14 rounded-xl shadow-[2px_2px_5px_2px_rgba(200,200,200)] flex items-center justify-between p-5"
                            >
                                <span className="text-lg">{item?.title}</span>
                                <span className="hover:cursor-pointer">
                                    <img
                                        src="./Vector.png"
                                        alt=""
                                        className="w-5 h-5"
                                        onClick={() => deleteNote(item._id)}
                                    />
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="hidden md:flex flex-1 flex-col items-center justify-center w-full h-full  pr-10 pl-10 gap-5">
                    <input
                        value={noteTitle}
                        onChange={(e) => setnoteTitle(e.target.value)}
                        type="text"
                        placeholder="Name of note"
                        className="w-full h-16 shadow-[2px_2px_5px_5px_rgba(200,200,200)] resize-none rounded-xl p-5 box-border text-2xl"
                    />
                    <textarea
                        value={noteBody}
                        onChange={(e) => setnoteBody(e.target.value)}
                        name=""
                        id=""
                        className="w-full h-full shadow-[2px_2px_5px_5px_rgba(200,200,200)] resize-none rounded-2xl p-5"
                    ></textarea>
                    <button
                        className="w-96 h-16 rounded-xl bg-[#367AFF] text-white"
                        onClick={submitHandler}
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
