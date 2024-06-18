Feature("Empty Favorite Page");

Before(({ I }) => {
  I.amOnPage("/#/");
  I.click("Favorite", ".nav-menu");
});

Scenario("showing empty liked restaurants", ({ I }) => {
  I.seeElement(".data-none-image");
  I.seeElement('.data-none-image img[alt="No Data"]');
  I.dontSeeElement(".card");
});
