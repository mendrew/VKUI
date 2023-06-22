import * as React from 'react';
import { test } from '@vkui-e2e/test';
import { WriteBarPlayground } from './WriteBar.e2e-playground';

test('WriteBar', async ({
  mount,
  expectA11yScanResults,
  expectScreenshotClippedToContent,
  componentPlaygroundProps,
}) => {
  await mount(<WriteBarPlayground {...componentPlaygroundProps} />);
  await expectA11yScanResults();
  await expectScreenshotClippedToContent();
});
