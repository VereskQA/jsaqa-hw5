const {
  clickElement,
  getText,
  putText,
} = require("../jsaqa-hw5/lib/commands.js");
const { generateText } = require("../jsaqa-hw5/lib/util.js");

let page;

beforeEach(async () => {
  page = await browser.newPage();
  await page.goto("http://qamid.tmweb.ru/client/index.php");
});

afterEach(() => {
  page.close();
});

describe("Test suite for booking tickets", () => {
  test("Should book a ticket successfully", async () => {
    await clickElement(page, ".page-nav > a:nth-child(1)");
    await clickElement(page, "a.movie-seances__time");
    await clickElement(
      page,
      ".buying-scheme__wrapper > div:nth-child(4) > span:nth-child(5)"
    );
    await clickElement(page, "button.acceptin-button");
    await page.waitForSelector("h2.ticket__check-title");
    await clickElement(page, "button.acceptin-button");
    const actual = await getText(page, "h2.ticket__check-title");
    expect(actual).toContain("Электронный билет");
  });

  test("Should book two tickets for the second movie", async () => {
    await clickElement(page, ".page-nav > a:nth-child(2)");
    await clickElement(page, "a.movie-seances__time");
    await clickElement(
      page,
      ".buying-scheme__wrapper > div:nth-child(6) > span:nth-child(1)"
    );
    await clickElement(
      page,
      ".buying-scheme__wrapper > div:nth-child(6) > span:nth-child(3)"
    );
    await clickElement(page, "button.acceptin-button");
    await page.waitForSelector("h2.ticket__check-title");
    await clickElement(page, "button.acceptin-button");
    const actual = await getText(page, ".ticket__hint");
    expect(actual).toContain(
      "Покажите QR-код нашему контроллеру для подтверждения бронирования."
    );
  });

  test("Should not book one of the same ticket", async () => {
    await clickElement(page, ".page-nav > a:nth-child(3)");
    await clickElement(page, "a.movie-seances__time");
    await clickElement(
      page,
      ".buying-scheme__wrapper > div:nth-child(5) > span:nth-child(4)"
    );
    await clickElement(page, "button.acceptin-button");
    await page.waitForSelector("h2.ticket__check-title");
    await clickElement(page, "button.acceptin-button");
    const actual = await getText(page, "h2.ticket__check-title");
    expect(actual).toContain("Электронный билет");
    await page.goto("http://qamid.tmweb.ru/client/index.php");
    await clickElement(page, ".page-nav > a:nth-child(3)");
    await clickElement(page, "a.movie-seances__time");
    await clickElement(
      page,
      ".buying-scheme__wrapper > div:nth-child(5) > span:nth-child(4)"
    );
    expect(
      String(
        await page.$eval("button", (button) => {
          return button.disabled;
        })
      )
    ).toContain("true");
  });
});
