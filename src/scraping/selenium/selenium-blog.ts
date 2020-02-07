import * as fs from 'fs';
import { getLogger } from 'log4js';
import moment from 'moment';
import * as path from 'path';
import { By, WebDriver } from 'selenium-webdriver';
import { Article } from '../../models/article';
import { DriverType, getWebDriver } from './config';


/**
 * 記事の一覧を取得します.
 *
 * @export
 * @param {DriverType} type
 * @returns {Promise<Article[]>}
 */
export async function getArticles(type: DriverType): Promise<Article[]> {
  const logger = getLogger(`selenium-blog-${type}`);
  let driver: WebDriver | undefined;
  try {
    logger.info('getArticlesが呼び出されました.');
    logger.info('ヘッドレスブラウザを起動します.');
    driver = await getWebDriver(type);
    const url = 'http://localhost:3000/';
    logger.info(`URL ${url}に遷移します.`);
    await driver.get(url);

    const filePath = path.join(
      './logs',
      `selenium-${type}-${moment().format('YYYYMMDD_HHmmss')}.png`,
    );

    logger.info(`スクリーンショットを取ります. ファイル名は ${filePath}です.`);
    const base64Image = await driver.takeScreenshot();
    fs.writeFileSync(filePath, Buffer.from(base64Image, 'base64'));

    logger.info(
      `スクリーンショットを取りました. ファイル名は ${filePath}です.`,
    );

    logger.info('記事を取得します.');
    const articles: Article[] = [];
    const divs = await driver.findElements(By.className('card'));
    for (const div of divs) {
      const header = await div.findElement(By.className('card-header'));
      const body = await div.findElement(By.className('card-body'));

      const title = await header.getText();
      const description = await body.getText();
      articles.push({
        title,
        description,
      });
    }
    logger.info('記事を取得しました.');
    await driver.quit();
    return articles;
  } catch (e) {
    logger.error('エラーが発生しました.');
    logger.error(e);
    if (driver) {
      await driver.quit();
    }
    throw e;
  }
}
