import React from "react";
import { NavLink } from "react-router-dom";
import { routes } from "../App/routes";
import { useDispatch } from "react-redux";
import { loadHomeArticles } from "./homeSlice";


export default function Header() {

    const dispatch = useDispatch();
    

    return (
        <div className="headerContainer">
            <ul className="headerLeft">
                <NavLink to={routes.home()} className="navLink" >
                    <li className="headerListItem">
                        Home
                    </li>
                </NavLink>
            </ul>

    {/* logo clickable to reload home page to original articles?? */}
            <NavLink to={routes.home()} className="navLink" onClick={dispatch(loadHomeArticles())} >
                <img className="logo" src={require("../Data/BlueItLogo.png")} alt="Not Found" />
            </NavLink>

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