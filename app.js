const express = require('express');
const app = express();

const routerProdutos = require('./route/produtos')
const routerPedidos = require('./route/pedidos')


app.use('/produtos',routerProdutos);
app.use('/pedidos',routerPedidos);

module.exports = app;