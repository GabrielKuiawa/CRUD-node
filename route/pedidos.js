const express = require('express');
const router = express.Router();
const mysql = require("../mysql").pool;


//retorna todos os pedidos
router.get('/',(req,res,next) => {
    mysql.getConnection((error,conn)=> {
        if(error){return res.status(500).send({ error:error})}
        conn.query(
            'SELECT * FROM pedidos',
            (error,result,fields)=>{
                if(error){return res.status(500).send({ error:error})}
                const response = {
                    quantidade: result.length,
                    pedidos: result.map(pedidos => {
                        return{
                            id_pedidos: pedidos.id_pedidos,
                            id_produto: pedidos.id_produto,
                            quantidade: pedidos.quantidade, 
                            request:{
                                tipo: 'GET',
                                descricao:'retorna todos os pedidos',
                                url:'http://localhost:3002/pedidos/' +  pedidos.id_pedidos
                            }                       
                        }
                    })
                }
                return res.status(200).send(response);    
            }
        )        
    });
});

//insere um pedidos
router.post('/',(req,res,next)=>{
    mysql.getConnection((error,conn)=>{
        if(error){return res.status(500).send({ error:error})}      
        conn.query(
            'INSERT INTO pedidos (id_produto,quantidade) VALUES (?,?);',
            [req.body.id_produto, req.body.quantidade],
            (error,result,field)=> {
                conn.release();
                if(error){return res.status(500).send({ error:error})}   
                const response = {
                    mensagem: 'pedido inserido com secesso',
                    pedidoCriado: {
                        id_pedido: result.id_pedidos,
                        id_produto: req.body.id_produto,
                        quantidade: req.body.quantidade,
                        request:{
                            tipo: 'GET',
                            descricao:'insere um pedido',
                            url:'http://localhost:3002/pedidos'
                        }  
                    }
                }       
                return res.status(201).send(response);
            }
        )
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