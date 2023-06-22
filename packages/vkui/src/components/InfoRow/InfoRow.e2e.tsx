import * as React from 'react';
import { test } from '@vkui-e2e/test';
import { InfoRowPlayground } from './InfoRow.e2e-playground';

test('InfoRow', async ({
  mount,
  expectA11yScanResults,
  expectScreenshotClippedToContent,
  componentPlaygroundProps,
}) => {
  await mount(<InfoRowPlayground {...componentPlaygroundProps} />);
  await expectA11yScanResults();
  await expectScreenshotClippedToContent();
});
