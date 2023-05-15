import React, { useState, useEffect } from "react";
import axios from "axios";
import jwt_decode from 'jwt-decode'

function Header_u() {

    const [isOpen, setIsOpen] = useState(false);
    const [username, setUsername] = useState('');
    const [token, setToken] = useState("");
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
            config.headers.Authorization = `Bearer ${ localStorage.getItem('token') }`;
            const decoded = jwt_decode(res.data.accessToken);
            setToken(res.data.accessToken);
            setExpired(decoded.exp);
        }
        return config;
    }, (error) => {
        return Promise.reject(error);
    });

    useEffect(() => {
        axios.get('http://localhost:3069/warga/me', { headers: { Authorization: `Bearer ${ token }`}})
            .then(res => {
            setUsername(res.data);
        }).catch(err => {
            console.log(err);
        })
    }, [token]);



return (
    <header id="header-area" class="fixed-top">

        <div id="header-bottom">
            <div class="container">
                <div class="row">
                    <div class="col-lg-4">
                        <h3>Sistem Perumahan</h3>
                    </div>

                    <div class="col-lg-8 d-none d-xl-block">
                        <nav class="mainmenu alignright">
                            <ul>
                                <li><a href="/dashboard">Dashboard</a></li>
                                <li><a href="/profil">Profil</a></li>
                                <li><a href="/pembayaran">Pembayaran</a></li>
                                <li><a href="/">Welcome {username.name}<span> | Logout</span></a></li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    </header>
)
}

export default Header_u;