describe("ADMIN ROUTE ACCESS CONTROL", () => {

  beforeEach(() => {
    cy.on("uncaught:exception", () => false);
  });

  it("ADMIN can access /admin", () => {
    cy.visit("/admin", {
      onBeforeLoad(win) {
        win.__TEST_USER__ = {
          id: "1",
          email: "admin@gmail.com",
          role: "admin",
          username: "admin",
        };
      },
    });

    cy.url().should("include", "/admin");
    cy.contains(/додати/i).should("exist");
  });

  it("USER is redirected with alert", () => {
    cy.on("window:alert", text => {
      expect(text).to.contain("Доступ заборонено");
    });

    cy.visit("/admin", {
      onBeforeLoad(win) {
        win.__TEST_USER__ = {
          id: "2",
          email: "user@gmail.com",
          role: "user",
        };
      },
    });

    cy.url().should("eq", Cypress.config().baseUrl + "/");
  });

  it("GUEST is redirected with alert", () => {
    cy.on("window:alert", text => {
      expect(text).to.contain("Доступ заборонено");
    });

    cy.visit("/admin");

    cy.url().should("eq", Cypress.config().baseUrl + "/");
  });
});
