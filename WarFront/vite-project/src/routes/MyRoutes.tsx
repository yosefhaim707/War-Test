import { FC } from "react";
import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import Register from "../components/Register";
import Login from "../components/Login";




const MyRoutes: FC = (): JSX.Element => {
    return (
        <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
        </Routes>
    );
};

export default MyRoutes;
