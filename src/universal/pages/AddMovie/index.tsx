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

class AddMovie extends React.Component<IHomeProps, {}> {


  render() {


    return (
        <section>
            <Helmet>
              <title>MovieGuru => Find movie for tonight!</title>
            </Helmet>
            <h1>Add movie</h1>
        </section>
    );
  }
}

const mapStateToProps = (state: IState, ownProps: IHomeOwnProps) => ({});


const mapDispatchToProps = (dispatch: Dispatch<any>, ownProps: IHomeOwnProps) => ({
    addMovie: () => {
        return dispatch<any>(()=>({}));
    }
});

export default connect<MapStateToProps, MapDispatchToProps, IHomeOwnProps, IState>(mapStateToProps, mapDispatchToProps)(AddMovie);
