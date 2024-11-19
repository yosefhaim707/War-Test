import { FC, useEffect, useRef, useState } from "react";
import fetchOrganizations from "../server/fetchOrganizations";
import { useNavigate } from "react-router-dom";
import User from "../types/User";
import axios from "axios";
import { io } from "socket.io-client";

const socket = io("http://localhost:7300");

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
                name: usernameValue,
                password: passwordValue,
                organization: organizationValue
            };
            async function registerUser() {
                try {
                    const response = await fetch("http://localhost:7400/users/register", {
                        method: "POST",
                        body: JSON.stringify(user),
                        headers: {
                            "Content-Type": "application/json"
                        }
                    });
                    
                    if (!response.ok) {
                        const errorData = await response.json();
                        throw new Error(errorData.message || 'Registration failed');
                    }
                    
                    await response.json();
                    navigate("/login");
                    socket.connect();
                    socket.emit("joinRoom", organizationValue);
                    console.log("User registered successfully");
                } catch (error) {
                    console.error(error instanceof Error ? error.message : 'An unknown error occurred');
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
