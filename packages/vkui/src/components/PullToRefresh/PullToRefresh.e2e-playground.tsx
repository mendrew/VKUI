import * as React from 'react';
import { ComponentPlayground, type ComponentPlaygroundProps } from '@vkui-e2e/playground-helpers';
import { AdaptivityProvider } from '../AdaptivityProvider/AdaptivityProvider';
import { AppRoot } from '../AppRoot/AppRoot';
import { ConfigProvider } from '../ConfigProvider/ConfigProvider';
import { Div } from '../Div/Div';
import { PullToRefresh, type PullToRefreshProps } from './PullToRefresh';

export const PullToRefreshPlayground = (props: ComponentPlaygroundProps) => {
  return (
    <ComponentPlayground
      {...props}
      propSets={[
        {
          isFetching: [false],
        },
      ]}
    >
      {({ appearance, ...props }: ComponentPlaygroundProps & PullToRefreshProps) => (
        <ConfigProvider appearance={appearance}>
          <AdaptivityProvider hasPointer>
            <AppRoot>
              <Div>
                <PullToRefresh {...props}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed a sollicitudin
                  lectus, a commodo sapien. Vivamus a urna leo. Integer iaculis dignissim urna, sit
                  amet vestibulum diam bibendum a. Donec eu arcu ut augue porttitor faucibus.
                  Vestibulum nec pretium tortor, sit amet congue nunc. Aenean ullamcorper ex sem,
                  sed interdum quam consequat et. Vestibulum a ex non diam fringilla feugiat. Nunc
                  eu tellus sed leo elementum cursus. Mauris blandit porta egestas. Curabitur eget
                  justo elementum, malesuada lacus ut, congue mauris. Integer orci nisi, convallis
                  vitae dapibus sit amet, molestie a risus. Aenean ultricies lacus eros, sit amet
                  condimentum urna malesuada et. Sed quis dolor tempus orci fringilla volutpat in
                  sed velit. Aenean aliquet bibendum pretium.
                  <br />
                  <br />
                  Cras pulvinar lobortis purus. Donec placerat suscipit leo vitae sodales. Phasellus
                  convallis lorem vitae arcu finibus pellentesque. In imperdiet vel leo a euismod.
                  Nam sed odio a neque venenatis suscipit a placerat magna. Mauris magna nisl,
                  consequat nec augue vitae, ultricies scelerisque ante. Phasellus pharetra risus
                  eget imperdiet sodales. Integer dignissim auctor semper. Nulla odio odio, euismod
                  ut interdum in, bibendum sed massa. Proin rutrum molestie massa in ultrices. Donec
                  eu euismod turpis, eget lobortis lorem. Nulla facilisi. Nam lacinia posuere
                  turpis, sed laoreet turpis auctor nec.
                  <br />
                  <br />
                </PullToRefresh>
              </Div>
            </AppRoot>
          </AdaptivityProvider>
        </ConfigProvider>
      )}
    </ComponentPlayground>
  );
};

// export const SliderPlaygroundForKeyboardTest = ({
//   appearance,
//   ...restProps
// }: ComponentPlaygroundProps & (SliderProps | SliderMultipleProps)) => {
//   return (
//     <ConfigProvider appearance={appearance}>
//       <AdaptivityProvider hasPointer>
//         <AppRoot>
//           <Slider style={{ minWidth: '320px' }} {...restProps} />
//         </AppRoot>
//       </AdaptivityProvider>
//     </ConfigProvider>
//   );
// };
