const express = require('express');
const router = express.Router();

//retorna todos os pedidos
router.get('/',(req,res,next) => {
    res.status(200).send({
        mensagem:'pedido criado'
    });
});

//insere um pedidos
router.post('/',(req,res,next)=>{
    res.status(201).send({
        mensagem:'usando post dentro da rota pedidos'
    });
});

//retorna os dados de um pedidos
router.get('/:id_pedido',(req,res,next)=>{
    const id = req.params.id_pedidos;
    res.status(200).send({
        mensagem:'detalhe pedido',
        id_pedido: id
    });    
});

//altera um produto
router.patch('/',(req,res,next)=>{
    res.status(201).send({
        mensagem:'pedido alterado'
    });
});

//exclui um pedidos
router.delete('/',(req,res,next)=>{
    res.status(201).send({
        mensagem:'pedido deletado'
    });
});

module.exports = router;