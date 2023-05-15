import Footer from "./Footer";
import Footer_u from "./Footer_u";
import Header_u from "./Header_u";
import Sidebar from "./Sidebar";
import Berita from "./Berita";
import Datauser from "./Datauser";
import Transaksi from "./Transaksi";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import Pembayaran from "./Pembayaran";
import Profil from "./Profil";

import Formtambahberita from "./Formtambahberita";
import Formtambahuser from "./Formtambahuser";

import Formupdateberita from "./Formupdateberita";
import Formupdateuser from "./Formupdateuser";
import Formupdatetransaksi from "./Formupdatetransaksi";
import Formupdateprofil from "./Formupdateprofil";
import Formpembayaran from "./Formpembayaran";

import Login from "./Login";
import Alogin from "./Alogin";

function App() {
  return (
    <Router>
      <Routes>

        <Route path="/" element={
          <div>
            <Login />
          </div>
        } />

        <Route path="/alogin" element={
          <div>
            <Alogin />
          </div>
        } />

        <Route path="/berita" element={
          <div>
            <Sidebar />
            <Berita />
            <Footer />
          </div>
        } />

        <Route path="/tambah-berita" element={
          <div>
            <Sidebar />
            <Formtambahberita />
            <Footer />
          </div>
        } />

        <Route path="/berita/edit/:id" element={
          <div>
            <Sidebar />
            <Formupdateberita />
            <Footer />
          </div>
        } />

        <Route path="/berita/delete/:id" element={
          <div>
            <Sidebar />
            <Berita />
            <Footer />
          </div>
        } />

        <Route path="/warga" element={
          <div>
            <Sidebar />
            <Datauser />
            <Footer />
          </div>
        } />

        <Route path="/tambah-warga" element={
          <div>
            <Sidebar />
            <Formtambahuser />
            <Footer />
          </div>
        } />

        <Route path="/warga/edit/:id" element={
          <div>
            <Sidebar />
            <Formupdateuser />
            <Footer />
          </div>
        } />

        <Route path="/warga/delete/:id" element={
          <div>
            <Sidebar />
            <Datauser />
            <Footer />
          </div>
        } />

        <Route path="/transaksi" element={
          <div>
            <Sidebar />
            <Transaksi />
            <Footer />
          </div>
        } />

        <Route path="/transaksi/edit/:id" element={
          <div>
            <Sidebar />
            <Formupdatetransaksi />
            <Footer />
          </div>
        } />

        <Route path="/transaksi/delete/:id" element={
          <div>
            <Sidebar />
            <Transaksi />
            <Footer />
          </div>
        } />

        <Route path="/dashboard" element={
          <div>
            <Header_u />
            <Dashboard />
            <Footer_u />
          </div>
        } />

        <Route path="/pembayaran" element={
          <div>
            <Header_u />
            <Pembayaran />
            <Footer_u />
          </div>
        } />

        <Route path="/form-pembayaran" element={
          <div>
            <Header_u />
            <Formpembayaran />
            <Footer_u />
          </div>
        } />

        <Route path="/profil" element={
          <div>
            <Header_u />
            <Profil />
            <Footer_u />
          </div>
        } />

        <Route path="/form-updateprofil" element={
          <div>
            <Header_u />
            <Formupdateprofil />
            <Footer_u />
          </div>
        } />

      </Routes>
    </Router>
  );
}

export default App;
