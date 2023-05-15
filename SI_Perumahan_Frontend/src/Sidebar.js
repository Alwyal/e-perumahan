function Sidebar (){
    return (
        <div className="main-sidebar">
          <aside id="sidebar-wrapper">
            <div className="sidebar-brand">
              <a href="">Sistem Perumahan</a>
            </div>
            <ul className="sidebar-menu">
              <li><a className="nav-link" href="/berita"><i className="fas fa-newspaper"></i> <span>Berita</span></a></li>
              <li><a className="nav-link" href="/warga"><i className="fas fa-users"></i> <span>Data Warga</span></a></li>
              <li><a className="nav-link" href="/transaksi"><i className="fas fa-random"></i> <span>Transaksi</span></a></li>
              <li><a className="nav-link" href="/"><i className="fas fa-random"></i> <span>Logout</span></a></li>
            </ul>
          </aside>
        </div>
    )
}

export default Sidebar;