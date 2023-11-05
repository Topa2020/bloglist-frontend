describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'T Testaaja',
      username: 'Tee',
      password: 'passisana'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:5173')
  })

  it('Login form is shown', function() {
    cy.contains('username')
    cy.get('#username')
    cy.contains('password')
    cy.get('#password')
    cy.contains('login')
    cy.get('#login-button')
    cy.contains('cancel')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('Tee')
      cy.get('#password').type('passisana')
      cy.get('#login-button').click()

      cy.contains('T Testaaja logged in')
    })

    it('fails with incorrect credentials', function() {
      cy.get('#username').type('Tee')
      cy.get('#password').type('passana')
      cy.get('#login-button').click()

      cy.contains('wrong credentials').not('T Testaaja logged in')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.get('#username').type('Tee')
      cy.get('#password').type('passisana')
      cy.get('#login-button').click()
    })

    it('A blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#title-input').type('Testiblogi')
      cy.get('#author-input').type('Testailija')
      cy.get('#url-input').type('www.testi-url.com')
      cy.contains('save').click()

      cy.contains('Testiblogi, Testailija')
    })

    it('Like-button works', function() {
      cy.contains('new blog').click()
      cy.get('#title-input').type('Testiblogi')
      cy.get('#author-input').type('Testailija')
      cy.get('#url-input').type('www.testi-url.com')
      cy.contains('save').click()

      cy.contains('view').click()

      cy.get('#like-button').click()

      cy.contains('likes 1')
    })

    it('user can remove the blog', function() {
      cy.contains('new blog').click()
      cy.get('#title-input').type('Testiblogi')
      cy.get('#author-input').type('Testailija')
      cy.get('#url-input').type('www.testi-url.com')
      cy.contains('save').click()

      cy.contains('view').click()

      cy.contains('remove').click()

      cy.contains('Testiblogi, Testailija').should('not.exist')
    })

    it('Only user who added the blog can see remove-button', function() {
      const user = {
        name: 'Another User',
        username: 'another',
        password: 'passisana'
      }
      cy.request('POST', 'http://localhost:3003/api/users', user)

      cy.contains('new blog').click()
      cy.get('#title-input').type('Testiblogi')
      cy.get('#author-input').type('Testailija')
      cy.get('#url-input').type('www.testi-url.com')
      cy.contains('save').click()

      cy.contains('logout').click()

      cy.get('#username').type('another')
      cy.get('#password').type('passisana')
      cy.get('#login-button').click()

      cy.contains('view').click()

      cy.contains('remove').should('not.exist')
    })

    it('blogs are in correct order', function() {
      cy.contains('new blog').click()
      cy.get('#title-input').type('Testiblogi1')
      cy.get('#author-input').type('Testailija')
      cy.get('#url-input').type('www.testi-url1.com')
      cy.contains('save').click()

      cy.contains('new blog').click()
      cy.get('#title-input').type('Testiblogi2')
      cy.get('#author-input').type('Testailija')
      cy.get('#url-input').type('www.testi-url2.com')
      cy.contains('save').click()

      cy.contains('Testiblogi2').contains('view').click()
      cy.get('#like-button').click()

      cy.get('.blog').eq(0).should('contain', 'Testiblogi2, Testailija')
      cy.get('.blog').eq(1).should('contain', 'Testiblogi1, Testailija')

      cy.contains('Testiblogi2, Testailija').contains('hide').click()
      cy.contains('Testiblogi1').contains('view').click()
      cy.get('#like-button').click()
      cy.wait(500)
      cy.get('#like-button').click()
      cy.wait(500)
      cy.get('#like-button').click()

      cy.get('.blog').eq(1).should('contain', 'Testiblogi2, Testailija')
      cy.get('.blog').eq(0).should('contain', 'Testiblogi1, Testailija')

    })

  })





})