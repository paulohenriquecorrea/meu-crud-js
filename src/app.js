const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
let logado = false;

const crypto = require('crypto');

// inicialize o aplicativo Express
const app = express();

// Importa o model User
const User = require('../models/user');

// inicializa o modelo de usuário
const sequelize = require('../config/sequelize');
sequelize.sync();

const criaHash = (password) => {
  const hashedPassword = crypto
    .createHash('sha256')
    .update(password)
    .digest('hex');

  return hashedPassword;
};

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// rota para exibir o formulário de cadastro

app.get('/register', (req, res) => {
  if (!logado) {
    return res.sendFile(path.join(__dirname, '../views/erroLogin.html'));
  }
  return res.sendFile(path.join(__dirname, '../views/form.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/login.html'));
});

// rota para processar o formulário de cadastro
app.post('/register', (req, res) => {
  const { name, password } = req.body;
  const hashedPassword = criaHash(password);
  User.create({
    username: name,
    password: hashedPassword,
  })
    .then((user) => {
      res.send(`Obrigado por se registrar, ${name}!`);
    })
    .catch((error) => {
      res.send(`Erro ao processar o formulário: ${error}`);
    });
});

app.post('/login', (req, res) => {
  const { name, password } = req.body;
  const hashedPassword = criaHash(password);
  User.findOne({
    where: {
      username: name,
      password: hashedPassword,
    },
  }).then((user) => {
    if (!user) {
      return res.status(401).send('User not found');
    }

    logado = true;
    return res.sendFile(path.join(__dirname, '../views/menu.html'));
  });
});

// inicialize o servidor
app.listen(3000, () => {
  console.log('Servidor inicializado na porta 3000');
});