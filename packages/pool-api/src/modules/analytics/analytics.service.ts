import { Injectable } from '@nestjs/common';
import Analytics from '@rudderstack/rudder-sdk-node';

@Injectable()
export class AnalyticsService {
  public constructor() {}

  private get analytics() {
    return new Analytics(
      process.env.RUDDERSTACK_WRITE_KEY,
      `${process.env.RUDDERSTACK_DATA_PLANE_URL}/v1/batch`,
      {
        flushAt: 1,
      },
    );
  }

  public async track(
    event: string,
    userId: string,
    email: string,
    ip: string,
    props?: Record<string, any>,
  ) {
    const analytics = this.analytics;

    analytics.identify({
      userId: userId,
      traits: { email: email },
      context: { ip },
    });

    analytics.track({
      event: event,
      userId: userId,
      properties: props,
      context: { ip },
    });
  }
}
