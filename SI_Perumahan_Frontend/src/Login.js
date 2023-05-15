import { useRef, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
    const userRef = useRef();
    const errorRef = useRef();

    const [username, setUsername] = useState([]);
    const [password, setPassword] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
    }, []);

    async function HandleSubmit(e) {
        e.preventDefault();
        try {
            const {data} = await axios.post("http://localhost:3069/auth/login",{
                username : username,
                password : password,
            }, {
                withCredentials : true,
            });
            console.log(data);
            navigate("dashboard");
        } catch (error) {
            errorRef.current.focus();
        }
    };

    return (
        <div id="card">
            <div id="card-content">
                <div id="card-title">
                    <h2>LOGIN</h2>
                    <br></br>
                    <div class="underline-title"></div>
                </div>
                <form onSubmit={(e) => HandleSubmit(e)}>
                    <label for="username" style={{ paddingTop: "13px" }}>Username</label>
                    <br></br>
                    <input id="user-email" class="form-content" type="text" name="username" ref={userRef} autocomplete="off" required onChange={e => setUsername(e.target.value)} value={username} />
                    <div class="form-border"></div>

                    <label for="user-password" style={{ paddingTop: "22px" }}>Password</label>
                    <br></br>
                    <input id="user-password" class="form-content" type="password" name="password" ref={userRef} required onChange={e => setPassword(e.target.value)} value={password} />
                    <div class="form-border"></div>

                    <input style={{ marginLeft: "42px" }} className="contentCenter" id="submit-btn" type="submit" name="submit" value="LOGIN" />
                    <br></br>
                    <a href="/alogin" style={{ marginLeft: "54px" }} id="signup">Use Admin Account</a>
                </form>
            </div>
        </div>
    )
}

export default Login;