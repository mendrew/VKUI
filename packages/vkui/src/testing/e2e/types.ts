import type { AppearanceType } from '@vkontakte/vk-bridge';
import type { AdaptivityProps } from '../../components/AdaptivityProvider/AdaptivityContext';
import { Platform } from '../../lib/platform';
import type { ComponentPlaygroundProps } from './ComponentPlayground';

export interface VKUITestOptions {
  platform: Platform;
  appearance: AppearanceType;
}

export interface InternalVKUITestOptions {
  adaptivityProviderProps?: null | Partial<AdaptivityProps>;
  onlyForPlatforms?: null | Platform[];
  onlyForAppearances?: null | AppearanceType[];
}

export interface ScreenshotWithClipToContentOptions {
  cropToContentSelector?: string;
}

export interface VKUITestHelpers {
  expectA11yScanResults(): Promise<void>;
  componentPlaygroundProps: ComponentPlaygroundProps;
  expectScreenshotClippedToContent(options?: ScreenshotWithClipToContentOptions): Promise<void>;
  /** @private  */
  _skipByOnlyForProps: void;
}
