/* atividade de boas vindas, arquivo de funções
 * dev: giovanna xavier
 * data: 04/02/2025
 * versão: 1.0
 */
const listaContatos = require('./contatos.js')

//função que retorna lista dos dados pessoais por usuario
const getDadosPessoal = function(numeroTelefone){
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

//função que retorna dados da conta do profile do usuário
const getDadosProfile = function(numeroTelefone){
    let dadosContatos = listaContatos.contatos['whats-users']
    let telefone = String(numeroTelefone)
    let status = false
    let listaDadosProfile = {}

    dadosContatos.forEach(function(valor){
        if(String(valor.number) === telefone){
            listaDadosProfile.nickname = valor.nickname
            listaDadosProfile.image = valor.profileimage
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

// função que retorna lista de dados de contato para cada usuário
const getDadosContatos = function(numeroTelefone){
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

// funcao que retorna a lista de conversas de cada usuario
const getlistaConversaUser = function(numeroTelefone){
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
                conversa.image = contato.image
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

// funcao que retorna um filtro pelo usuário e nome do seu contato
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



// funcao que retorna filtro pesquisa por palavra chave
const getFiltrarConversas = function(numeroTelefone, nomeContato, palavraChave){
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
                        let conteudoMensagem = mensagem.content.toLowerCase()
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

module.exports = {
    getDadosPessoal,
    getDadosProfile,
    getDadosContatos,
    getlistaConversaUser,
    getFiltroUser,
    getFiltrarConversas
}


// testes de funções
console.log(getDadosPessoal('11987876567'))
console.log(getDadosProfile(11987876567));
console.log(getDadosContatos('11987876567'));
console.log(getlistaConversaUser('11987876567'));
console.log(JSON.stringify(getlistaConversaUser('11987876567'), null, 2))
console.log(getFiltroUser('11987876567','Ana Maria'))
console.log(getFiltrarConversas('11987876567', 'Max Kellerman', 'trabalho'));