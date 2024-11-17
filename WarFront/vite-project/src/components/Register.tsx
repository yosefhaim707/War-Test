import { FC, useEffect, useRef, useState } from "react";
import fetchOrganizations from "../server/fetchOrganizations";
import { useNavigate } from "react-router-dom";
import User from "../types/User";
import axios from "axios";
import { io } from "socket.io-client";

const socket = io("http://localhost:7400");

const Register: FC = (): JSX.Element => {
    const [organization, setOrganization] = useState<string[]>([]);
    const username = useRef<HTMLInputElement>(null);
    const password = useRef<HTMLInputElement>(null);
    const organizationSelect = useRef<HTMLSelectElement>(null);
    const navigate = useNavigate();
    useEffect(() => {
        async function getOrganizations() {
            const organizations: string[] | null = await fetchOrganizations();
            if (organizations) {
                setOrganization(organizations);
            }
        }
        getOrganizations();
    }, []);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const usernameValue = username.current?.value;
        const passwordValue = password.current?.value;
        const organizationValue = organizationSelect.current?.value;
        if (usernameValue && passwordValue && organizationValue) {
            const user: User = {
                username: usernameValue,
                password: passwordValue,
                organization: organizationValue
            };
            async function registerUser() {
                const response = await axios.post("http://localhost:7400/users/register", user);
                if (response.status === 200) {
                    navigate("/login");
                    socket.connect();
                    socket.emit("joinRoom", organizationValue);

                }
                else {
                    console.log(response.data);
                }
            }
            registerUser();
        }
    };

    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Username" ref={username} />
                <input type="password" placeholder="Password" ref={password} />
                <select name="organization" id="organization" ref={organizationSelect}>
                    {organization.map((name: string) => (
                        <option value={name}>{name}</option>
                    ))}
                </select>
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;
