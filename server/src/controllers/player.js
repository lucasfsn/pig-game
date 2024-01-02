import bcrypt from 'bcrypt';
import createHttpError from 'http-errors';
import PlayerModel from '../models/player.js';

export const signUp = async (req, res) => {
  const { username, password } = req.body;

  try {
    if (!username || !password)
      throw createHttpError(400, 'Missing username or password');

    if (username.length < 3 || username.length > 20)
      throw createHttpError(
        400,
        'Username must be between 3 and 20 characters'
      );

    if (password.length < 8 || password.length > 30)
      throw createHttpError(
        400,
        'Password must be between 8 and 30 characters'
      );

    const isExist = await PlayerModel.findOne({ username }).exec();

    if (isExist)
      throw createHttpError(409, 'Player with this username already exists');

    const passwordHashed = await bcrypt.hash(password, 10);

    const newUser = await PlayerModel.create({
      username,
      password: passwordHashed,
    });

    res.send({
      message: 'Signed up successfully',
      player: {
        id: newUser._id,
        username: newUser.username,
      },
    });
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await PlayerModel.findOne({ username });

    if (!user)
      throw createHttpError(
        400,
        'Invalid username. Check your data and try again'
      );

    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword)
      throw createHttpError(
        401,
        'Invalid password. Check your data and try again'
      );

    res.send({
      message: 'Logged in successfully',
      player: {
        id: user._id,
        username: username,
      },
    });
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

export const getPlayerDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const player = await PlayerModel.findById(id);

    if (!player) {
      throw createHttpError(404, 'Player not found');
    }

    res.send({
      player: {
        id: player._id,
        username: player.username,
      },
    });
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};
