import React from 'react'
import {Link} from "react-router-dom"
const Home = () => {

    return(
        <div>
            Home
            <ul>
                <li>
                    <Link to="/pizza">Pizza</Link>
                </li>
                <li>
                    <a href="#">Sandwich</a>
                </li>
                <li>
                    <a href="#">Ramen</a>
                </li>
                <li>
                    <a href="#">Vegan</a>
                </li>
            </ul>
        </div>)

};
export default Home