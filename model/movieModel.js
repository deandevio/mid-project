import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
  id: Number,
  name: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    enum: ["english", "japanese", "hebrew"],
    required: true,
  },
  genres: {
    type: String,
    enum: ["drama", "science-fiction", "thriller", "comedy", "family", "fantasy"],
  },
});

const Movie = mongoose.model("Movie", movieSchema);

export default Movie;
