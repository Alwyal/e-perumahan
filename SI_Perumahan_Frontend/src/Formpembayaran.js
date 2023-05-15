import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Formpembayaran() {
    const [name, setName] = useState('');
    const [tanggal, setTanggal] = useState('');
    const [keterangan, setKeterangan] = useState('');
    const navigate = useNavigate();

    function HandleSubmit(e) {
        e.preventDefault();
        axios.post('http://localhost:3069/transaksi', {
            name: name,
            tanggal: tanggal,
            keterangan: keterangan,
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                console.log(res);
                navigate('/pembayaran');
            }).catch(err => {
                console.log(err);
            })
    }

    return (
        <div class="container">
            <div class="card" style={{ marginTop: "150px", marginBottom: "50px" }}>
                <div class="card-header">
                    Form Pembayaran Iuran Bulanan
                </div>
                <div class="card-body">
                    <form onSubmit={(e) => HandleSubmit(e)}>
                        <div class="form-group">
                            <label for="">Upload Bukti Pembayaran (<a href="https://drive.google.com/drive/folders/1MaRrGWcOINbCEvJDTto7gTF7Qosy7OL7?usp=share_link">Di sini!</a>)</label>
                        </div>
                        <div class="form-group">
                            <label for="">Nama</label>
                            <input type="text" name="title" class="form-control" required value={name} onChange={e => setName(e.target.value)} />
                        </div>
                        <div class="form-group">
                            <label for="">Tanggal Bayar</label>
                            <input type="date" name="tanggal" class="form-control" required value={tanggal} onChange={e => setTanggal(e.target.value)} />
                        </div>
                        <div class="form-group">
                            <label for="">Keterangan</label>
                            <input type="text" name="keterangan" class="form-control" required value={keterangan} onChange={e => setKeterangan(e.target.value)} />
                        </div>
                        <button type="submit" class="btn btn-warning">Bayar</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Formpembayaran;