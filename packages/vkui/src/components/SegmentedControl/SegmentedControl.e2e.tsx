import * as React from 'react';
import { test } from '@vkui-e2e/test';
import { SegmentedControlPlayground } from './SegmentedControl.e2e-playground';

test('SegmentedControl', async ({
  mount,
  expectA11yScanResults,
  expectScreenshotClippedToContent,
  componentPlaygroundProps,
}) => {
  await mount(<SegmentedControlPlayground {...componentPlaygroundProps} />);
  await expectA11yScanResults();
  await expectScreenshotClippedToContent();
});
