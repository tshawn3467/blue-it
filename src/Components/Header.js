import React from "react";
import { NavLink } from "react-router-dom";
import { routes } from "../App/routes";


export default function Header() {
    

    return (
        <div className="headerContainer">
            <ul className="headerLeft">
                <NavLink to={routes.home()} className="navLink">
                    <li className="headerListItem">
                        Home
                    </li>
                </NavLink>
            </ul>

            <img className="logo" src={require("../Data/BlueItLogo.png")} alt="Not Found" />

            <ul className="headerRight">
                <NavLink to={routes.displayPage()} className="navLink">
                    <li className="headerListItem">
                        Something
                    </li>
                </NavLink>
            </ul>
        </div>
    )
}