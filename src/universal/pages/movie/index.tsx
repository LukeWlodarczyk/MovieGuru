import * as React from "react";
import { connect } from "react-redux";
import { Link, RouteComponentProps } from "react-router-dom";
import { Dispatch } from "redux";

import { loadHome } from '../../loadable'

import { fetchDescription } from "../../actions";
import { IState } from "../../models";




class Movie extends React.Component {
    constructor(props) {
        super(props);
    }

    

    render() {
        return (
            <div>
                <h1>Movie</h1>
                    <Link
                    onMouseOver={loadHome}
                    to="/"
                    >
                    To Home
                    </Link>
            </div>
        );
    }
}

export default Movie;
