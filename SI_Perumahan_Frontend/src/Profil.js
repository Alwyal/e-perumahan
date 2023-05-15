import React, { useState, useEffect } from "react";
import axios from "axios";
import jwt_decode from 'jwt-decode'

function Profil() {

    const [isOpen, setIsOpen] = useState(false);
    const [username, setUsername] = useState('');
    const [token, setToken] = useState("");
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [expired, setExpired] = useState("");

    const toggle = () => {
        setIsOpen(!isOpen)
    }

    useEffect(() => {
        refreshToken();
    }, []);

    const refreshToken = async () => {
        try {
            const res = await axios.get("http://localhost:3069/auth/token", { withCredentials: true });
            const decoded = jwt_decode(res.data.accessToken);
            console.log(decoded);
            setToken(res.data.accessToken);
            setExpired(decoded.exp);
        } catch (error) {
            console.log(error);
        }
    }

    const axiosjwt = axios.create();
    axiosjwt.interceptors.request.use(async (config) => {
        const currentDate = new Date();
        if (expired * 1000 < currentDate.getTime()) {
            const res = await axios.get("http://localhost:3069/auth/token", { withCredentials: true });
            config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
            const decoded = jwt_decode(res.data.accessToken);
            setToken(res.data.accessToken);
            setExpired(decoded.exp);
        }
        return config;
    }, (error) => {
        return Promise.reject(error);
    });

    useEffect(() => {
        axios.get('http://localhost:3069/warga/me', { headers: { Authorization: `Bearer ${token}` } })
            .then(res => {
                setName(res.data.name)
                setUsername(res.data.username)
                setPassword(res.data.password)
            }).catch(err => {
                console.log(err);
            })
    }, [token]);

    return (
        <div className="container">
            <div className="card" style={{ marginTop: "150px", marginBottom: "50px" }}>
                <div className="card-header">
                    Silahkan untuk melengkapi biodata (<a href="/form-updateprofil">Edit Profil</a>)
                </div>
                <div className="card-body">
                    <form>
                        <div className="form-group">
                            <label for="">Nama</label>
                            <input type="text" name="name" className="form-control" value={name} onChange={e => setName(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label for="">Username</label>
                            <input type="text" name="username" className="form-control" value={username} onChange={e => setUsername(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label for="">Password</label>
                            <input type="password" name="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)} />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Profil;