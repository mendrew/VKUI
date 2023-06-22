import * as React from 'react';
import { test } from '@vkui-e2e/test';
import { Platform } from '../../lib/platform';
import { TabbarPlayground } from './Tabbar.e2e-playground';

test.use({
  onlyForPlatforms: [Platform.ANDROID, Platform.IOS],
});

test('Tabbar', async ({
  mount,
  expectA11yScanResults,
  expectScreenshotClippedToContent,
  componentPlaygroundProps,
}) => {
  await mount(<TabbarPlayground {...componentPlaygroundProps} />);
  await expectA11yScanResults();
  await expectScreenshotClippedToContent();
});
