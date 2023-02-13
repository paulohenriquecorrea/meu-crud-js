const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const UserController = require('../controllers/UserController');

global.logado = false;

// inicialize o aplicativo Express
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const sequelize = require('../config/sequelize');
sequelize.sync();

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
app.post('/register', UserController.cadastra);

//rota tela login
app.post('/login', UserController.busca);

// inicialize o servidor
app.listen(3000, () => {
  console.log('Servidor inicializado na porta 3000');
});
