import * as React from 'react';
import { test } from '@vkui-e2e/test';
import {
  TextareaPlayground,
  TextareaTestFitSizeToContentPlayground,
} from './Textarea.e2e-playground';

test('Textarea', async ({
  mount,
  expectA11yScanResults,
  expectScreenshotClippedToContent,
  componentPlaygroundProps,
}) => {
  await mount(<TextareaPlayground {...componentPlaygroundProps} />);
  await expectA11yScanResults();
  await expectScreenshotClippedToContent();
});

test.describe('Textarea', () => {
  test('fits size to content', async ({
    mount,
    page,
    expectA11yScanResults,
    expectScreenshotClippedToContent,
    componentPlaygroundProps,
  }) => {
    await mount(<TextareaTestFitSizeToContentPlayground {...componentPlaygroundProps} />);

    await page.type('#textarea', '1\n2\n3\n4\n5\n6\n7\n8');

    await expectA11yScanResults();
    await expectScreenshotClippedToContent();

    for (let i = 0; i < 12; i++) {
      await page.press('#textarea', 'Backspace');
    }

    await expectA11yScanResults();
    await expectScreenshotClippedToContent();
  });
});
