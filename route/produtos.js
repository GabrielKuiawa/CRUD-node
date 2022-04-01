const express = require('express');
const router = express.Router();

//retorna todos os produtos
router.get('/',(req,res,next) => {
    res.status(200).send({
        mensagem:'retorna todos os produtos'
    });
});

//insere um produto
router.post('/',(req,res,next)=>{
    res.status(201).send({
        mensagem:'insere um produto'
    });
});

//retorna os dados de um produto
router.get('/:id_produtos',(req,res,next)=>{
    const id = req.params.id_produtos;

    if(id === 'especial'){
        res.status(200).send({
            mensagem:'id especial',
            id: id
        });
    }else{
        res.status(200).send({
            mensagem:'você passou um id'
        });        
    }
});

//altera um produto
router.patch('/',(req,res,next)=>{
    res.status(201).send({
        mensagem:'usando patch dentro da rota'
    });
});

//exclui um produto
router.delete('/',(req,res,next)=>{
    res.status(201).send({
        mensagem:'usando delete dentro da rota'
    });
});

module.exports = router;