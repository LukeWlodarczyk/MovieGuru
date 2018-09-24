import * as React from "react";
import { Helmet } from 'react-helmet';
import { connect } from "react-redux";

import { getMovie } from '../../actions'

import { IState } from "../../models";




class Movie extends React.Component {

    render() {
        return (
            <div>
              <Helmet>
                <title>Title of the selected movie</title>
              </Helmet>
              <h1>Movie</h1>
            </div>
        );
    }
}

export default Movie;
