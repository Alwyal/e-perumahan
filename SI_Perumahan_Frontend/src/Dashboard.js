import React, { useState, useEffect } from "react";
import axios from "axios";

function Dashboard() {
    const [dashboard, setDashboard] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3069/berita')
            .then(res => {
                setDashboard(res.data);
            }).catch(err => {
                console.log(err);
            })
    }, [])

    return (
        <div>
            <section id="page-title-area" class="section-padding overlay">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="section-title  text-center">
                                <h2>Berita Terkini</h2>
                                <span class="title-line"></span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="car-list-area" class="section-padding">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="car-list-content">
                                <div class="row">
                                    {dashboard.map((d, index) => (
                                        <div class="col-lg-6 col-md-6" key={d.id}>
                                            <div class="single-car-wrap">
                                            <img src={d.gambar} height="300" width="540 "/>
                                                <div class="car-list-info without-bar">
                                                    <center>
                                                        <h4>{d.judul}</h4>
                                                        <p>{d.keterangan}</p>
                                                    </center>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Dashboard;