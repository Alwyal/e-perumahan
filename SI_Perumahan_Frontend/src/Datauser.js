import React, { useState, useEffect } from "react";
import axios from "axios";

function Datauser() {
  const [user, setUser] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3069/warga')
      .then(res => {
        setUser(res.data);
      }).catch(err => {
        console.log(err);
      })
  }, [])

  const deleteuser = async (id) => {
    try {
      await axios.delete(`http://localhost:3069/warga/${id}`)
    } catch (error) {
      alert(error)
    }
  }

  return (
    <div class="main-content">
      <section class="section">
        <div class="section-header">
          <h1>Data Warga</h1>
        </div>
        <a href="/tambah-warga" class="btn btn-primary mb-3">Tambah User</a>

        <table class="table table-striped table-responsive table-bordered">
          <tr>
            <th>No</th>
            <th>Nama</th>
            <th>Username</th>
            <th>Password</th>
            <th>Action</th>
          </tr>
          {user.map((u, index) => (
          <tr key={u.id}>
            <td>{index + 1}</td>
            <td>{u.name}</td>
            <td>{u.username}</td>
            <td>{u.password}</td>
            <td>
              <a href={`/warga/delete/${u.id}`} onClick={() => deleteuser(u.id)} class="btn btn-sm btn-danger mr-2"><i class="fas fa-trash"></i></a>
              <a href={`/warga/edit/${u.id}`} class="btn btn-sm btn-primary"><i class="fas fa-edit"></i></a>
            </td>
          </tr>
          ))}
        </table>
      </section>
    </div>
  )
}

export default Datauser;