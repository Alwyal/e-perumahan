import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Alogin() {

    const [username, setUsername] = useState([]);
    const [password, setPassword] = useState([]);
    const [logins, setLogins] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:3069/alogin')
            .then(res => {
                setLogins(res.data);
            }).catch(err => {
                console.log(err);
            })
    }, [])

    function HandleSubmit(e) {
        e.preventDefault();

        {
            logins.map((login) => {
                if (login.username == username && login.password == password) {
                    axios.post('http://localhost:3069/auth', {
                        username: username,
                        password: password,
                    }, {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                        .then(res => {
                            console.log(res);
                            navigate('/berita');
                        }).catch(err => {
                            console.log(err);
                        })
                }
            })
        }

    }


    return (
        <div id="card">
            <div id="card-content">
                <div id="card-title">
                    <h2>LOGIN</h2>
                    <br></br>
                    <div className="underline-title"></div>
                </div>
                <form onSubmit={(e) => HandleSubmit(e)}>
                    <label for="username" style={{ paddingTop: "13px" }}>Username</label>
                    <br></br>
                    <input id="user-email" className="form-content" type="text" name="username" required onChange={e => setUsername(e.target.value)} />
                    <div className="form-border"></div>

                    <label for="user-password" style={{ paddingTop: "22px" }}>Password</label>
                    <br></br>
                    <input id="user-password" className="form-content" type="password" name="password" required onChange={e => setPassword(e.target.value)} />
                    <div className="form-border"></div>

                    <input style={{ marginLeft: "42px" }} id="submit-btn" type="submit" name="submit" value="LOGIN" />
                    <br></br>
                    <a href="/" style={{ marginLeft: "54px" }} id="signup">Use User Account</a>
                </form>
            </div>
        </div>
    )
}

export default Alogin;