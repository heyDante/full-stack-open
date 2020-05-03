describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3000/api/testing/reset');
    const newUser = {
      username: 'markevans',
      name: 'Mark Evans',
      password: 'marky'
    };
    /* -- Creating new user -- */
    cy.request('POST', 'http://localhost:3000/api/users', newUser);


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
});