import * as React from 'react';
import { test } from '@vkui-e2e/test';
import { CardPlayground } from './Card.e2e-playground';

test('Card', async ({
  mount,
  expectA11yScanResults,
  expectScreenshotClippedToContent,
  componentPlaygroundProps,
}) => {
  await mount(<CardPlayground {...componentPlaygroundProps} />);
  await expectA11yScanResults();
  await expectScreenshotClippedToContent();
});
