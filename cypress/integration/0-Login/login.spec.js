/// <reference types="cypress" />

const widthSmallLaptop = 1280;
const heightSmallLaptop = 609;

const widthMediumLaptop = 1440;
const heightMediumLaptop = 900;

const widthSmallPhone = 375;
const heightSmallPhone = 547;

Cypress.config({
  viewportWidth: widthMediumLaptop,
  viewportHeight: heightMediumLaptop
});

beforeEach(() => {
  // cy.visit("http://localhost:4200/#/login");
  cy.restoreLocalStorage();
});

afterEach(() => {
  cy.saveLocalStorage();
});

describe("Check for diffrent login buttons and return button", () => {
  beforeEach(() => {
    cy.visit("http://localhost:4200/#/login");
  });

  it("displays two types of logins", () => {
    cy.get("[data-cy='desc-login'] button").should("have.length", 2);
    cy.get(".frame__choice button").first().should("have.text", "I have an e-mail servier.com or biogaran.fr");
    cy.get(".frame__choice button").last().should("have.text", "I have another e-mail address");
  });

  it("Displays the return button when azure is selected", () => {
    cy.get(".frame__choice button").first().click();
    cy.wait(500);
    cy.get("main .return.nav").should("be.visible");
  });

  it("Displays the return button when extern is selected", () => {
    cy.get(".frame__choice button").last().click();
    cy.wait(500);
    cy.get("main .return.nav").should("be.visible");
  });
});

function back() {
  cy.wait(1500);
  cy.go("back");
}
