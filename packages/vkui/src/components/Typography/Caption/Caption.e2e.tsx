import * as React from 'react';
import { test } from '@vkui-e2e/test';
import { CaptionPlayground } from './Caption.e2e-playground';

test('Caption', async ({
  mount,
  expectA11yScanResults,
  expectScreenshotClippedToContent,
  componentPlaygroundProps,
}) => {
  await mount(<CaptionPlayground {...componentPlaygroundProps} />);
  await expectA11yScanResults();
  await expectScreenshotClippedToContent();
});
