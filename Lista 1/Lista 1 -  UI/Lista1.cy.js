describe('Teste do site "Para Bank", que simula um banco', () => {
    let ID; // Variável global para ID
    let Senha; // Variável global para Senha

    // Gerar ID e Senha dinâmicos com base na hora atual
    let hora = new Date().getHours().toString();
    let minuto = new Date().getMinutes().toString();
    let segundos = new Date().getSeconds().toString();
    ID = hora + minuto + segundos + 'ID'; // ID dinâmico
    Senha = hora + minuto + segundos + 'Senha'; // Senha dinâmica

    it('Verificar se o registro da página funciona corretamente com um novo usuário', () => {
        
        // Visitar a página principal do Para Bank
        cy.visit('https://parabank.parasoft.com/parabank/index.htm');
        cy.get('#loginPanel > :nth-child(3) > a').click(); // Clicar em "Register"
        
        // Preencher o formulário de registro
        cy.get('#customer\\.firstName').type('Ronaldinho'); // Nome
        cy.get('#customer\\.lastName').type('Amigo do Luan'); // Sobrenome
        cy.get('#customer\\.address\\.street').type('rua das almadas'); // Endereço
        cy.get('#customer\\.address\\.city').type('Rio de Janeiro'); // Cidade
        cy.get('#customer\\.address\\.state').type('Rio de Janeiro'); // Estado
        cy.get('#customer\\.address\\.zipCode').type('00002'); // CEP
        cy.get('#customer\\.phoneNumber').type('40028922'); // Celular
        cy.get('#customer\\.ssn').type('1234'); // SSN (identificação social)
    
        // Preencher dados de login com ID e Senha gerados dinamicamente
        cy.get('#customer\\.username').type(ID); // Nome de usuário dinâmico
        cy.get('#customer\\.password').type(Senha); // Senha dinâmica
        cy.get('#repeatedPassword').type(Senha); // Confirmação de senha
    
        // Enviar o formulário de registro
        cy.get('[value="Register"]').click();
        
        // Verificar se o registro foi bem-sucedido
        cy.get('#rightPanel > p').should('contain.text', 'Your account was created successfully. You are now logged in.');
    });

    it('Teste de login na página', () => {
        // Visitando a página de login
        cy.visit('https://parabank.parasoft.com/parabank/index.htm');
        
        // Usando o ID e Senha gerados no teste anterior
        cy.get(':nth-child(2) > .input').type(ID); // Nome de usuário
        cy.get(':nth-child(4) > .input').type(Senha); // Senha
        cy.get(':nth-child(5) > .button').click(); // Clicar em "Log In"

        cy.get('#showOverview > .title').should('contain.text', 'Accounts Overview')
        

    });

    it('Teste de logout da pagina', () => {
        cy.visit('https://parabank.parasoft.com/parabank/index.htm');
        
        // Usando o ID e Senha gerados no teste anterior
        cy.get(':nth-child(2) > .input').type(ID); // Nome de usuário
        cy.get(':nth-child(4) > .input').type(Senha); // Senha
        cy.get(':nth-child(5) > .button').click(); // Clicar em "Log In"
        cy.get('#leftPanel > ul > :nth-child(8) > a').click()

        cy.get('h2').should('contain.text', 'Customer Login')

        
        
    });
    it('Teste para ver se funciona corretamente fazer uma transacao', () => {

        cy.visit('https://parabank.parasoft.com/parabank/index.htm');
        
        // Usando o ID e Senha gerados no teste anterior
        cy.get(':nth-child(2) > .input').type(ID); // Nome de usuário
        cy.get(':nth-child(4) > .input').type(Senha); // Senha
        cy.get(':nth-child(5) > .button').click(); // Clicar em "Log In"

        cy.get('#leftPanel > ul > :nth-child(3) > a').click()
        cy.get('#amount').type('1000')
        cy.get(':nth-child(4) > .button').click()

        
    });

    it('Teste para atualizar dados de contato', () => {
        cy.visit('https://parabank.parasoft.com/parabank/index.htm');
        
        // Usando o ID e Senha gerados no teste anterior
        cy.get(':nth-child(2) > .input').type(ID); // Nome de usuário
        cy.get(':nth-child(4) > .input').type(Senha); // Senha
        cy.get(':nth-child(5) > .button').click(); // Clicar em "Log In"
        cy.get('#leftPanel > ul > :nth-child(6) > a').click()

        cy.get('#leftPanel > ul > :nth-child(6) > a').click(); // Clicar em "Update Contact Info"

        // Limpar os campos antes de inserir novos dados
        cy.get('#customer\\.firstName').clear().type('Gilmar'); // Atualizar nome
        cy.get('#customer\\.lastName').clear().type('Demetrios de Souza'); // Atualizar sobrenome
        cy.get('#customer\\.address\\.street').clear().type('Passarangua'); // Atualizar endereço
        cy.get('#customer\\.address\\.city').clear().type('Vitoria'); // Atualizar cidade
        cy.get('#customer\\.address\\.state').clear().type('Espirito Santo'); // Atualizar estado
        cy.get('#customer\\.address\\.zipCode').clear().type('00003'); // Atualizar CEP
        cy.get('#customer\\.phoneNumber').clear().type('4431290988'); // Atualizar número de telefone
        
        cy.get('[colspan="2"] > .button').click(); // Clicar em "Update Profile"

        cy.get('#updateProfileResult > .title').should('contain.text','Profile Updated')

    });

    it('Teste com usuario e senha errados', () => {
        
        cy.visit('https://parabank.parasoft.com/parabank/index.htm');

        cy.get(':nth-child(2) > .input').type('nome errado 123'); // Nome de usuário
        cy.get(':nth-child(4) > .input').type('SenhaErrada123'); // Senha
        cy.get(':nth-child(5) > .button').click(); // Clicar em "Log In"

        cy.get('.error').should('contain.text','The username and password could not be verified.')


        
    });
});
