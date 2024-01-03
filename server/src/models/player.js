import mongoose, { model } from 'mongoose';

const playerSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  gamesPlayed: {
    type: Number,
    default: 0,
  },
  gamesWon: {
    type: Number,
    default: 0,
  },
  role: {
    type: String,
    enum: ['player', 'admin'],
    default: 'player',
  },
  status: {
    type: String,
    enum: ['active', 'banned'],
    default: 'active',
  },
});

export default mongoose.model('Player', playerSchema);
