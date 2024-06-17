require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const User = require('../models/user');
const Card = require('../models/card');
const Group = require('../models/group');

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());

const JWT_SECRET = process.env.JWT_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.set('strictQuery', true);

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const refreshTokens = [];

// Функция генерации рефреш токена
const generateRefreshToken = (user) => {
  return jwt.sign(
    { id: user._id, username: user.username },
    REFRESH_TOKEN_SECRET,
    { expiresIn: '7d' }
  );
};

// Регистрация нового пользователя
app.post('/register', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ error: 'Username and password are required' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: 'User created' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Логин пользователя
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ error: 'Username and password are required' });
  }

  try {
    const user = await User.findOne({ username });
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        { id: user._id, username: user.username },
        JWT_SECRET,
        { expiresIn: '60m' }
      );
      const refreshToken = generateRefreshToken(user); // Генерация рефреш токена
      refreshTokens.push(refreshToken); // Добавление рефреш токена в массив или хранилище

      // Установка рефреш токена в HTTP-only cookie
      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: true,
      });

      // Возврат обоих токенов в ответе
      res.json({ token, refreshToken });
    } else {
      res.status(400).json({ error: 'Invalid username or password' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Middleware для проверки JWT
const authenticateJWT = (req, res, next) => {
  const authHeader = req.header('Authorization');

  if (authHeader) {
    const token = authHeader.replace('Bearer ', '');
    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }

      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

// Создание новой карточки
app.post('/groups', authenticateJWT, async (req, res) => {
  const { word, translate, groupName } = req.body;

  if (!word || !translate || !groupName) {
    return res
      .status(400)
      .json({ error: 'Word, translate, and groupName are required' });
  }

  try {
    // Проверяем, существует ли группа с указанным именем
    let group = await Group.findOne({ groupName });

    // Если группа не существует, создаем новую
    if (!group) {
      group = new Group({ groupName, createdBy: req.user.id });
    }

    // Создаем новую карточку
    const newCard = new Card({
      word,
      translate,
      groupName,
      createdBy: req.user.id, // Используйте userId из JWT
    });

    // Добавляем карточку в группу
    group.cards.push(newCard);

    // Сохраняем изменения в группе
    await group.save();

    // Сохраняем новую карточку
    await newCard.save();

    res.status(201).json(newCard);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Получение всех карточек

app.get('/cards', authenticateJWT, async (req, res) => {
  try {
    const cards = await Card.find({ createdBy: req.user.id });
    res.json(cards);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Получение группы юзера
app.get('/groups', authenticateJWT, async (req, res) => {
  try {
    const userId = req.user.id; // Получаем ID пользователя из JWT
    const groups = await Group.find({ createdBy: userId }).populate('cards');
    res.json(groups);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Пример защищенного маршрута
app.get('/protected', authenticateJWT, (req, res) => {
  res.json({ message: 'This is a protected route', user: req.user });
});

// Запуск сервера
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

/* {
  "word": "example",
  "translate": "пример",
  "groupName": "example_group"
} */

/* {
  "username": "max",
  "password": "max"
 } */
