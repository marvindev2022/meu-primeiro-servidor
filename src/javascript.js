const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
let idSetIntervals;
let minutos = 0,
  segundos = 0;

const timer = () => {
  segundos++;
  if (segundos > 59) {
    minutos += 1;
    segundos = 0;
  }
};
app.get("/", (req, resp) =>
  resp.send(
    `Tempo atual do cronômetro: ${minutos
      .toString()
      .padStart(2, 0)}min ${segundos.toString().padStart(2, 0)}seg`
  )
);
app.get("/iniciar", (req, resp) => {
  clearInterval(idSetIntervals);

  idSetIntervals = setInterval(timer, 1000);
  resp.send(`Cronômetro iniciado!`);
});
app.get("/continuar", (req, resp) => {
  clearInterval(idSetIntervals);

  idSetIntervals = setInterval(timer, 1000);
  resp.send(`Cronômetro continuando`);
});
app.get("/pausar", (req, resp) => {
  clearInterval(idSetIntervals);
  resp.send(`Cronômetro pausado`);
});
app.get("/zerar", (req, resp) => {
  segundos = 0;
  minutos = 0;
  resp.send(`Cronômetro encerrado`);
});
app.listen(8000);
