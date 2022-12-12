describe("App test", () => {
  beforeEach(() => {
    cy.visit("https://pragnam.github.io/QuoteCollector/");
  });
  it("display button", () => {
    cy.contains("Save Quote");
  });
  it("save quote", () => {
    cy.get("#save").click();
    cy.contains("Quote- -saved");
  });
  it("get quote", () => {
    cy.get("#get").click();
    cy.contains("Quotes displayed");
    cy.contains("hi");
  });
  it("get one quote", () => {
    cy.get("#getone").click();
    cy.contains("sup");
  });
  it("update quote", () => {
    cy.get("#update").click();
    cy.contains("Quote updated");
  });
  it("delete one quote", () => {
    cy.get("#deleteone").click();
    cy.contains("Quote deleted");
  });
  it("delete all quotes", () => {
    cy.get("#deleteall").click();
    cy.contains("Quotes deleted");
  });
});
