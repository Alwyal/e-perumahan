import React, { useState, useEffect } from "react";
import axios from "axios";

function Transaksi() {
  const [transaksi, setTransaksi] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3069/transaksi')
      .then(res => {
        setTransaksi(res.data);
      }).catch(err => {
        console.log(err);
      })
  }, [])

  const deletetransaksi = async (id) => {
    try {
      await axios.delete(`http://localhost:3069/transaksi/${id}`)
    } catch (error) {
      alert(error)
    }
  }

  return (
    <div class="main-content">
      <section class="section">
        <div class="section-header">
          <h1>Pembayaran</h1>
        </div>
        <table class="table table-striped table-responsive table-bordered">
          <tr>
            <th>No</th>
            <th>Nama</th>
            <th>Tanggal Bayar</th>
            <th>Keterangan</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
          {transaksi.map((t, index) => (
          <tr key={t.id}>
            <td>{index + 1}</td>
            <td>{t.name}</td>
            <td>{t.tanggal}</td>
            <td>{t.keterangan}</td>
            <td>{t.status}</td>
            <td>
              <a href={`/transaksi/delete/${t.id}`} onClick={() => deletetransaksi(t.id)} class="btn btn-sm btn-danger"><i class="fas fa-trash"></i></a>
              <a href={`/transaksi/edit/${t.id}`} class="btn btn-sm btn-primary mr-2"><i class="fas fa-edit"></i></a>
            </td>
          </tr>
          ))}
        </table>
      </section>
    </div>
  )
}

export default Transaksi;