// src/features/EndToEnd.test.js 

import puppeteer from 'puppeteer';


describe('Feature 2: Show/Hide an Event Details', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: false,  // Set to true to run tests without opening browser window
      slowMo: 250,      // Slow down actions by 250ms so you can see them
      timeout: 0        // Disable Puppeteer timeout
    });
    page = await browser.newPage();
    await page.goto('http://localhost:5173/');
    await page.waitForSelector('.event');
  }, 30000); // 30 seconds timeout for beforeAll
  

  afterAll(async () => {
    await browser.close();
  });

  test('An event element is collapsed by default', async () => {
    
    const eventDetails = await page.$('.event .details'); // Use your details selector
    expect(eventDetails).toBeNull();

  });

  test('User can expand an event to see details', async () => {
   
    await page.click('.event .details-btn'); // Simulate clicking "Details" button
    const eventDetails = await page.$('.event .details');
    expect(eventDetails).toBeDefined();

  });

  test('User can collapse an event to hide details', async () => {
    await page.click('.event .details-btn'); // Click again to collapse
    const eventDetails = await page.$('.event .details');
    if (eventDetails) {
      const isVisible = await page.evaluate(
        el => {
          const style = window.getComputedStyle(el);
          return style && style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0';
        },
        eventDetails
      );
      expect(isVisible).toBe(false);
    } else {
      expect(eventDetails).toBeNull();
    }
  });
});

describe('Feature 1: Filter Events By City', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: false,
      slowMo: 250,
      timeout: 0,
    });
    page = await browser.newPage();
    await page.goto('http://localhost:5173/');
  }, 30000);

  afterAll(async () => {
    await browser.close();
  });

  test('When user hasn\'t searched for a city, show upcoming events from all cities', async () => {
    // Wait for events to load
    await page.waitForSelector('#event-list .event');
    const events = await page.$$('#event-list .event');
    expect(events.length).toBeGreaterThan(0); // Or exact number if known
  });

  test('User should see a list of suggestions when they search for a city', async () => {
    await page.click('#city-search input.city', { clickCount: 3 }); // Click on city search input
    await page.keyboard.press('Backspace');
    await page.type('#city-search input.city', 'Berlin');
    await page.waitForSelector('.suggestions li');
    const suggestions = await page.$$('.suggestions li');
    expect(suggestions.length).toBeGreaterThan(0);
  }, 30000);

  test('User can select a city from the suggested list', async () => {
    await page.click('#city-search input.city', { clickCount: 3 }); // Focus input
    await page.keyboard.press('Backspace');
    await page.type('#city-search input.city', 'Berlin');
    await page.waitForSelector('.suggestions li');
    const suggestions = await page.$$('.suggestions li');
    await suggestions[0].click(); // Click first suggestion

    // Check input value updated
    const inputValue = await page.$eval('#city-search input.city', el => el.value);
    expect(inputValue).toBe('Berlin, Germany');

    // Check events filtered by city
    await page.waitForSelector('#event-list .event');
    const events = await page.$$('#event-list .event');
    expect(events.length).toBeGreaterThan(0);

    // Optionally, check that all events have location 'Berlin, Germany'
    for (const event of events) {
      const location = await event.$eval('.event-main h3', el => el.textContent);
      expect(location).toContain('Berlin, Germany');
    }
  }, 30000);
});