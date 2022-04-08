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
        conn.query('SELECT * FROM produtos WHERE id_produto = ?;', [req.body.id_produto],
        (error,result,field)=>{
            if(error){return res.status(500).send({ error:error})}     
            if (result.length == 0) {
                return res.status(404).send({
                message: 'produto não encontrado'
                })
            }
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
        })
    })
});

//retorna os dados de um pedidos
router.get('/:id_pedidos',(req,res,next)=>{
    mysql.getConnection((error,conn)=> {
        if(error){return res.status(500).send({ error:error})}
        conn.query(
            'SELECT * FROM pedidos WHERE id_pedidos = ?;',
            [req.params.id_pedidos],
            (error,result,fields)=>{
                if(error){return res.status(500).send({ error:error})}
                if (result.length == 0) {
                    return res.status(404).send({
                        message: 'Não foi encontrado pedido com este ID'
                    })
                }
                const response = {
                    pedidoCriado: {
                        id_pedidos: result[0].id_pedidos,
                        id_produto: result[0].id_produto,
                        quantidade: result[0].quantidade,
                        request:{
                            tipo: 'GET',
                            descricao:'retorna um pedidos',
                            url:'http://localhost:3002/pedidos'
                        }  
                    }
                }
                return res.status(201).send(response)    
            }
        )        
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
    mysql.getConnection((error,conn)=>{
        if(error){return res.status(500).send({ error:error})}        
        conn.query(
            `DELETE FROM pedidos WHERE id_pedidos = ?`,[req.body.id_pedidos],                                          
            (error,result,field)=> {
                conn.release();
                if(error){return res.status(500).send({ error:error})}    
                const response ={
                    mensagem : 'pedido removido',
                    request:{
                        tipo:'POST',
                        descricao: 'insere um pedido',
                        url:'http://localhost:3002/pedidos',
                        body:{
                            id_produto:'Number',
                            quantidade:'Number'
                        }
                    }
                }    
                return res.status(202).send(response);
            }
        )
    });
});

module.exports = router;