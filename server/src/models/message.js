import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  game: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Game',
  },
  player: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Player',
  },
  text: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Message', messageSchema);
