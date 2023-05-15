import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Formtambahberita() {
    const [judul, setJudul] = useState('');
    const [keterangan, setKeterangan] = useState('');
    const [gambar, setGambar] = useState('');
    const navigate = useNavigate();

    function HandleSubmit(e) {
        e.preventDefault();
        axios.post('http://localhost:3069/berita', {
            judul: judul,
            keterangan: keterangan,
            gambar: gambar,
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

    return (
        <div className="main-content">
            <section className="section">
                <div className="section-header">
                    <h1>Form Tambah Berita</h1>
                </div>
            </section>
            <form onSubmit={(e) => HandleSubmit(e)}>
                <div className="form-group">
                    <label>Judul Berita</label>
                    <input type="text" name="judul" className="form-control" required value={judul} onChange={e => setJudul(e.target.value)} />
                </div>

                <div className="form-group">
                    <label>Keterangan Berita</label>
                    <input type="text" name="keterangan" className="form-control" required value={keterangan} onChange={e => setKeterangan(e.target.value)} />
                </div>

                <div className="form-group">
                    <label>Gambar</label>
                    <input type="text" name="gambar" className="form-control" required value={gambar} onChange={e => setGambar(e.target.value)} />
                </div>

                <button type="submit" className="btn btn-sm btn-primary">Submit</button>    
            </form>
        </div>
    )
}

export default Formtambahberita;