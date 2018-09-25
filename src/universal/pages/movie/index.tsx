import * as React from "react";
import { Helmet } from 'react-helmet';
import { Dispatch } from 'redux';
import { connect } from "react-redux";
import { RouteComponentProps } from 'react-router-dom'

import { IState } from "../../models";
import { getMovie } from '../../actions'


type RouteParams = { id: string }
type MapStateToProps = ReturnType<typeof mapStateToProps>;
type MapDispatchToProps = ReturnType<typeof mapDispatchToProps>;
interface IMovieOwnProps extends RouteComponentProps<RouteParams>, React.Props<RouteParams> {}
interface IMovieProps extends MapStateToProps, MapDispatchToProps, IMovieOwnProps {}


class Movie extends React.Component<IMovieProps, {}> {

    componentDidMount() {
      this.props.getMovie(this.props.match.params.id.split('-')[0]);
    }

    render(): JSX.Element {
        return (
            <div>
              <Helmet>
                <title>{this.props.movieData.data.title}</title>
              </Helmet>
              <h1>Movie</h1>
              <p>{this.props.movieData.data.title}</p>
              <p>{this.props.movieData.data.plot}</p>
            </div>
        );
    }

}

const mapStateToProps = (state: IState, ownProps: IMovieOwnProps) =>
({ movieData: state.movie });


const mapDispatchToProps = (dispatch: Dispatch<any>, ownProps: IMovieOwnProps) => ({
    getMovie: id => dispatch<any>(getMovie(id))
});

export const fetchMovie = (dispatch, param) => dispatch(getMovie(param))

export default connect<MapStateToProps, MapDispatchToProps, IMovieOwnProps, IState>(mapStateToProps, mapDispatchToProps)(Movie);
