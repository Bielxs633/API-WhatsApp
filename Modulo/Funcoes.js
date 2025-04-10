/**
 * 
 *  Objetivo: Criar todas as funções em um arquivo separado para que no futuro possamos integrar em uma API.
 *  Data: 30/01/25
 *  Autor: Gabriel
 *  Versão: 1.0
 * 
 **/


const listaContatos = require('./contatos.js')

///=====================================================================================================================

//função que retorna lista dos dados pessoais por usuario
//: 1
//! Listar todos os dados pessoais por usuário:

const getDadosPessoais = function(numeroTelefone){
    let dadosContatos = listaContatos.contatos['whats-users']
    let telefone = String(numeroTelefone)
    let status = false
    let listaDadosContatos = {}

    dadosContatos.forEach(function(valor){
        if(String(valor.number) === telefone){
            listaDadosContatos.id = valor.id
            listaDadosContatos.account = valor.account
            listaDadosContatos.inicio = valor.createdsince.start
            listaDadosContatos.fim = valor.createdsince.end
            listaDadosContatos.contato = telefone
            status = true
        }
    })

    if(status === true){
        return listaDadosContatos
    }else{
        return status
    }
}

///=====================================================================================================================

//função que retorna dados da conta do profile do usuário
//: 2
//! Listar dados da conta do profile do usuário:

const getDadosProfile = function(numeroTelefone){
    let dadosContatos = listaContatos.contatos['whats-users']
    let telefone = String(numeroTelefone)
    let status = false
    let listaDadosProfile = {}

    dadosContatos.forEach(function(valor){
        if(String(valor.number) === telefone){
            listaDadosProfile.nickname = valor.nickname
            listaDadosProfile.image = valor['profile-image']
            listaDadosProfile.backgroud = valor.background
            status = true
        }
    })

    if(status === true){
        return listaDadosProfile
    }else{
        return status
    }
}

///=====================================================================================================================

// função que retorna lista de dados de contato para cada usuário
//: 3
//! Listar dados de contato para cada usuário:

const getDadosContato = function(numeroTelefone){
    let dadosContatos = listaContatos.contatos['whats-users']
    let telefone = String(numeroTelefone)
    let status = false
    let listaDadosContatos = []

    dadosContatos.forEach(function(valor){
        if(String(valor.number) === telefone){
            status = true

            valor.contacts.forEach(function(dados){
                let dadosEncontrados = {}
                dadosEncontrados.name = dados.name
                dadosEncontrados.image = dados.image
                dadosEncontrados.description = dados.description
                listaDadosContatos.push(dadosEncontrados)
            })
        }
    })

    if(status === true){
        return listaDadosContatos
    }else{
        return status
    }
}

///=====================================================================================================================

// funcao que retorna a lista de conversas de cada usuario
//: 4
//! Listas as conversas de cada usuário:

const getConversasUser = function(numeroTelefone){
    let dadosContatos = listaContatos.contatos['whats-users']
    let telefone = String(numeroTelefone)
    let status = false
    let listaConversas = []

    dadosContatos.forEach(function(valor){
        if(String(valor.number) === telefone){
            status = true

            valor.contacts.forEach(function(contato){
                let conversa = {}
                conversa.name = contato.name
                conversa.image = contato['image']
                conversa.description = contato.description
                conversa.messages = []

                contato.messages.forEach(function(mensagem){
                    let dadosMensagem = {}
                    dadosMensagem.sender = mensagem.sender
                    dadosMensagem.content = mensagem.content
                    dadosMensagem.time = mensagem.time

                    conversa.messages.push(dadosMensagem)
                })

                listaConversas.push(conversa)
            })
        }
    })

    if(status === true){
        return listaConversas
    }else{
        return status
    }
}

///=====================================================================================================================

// funcao que retorna um filtro pelo usuário e nome do seu contato
//: 5
//! FILTRAR CONVERSAS POR NOME DE CONTATO:

const getFiltroUser = function(numeroTelefone, contato){
    let dadosContatos = listaContatos.contatos['whats-users']
    let telefone = numeroTelefone
    let contatoEscolhido = contato
    let status = false
    let listaConversas = {
        nome: telefone,
        contato: contatoEscolhido,
        mensagens: []
    };

    dadosContatos.forEach(function(valor){
        if (String(valor.number) === telefone){
            valor.contacts.forEach(function(dados){
                if(String(dados.name) === contatoEscolhido){
                    listaConversas.mensagens = listaConversas.mensagens.concat(dados.messages)
                    status = true
                }
            })
        }
    })

    if(status){
        return listaConversas
    }else{
        return false
    }
}

///=====================================================================================================================

// funcao que retorna filtro pesquisa por palavra chave
//: 6
//! PESQUISAR POR PALAVRA-CHAVE NAS CONVERSAS:

const getFiltrarConversa = function(numeroTelefone, nomeContato, palavraChave){
    let dadosContatos = listaContatos.contatos['whats-users']
    let telefone = numeroTelefone
    let contatoEscolhido = nomeContato
    let palavra = palavraChave.toLowerCase()
    let status = false
    let listaConversas = {
        nome: telefone,
        contato: contatoEscolhido,
        mensagem: []
    }

    dadosContatos.forEach(function(usuario){
        if(String(usuario.number) === telefone){
            usuario.contacts.forEach(function(contato){
                if(String(contato.name) === contatoEscolhido){
                    listaConversas.mensagem = contato.messages.filter(function(mensagem){
                        let conteudoMensagem = mensagem.content.toUpperCase()
                        return conteudoMensagem.includes(palavra)
                    }).map(function(mensagem){
                        return{
                            sender: mensagem.sender,
                            content: mensagem.content,
                            time: mensagem.time
                        }
                    })
                    status = true
                }
            })
        }
    })
    if(status){
        return listaConversas
    }else{
        return false
    }
}

///=====================================================================================================================

// Testando as funções:
//& OK
// console.log(getDadosPessoais("11987876567")) //? LISTA OS dadosPessoais:

//& OK
// console.log(getDadosProfile("11966578996")) //? lISTA OS dadosConta

//& OK
// console.log(getDadosContato("11955577796")) //? LISTA OS dadosContato

//& OK
// console.log(JSON.stringify(getConversasUser('11987876567'), null, 2)) //? LISTA AS conversas

//& OK
// console.log(getFiltroUser("11987876567", "Ana Maria")) //? Filtro de conversa

//& OK
// console.log(getFiltrarConversas('11987876567', 'Ana Maria', 'Leonid')) //? Pesquisa por palavra-chave nas conversas:

///=====================================================================================================================

module.exports = {
    getDadosPessoais,
    getDadosProfile,
    getDadosContato,
    getConversasUser,
    getFiltroUser,
    getFiltrarConversa
}
