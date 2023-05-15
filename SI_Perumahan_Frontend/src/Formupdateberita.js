import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Formupdateberita() {
    const { id } = useParams();
    const [judul, setJudul] = useState('');
    const [keterangan, setKeterangan] = useState('');
    const [gambar, setGambar] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        try {
            axios.get(`http://localhost:3069/berita/${id}`).then((res) => {
                setJudul(res.data.judul);
                setKeterangan(res.data.keterangan);
                setGambar(res.data.gambar);
            });
        } catch (error) {
            alert(error)
        }
    }, [id]);

    const data = {
        judul: judul,
        keterangan: keterangan,
        gambar: gambar
    };

    function UpdateBerita(e) {
        e.preventDefault();
        try { axios.put(`http://localhost:3069/berita/${id}`, data).then(navigate("/berita")); }
        catch (error) {
            alert(error)
        }
    }

    return (
        <div class="main-content">
            <section class="section">
                <div class="section-header">
                    <h1>Form Edit Berita</h1>
                </div>
            </section>
            <form onSubmit={(e) => UpdateBerita(e)}>
                <div className="form-group">
                    <label>Judul Berita</label>
                    <input type="text" name="judul" className="form-control" value={judul} onChange={e => setJudul(e.target.value)} />
                </div>

                <div className="form-group">
                    <label>Keterangan Berita</label>
                    <input type="text" name="keterangan" className="form-control" value={keterangan} onChange={e => setKeterangan(e.target.value)} />
                </div>

                <div className="form-group">
                    <label>Gambar</label>
                    <input type="text" name="gambar" className="form-control" value={gambar} onChange={e => setGambar(e.target.value)} />
                </div>

                <button type="submit" className="btn btn-sm btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Formupdateberita;