/// <reference = cypress>

describe('Teste de criacao, registro e login', () => {
    it('Teste de criacao de usuario com sucesso', () => {
        cy.visit('https://www.globalsqa.com/angularJs-protractor/registration-login-example/#/login') // entrar no site
        cy.get('.btn-link').click()
        cy.get('#firstName').type('ronaldinho')
        cy.get('#Text1').type('ronaldinho')
        cy.get('#username').type('ronaldinho')
        cy.get('#password').type('ronaldinho')
        cy.get('.btn-primary').click()
        cy.get('.ng-binding').should('contain.text','Registration successful')

    });

    it('Teste de criacao de usuario com falha', () => {
        cy.visit('https://www.globalsqa.com/angularJs-protractor/registration-login-example/#/login')
        cy.get('.btn-link').click()
        cy.get('#firstName').type('ronaldinho')
        cy.get('#Text1').type('ronaldinho')
        cy.get('#username').type('ronaldinho')
        cy.get('.btn-primary').should('be.disabled') /// checando para ver se o botao ta desativado 
    });

    it('Teste de Login com sucesso', () => {
        let infos = criarUser(); // Chama a função criarUser corretamente
        cy.visit('https://www.globalsqa.com/angularJs-protractor/registration-login-example/#/login')
        cy.get('#username').type(infos[0]) // Usa o ID gerado
        cy.get('#password').type(infos[1]) // Usa a senha gerada
        cy.get('.btn-primary').click()
        cy.get('h1.ng-binding').should('contain.text',infos[0])
    });

    function criarUser() { // nunca criar o mesmo usuario novamente
        let hora = new Date().getHours().toString()
        let minuto = new Date().getMinutes().toString()
        let segundos = new Date().getSeconds().toString()
        let ID = hora + minuto + segundos + 'ID'
        let Senha = hora + minuto + segundos + 'Senha'
        let infos = [ID, Senha]

        cy.visit('https://www.globalsqa.com/angularJs-protractor/registration-login-example/#/login')
        cy.get('.btn-link').click()
        cy.get('#firstName').type(ID)
        cy.get('#Text1').type(ID)
        cy.get('#username').type(ID)
        cy.get('#password').type(Senha)
        cy.get('.btn-primary').click()
        cy.get('.ng-binding').should('contain.text','Registration successful')
        
        return infos // Retorna o array com ID e senha
    }
});
