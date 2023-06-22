import * as React from 'react';
import { test } from '@vkui-e2e/test';
import { ChipPlayground } from './Chip.e2e-playground';

test('Chip', async ({
  mount,
  expectA11yScanResults,
  expectScreenshotClippedToContent,
  componentPlaygroundProps,
}) => {
  await mount(<ChipPlayground {...componentPlaygroundProps} />);
  await expectA11yScanResults();
  await expectScreenshotClippedToContent();
});
