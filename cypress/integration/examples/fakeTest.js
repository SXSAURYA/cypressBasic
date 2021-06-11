describe('Mocking the request', function() {
    it('Mocking the PUT request for invalid request', function() {
        let message = 'Hey,comment don\'t exist';
        cy.server();
        cy.route({
            method: 'PUT',
            url: 'comments/*',
            status: 404,
            response: { error: message },
            delay: 1000 //ms
        }).as('updateComment');
        cy.visit('https://example.cypress.io/commands/network-requests');
        cy.get('.network-put').click();
        cy.get('.network-put-comment').should('contain', message);
    });

    it('Doing call API using cypress without cypress', function() {
        cy.server();
        let body = {
            "name": "Learn Appium Automation with Java",
            "isbn": "bvt",
            "aisle": "api",
            "author": "John foe"

        }
        cy.request('POST', 'http://216.10.245.166/Library/Addbook.php', body).then(function(response) {
            expect(response.body).to.have.property("Msg", "successfully added");
            expect(response.body).to.have.property("ID", body.isbn + body.aisle);
            expect(response.status).to.eq(200);
        })
    });
});