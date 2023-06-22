import * as React from 'react';
import { test } from '@vkui-e2e/test';
import { FormItemPlayground } from './FormItem.e2e-playground';

test('FormItem', async ({
  mount,
  expectA11yScanResults,
  expectScreenshotClippedToContent,
  componentPlaygroundProps,
}) => {
  await mount(<FormItemPlayground {...componentPlaygroundProps} />);
  await expectA11yScanResults();
  await expectScreenshotClippedToContent();
});
