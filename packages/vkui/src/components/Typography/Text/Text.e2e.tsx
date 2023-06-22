import * as React from 'react';
import { test } from '@vkui-e2e/test';
import { TextPlayground } from './Text.e2e-playground';

test('Text', async ({
  mount,
  expectA11yScanResults,
  expectScreenshotClippedToContent,
  componentPlaygroundProps,
}) => {
  await mount(<TextPlayground {...componentPlaygroundProps} />);
  await expectA11yScanResults();
  await expectScreenshotClippedToContent();
});
