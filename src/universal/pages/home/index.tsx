import * as React from "react";
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet'
import { Dispatch } from 'redux';
import { Link, RouteComponentProps } from "react-router-dom";
import { loadMovie } from '../../loadable';


import { IState } from "../../models";
import { getMovies } from '../../actions'

type MapStateToProps = ReturnType<typeof mapStateToProps>;
type MapDispatchToProps = ReturnType<typeof mapDispatchToProps>;
interface IHomeOwnProps extends RouteComponentProps<undefined> {}
interface IHomeProps extends MapStateToProps, MapDispatchToProps, IHomeOwnProps {}

class Home extends React.Component<IHomeProps, {}> {

  componentDidMount() {
    this.props.getMovies()
  }

  render() {

    return (
        <section>
            <Helmet>
              <title>MovieGuru => Find movie for tonight!</title>
            </Helmet>
            <h1>Home</h1>
            {this.props.moviesData.data.map((movie: { title: string, _id: string}) => {
              return (
                <Link key={movie._id} onMouseOver={loadMovie} to={`/movies/${movie._id}`}>
                  <p>{movie.title}</p>
                </Link>)
            })}
        </section>
    );
  }
}

const mapStateToProps = (state: IState, ownProps: IHomeOwnProps) =>
({ moviesData: state.movies });


const mapDispatchToProps = (dispatch: Dispatch<any>, ownProps: IHomeOwnProps) => ({
    getMovies: () => {
        return dispatch<any>(getMovies());
    }
});

export const fetchMovies = (dispatch) => dispatch(getMovies())

export default connect<MapStateToProps, MapDispatchToProps, IHomeOwnProps, IState>(mapStateToProps, mapDispatchToProps)(Home);
