import * as React from 'react';
import { test } from '@vkui-e2e/test';
import { MiniInfoCellPlayground } from './MiniInfoCell.e2e-playground';

test('MiniInfoCell', async ({
  mount,
  expectA11yScanResults,
  expectScreenshotClippedToContent,
  componentPlaygroundProps,
}) => {
  await mount(<MiniInfoCellPlayground {...componentPlaygroundProps} />);
  await expectA11yScanResults();
  await expectScreenshotClippedToContent();
});
