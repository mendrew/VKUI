import * as React from 'react';
import { test } from '@vkui-e2e/test';
import { HeadlinePlayground } from './Headline.e2e-playground';

test('Headline', async ({
  mount,
  expectA11yScanResults,
  expectScreenshotClippedToContent,
  componentPlaygroundProps,
}) => {
  await mount(<HeadlinePlayground {...componentPlaygroundProps} />);
  await expectA11yScanResults();
  await expectScreenshotClippedToContent();
});
