import * as React from 'react';
import { test } from '@vkui-e2e/test';
import { TabsPlayground } from './Tabs.e2e-playground';

test('Tabs', async ({
  mount,
  expectA11yScanResults,
  expectScreenshotClippedToContent,
  componentPlaygroundProps,
}) => {
  await mount(<TabsPlayground {...componentPlaygroundProps} />);
  await expectA11yScanResults();
  await expectScreenshotClippedToContent();
});
