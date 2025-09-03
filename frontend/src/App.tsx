import { Route, Routes } from "react-router-dom";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Dashboard from "./pages/Dashboard";

const App = () => {
    return (
        <>
            <Routes>
                <Route
                    path="/signup"
                    element={<SignUp />}
                />
                <Route
                    path="/signin"
                    element={<SignIn />}
                />

                <Route
                    path="/"
                    element={<Dashboard />}
                />
            </Routes>
        </>
    );
};

export default App;
