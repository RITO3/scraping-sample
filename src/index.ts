import * as log4js from 'log4js';
import * as logConfig from './log-config';
import * as puppeteer from './scraping/puppeteer/puppeteer-blog';
import { DriverType } from './scraping/selenium/config';
import * as selenium from './scraping/selenium/selenium-blog';


logConfig.init();

/**
 * Puppeteerでスクレイピングします.
 *
 */
async function runPuppeteer() {
  const logger = log4js.getLogger('runPuppeteer');
  const startTime = process.hrtime();
  const articles = await puppeteer.getArticles();
  logger.info(articles);
  const endTime = process.hrtime(startTime);
  logger.info(
    'Puppeteer Execution time (hr): %ds %dms',
    endTime[0],
    endTime[1] / 1000000,
  );
}

/**
 * Seleniumでスクレイピングします.
 *
 * @param {DriverType} type ドライバーの種類
 */
async function runSelenium(type: DriverType) {
  const logger = log4js.getLogger(`runSelenium(Type:${type})`);
  const startTime = process.hrtime();
  const articles = await selenium.getArticles(type);
  logger.info(articles);
  const endTime = process.hrtime(startTime);
  logger.info(
    `Selenium(${type}) Execution time (hr): %ds %dms`,
    endTime[0],
    endTime[1] / 1000000,
  );
}

async function main() {
  await runPuppeteer();
  await runSelenium('Chrome');
  await runSelenium('FireFox');
}

main();
