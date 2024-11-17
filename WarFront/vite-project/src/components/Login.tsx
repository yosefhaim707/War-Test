import axios from "axios";
import { FC, useRef } from "react";
import { Navigate } from "react-router-dom";



const Login: FC = (): JSX.Element => {
    const username = useRef<HTMLInputElement>(null);
    const password = useRef<HTMLInputElement>(null);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const usernameValue = username.current?.value;
        const passwordValue = password.current?.value;
        if (usernameValue && passwordValue) {
            async function loginUser() {
                try {
                    const response = await axios.post("http://localhost:7400/users/login", {
                        username: usernameValue,
                        password: passwordValue
                    });
                    if (response.status !== 200) {
                        throw new Error("Failed to login");
                    }
                    else {
                        console.log(response.data);
                    }
                } catch (error) {
                    console.log(error);
                }
            }
            loginUser();
        }
    }

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Username" ref={username} />
                <input type="password" placeholder="Password" ref={password} />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
