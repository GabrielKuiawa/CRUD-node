const express = require('express');
const router = express.Router();
const mysql = require("../mysql").pool;

//retorna todos os produtos
router.get('/',(req,res,next) => {
    // res.status(200).send({
    //     mensagem:'retorna todos os produtos'
    // });
    mysql.getConnection((error,conn)=> {
        if(error){return res.status(500).send({ error:error})}
        conn.query(
            'SELECT * FROM produtos',
            (error,result,fields)=>{
                if(error){return res.status(500).send({ error:error})}
                const response = {
                    quantidade: result.lenght,
                    produtos: result.map(prod => {
                        return{
                            id_produto: prod.id_produto,
                            nome: prod.nome,
                            preco: prod.preco,
                            request:{
                                tipo: 'GET',
                                descricao:'retorna todos os produtos',
                                url:'http://localhost:3002/produtos/'
                            }                       
                        }
                    })
                }
                return res.status(200).send({response});    
            }
        )        
    });
});

//insere um produto
router.post('/',(req,res,next)=>{
    mysql.getConnection((error,conn)=>{
        if(error){return res.status(500).send({ error:error})}      
        conn.query(
            'INSERT INTO produtos (nome,preco) VALUES (?,?)',
            [req.body.nome, req.body.preco],
            (error,resultado,field)=> {
                conn.release();
                if(error){return res.status(500).send({ error:error})}   
                const response = {
                    mensagem: 'produto inserido com secesso',
                    produtoCriado: {
                        id_produto: resultado.id_produto,
                        nome: req.body.nome,
                        preco: req.body.preco,
                        request:{
                            tipo: 'POST',
                            descricao:'insere um produto',
                            url:'http://localhost:3002/produtos'
                        }  
                    }
                }       
                return res.status(201).send(response);
            }
        )
    });
});

//retorna os dados de um produto
router.get('/:id_produto',(req,res,next)=>{
    mysql.getConnection((error,conn)=> {
        if(error){return res.status(500).send({ error:error})}
        conn.query(
            'SELECT * FROM produtos WHERE id_produto = ?;',
            [req.params.id_produto],
            (error,result,fields)=>{
                if(error){return res.status(500).send({ error:error})}
                if (result.length == 0) {
                    return res.status(404).send({
                        message: 'Não foi encontrado produto com este ID'
                    })
                }
                const response = {
                    produtoCriado: {
                        id_produto: result[0].id_produto,
                        nome: result[0].nome,
                        preco: result[0].preco,
                        request:{
                            tipo: 'GET',
                            descricao:'retorna um produto',
                            url:'http://localhost:3002/produtos'
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
    mysql.getConnection((error,conn)=>{
        if(error){return res.status(500).send({ error:error})}        
        conn.query(
            `UPDATE produtos
                SET nome      = ?,
                    preco     = ?
             WHERE id_produto = ?`,
            [
            req.body.nome, 
            req.body.preco, 
            req.body.id_produto
            ],                                          
            (error,resultado,field)=> {
                conn.release();
                if(error){return res.status(500).send({ error:error})}
                const response = {
                    mensagem: 'produto atualizado com secesso',
                    produtoAtualizado: {
                        id_produto: req.body.id_produto,
                        nome: req.body.nome,
                        preco: req.body.preco,
                        request:{
                            tipo: 'GET',
                            descricao:'atualizado',
                            url:'http://localhost:3002/produtos/'+ req.body.id_produto
                        }  
                    }
                }       
                return res.status(202).send(response);
            }
        )
    });
});

//exclui um produto
router.delete('/',(req,res,next)=>{
    mysql.getConnection((error,conn)=>{
        if(error){return res.status(500).send({ error:error})}        
        conn.query(
            `DELETE FROM produtos WHERE id_produto = ?`,[req.body.id_produto],                                          
            (error,resultado,field)=> {
                conn.release();
                if(error){return res.status(500).send({ error:error})}    
                const response ={
                    mensagem : 'produto removido',
                    request:{
                        tipo:'POST',
                        descricao: 'apaga um produto',
                        url:'http://localhost:3002/produtos',
                        body:{
                            nome:'String',
                            preco:'Number'
                        }
                    }
                }    
                return res.status(202).send(response);
            }
        )
    });
});

module.exports = router;