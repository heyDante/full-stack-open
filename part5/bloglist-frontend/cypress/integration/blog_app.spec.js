describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3000/api/testing/reset');
    // const newUser = {
    //   username: 'markevans',
    //   name: 'Mark Evans',
    //   password: 'marky'
    // };
    // /* -- Creating new user -- */
    // cy.request('POST', 'http://localhost:3000/api/users', newUser);
    cy.createUser({
      username: 'markevans',
      name: 'Mark Evans',
      password: 'marky'
    });

    cy.createUser({
      username: 'johndoe',
      name: 'John Doe',
      password: 'johny'
    });

    cy.visit('http://localhost:3000');
  });

  it('Login form is shown', function() {
    cy.contains('Log In');
    cy.contains('username');
    cy.contains('password');
    cy.get('button').should('contain', 'Log In');
  });

  describe('Log In', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('markevans');
      cy.get('#password').type('marky');
      cy.get('button').click();
      cy.contains('Mark Evans logged in');
    });

    it('fails with wrong credentials', function() {
      cy.get('#username').type('markevans');
      cy.get('#password').type('markywrong');
      cy.get('button').click();

      // cy.get('div.notification-box').should('contains', 'Invalid username or password');
      cy.get('.notification-box')
        .should('contain', 'Invalid username or password')
        .and('have.css', 'color', 'rgb(115, 43, 43)');
    });
  });

  describe.only('When logged in', function() {
    beforeEach(function() {
      // cy.get('#username').type('markevans');
      // cy.get('#password').type('marky');
      // cy.get('button').click();
      cy.login({
        username: 'markevans',
        password: 'marky'
      });
    });

    it('A blog can be created', function() {
      cy.get('#button-label').click();
      cy.get('#title').type('Cypress');
      cy.get('#author').type('fullstackopen');
      cy.get('#url').type('https://cypress.com');
      cy.contains('Create Blog').click();

      cy.get('.blog')
        .should('contain', 'Cypress')
        .and('contain', 'fullstackopen');
    });

    describe('And a blog is created', function() {
      beforeEach(function() {
        cy.createBlog({
          title: 'Another blog by cypress',
          author: 'Cypress',
          url: 'https://cypress.com'
        });
      });

      it('a user can like it', function() {
        cy.contains('view').click();
        cy.get('.blog-likes').contains(0);
        cy.get('.blog-likes button').click();
        cy.get('.blog-likes').contains(1);
      });
    });
  });
});