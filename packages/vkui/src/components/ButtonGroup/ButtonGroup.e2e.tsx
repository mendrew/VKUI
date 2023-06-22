import * as React from 'react';
import { test } from '@vkui-e2e/test';
import { ViewWidth } from '../../lib/adaptivity';
import {
  ButtonGroupPlayground,
  ButtonGroupWithAlignPlayground,
} from './ButtonGroup.e2e-playground';

test('ButtonGroup', async ({
  mount,
  expectA11yScanResults,
  expectScreenshotClippedToContent,
  componentPlaygroundProps,
}) => {
  await mount(<ButtonGroupPlayground {...componentPlaygroundProps} />);
  await expectA11yScanResults();
  await expectScreenshotClippedToContent();
});

test.describe('ButtonGroup', () => {
  test.use({
    adaptivityProviderProps: {
      viewWidth: ViewWidth.SMALL_TABLET,
    },
  });
  test('align', async ({
    mount,
    expectA11yScanResults,
    expectScreenshotClippedToContent,
    componentPlaygroundProps,
  }) => {
    await mount(<ButtonGroupWithAlignPlayground {...componentPlaygroundProps} />);
    await expectA11yScanResults();
    await expectScreenshotClippedToContent();
  });
});
