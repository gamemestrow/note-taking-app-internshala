import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signOutUserFunction } from "../utils/function";

interface Note {
    title: string;
    noteBody: string;
    _id: string;
}

const ViewNotesPage = () => {
    const navigate = useNavigate();

    const [note, setnote] = useState<Note | null>(null);
    useEffect(() => {
        async function getuser() {
            const id = localStorage.getItem("inViewNote");
            const getNoteDetail = await axios.get<{ notes: Note }>(
                `http://localhost:4000/api/v1/note/readnotes/${id}`,
                { withCredentials: true }
            );

            setnote(getNoteDetail.data.notes);
        }

        getuser();
    }, []);

    return (
        <div className="w-full h-screen p-10 md:p-10 md:pr-40 md:pl-40  flex flex-col gap-10 ">
            <div>
                <div className="flex justify-between items-center mb-10">
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
                        <u
                            className="pr-10"
                            onClick={() => {
                                localStorage.removeItem("inViewNote");
                                navigate("/");
                            }}
                        >
                            <b>Back</b>
                        </u>
                        <u
                            onClick={() => {
                                signOutUserFunction();
                                navigate("/signin");
                            }}
                        >
                            <b>Sign Out</b>
                        </u>
                    </a>
                </div>
                <div className="text-2xl md:text-5xl mb-5">
                    <b>
                        <i>{note?.title}</i>
                    </b>
                </div>
                <div className="text-1xl md:text-2xl ">{note?.noteBody}</div>
            </div>
        </div>
    );
};

export default ViewNotesPage;
