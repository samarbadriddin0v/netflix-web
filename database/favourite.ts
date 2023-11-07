import mongoose from 'mongoose';

const favouriteSchema = new mongoose.Schema({
  uid: String,
  accountId: String,
  backdrop_path: String,
  poster_path: String,
  movieId: String,
  type: String,
  title: String,
  overview: String,
}, {timestamps: true})

const Favourite = mongoose.models.Favourite || mongoose.model('Favourite', favouriteSchema);
export default Favourite;