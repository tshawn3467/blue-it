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
                <NavLink to={routes.categories()} className="navLink">
                    <li className="headerListItem">
                        Categories
                    </li>
                </NavLink>
            </ul>

            <img className="logo" src={require("../Data/BlueItLogo.png")} alt="Not Found" />

            <ul className="headerRight">
                <NavLink to={routes.thirdThing()} className="navLink">
                    <li className="headerListItem">
                        Third Thing
                    </li>
                </NavLink>
                <NavLink to={routes.fourthThing()} className="navLink">
                    <li className="headerListItem">
                        Fourth Thing
                    </li>
                </NavLink>
            </ul>
        </div>
    )
}