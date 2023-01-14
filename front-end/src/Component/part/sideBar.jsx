import {Link} from 'react-router-dom';
import axios from 'axios'
export default function SideBar(){

  const token_ = localStorage.getItem('token')

    function logout(){
      axios.get('http://localhost:5050/api/auth/logout')
      .then((response)=>{
        console.log(response)
        if(token_){
          localStorage.removeItem('token')
          window.location = "/login"
        }
      })
        .catch((err)=>{
      })
    }
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
    <Link to="/appartement">
      <a href="">
        <i className='bx bx-home'></i>
        <span className="links_name">Appartement</span>
      </a>
      <span className="tooltip">Appartement</span>
    </Link>
    </li>
     <li>
      <a href="/#">
        <i className='bx bx-money'></i>
        <span className="links_name">Paiment</span>
      </a>
      <span className="tooltip">Paiment</span>
    </li>
    <li className="profile" role="button" onClick={logout}>
      <i className='bx bx-log-out' id="log_out"></i>
    </li>
  </ul>
</div>
</>
)
}