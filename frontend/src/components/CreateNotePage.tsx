import React from "react";

interface CreateNotePageProps {
  noteTitle: string;
  setnoteTitle: React.Dispatch<React.SetStateAction<string>>;
  noteBody: string;
  setnoteBody: React.Dispatch<React.SetStateAction<string>>;
   submitHandler: () => void; 
}


const CreateNotePage = ({noteTitle, setnoteTitle, noteBody, setnoteBody, submitHandler}: CreateNotePageProps) => {
    return (
        <div>
            <div className="flex md:hidden flex-col gap-10 w-full h-screen p-10 md:p-10 md:pr-40 md:pl-40 ">
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
    );
};

export default CreateNotePage;
