import * as React from 'react';
import { test } from '@vkui-e2e/test';
import { SizeType } from '../../lib/adaptivity';
import { RadioPlayground, RadioWithSizesAndDescriptionPlayground } from './Radio.e2e-playground';

test.describe(() => {
  test.use({
    adaptivityProviderProps: {
      sizeX: SizeType.REGULAR,
    },
  });
  test('Radio', async ({
    mount,
    expectA11yScanResults,
    expectScreenshotClippedToContent,
    componentPlaygroundProps,
  }) => {
    await mount(<RadioPlayground {...componentPlaygroundProps} />);
    await expectA11yScanResults();
    await expectScreenshotClippedToContent();
  });
});

test.describe('Radio', () => {
  test('sizes and description', async ({
    mount,
    expectA11yScanResults,
    expectScreenshotClippedToContent,
    componentPlaygroundProps,
  }) => {
    await mount(<RadioWithSizesAndDescriptionPlayground {...componentPlaygroundProps} />);
    await expectA11yScanResults();
    await expectScreenshotClippedToContent();
  });
});
