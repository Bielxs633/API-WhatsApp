/**
 * 
 *  Objetivo: Criar todas as funções em um arquivo separado para que no futuro possamos integrar em uma API.
 *  Data: 30/01/25
 *  Autor: Gabriel
 *  Versão: 1.0
 * 
 **/

const { contatos } = require('./contatos'); //? Importa a lista de contatos

///=====================================================================================================================

//: 1
//! Listar todos os dados pessoais por usuário:

const dadosPessoais = function(tell){
    const usuario = contatos["whats-users"].find(u => u.number === tell)
    if (!usuario) return { erro: "Usuário não encontrado." }
    
    return{
        account: usuario.account,
        number: usuario.number,
        createdsince: usuario.createdsince
    }  
}

///=====================================================================================================================

//: 2
//! Listar dados da conta do profile do usuário:

const dadosConta = function(tell){
    const usuario = contatos["whats-users"].find(u => u.number === tell)
    if (!usuario) return { erro: "Usuário não encontrado." }
    
    return {
        nickname: usuario.nickname,
        profileImage: usuario["profile-image"],
        background: usuario.background
    }  
}

///=====================================================================================================================


//: 3
//! Listar dados de contato para cada usuário:

const dadosContato = function(tell){
    const usuario = contatos["whats-users"].find(u => u.number === tell)
    if (!usuario) return { erro: "Usuário não encontrado." }
    
    return usuario.contacts.map(contact => ({
        name: contact.name,
        description: contact.description,
        image: contact.image
    })
)}

///=====================================================================================================================

//: 4
//! Listas as conversas de cada usuário:

const conversas = function(tell){
    const usuario = contatos["whats-users"].find(u => u.number === tell)
    if (!usuario) return { erro: "Usuário não encontrado." }
    
    return usuario.contacts.map(contact => ({
        contato: contact.name,
        imagemContato: contact.image,
        mensagens: contact.messages.map(msg => ({
            remetente: msg.sender,
            conteudo: msg.content,
            hora: msg.time
        }))
    })
)}

///=====================================================================================================================

//: 5
//! FILTRAR CONVERSAS POR NOME DE CONTATO:

const conversaContato = function(tell, nomeContato){
    const usuario = contatos["whats-users"].find(u => u.number === tell)
    if (!usuario) return { erro: "Usuário não encontrado." }
    
    const contato = usuario.contacts.find(c => c.name.toLowerCase() === nomeContato.toLowerCase())
    if (!contato) return { erro: "Contato não encontrado." }
    
    return{
        contato: contato.name,
        mensagens: contato.messages
    }
}

///=====================================================================================================================

//: 6
//! PESQUISAR POR PALAVRA-CHAVE NAS CONVERSAS:

const palavraChave = function(tell, palavraChave){
    const usuario = contatos["whats-users"].find(u => u.number === tell)
    if (!usuario) return { erro: "Usuário não encontrado." }
    
    const resultados = usuario.contacts.map(contact => {
        const mensagensFiltradas = contact.messages.filter(msg => msg.content.includes(palavraChave))
        return mensagensFiltradas.length > 0 ? { contato: contact.name, mensagens: mensagensFiltradas } : null
    }).filter(result => result !== null)
    
    if (resultados.length === 0) return { erro: "Nenhuma mensagem encontrada com a palavra-chave." }
    
    return resultados
}
///=====================================================================================================================

// Testando as funções:
//& OK
// console.log(dadosPessoais("11987876567")) //? LISTA OS dadosPessoais:

//& OK
// console.log(dadosConta("11966578996")) //? lISTA OS dadosConta

//& OK
// console.log(dadosContato("11955577796")) //? LISTA OS dadosContato

//: Arrumar
// console.log(conversas("1194457796")) //? LISTA AS conversas

//& OK
// console.log(conversaContato("11987876567", "Ana Maria")) //? Filtro de conversa

//: Arrumar
// console.log(palavraChave("11987876567", "Leonid")) //? Pesquisa por palavra-chave nas conversas

///=====================================================================================================================

module.exports = {
    dadosPessoais,
    dadosConta,
    dadosContato,
    conversas,
    conversaContato,
    palavraChave,
}