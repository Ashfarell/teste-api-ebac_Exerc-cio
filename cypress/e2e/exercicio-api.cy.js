/// <reference types="cypress" />
import contrato from '../contracts/usuarios.contract'           ////As propriedades (nome, email, id, etc.) que existem no teste devem estar no arquivo
import { faker } from '@faker-js/faker';
describe('Testes da Funcionalidade Usuários', () => {

let token
    beforeEach (() => {
    cy.token('Bruna@qa.com.br', 'teste').then(tkn => {
        token = tkn
    })
});

  it('Deve validar contrato de usuários', () => {
    cy.request('usuarios').then(response =>{
      return contrato.validateAsync(response.body)                   //Validação se encontra em "request", n/ em "body"
     })
  })

  it('Deve listar usuários cadastrados', () => {
    cy.request({
      method: 'GET',
      url: 'usuarios'
      }).should((response) => {
      expect(response.status).equal(200)
      expect(response.body).to.have.property('quantidade')
    })
    })
    
  it('Deve cadastrar um usuário com sucesso', () => {
    var nome = faker.person.firstName()
    var email = faker.internet.email()
    let senha = 'ABC ' +  Math.floor(Math.random()*10000000)
    cy.request({
      method: 'POST',
      url: 'usuarios',
      body:{
  "nome": nome,
  "email": email,
  "password": senha,
  "administrador": "true"
} 
  }).should((response) => {
    expect(response.status).equal(201)
    expect(response.body.message).to.equal('Cadastro realizado com sucesso')
})
  });

  it('Deve validar um usuário com email inválido', () => {
    cy.request({
      method: 'POST',
      url: 'login',
      body:{
  "email": "fulano@qa.com.br",
  "password": "teste"
},
failOnStatusCode: false
    }).should((response) => {
      expect(response.status).equal(401)
      expect(response.body.message).to.equal('Email e/ou senha inválidos')
    })
    })

  //it('Deve editar um usuário previamente cadastrado c/ COMANDO CUSTOMIZADO - PUT', () => {              //necessário ser produto existente
      //cy.request({
      //method: 'PUT',
      //url: 'usuarios' + '/2DUQDOHUEF1o2s1a',
      //body:{
        //"nome": "Brunaa B V2",
        //  "email": "Bruna@qa.com.br", 
        //"password": "teste",
        //"administrador": "true"
        //   }
      //}).should((response) => {
       // expect(response.body.message).to.equal('Registro alterado com sucesso')
      //})
  //});
  it('Deve editar um usuário previamente cadastrado c/ COMANDO CUSTOMIZADO- PUT', () => {
var nome = faker.person.firstName() +' Criado'                                 //1º Criamos um usuário c/ CC e apenas depois editamos
var email = faker.internet.email()                                             //Assim o código fica dinâmico e n/ depende de um usuário já existente
let senha = 'ABC ' +  Math.floor(Math.random()*10000000)
cy.cadastrarUsuario(nome, email, senha, "true")
    .then(response => {
      let id = response.body._id                                                //Pegamos o ID do usuário criado para editar
      cy.request({
    method: 'PUT',
    url: 'usuarios' + `/${id}`,                                                //Adicionamos o ID na URL para editar o usuário criado
    body:{
      "nome": nome + ' Editado',
      "email": email, 
      "password": senha,
      "administrador": "true"
         }
    }).should((response) => {
      expect(response.body.message).to.equal('Registro alterado com sucesso')
      expect(response.status).to.equal(200)
    })
  })
   })

   it('Deve deletar um usuário previamente cadastrado c/ COMANDO CUSTOMIZADO - DELETE', () => {
    var nome = faker.person.firstName() + ' Deletar'
    var email = faker.internet.email()
    let senha = 'ABC ' +  Math.floor(Math.random()*10000000)
    cy.cadastrarUsuario(nome, email, senha, "true")
        .then(response => {
          let id = response.body._id                                                //Pegamos o ID do usuário criado para deletar
          cy.request({
        method: 'DELETE',
        url: 'usuarios' + `/${id}`,                                                //Adicionamos o ID na URL para deletar o usuário criado
      }).should((response) => {
        expect(response.body.message).to.equal('Registro excluído com sucesso')
        expect(response.status).to.equal(200)
      })
    })

  //it('Deve deletar um usuário previamente cadastrado', () => {
  //  cy.request({
  //    method: 'DELETE',
  //     url: 'usuarios' + '/TrVjPDdOG5HCxA9w',
  //  }).should((response) => {
  //    expect(response.body.message).to.equal('Registro excluído com sucesso')
  //});
//})

})
})
