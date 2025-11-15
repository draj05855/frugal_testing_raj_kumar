describe("Registration Form Automation", () => {
  const baseUrl = "http://localhost:5500"; // Update if needed

  // NEGATIVE TEST
  // it("Flow A: Negative Scenario - Missing Last Name", () => {
  //   cy.visit(baseUrl + "/index.html");

  //   cy.get("#firstName").type("Kartik");
  //   // Last Name intentionally skipped
  //   cy.get("#email").type("kartik@example.com");
  //   cy.get("#phone").type("+91-9876543210");

  //   cy.get('input[name="gender"]').first().check();
  //   cy.get("#country").select("IN");
  //   cy.get("#state").select("MH");
  //   cy.get("#city").select("Mumbai");

  //   cy.get("#password").type("Abcd1234!");
  //   cy.get("#confirmPassword").type("Abcd1234!");
  //   cy.get("#terms").check();

  //   cy.get("button[type=submit]").click();

  //   // Validation
  //   cy.get('.error[data-for="lastName"]').should("contain", "Last name required");

  //   // Screenshot
  //   cy.screenshot("error-state");
  // });
  it("Flow A: Negative Scenario - Missing Last Name", () => {
  cy.visit(baseUrl + "/index.html");

  cy.get("#firstName").type("Kartik");
  // Last Name intentionally skipped
  cy.get("#email").type("kartik@example.com");
  cy.get("#phone").type("+91-9876543210");

  cy.get('input[name="gender"]').first().check();
  cy.get("#country").select("IN");
  cy.get("#state").select("MH");
  cy.get("#city").select("Mumbai");

  cy.get("#password").type("Abcd1234!");
  cy.get("#confirmPassword").type("Abcd1234!");
  cy.get("#terms").check();

  // Submit button MUST be disabled for invalid form
  cy.get("button[type=submit]").should("be.disabled");

  // Now check for inline error message
  cy.get('.error[data-for="lastName"]').should(
    "contain",
    "Last name required"
  );

  cy.screenshot("error-state");
});


  // POSITIVE TEST
  it("Flow B: Positive Scenario - All Valid Fields", () => {
    cy.visit(baseUrl + "/index.html");

    cy.get("#firstName").type("Kartik");
    cy.get("#lastName").type("Narwal");
    cy.get("#email").type("kartik.real@example.com");
    cy.get("#phone").type("+91-9876543210");

    cy.get('input[name="gender"]').first().check();
    cy.get("#country").select("IN");
    cy.get("#state").select("MH");
    cy.get("#city").select("Mumbai");

    cy.get("#password").type("Abcd1234!");
    cy.get("#confirmPassword").type("Abcd1234!");
    cy.get("#terms").check();

    cy.get("button[type=submit]").should("not.be.disabled").click();

    cy.get("#alerts").should("contain", "Registration Successful");

    // Form Reset
    cy.get("#firstName").should("have.value", "");

    cy.screenshot("success-state");
  });

  // FORM LOGIC TEST
  it("Flow C: Form Logic (Dropdown + Password + Submit Button)", () => {
    cy.visit(baseUrl + "/index.html");

    // Country selection updates states
    cy.get("#country").select("US");
    cy.get("#state").children().should("have.length.greaterThan", 1);

    // State selection updates cities
    cy.get("#state").select("CA");
    cy.get("#city").children().should("have.length.greaterThan", 1);

    // Password strength
    cy.get("#password").type("abc");
    cy.get("#pwdStrength").should("contain", "Weak");

    // Confirm password mismatch
    cy.get("#confirmPassword").type("wrongpass");
    cy.get("button[type=submit]").should("be.disabled");
  });
});
