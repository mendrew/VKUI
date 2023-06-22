import * as React from 'react';
import { test } from '@vkui-e2e/test';
import { SelectMimicryPlayground } from './SelectMimicry.e2e-playground';

test('SelectMimicry', async ({
  mount,
  expectA11yScanResults,
  expectScreenshotClippedToContent,
  componentPlaygroundProps,
}) => {
  await mount(<SelectMimicryPlayground {...componentPlaygroundProps} />);
  await expectA11yScanResults();
  await expectScreenshotClippedToContent();
});
