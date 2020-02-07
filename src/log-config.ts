import * as log4js from 'log4js';
import * as path from 'path';

/**
 * ログの設定を初期化します.
 *
 * @export
 */
export function init() {
  log4js.configure({
    appenders: {
      system: { type: 'file', filename: path.join('./logs', 'system.log') },
      console: { type: 'console' },
    },
    categories: {
      default: { appenders: ['system', 'console'], level: 'info' },
    },
  });
}
