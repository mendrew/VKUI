import * as React from 'react';
import { test } from '@vkui-e2e/test';
import { SimpleCellPlayground } from './SimpleCell.e2e-playground';

test('SimpleCell', async ({
  mount,
  expectA11yScanResults,
  expectScreenshotClippedToContent,
  componentPlaygroundProps,
}) => {
  await mount(<SimpleCellPlayground {...componentPlaygroundProps} />);
  await expectA11yScanResults();
  await expectScreenshotClippedToContent();
});
