import * as NSentry from '@sentry/react-native';
import {Severity} from '@sentry/react-native';
import {SENTRY_DSN, SENTRY_TRACES, SENTRY_TRACING_ORIGINS} from '../config';
import {differenceInSeconds} from 'date-fns';
import * as React from 'react';
import {ReactNativeWrapperOptions} from '@sentry/react-native/dist/js/options';

const routingInstrumentation = new NSentry.ReactNavigationV5Instrumentation();

NSentry.init({
  dsn: SENTRY_DSN,
  enableAutoSessionTracking: true,
  tracesSampleRate: SENTRY_TRACES,
  tracesSampler: (samplingContext) => {
    if (samplingContext.parentSampled) {
      return true;
    }
    if (
      samplingContext.transactionContext.endTimestamp &&
      samplingContext.transactionContext.startTimestamp
    ) {
      const timeSec = differenceInSeconds(
        samplingContext.transactionContext.startTimestamp,
        samplingContext.transactionContext.endTimestamp,
      );
      if (timeSec > 0) {
        return true;
      }
    }
    return SENTRY_TRACES;
  },
  environment: 'alpha-private',
  integrations: [
    new NSentry.ReactNativeTracing({
      tracingOrigins: SENTRY_TRACING_ORIGINS,
      routingInstrumentation,
    }),
  ],
  enabled: !__DEV__,
});

class Sentry {
  static routingInstrumentation = routingInstrumentation;

  static logInfo(component: string, method: string, message: string): void {
    NSentry.addBreadcrumb({
      message,
      level: Severity.Info,
      data: {component, method},
    });
  }

  static infoEvent(component: string, method: string, message: string): void {
    NSentry.captureMessage(message, {
      level: Severity.Info,
      tags: {component, method},
    });
  }

  static logError(component: string, method: string, message: string): void {
    NSentry.captureMessage(message, {
      level: Severity.Error,
      tags: {component, method},
    });
  }

  static wrapInit<P>(
    RootComponent: React.ComponentType<P>,
    options?: ReactNativeWrapperOptions,
  ): React.ComponentType<P> {
    return NSentry.wrap(RootComponent, options);
  }
}

export default Sentry;
