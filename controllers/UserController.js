// Importa o model User
const User = require('../models/user');
const path = require('path');
const crypto = require('crypto');
let operador = '';
const criaHash = (password) => {
  const hashedPassword = crypto
    .createHash('sha256')
    .update(password)
    .digest('hex');

  return hashedPassword;
};

module.exports = {
  async cadastra(req, res) {
    const { name, password } = req.body;
    const hashedPassword = criaHash(password);
    await User.create({
      username: name,
      password: hashedPassword,
      operador: operador,
    })
      .then((user) => {
        res.send(`Obrigado por se registrar, ${name}!`);
      })
      .catch((error) => {
        res.send(`Erro ao processar o formulário: ${error}`);
      });
  },

  async busca(req, res) {
    const { name, password } = req.body;
    operador = name;
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
  },
};
