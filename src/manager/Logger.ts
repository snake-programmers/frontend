import Sentry from './Sentry';

interface RequestMessage {
  method: string;
  url: string;
  queryString: string;
  headers: {[key: string]: string};
  data?: unknown;
  responseCode: number;
  responseMessage?: string;
}

class Logger {
  static debug(component: string, method: string, message: string): void {
    if (__DEV__) {
      console.log(`[DEBUG][${component}#${method}]`, message);
    }
  }

  static info(component: string, method: string, message: string): void {
    Sentry.logInfo(component, method, message);
    if (__DEV__) {
      console.log(`[INFO][${component}#${method}]`, message);
    }
  }

  static infoEvent(component: string, method: string, message: string): void {
    Sentry.infoEvent(component, method, message);
    if (__DEV__) {
      console.log(`[INFO][${component}#${method}]`, message);
    }
  }

  static error(component: string, method: string, message: string): void {
    Sentry.logError(component, method, message);
    if (__DEV__) {
      console.log(`[ERROR][${component}#${method}]`, message);
    }
  }

  static request(message: RequestMessage): void {
    if (__DEV__) {
      const url =
        message.url +
        (message.queryString.length > 0 ? `?${message.queryString}` : '');
      let msg = `[REQUEST][${message.responseCode}] ${message.method} ${url} \n`;
      for (const header of Object.getOwnPropertyNames(message.headers)) {
        const value = message.headers[header];
        msg += `[HEADER] ${header}: ${value}`;
      }
      if (message.data) {
        msg += `[REQDATA] \`${JSON.stringify(message.data)}\``;
      }
      if (message.responseMessage) {
        msg += `[RESPONSE] \`${message.responseMessage}\``;
      }
      console.log(msg);
    }
  }

  static requestRetry(url: string, status: number): void {
    if (__DEV__) {
      console.log(`[RETRY][${status}] ${url}`);
    }
  }
}

export default Logger;
