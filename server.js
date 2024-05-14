const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors({
  origin: 'http://localhost.com', // Substitua pela sua origem permitida
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
  allowedHeaders: ['Content-Type', 'Authorization'], // Cabeçalhos permitidos
}));

app.use(express.json());


// criando a rota
app.get('/', (req, res) => {
  res.send('Hello World!');
});

let arrCarros = [
  {
    id: 1,
    nome: 'Fusca',
    marca: 'Volkswagen'
  }, 
  {
    id: 2,
    nome: 'Gol',
    marca: 'Volkswagen'
  }, 
  {
    id: 3,
    nome: 'Palio',
    marca: 'Fiat'
  } 
];
app.get('/carros', (req, res) => {
  console.log(arrCarros);
  res.send(arrCarros);
})

// criando a rota
app.get('/carros/:id', (req, res) => {
  const carId = req.params.id;
  const car = arrCarros.find(car => car.id === parseInt(carId));
  if (car) {
    console.log(car);
    res.send(car);
  } else {
    res.send(`Não existe carro com esse ID ${carId}`);
  }
});

/* 
  req => request|requisação => pedido de um recurso 
  res => response|resposta => resposta de um pedido
*/

app.delete('/carros/delete/:id', (req, res) => {
  const carId = req.params.id;
  arrCarros = arrCarros.filter(car => car.id !== parseInt(carId));

  res.send(`Carro ${carId} excluído com sucesso!`);

  console.log(arrCarros);

});



app.post('/carros/criar', (req, res) => {
  try {
    const car = req.body;
    arrCarros.push(car);
    res.send(car);
  } catch (error) {
    res.status(400).send('Erro ao processar a requisição: ' + error.message);
  }
});


app.put('/carros/editar/:id', (req, res) => {
  const carId = req.params.id;
  const car = req.body;
  arrCarros = arrCarros.map(item => item.id === parseInt(carId) ? car : item);
  res.send(car);
  console.log(arrCarros)
});





app.listen(3000);

console.log('Servidor iniciado na porta 3000');