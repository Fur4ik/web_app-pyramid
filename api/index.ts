const server = require('./server');

//@ts-ignore
module.exports = (req, res) => {
  server(req, res); // Передаём управление Express-приложению
};
