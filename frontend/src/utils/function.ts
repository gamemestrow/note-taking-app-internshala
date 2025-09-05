import axios from "axios";

export const signOutUserFunction = async () => {
    async function signout() {
        await axios.get(`http://localhost:4000/api/v1/user/signout`, {
            withCredentials: true,
        });
    }

    signout();
};
