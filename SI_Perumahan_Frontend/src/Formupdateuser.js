import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Formupdateuser() {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    try {
      axios.get(`http://localhost:3069/warga/${id}`).then((res) => {
        setName(res.data.name);
        setUsername(res.data.username);
        setPassword(res.data.password);
        setRole(res.data.role);
      });
    } catch (error) {
      alert(error)
    }
  }, [id]);

  const data = {
    name: name,
    username: username,
    password: password,
    role: role
  };

  function UpdateUser(e) {
    e.preventDefault();
    try { axios.put(`http://localhost:3069/warga/${id}`, data).then(navigate("/warga")); }
    catch (error) {
      alert(error)
    }
  }

  return (
    <div class="main-content">
      <section class="section">
        <div class="section-header">
          <h1>Form Edit Warga</h1>
        </div>
      </section>
      <form onSubmit={(e) => UpdateUser(e)}>
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

export default Formupdateuser;