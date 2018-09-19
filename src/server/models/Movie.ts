import mongoose, { Schema } from 'mongoose';

const MovieSchema = new Schema({
    title: {
        type: String,
    },
    type: {
        type: String,
    },
    director: {
        type: [String],
    },
    genre: {
        type: [String],
    },
    language: {
        type: [String],
    },
    production: {
        type: String,
    },
    country: {
        type: [String],
    },
    actors: {
        type: [String],
    },
    released: {
        type: String,
    },
    plot: {
        type: String,
    },
    poster: {
        type: String,
    },
    dvd: {
        type: String,
    },
    awards: {
        type: String,
    },
    boxOffice: {
        type: String,
    },
    metascore: {
        type: String,
    },
    rated: {
        type: String,
    },
    ratings: [
        {
            source: {
                type: String,
            },
            value: {
                type: String,
            },
        }
    ],
    runtime: {
        type: Number,
    },
    writer: {
        type: [String],
    },
    year: {
        type: Number,
    },
    website: {
        type: String,
    },
    imdbID: {
        type: String,
    },
    imdbRating: {
        type: Number,
    },
    imdbVotes: {
        type: Number,
    }
},
{
    timestamps: {},
});

export default mongoose.model('movies', MovieSchema);
