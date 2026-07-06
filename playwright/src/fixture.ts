import { test as base } from '@playwright/test';
import {
  ConfigLoader,
  composeOptions,
} from '@tiden/reporter-commons';
import { NetworkProfiler } from '@tiden/reporter-commons/profilers';

export const PROFILER_ATTACHMENT_NAME = 'tiden-profiler-steps.json';
export const PROFILER_CONTENT_TYPE = 'application/tiden.profiler-steps+json';

/**
 * Derives the reporter's own Tiden API host from `tiden.api.baseUrl`, if
 * configured, so network profiling doesn't capture the reporter's own
 * result-upload traffic. Returns undefined when unset or unparsable —
 * callers fall back to the user's explicit `skip_domains` config only.
 */
function getTidenApiHost(baseUrl: string | undefined): string | undefined {
  if (!baseUrl) return undefined;
  try {
    return new URL(baseUrl).host;
  } catch {
    return undefined;
  }
}

// Extend the base test with a tidenProfiler fixture that:
// 1. Reads config to check if network profiling is enabled
// 2. Uses snapshot/delta pattern on fallback accumulator (diagnostics_channel
//    handlers do not inherit AsyncLocalStorage context)
// 3. Serializes captured steps as a JSON attachment
export const test = base.extend<{ tidenProfiler: void }>({
  // eslint-disable-next-line no-empty-pattern
  tidenProfiler: [async ({}, use, testInfo) => {
    const configLoader = new ConfigLoader();
    const config = configLoader.load();
    const options = composeOptions({}, config);

    if (!options.profilers?.includes('network')) {
      await use();
      return;
    }

    const apiHost = getTidenApiHost(options.tiden?.api?.baseUrl);
    const skipDomains = [
      ...(options.networkProfiler?.skip_domains ?? []),
      ...(apiHost ? [apiHost] : []),
    ];

    const profiler = new NetworkProfiler({
      skipDomains,
      trackOnFail: options.networkProfiler?.track_on_fail,
    });
    profiler.enable();

    // Use snapshot/delta pattern with fallback accumulator because
    // diagnostics_channel handlers do not inherit AsyncLocalStorage context.
    const snapshot = profiler.getAllSteps().length;

    try {
      await use();

      const allSteps = profiler.getAllSteps();
      const steps = allSteps.slice(snapshot);

      // Serialize steps as attachment for reporter to pick up
      if (steps.length > 0) {
        await testInfo.attach(PROFILER_ATTACHMENT_NAME, {
          contentType: PROFILER_CONTENT_TYPE,
          body: Buffer.from(JSON.stringify(steps), 'utf8'),
        });
      }
    } finally {
      profiler.restore();
    }
  }, { auto: true, scope: 'test' }],
});
