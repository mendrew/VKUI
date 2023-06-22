import * as React from 'react';
import { test } from '@vkui-e2e/test';
import { SizeType } from '../../lib/adaptivity';
import {
  CheckboxPlayground,
  CheckboxSimplePlayground,
  CheckboxSizesAndDescriptionPlayground,
} from './Checkbox.e2e-playground';

test.describe('Checkbox', () => {
  test('sizes and description', async ({
    mount,
    expectA11yScanResults,
    expectScreenshotClippedToContent,
    componentPlaygroundProps,
  }) => {
    await mount(<CheckboxSizesAndDescriptionPlayground {...componentPlaygroundProps} />);
    await expectA11yScanResults();
    await expectScreenshotClippedToContent();
  });

  test('simple', async ({
    mount,
    expectA11yScanResults,
    expectScreenshotClippedToContent,
    componentPlaygroundProps,
  }) => {
    await mount(<CheckboxSimplePlayground {...componentPlaygroundProps} />);
    await expectA11yScanResults();
    await expectScreenshotClippedToContent();
  });
});

test.describe(() => {
  const testOptions = {
    adaptivityProviderProps: { sizeY: SizeType.REGULAR },
  };
  test.use(testOptions);
  test('Checkbox', async ({
    mount,
    expectA11yScanResults,
    expectScreenshotClippedToContent,
    componentPlaygroundProps,
  }) => {
    await mount(<CheckboxPlayground {...componentPlaygroundProps} />);
    await expectA11yScanResults();
    await expectScreenshotClippedToContent();
  });
});
