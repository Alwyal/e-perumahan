import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Formupdatetransaksi() {
  const { id } = useParams();
  const [status, setStatus] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    try {
      axios.get(`http://localhost:3069/transaksi/${id}`).then((res) => {
        setStatus(res.data.status);
      });
    } catch (error) {
      alert(error)
    }
  }, [id]);

  const data = {
    status : status
  };

  function UpdateTransaksi(e) {
    e.preventDefault();
    try { axios.put(`http://localhost:3069/transaksi/${id}`, data).then(navigate("/transaksi")); }
    catch (error) {
      alert(error)
    }
  }

  return (
    <div class="main-content">
      <section class="section">
        <div class="section-header">
          <h1>Form Edit Pembayaran</h1>
        </div>
      </section>
      <form onSubmit={(e) => UpdateTransaksi(e)}>
        <div class="form-group">
          <label>Status Bayar</label>
          <input type="text" name="status" class="form-control" value={status} onChange={e => setStatus(e.target.value)} />
        </div>

        <button type="submit" class="btn btn-sm btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Formupdatetransaksi;