import React, { useState, useEffect } from "react";
import axios from "axios";
import jwt_decode from 'jwt-decode'
import { useNavigate } from "react-router-dom";

function Formupdateprofil() {
    const [id, setId] = useState('')
    const [isOpen, setIsOpen] = useState(false);
    const [username, setUsername] = useState('');
    const [token, setToken] = useState("");
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [expired, setExpired] = useState("");
    const navigate = useNavigate();

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
                setId(res.data.id)
                setName(res.data.name)
                setUsername(res.data.username)
                setPassword(res.data.password)
            }).catch(err => {
                console.log(err);
            })
    }, [token]);

    function HandleSubmit(e) {
        e.preventDefault();
        axios.put('http://localhost:3069/warga/'+id, {
            name: name,
            username: username,
            password: password,
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                console.log(res);
                navigate('/profil');
            }).catch(err => {
                console.log(err);
            })
    }

    return (
        <div class="container">
            <div class="card" style={{ marginTop: "150px", marginBottom: "50px" }}>
                <div class="card-header">
                    Form Update Profil
                </div>
                <div class="card-body">
                    <form onSubmit={(e) => HandleSubmit(e)}>
                        <input type="hidden" name="id" class="form-control" value="" />
                        <div class="form-group">
                            <label for="">Nama</label>
                            <input type="text" name="name" class="form-control" value={name} onChange={e => setName(e.target.value)} />
                        </div>
                        <div class="form-group">
                            <label for="">Username</label>
                            <input type="text" name="username" class="form-control" value={username} onChange={e => setUsername(e.target.value)} />
                        </div>
                        <div class="form-group">
                            <label for="">Password</label>
                            <input type="password" name="password" class="form-control" value={password} onChange={e => setPassword(e.target.value)} />
                        </div>
                        <button type="submit" class="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Formupdateprofil;