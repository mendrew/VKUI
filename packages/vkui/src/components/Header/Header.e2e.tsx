import * as React from 'react';
import { test } from '@vkui-e2e/test';
import { HeaderPlayground } from './Header.e2e-playground';

test('Header', async ({
  mount,
  expectA11yScanResults,
  expectScreenshotClippedToContent,
  componentPlaygroundProps,
}) => {
  await mount(<HeaderPlayground {...componentPlaygroundProps} />);
  await expectA11yScanResults();
  await expectScreenshotClippedToContent();
});
