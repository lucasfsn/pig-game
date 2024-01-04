import mongoose from 'mongoose';

const gameSchema = new mongoose.Schema({
  player1: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Player',
    required: true,
  },
  player2: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Player',
  },
  score1: {
    type: Number,
    default: 0,
  },
  score2: {
    type: Number,
    default: 0,
  },
  activePlayer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Player',
  },
  currentScore: {
    type: Number,
    default: 0,
  },
  diceNumber: {
    type: Number,
    default: 1,
  },
});

export default mongoose.model('Game', gameSchema);
