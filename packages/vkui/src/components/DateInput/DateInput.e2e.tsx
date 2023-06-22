import * as React from 'react';
import { test } from '@vkui-e2e/test';
import { DateInputPlayground } from './DateInput.e2e-playground';

test('DateInput', async ({
  mount,
  expectA11yScanResults,
  expectScreenshotClippedToContent,
  componentPlaygroundProps,
}) => {
  await mount(<DateInputPlayground {...componentPlaygroundProps} />);
  await expectA11yScanResults();
  await expectScreenshotClippedToContent();
});
