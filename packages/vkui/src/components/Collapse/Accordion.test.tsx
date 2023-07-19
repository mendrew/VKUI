import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { baselineComponent } from '../../testing/utils';
import { Collapse } from './Accordion';

describe(Collapse, () => {
  baselineComponent(Collapse.Content);
  baselineComponent(Collapse.Summary, { a11y: false });

  it('toggles on click', () => {
    render(
      <Collapse>
        <Collapse.Summary iconPosition="before" data-testid="summary">
          Title
        </Collapse.Summary>
        <Collapse.Content data-testid="content">Content</Collapse.Content>
      </Collapse>,
    );
    const content = screen.getByTestId<HTMLDivElement>('content');
    const summary = screen.getByTestId('summary');
    expect(content.getAttribute('aria-hidden')).toBe('true');

    fireEvent.click(summary);
    expect(content.getAttribute('aria-hidden')).toBe('false');

    fireEvent.click(summary);
    expect(content.getAttribute('aria-hidden')).toBe('true');
  });
});
