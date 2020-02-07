import { LaunchOptions, Viewport } from 'puppeteer';

// Puppeteer起動オプション.
export const launchOptions: LaunchOptions = {
  headless: false,
  args: ['--window-size=1920,1080'],
};

// ViewPort設定.
export const viewPort: Viewport = {
  width: 1920,
  height: 1080,
};
