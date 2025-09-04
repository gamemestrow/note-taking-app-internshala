import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
    const [getOpt, setgetOpt] = useState(false);
    const [username, setusername] = useState("");
    const [dateOfBirth, setdateOfBirth] = useState("");
    const [email, setemail] = useState("");
    const [otp, setotp] = useState("");

    const navigate = useNavigate();

    const getOTP = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setgetOpt(true);
         await axios
            .post(
                "http://localhost:4000/api/v1/user/register",
                {
                    username,
                    dateOfBirth,
                    email,
                },
                { withCredentials: true }
            )
            .then(function (response) {
                return response;
            })
            .catch(function (error) {
                console.log(error);
            });

        
    };

    const submitHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                "http://localhost:4000/api/v1/user/checkotp",
                {
                    username,
                    dateOfBirth,
                    email,
                    otp,
                },
                { withCredentials: true }
            );

            if (response.data.success) {
                navigate("/");
            }
            
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="w-full h-screen flex justify-center items-center">
            <div className="w-2/5 flex items-center justify-center flex-col">
                <div className="absolute top-10 left-10 text-4xl flex items-center justify-center font-bold">
                    <img
                        src="./icon4x.png"
                        alt=""
                        className="w-10 h-10 mr-5"
                    />
                    HD
                </div>
                <div className="flex items-start justify-center flex-col gap-8">
                    <div>
                        <h1 className="text-4xl font-bold mb-2">Sign Up</h1>
                        <p className="text-gray-600">
                            Sign up to enjoy the feature of HD
                        </p>
                    </div>
                    <form
                        action=""
                        className="flex flex-col gap-4"
                    >
                        <input
                            type="text"
                            placeholder="yourname"
                            className="w-80 h-12 border-2 border-gray-400 rounded-lg pr-3 pl-3 focus:border-[#367AFF]"
                            value={username}
                            onChange={(e) => setusername(e.target.value)}
                        />
                        <input
                            type="date"
                            placeholder="Date of Birth"
                            className="w-80 h-12 border-2 border-gray-400 rounded-lg pr-3 pl-3 focus:border-[#367AFF]"
                            value={dateOfBirth}
                            onChange={(e) => setdateOfBirth(e.target.value)}
                        />
                        <input
                            placeholder="Email"
                            type="text"
                            className="w-80 h-12 border-2 border-gray-400 rounded-lg pr-3 pl-3 focus:border-[#367AFF]"
                            value={email}
                            onChange={(e) => setemail(e.target.value)}
                        />

                        <input
                            placeholder="OTP"
                            type="text"
                            className={`w-80 h-12 border-2 border-gray-400 rounded-lg pr-3 pl-3 focus:border-[#367AFF] ${
                                getOpt ? "flex" : "hidden"
                            } `}
                            value={otp}
                            onChange={(e) => setotp(e.target.value)}
                        />

                        <button
                            className="w-80 h-12 border-2 text-[#FFFFFF] border-[#367AFF] rounded-lg bg-[#367AFF]"
                            onClick={
                                getOpt
                                    ? (e) => submitHandler(e)
                                    : (e) => getOTP(e)
                            }
                        >
                            {getOpt ? "Submit" : "Get OTP"}
                        </button>
                    </form>
                    <p className="text-gray-800">
                        Already have an account??{" "}
                        <a href="/signin">
                            <u className="text-[#367AFF]">Sign in</u>
                        </a>
                    </p>
                </div>
            </div>
            <div className="md:w-3/5 w-0 h-full md:flex hidden">
                <img
                    src="./windows.jpg"
                    alt=""
                    className="items-center h-full object-cover p-5 box-border rounded-[40px]"
                />
            </div>
        </div>
    );
};

export default SignUp;
