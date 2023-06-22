import * as React from 'react';
import { test } from '@vkui-e2e/test';
import { GridAvatarPlayground } from './GridAvatar.e2e-playground';

test('GridAvatar', async ({
  mount,
  expectA11yScanResults,
  expectScreenshotClippedToContent,
  componentPlaygroundProps,
}) => {
  await mount(<GridAvatarPlayground {...componentPlaygroundProps} />);
  await expectA11yScanResults();
  await expectScreenshotClippedToContent();
});
