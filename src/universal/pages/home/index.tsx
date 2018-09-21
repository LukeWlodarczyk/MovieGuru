import * as React from "react";
import { Link } from "react-router-dom";
import { loadMovie } from '../../loadable'

const Home = (props) => {
    return (
        <div>
            <h1>Home</h1>
            <Link onMouseOver={loadMovie} to="/movie">To Movie</Link>
        </div>
    );
}

export default Home;
