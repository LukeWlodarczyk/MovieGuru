import { makeRegExpOpts, makeComparisonOpts, makeInArrayOpts } from './'

interface Query {
    title?: string,
    runtime?: object,
    year?: object,
    imdbVotes?: object,
    imdbRating?: object,
    genre?: string,
    director?: string,
    language?: string,
    country?: string,
    actors?: string,
    writer?: string,
}

export const createOpts = (queryData: Query) => {
  const regExpProps: string[] = ['title'];
  const comparisonProps: string[] = ['runtime', 'year', 'imdbVotes', 'imdbRating'];
  const inArrayProps: string[] = ['director', 'genre', 'language', 'country', 'actors', 'writer' ];

  return Object.keys(queryData).reduce((obj, k) => {

    if(regExpProps.includes(k)) {
      return obj = { ...obj, ...makeRegExpOpts(queryData[k], k) };
    }

    if(comparisonProps.includes(k)) {
      return obj = { ...obj, ...makeComparisonOpts(queryData[k], k) }
    }

    if(inArrayProps.includes(k)) {
      return obj = { ...obj, ...makeInArrayOpts(queryData[k], k) };
    }

    return obj
    }, {})

}
