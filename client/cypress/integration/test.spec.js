context('Actions', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000');
    })
    it('Check select input', () => {
        cy.get('#select-intervals~input')
            .should('have.value', '1')
        cy.get('#select-routes~input')
            .should('have.value', 'work-home')
    })

    it('Routes 5s, work-lunch', () => {
        cy.wait(5000);
        cy.get('#form-intervals')
            .click()
            .get('[data-value=5]')
            .click()
            .get('#select-intervals~input')
            .should('have.value', '5')
        cy.get('#form-routes')
            .click()
            .get('[data-value=work-lunch]')
            .click()
            .get('#select-routes~input')
            .should('have.value', 'work-lunch')
        cy.get('#setMap').click().get('.mapboxgl-canvas-container').should('not.be.empty');
    })
});
