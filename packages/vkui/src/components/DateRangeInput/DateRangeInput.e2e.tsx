import * as React from 'react';
import { test } from '@vkui-e2e/test';
import { DateRangeInputPlayground } from './DateRangeInput.e2e-playground';

test('DateRangeInput', async ({
  mount,
  expectA11yScanResults,
  expectScreenshotClippedToContent,
  componentPlaygroundProps,
}) => {
  await mount(<DateRangeInputPlayground {...componentPlaygroundProps} />);
  await expectA11yScanResults();
  await expectScreenshotClippedToContent();
});
