/**
 * 
 *  Objetivo: API do Whats.
 *  Data: 30/01/25
 *  Autor: Gabriel
 *  Versão: 1.0
 * 
 **/

/*
    para criar uma API, devemos instalar:
        express  ->  npm install express --save  ->  serve para criar a API
        cors  ->  npm install cors --save  ->  serve para configurar as permissões da API
        body-parser  ->  npm install body-parser --save  ->  serve para manipular os dados emviados para a API pelo body

*/
/*

    request -> serve para a API receber dados
    response -> serve para a API enviar dados

 */

const express = require('express')
const cors = require('cors')
const bodyParse = require('body-parser')

const app = express()

app.use((request, response, next) => {
    response.header('Acces-Control-Allow-Origin', '*')
    response.header('Acces-Control-Allow-Methods', 'GET')

    app.use(cors())
    next()
})

const whatsapp = require('./Modulo/Funcoes.js')

///=====================================================================================================================

//! endpoint para retornar filtro de users
//& OK

app.get('/v1/whatsapp/conversas/usuario', cors(), function(request, response){
    let numeroTelefone = request.query.numeroTelefone
    let contato = request.query.contato

    let dadosContatos = whatsapp.getFiltroUser(numeroTelefone, contato)

    if(dadosContatos){
        response.json(dadosContatos)
    }else{
        response.status(404)
        response.json({ status: 404, message: 'Não foram encontrados dados para retornar' })
    }
})

///=====================================================================================================================

//! endpoint que retorna filtro de palavra-chave
//& OK

app.get('/v1/whatsapp/conversas', cors(), async function(request, response){
    
    let numeroTelefone = request.query.numeroTelefone
    let nomeContato = request.query.nomeContato
    let palavraChave = request.query.palavraChave

    let dadosContatos = whatsapp.getFiltroUser(numeroTelefone, nomeContato, palavraChave)

    if(dadosContatos){
        response.json(dadosContatos)
    }else{
        response.status(404)
        response.json({ status: 404, message: 'Não foram encontrados dados para retornar' })
    } 
})

///=====================================================================================================================

//! endpoint para retornar dados pessoais do usuario 
// //& OK

app.get('/v1/whatsapp/user/:telefone', cors(), async function(request, response){

    let numeroTelefone = request.params.telefone

    let dadosContatos = whatsapp.getDadosPessoais(numeroTelefone)

    if(dadosContatos){
        response.status(200)
        response.json(dadosContatos)
    }else{
        response.status(404)
        response.json({'status': 404, 'message': 'Não foram encontrados dados para retornar'})
    }
})

///=====================================================================================================================

//! endpoint para retornar dados profile 
//& OK

app.get('/v1/whatsapp/user/profile/:telefone', cors(), async function(request, response){

    let numeroTelefone = request.params.telefone

    let dadosContatos = whatsapp.getDadosProfile(numeroTelefone)

    if(dadosContatos){
        response.status(200)
        response.json(dadosContatos)
    }else{
        response.status(404)
        response.json({'status': 404, 'message': 'Não foram encontrados dados para retornar'})
    }
})

///=====================================================================================================================

//! endpoint para retornar lista de contatos para cada usuário
//& OK

app.get('/v1/whatsapp/contatos/:telefone', cors(), async function(request, response){

    let numeroTelefone = request.params.telefone

    let dadosContatos = whatsapp.getDadosContato(numeroTelefone)
    
    if(dadosContatos){
        response.status(200)
        response.json(dadosContatos)
    }else{
        response.status(404)
        response.json({'status': 404, 'message': 'Não foram encontrados dados para retornar'})
    }
})

///=====================================================================================================================

//! endpoint para retornar lista de conversas
//& OK

app.get('/v1/whatsapp/conversas/:telefone', cors(), async function(request, response){

    let numeroTelefone = request.params.telefone

    let dadosContatos = whatsapp.getConversasUser(numeroTelefone)

    if(dadosContatos){
        response.status(200)
        response.json(dadosContatos)
    }else{
        response.status(404)
        response.json({'status': 404, 'message': 'Não foram encontrados dados para retornar'})
    }
})

///=====================================================================================================================

// API aguardando novas requisições
app.listen('3030', function(){
    console.log('API aguardando novas requisições...')
})