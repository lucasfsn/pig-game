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

    const isExist = await PlayerModel.findOne({ username });

    if (isExist)
      throw createHttpError(409, 'Player with this username already exists');

    const passwordHashed = await bcrypt.hash(password, 10);

    await PlayerModel.create({
      username,
      password: passwordHashed,
    });

    const newUser = await PlayerModel.findOne({ username }).select('-password');

    res.send({
      message: 'Signed up successfully',
      player: newUser,
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

    if (user.status === 'banned')
      throw createHttpError(
        400,
        'Sorry, your account has been banned. Contact the administrator for more information'
      );

    const userObject = user.toObject();
    delete userObject.password;

    res.send({
      message: 'Logged in successfully',
      player: userObject,
    });
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

export const changePassword = async (req, res) => {
  try {
    const { id } = req.params;
    const { password } = req.body;
    const user = await PlayerModel.findById(id);

    if (!user) throw createHttpError(400, 'User not found');

    const checkPassword = await bcrypt.compare(password, user.password);

    if (checkPassword)
      throw createHttpError(
        400,
        'Please choose a different password than your current one'
      );

    const passwordHashed = await bcrypt.hash(password, 10);

    await PlayerModel.findByIdAndUpdate(
      id,
      { password: passwordHashed },
      { new: true }
    );

    res.send({
      message: 'Password changed successfully',
    });
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

export const changeUsername = async (req, res) => {
  try {
    const { id } = req.params;
    const { username } = req.body;

    const user = await PlayerModel.findById(id);
    const isExist = await PlayerModel.findOne({ username });

    if (user.username === username)
      throw createHttpError(
        400,
        'Please choose a different username than your current one'
      );

    if (isExist) throw createHttpError(400, 'This username is already in use');

    const updatedUser = await PlayerModel.findByIdAndUpdate(
      id,
      { username },
      { new: true }
    ).select('-password');

    res.send({
      message: 'Username changed successfully',
      player: updatedUser,
    });
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

export const changeRole = async (req, res) => {
  try {
    const { username } = req.params;
    const { role } = req.body;

    if (role !== 'admin' && role !== 'player')
      throw createHttpError(400, 'Role must be either admin or player');

    const user = await PlayerModel.findOne({ username });

    if (!user) throw createHttpError(400, 'User not found');

    if (user.role === role)
      throw createHttpError(
        400,
        'Please select different role than current one'
      );

    const updatedUser = await PlayerModel.findOneAndUpdate(
      { username },
      { role },
      { new: true }
    ).select('-password');

    res.send({
      message: `${username}'s role changed successfully`,
    });
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

export const deleteAccount = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await PlayerModel.findById(id);

    if (!user) throw createHttpError(400, 'User not found');

    await PlayerModel.findByIdAndDelete(id);

    res.send({
      message: 'User deleted successfully',
    });
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

export const getPlayer = async (req, res) => {
  try {
    const { username } = req.params;
    const player = await PlayerModel.findOne({ username }).select('-password');

    if (!player) {
      throw createHttpError(404, 'Player not found');
    }

    res.send({
      player,
    });
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

export const search = async (req, res) => {
  const { username } = req.query;

  const users = await PlayerModel.find({
    username: { $regex: username || '', $options: 'i' },
  }).select('-password');

  res.json(users);
};

export const leaderboard = async (req, res) => {
  try {
    const sortField = req.query.sort || 'gamesPlayed';
    const sortOrder = req.query.order === 'desc' ? -1 : 1;

    const players = await PlayerModel.find()
      .sort({ [sortField]: sortOrder })
      .select('-password');

    res.json(players);
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

export const banPlayer = async (req, res) => {
  try {
    const { id } = req.params;

    const { status } = await PlayerModel.findById(id).select('status');

    if (status === 'banned')
      throw createHttpError(400, 'Player is currently banned');

    const player = await PlayerModel.findByIdAndUpdate(
      id,
      {
        status: 'banned',
      },
      { new: true }
    ).select('-password');

    res.json({ message: 'Player banned successfully' });
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

export const unbanPlayer = async (req, res) => {
  try {
    const { id } = req.params;

    const { status } = await PlayerModel.findById(id).select('status');

    if (status === 'active') throw createHttpError(400, 'Player is not banned');

    const player = await PlayerModel.findByIdAndUpdate(
      id,
      {
        status: 'active',
      },
      { new: true }
    ).select('-password');

    res.json({ message: 'Player unbanned successfully' });
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};
