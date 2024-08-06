describe("template spec", () => {
  it("passes", () => {
    cy.visit("https://example.cypress.io");
  });
});

describe("Polly dashboard", () => {
  it("should select Sales", () => {
    cy.intercept("GET", "/api/sales/", (req) => {
      console.log("Intercepted request:", req);
      req.reply({
        statusCode: 200,
        body: {
          dataCollected: [
            { timestamp: "2020-07-04T04:30:41.000Z", amount: 357 },
            { timestamp: "2020-07-04T16:30:41.000Z", amount: 356 },
            { timestamp: "2020-07-05T16:30:41.000Z", amount: 364 },
          ],
        },
      });
    }).as("getSales");

    cy.visit("/");
    cy.get("select").select("Sales");
    cy.wait("@getSales");
  });

  it("should select Subscriptions", () => {
    cy.intercept("GET", "/api/subscriptions/", (req) => {
      console.log("Intercepted request:", req);
      req.reply({
        statusCode: 200,
        body: {
          dataCollected: [
            { timestamp: "2020-07-06T04:30:41.000Z", amount: 356 },

            { timestamp: "2020-07-06T16:30:41.000Z", amount: 362 },
            { timestamp: "2020-07-07T04:30:41.000Z", amount: 359 },

            { timestamp: "2020-01-07T16:30:41.000Z", amount: 347 },

            { timestamp: "2020-07-08T04:30:41.000Z", amount: 344 },
          ],
        },
      });
    }).as("getSubscriptions");

    cy.visit("/");
    cy.get("select").select("Subscriptions");
    cy.wait("@getSubscriptions");
  });

  it("should have two cards displaying total", () => {
    cy.visit("/");
    cy.get(".card").children().as("childrenCards");
    cy.get("@childrenCards").eq(0).should("have.text", "CellFast sales");
    cy.get("@childrenCards").eq(1).should("have.text", "$ 2235");
    cy.get("@childrenCards").eq(2).should("have.text", "CellNow subscriptions");
    cy.get("@childrenCards").eq(3).should("have.text", "$ 2304");
  });

  it("should display the correct totals", () => {
    cy.intercept("GET", "/api/totals/", (req) => {
      console.log("Intercepted request:", req);
      req.reply({
        statusCode: 200,
        body: {
          data: [
            {
              timestamp: "2020-06-17T06:44:02.676475",
              amount: 1902,
            },
            {
              timestamp: "2020-06-17T06:45:30.983656",
              amount: 893,
            },
          ],
          salesTotal: 2343,
          subscriptionsTotal: 2314,
        },
      });
    }).as("getTotals");

    cy.visit("/");
    cy.wait("@getTotals");

    cy.get(".card").children().as("childrenCards");
    cy.get("@childrenCards").eq(0).should("have.text", "CellFast sales");
    cy.get("@childrenCards").eq(1).should("have.text", "$ 2343");
    cy.get("@childrenCards").eq(2).should("have.text", "CellNow subscriptions");
    cy.get("@childrenCards").eq(3).should("have.text", "$ 2314");
  });
});
