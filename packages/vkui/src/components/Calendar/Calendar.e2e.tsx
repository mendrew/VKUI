import * as React from 'react';
import { test } from '@vkui-e2e/test';
import { CalendarPlayground } from './Calendar.e2e-playground';

test('Calendar', async ({
  mount,
  expectA11yScanResults,
  expectScreenshotClippedToContent,
  componentPlaygroundProps,
}) => {
  await mount(<CalendarPlayground {...componentPlaygroundProps} />);
  await expectA11yScanResults();
  await expectScreenshotClippedToContent();
});
