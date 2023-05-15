import React, { useState, useEffect } from "react";
import axios from "axios";

const dateTime = new Date()

function Pembayaran() {
    const [bayar, setPembayaran] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3069/transaksi')
            .then(res => {
                setPembayaran(res.data);
            }).catch(err => {
                console.log(err);
            })
    }, [])

    return (
        <div className="container">
            <div className="card mx-auto" style={{ marginTop: "180px", width: "80%" }}>
                <div className="card-header">
                    Data Pembayaran Iuran (<a href="/form-pembayaran">Bayar disini!</a>)
                </div>
                <div className="card-body">
                    <table className="table table-bordered table-striped">
                        <tr>
                            <th>No</th>
                            <th>Nama</th>
                            <th>Tanggal Bayar</th>
                            <th>Keterangan</th>
                            <th>Status</th>
                        </tr>
                        {bayar.map((p, index) => (
                            <tr key={p.id}>
                                <td>{index + 1}</td>
                                <td>{p.name}</td>
                                <td>{p.tanggal}</td>
                                <td>{p.keterangan}</td>
                                <td>{p.status}</td>
                            </tr>
                        ))}
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Pembayaran;