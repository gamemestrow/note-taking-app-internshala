import { Route, Routes } from "react-router-dom";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import ViewNotesPage from "./pages/ViewNotesPage";

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
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/viewnote"
                    element={
                        <ProtectedRoute>
                            <ViewNotesPage />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </>
    );
};

export default App;
