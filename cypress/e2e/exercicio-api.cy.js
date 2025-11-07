/// <reference types="cypress" />
import contrato from '../contracts/produtos.contract'
import { faker } from '@faker-js/faker';
describe('Testes da Funcionalidade Usuários', () => {

  it('Deve validar contrato de usuários', () => {
    cy.request('usuarios').then(response =>{
      return contrato.validateAsync(response.request)                   //Validação se encontra em "request", n/ em "body"
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

  it('Deve editar um usuário previamente cadastrado', () => {              //necessário ser produto existente
      cy.request({
      method: 'PUT',
      url: 'usuarios' + '/2DUQDOHUEF1o2s1a',
      body:{
            "nome": "Brunaa B V2",
            "email": "Bruna@qa.com.br",
            "password": "teste",
            "administrador": "true"
           }
      }).should((response) => {
        expect(response.body.message).to.equal('Registro alterado com sucesso')
      })
  });

  it('Deve deletar um usuário previamente cadastrado', () => {
    cy.request({
      method: 'DELETE',
       url: 'usuarios' + '/TrVjPDdOG5HCxA9w',
    }).should((response) => {
      expect(response.body.message).to.equal('Registro excluído com sucesso')
  });
})

})