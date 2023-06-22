import * as React from 'react';
import { test } from '@vkui-e2e/test';
import { CellPlayground } from './Cell.e2e-playground';

test('Cell', async ({
  mount,
  expectA11yScanResults,
  expectScreenshotClippedToContent,
  componentPlaygroundProps,
}) => {
  await mount(<CellPlayground {...componentPlaygroundProps} />);
  await expectA11yScanResults();
  await expectScreenshotClippedToContent();
});
