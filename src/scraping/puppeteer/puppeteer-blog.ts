import { getLogger } from 'log4js';
import moment from 'moment';
import * as path from 'path';
import { Browser, launch } from 'puppeteer';
import { Article } from '../../models/article';
import { launchOptions, viewPort } from './config';


/**
 * 記事の一覧を取得します.
 *
 * @export
 * @returns {Promise<Article[]>}
 */
export async function getArticles(): Promise<Article[]> {
  const logger = getLogger('puppeteer-blog');
  let browser: Browser | undefined;
  try {
    logger.info('getArticlesが呼び出されました.');
    logger.info('ヘッドレスブラウザを起動します.');
    browser = await launch(launchOptions);
    const page = await browser.newPage();
    await page.setViewport(viewPort);

    const url = 'http://localhost:3000/';
    logger.info(`URL ${url}に遷移します.`);
    const res = await page.goto(url, {
      waitUntil: 'domcontentloaded',
    });

    if (res == null) {
      throw new Error(`ページを取得できませんでした.`);
    }

    logger.info(`遷移結果 (Status Code = ${res.status()})`);
    if (res.status() != 200) {
      throw new Error(
        `ページを取得できませんでした(Status Code = ${res.status}).`,
      );
    }

    const filePath = path.join(
      './logs',
      `puppeteer-${moment().format('YYYYMMDD_HHmmss')}.png`,
    );

    logger.info(`スクリーンショットを取ります. ファイル名は ${filePath}です.`);
    await page.screenshot({
      path: filePath,
      type: 'png',
    });

    logger.info(
      `スクリーンショットを取りました. ファイル名は ${filePath}です.`,
    );

    logger.info('記事を取得します.');
    const articles: Article[] = await page.evaluate(() => {
      const divs = document.querySelectorAll('.card');
      const articles: { title: string; description: string }[] = [];
      for (const div of divs) {
        const title = div.querySelector('.card-header')?.textContent;
        const description = div.querySelector('.card-body')?.textContent;
        if (title && description) {
          articles.push({
            title,
            description,
          });
        }
      }
      return articles;
    });
    logger.info('記事を取得しました.');
    await browser.close();
    return articles;
  } catch (e) {
    logger.error('エラーが発生しました.');
    logger.error(e);
    if (browser) {
      await browser.close();
    }
    throw e;
  }
}
