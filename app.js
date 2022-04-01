const express = require('express');
const app = express();
const morgan = require('morgan');

const routerProdutos = require('./route/produtos')
const routerPedidos = require('./route/pedidos')

app.use(morgan('dev'));
app.use('/produtos',routerProdutos);
app.use('/pedidos',routerPedidos);

//se não encontrar rota, ele vai parar aqui
app.use((req,res,next)=>{
    const erro = new Error('não encontrado');
    erro.status=404;
    next(erro);
});

app.use((error,req,res,next)=>{
    res.status(error.status || 500)
    return res.send({
        erro:{
            mensagem: error.message
        }
    });
});

module.exports = app;