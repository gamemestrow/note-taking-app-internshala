
const SignIn = () => {

    const getOTP = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
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
                        <h1 className="text-4xl font-bold mb-2">Sign In</h1>
                        <p className="text-gray-600">
                            Please login to continue to your account.
                        </p>
                    </div>
                    <form
                        action=""
                        className="flex flex-col gap-4"
                    >
                        <input
                            placeholder="Email"
                            type="text"
                            className="w-80 h-12 border-2 border-gray-400 rounded-lg pr-3 pl-3 focus:border-[#367AFF]"
                        />

                        <input
                            placeholder="OTP"
                            type="text"
                            className="w-80 h-12 border-2 border-gray-400 rounded-lg pr-3 pl-3 focus:border-[#367AFF]"
                        />

                        <a href="#" className="text-[#367AFF]"><u>Resend OTP</u></a>
                        
                        <span><input type="checkbox" name="" id="" className="inline mr-2" />Keep me logged in</span>

                        <button
                            className="w-80 h-12 border-2 text-[#FFFFFF] border-[#367AFF] rounded-lg bg-[#367AFF]"
                            onClick={(e) => getOTP(e)}
                        >
                            Sign In
                        </button>
                    </form>
                    <p className="text-gray-800">
                        Need an account? 
                        <a href="/signup"><u className="text-[#367AFF]">Create one</u></a>
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

export default SignIn;
