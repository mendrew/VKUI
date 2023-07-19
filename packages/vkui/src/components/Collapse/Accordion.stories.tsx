import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { CanvasFullLayout, DisableCartesianParam } from '../../storybook/constants';
import { Div } from '../Div/Div';
import { Group } from '../Group/Group';
import { Collapse, CollapseProps } from './Accordion';

const story: Meta<CollapseProps> = {
  title: 'Blocks/Collapse',
  component: Collapse,
  parameters: { ...CanvasFullLayout, ...DisableCartesianParam },
};

export default story;

export const Playground: StoryObj<CollapseProps> = {
  render: (args) => (
    <Collapse {...args}>
      <Collapse.Summary>Title</Collapse.Summary>
      <Div>Content</Div>
    </Collapse>
  ),
  decorators: [
    (Component) => (
      <Group>
        <Component />
      </Group>
    ),
  ],
};
