const puppeteer = require("puppeteer");
const chai = require("chai");
const expect = chai.expect;

const { Given, When, Then, Before, After } = require("cucumber");
const {
  clickElement,
  putText,
  getText,
  chooseTimeAndFilm,
} = require("../../lib/commands.js");

Before(async function () {
  const browser = await puppeteer.launch({ headless: false, slowMo: 50 });
  const page = await browser.newPage();
  this.browser = browser;
  this.page = page;
});

After(async function () {
  if (this.browser) {
    await this.browser.close();
  }
});

Given("user is on {string} page", async function (string) {
  return await this.page.goto(`${string}`);
});

When("user choose day {string}", async function (string) {
  if ((await string) == "Tomorrow") {
    await clickElement(this.page, ".page-nav > a:nth-child(2)");
  } else if ((await string) == "Day After Tomorrow") {
    await clickElement(this.page, ".page-nav > a:nth-child(3)");
  }
});

When(
  "user choose film {string} and time {string}",
  async function (string, string2) {
    return await chooseTimeAndFilm(
      this.page,
      ['"', string, '"'].join(""),
      ['"', string2, '"'].join("")
    );
  }
);

When(
  "user choose raw {string} and chair {string} and click it",
  async function (string, string2) {
    await clickElement(
      this.page,
      `.buying-scheme__wrapper > div:nth-child(${string}) > span:nth-child(${string2})`
    );
  }
);

When("user click on the book button", async function () {
  await clickElement(this.page, `body > main > section > button`);
});

When("user click on the get qr code button", async function () {
  await clickElement(this.page, `body > main > section > div > button`);
});

When("user click on the get booking code button", async function () {
  await clickElement(this.page, `button.acceptin-button`);
});

When("user sees the code and text first {string}", async function (string) {
  const actual = await getText(this.page, "h2.ticket__check-title");
  const expected = await string;
  expect(actual).contains(expected);
});

When("user reopen page {string}", async function (string) {
  return await this.page.goto(`${string}`, { setTimeout: 50000 });
});

Then("user sees the code and text", async function () {
  const actual = await getText(this.page, "p.ticket__hint");
  const expected =
    "Покажите QR-код нашему контроллеру для подтверждения бронирования.";
  expect(actual).contains(expected);
});

Then("button for booking is inactive", async function () {
  const actual = String(
    await this.page.$eval("button", (button) => {
      return button.disabled;
    })
  );
  const expected = "true";
  expect(actual).contains(expected);
});
