import * as React from 'react';
import { test } from '@vkui-e2e/test';
import { ButtonPlayground } from './Button.e2e-playground';

test('Button', async ({
  mount,
  expectA11yScanResults,
  expectScreenshotClippedToContent,
  componentPlaygroundProps,
}) => {
  await mount(<ButtonPlayground {...componentPlaygroundProps} />);
  await expectA11yScanResults();
  await expectScreenshotClippedToContent();
});
