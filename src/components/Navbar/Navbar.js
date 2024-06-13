import React from "react";
import DoctorpapersLogo from '../img/doctorpapers-logo.png'
import './Navbar.css'

function NavbarComponent() {
    return (
        <>

            <div className="container">

                <div class="row ">
                    <nav className="navbar navbar-expand-lg navbar-mobile">
                        <div class="col-6 col-md-4">
                            <a className="navbar-brand" href="https://doctorpapers.com/"><img src={DoctorpapersLogo} alt="Doctor Paper Logo" width={247} height={63} /></a>
                        </div>
                        <div class="col-6 col-md-4">
                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul className="navbar-nav mr-auto">
                                    <li className="nav-item active">
                                        <a className="nav-link" href="https://doctorpapers.com/">Home</a>
                                    </li>
                                    <li className="nav-item active">
                                        <a className="nav-link" href="https://doctorpapers.com/about/">About</a>
                                    </li>
                                    <li className="nav-item active">
                                        <a className="nav-link" href="https://doctorpapers.com/contact/">Contact</a>
                                    </li>
                                    <li className="nav-item active">
                                        <a className="nav-link" href="https://doctorpapers.com/blog/">Blog</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="col-6 col-md-4">
                            <button className="doctor-paper-button"><a href="https://doctorpapers.com/contact/">Let's Connect </a></button>
                        </div>
                    </nav>
                </div>
            </div>
        </>
    );
}

export default NavbarComponent;