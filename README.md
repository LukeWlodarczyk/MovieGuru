# MovieGuru


## Technologies

- TypeScript
- Express
- Mongoose
- React
- React Redux
- React Helmet
- React Loadable

### Instalation

Install the dependencies

```sh
$ npm install
```

Run app

```sh
$ npm run watch
```

```sh
$ npm run watch-node
```


### How API works?

Base url:
```
http://localhost:3000/api/v1
```

##### GET /movies

 Return movies from db
###### Available filter parameters
 - title ( `/movies?title=Fight_Club` )
 - runtime ( `/movies?runtime[gt]=120&runtime[lt]=150` )
 - year ( `/movies?year[gte]=2000&year[lt]=2005` )
 - imdbVotes ( `/movies?imdbVotes[gte]=20000` )
 - imdbRating ( `/movies?imdbRating[gte]=8` )
 - genre ( `/movies?genre=Drama,Comedy` )
 - director ( `/movies?director=Joss_Whedon,Eric_Dalton` )
 - language ( `/movies?language=English,German` )
 - country ( `/movies?country=England,Australia` )
 - actors ( `/movies?actors=Tom_Crouse,Ed_Harris` )
 - writer ( `/movies?writer=Joss_Whedon,Zak_Penn` )


 ###### Example

 ```
 http://localhost:3000/api/v1/movies?runtime[gt]=120&genre=Drama,Action&title=Big
 ```

 Returns all movies
 -longer than 2 hours
 -with genre drama or action
 -with 'Big' word in title


 ##### POST /movies
 Fetch movie with provided title from omdb API and add it to our db.

 ##### GET /comments

 Returns all comments in db

 ###### Available filter parameter
 - movieId

 ###### Example

 ```
 http://localhost:3000/api/v1/comments?movieId=5ba4304f6cccb81a9ebc6bdb
 ```

 Returns all comments with movieID equals '5ba4304f6cccb81a9ebc6bdb'


 ##### POST /comments

 Add comment to our db (movieId and text in body required)

### Tests

```sh
$ npm run test
```

I have some weird bug and I have to comment

```
import ssr from './controllers/ssr'

this.ssr()

private ssr(): void{
   this.app.use(ssr);
}
```

in `src/server/app.ts` file in order to make test work correctly.
I 'm not sure how to fix it. Sorry for that :/
