export type Styles = { [key: string]: string | number };

export type InputStyles = Styles & {
  transform?: void;
};

export type AnimationOptions = KeyframeAnimationOptions;

export interface Controls {
  skip: () => void;
  finished: Promise<any>;
}
