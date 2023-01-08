import {Link} from 'react-router-dom';
export default function SideBar(){

return(
  <>
<div className="sidebar">
  <div className="logo-details">
    <i className='bx bxl-c-plus-plus icon'></i>
    <div className="logo_name">CodingLab</div>
    <i className='bx bx-menu' id="btn"></i>
  </div>
  <ul className="nav-list">
    <li>
      <a href="/#">
        <i className='bx bx-grid-alt'></i>
        <span className="links_name">Dashboard</span>
      </a>
      <span className="tooltip">Dashboard</span>
    </li>
    <li>
      <Link to="/client">
      <a href="/#">
        <i className='bx bx-user'></i>
        <span className="links_name">Client</span>
      </a>
      </Link>
      <span className="tooltip">Client</span>
    </li>
    <li>
      <a href="/#">
        <i className='bx bx-home'></i>
        <span className="links_name">Appartement</span>
      </a>
      <span className="tooltip">Appartement</span>
    </li>
     <li>
      <a href="/#">
        <i className='bx bx-money'></i>
        <span className="links_name">Paiment</span>
      </a>
      <span className="tooltip">Paiment</span>
    </li>
    {/* <li>
      <a href="/#">
        <i className='bx bx-receipt'></i>
        <span className="links_name">Facture</span>
      </a>
      <span className="tooltip">Facture</span>
    </li> */}
    <li>
      <a href="/#">
        <i className='bx bx-cog'></i>
        <span className="links_name">Setting</span>
      </a>
      <span className="tooltip">Setting</span>
    </li>
    <li className="profile">
      <div className="profile-details">
        <div className="name_job">
          <div className="name">Prem Shahi</div>
        </div>
      </div>
      <i className='bx bx-log-out' id="log_out"></i>
    </li>
  </ul>
</div>
</>
)
}