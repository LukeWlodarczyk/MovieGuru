import * as React from 'react';

import { Link } from 'react-router-dom'

import { loadHome, loadAddMovie } from '../../loadable';


export default () => (
	<header className="header">
			<Link className="link logo" onMouseMove={loadHome} to="/">
				<span>MOVIE</span>GURU
			</Link>
			<nav>
				<ul className="nav">
					<li onMouseMove={loadAddMovie} >
						<Link className="link" to="/add-movie">
							Add movie
						</Link>
					</li>
					<li>
						<Link className="link" to="/search">
							Search
						</Link>
					</li>
				</ul>
			</nav>
		</header>
	);
