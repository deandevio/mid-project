import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
  id: Number,
  name: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    enum: ["English", "Japanese"],
    required: true,
  },
  genres: {
    type: String,
    enum: ["Drama", "Science-Fiction", "Thriller", "Comedy", "Family", "Fantasy"],
  },
});

const Movie = mongoose.model("Movie", movieSchema);

export default Movie;
