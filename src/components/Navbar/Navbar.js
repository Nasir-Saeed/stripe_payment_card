import React from "react";
import DoctorpapersLogo from '../img/doctorpapers-logo.png'
import './Navbar.css'

function NavbarComponent() {
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light navigationBar" >
                <a className="navbar-brand" href="#"><img src={DoctorpapersLogo} alt="Doctor Paper Logo" width={247} height={63} /></a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <a className="nav-link" href="https://doctorpapers.com/">Home</a>
                        </li>

                    </ul>
                </div>
            </nav>
        </>

    );
}

export default NavbarComponent;