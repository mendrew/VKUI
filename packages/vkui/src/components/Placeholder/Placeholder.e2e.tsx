import * as React from 'react';
import { test } from '@vkui-e2e/test';
import { SizeType } from '../../lib/adaptivity';
import { PlaceholderPlayground } from './Placeholder.e2e-playground';

test.use({
  adaptivityProviderProps: {
    sizeX: SizeType.REGULAR,
  },
});

test('Placeholder', async ({
  mount,
  expectA11yScanResults,
  expectScreenshotClippedToContent,
  componentPlaygroundProps,
}) => {
  await mount(<PlaceholderPlayground {...componentPlaygroundProps} />);
  await expectA11yScanResults();
  await expectScreenshotClippedToContent();
});
