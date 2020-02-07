export type DriverType = 'IE' | 'Chrome' | 'FireFox' | 'Edge';
import * as path from 'path';
import { Builder, Capabilities, WebDriver } from 'selenium-webdriver';
import * as chrome from 'selenium-webdriver/chrome';
import * as firefox from 'selenium-webdriver/firefox';

// Windowサイズ.
const windowSize = {
  width: 1920,
  height: 1080,
};

/**
 * Chromeドライバーを返します.
 *
 * @returns {Promise<WebDriver>}
 */
async function getChromeDriver(): Promise<WebDriver> {
  const driverPath = path.join(
    './drivers',
    'chromedriver_win32',
    'chromedriver.exe',
  );
  const driver = await new Builder()
    .withCapabilities(Capabilities.chrome())
    .setChromeService(new chrome.ServiceBuilder(driverPath))
    .setChromeOptions(
      new chrome.Options().windowSize(windowSize).addArguments('--incognito'),
    )
    .build();
  return driver;
}

/**
 * FireFoxドライバーを返します.
 *
 * @returns {Promise<WebDriver>}
 */
async function getFireFoxDriver(): Promise<WebDriver> {
  const driverPath = path.join(
    './drivers',
    'geckodriver-v0.26.0-win64',
    'geckodriver.exe',
  );
  const driver = await new Builder()
    .withCapabilities(Capabilities.firefox())
    .setFirefoxService(new firefox.ServiceBuilder(driverPath))
    .setFirefoxOptions(
      new firefox.Options().windowSize(windowSize)
      .setPreference('browser.privatebrowsing.autostart',true)
    )
    .build();
  return driver;
}


/**
 * 指定したドライバーの種類をもとに、ドライバーを返します.
 *
 * @export
 * @param {DriverType} type ドライバーの種類
 * @returns {Promise<WebDriver>}
 */
export async function getWebDriver(type: DriverType): Promise<WebDriver> {
  switch (type) {
    case 'Chrome':
      return getChromeDriver();

    case 'FireFox':
      return getFireFoxDriver();

    default:
      throw new Error(`Not support type ${type}.`);
  }
}
