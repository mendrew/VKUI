import * as React from 'react';
import { test } from '@vkui-e2e/test';
import { AccordionPlayground } from './Accordion.e2e-playground';

test('Accordion', async ({
  mount,
  expectA11yScanResults,
  expectScreenshotClippedToContent,
  componentPlaygroundProps,
}) => {
  await mount(<AccordionPlayground {...componentPlaygroundProps} />);
  await expectA11yScanResults();
  await expectScreenshotClippedToContent();
});
