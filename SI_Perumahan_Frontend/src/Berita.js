import React, { useState, useEffect } from "react";
import axios from "axios";

function Berita() {
  const [berita, setBerita] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3069/berita')
      .then(res => {
        setBerita(res.data);
      }).catch(err => {
        console.log(err);
      })
  }, [])

  const deleteberita = async (id) => {
    try {
      await axios.delete(`http://localhost:3069/berita/${id}`)
    } catch (error) {
      alert(error)
    }
  }

  return (
    <div className="main-content">
      <section className="section">
        <div className="section-header">
          <h1>Berita</h1>
        </div>
        <a href="/tambah-berita" className="btn btn-primary mb-3">Tambah Berita</a>

        <table className="table table-striped table-responsive table-bordered">
          <tr>
            <th>No</th>
            <th>gambar</th>
            <th>Judul</th>
            <th>Keterangan</th>
            <th>Action</th>
          </tr>
          {berita.map((b, index) => (
            <tr key={b.id}>
              <td>{index + 1}</td>
              <td><img src={b.gambar}/></td>
              <td>{b.judul}</td>
              <td>{b.keterangan}</td>
              <td>
                <div className="row">
                  <a href={`/berita/delete/${b.id}`} onClick={() => deleteberita(b.id)} className="btn btn-sm btn-danger mr-2"><i className="fas fa-trash"></i></a>
                  <a href={`/berita/edit/${b.id}`} className="btn btn-sm btn-primary"><i className="fas fa-edit"></i></a>
                </div>
              </td>

            </tr>
          ))}
        </table>
      </section>
    </div>
  )
}

export default Berita;