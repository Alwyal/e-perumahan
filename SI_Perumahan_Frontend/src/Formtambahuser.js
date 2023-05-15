import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Formtambahuser() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const navigate = useNavigate();

  function HandleSubmit(e) {
    e.preventDefault();
    axios.post('http://localhost:3069/warga', {
      name: name,
      username: username,
      password: password,
      role: role,
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        console.log(res);
        navigate('/warga');
      }).catch(err => {
        console.log(err);
      })
  }
  return (
    <div class="main-content">
      <section class="section">
        <div class="section-header">
          <h1>Form Tambah Warga</h1>
        </div>
      </section>
      <form onSubmit={(e) => HandleSubmit(e)}>
        <div class="form-group">
          <label>Nama</label>
          <input type="text" name="name" class="form-control" value={name} onChange={e => setName(e.target.value)} />
        </div>

        <div class="form-group">
          <label>Username</label>
          <input type="text" name="username" class="form-control" value={username} onChange={e => setUsername(e.target.value)} />
        </div>

        <div class="form-group">
          <label>Password</label>
          <input type="password" name="password" class="form-control" value={password} onChange={e => setPassword(e.target.value)} />
        </div>

        <div class="form-group">
          <label>Role</label>
          <input type="text" name="role" class="form-control" value={role} onChange={e => setRole(e.target.value)} />
        </div>

        <button type="submit" class="btn btn-sm btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Formtambahuser;