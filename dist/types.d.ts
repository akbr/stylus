type Styles = {
    [key: string]: string | number;
};
type InputStyles = Styles & {
    transform?: void;
};
type AnimationOptions = KeyframeAnimationOptions;
interface Controls {
    skip: () => void;
    finished: Promise<any>;
}
export function style(el: HTMLElement, styles: InputStyles): void;
export function style(el: HTMLElement, styles: InputStyles, animationOptions: AnimationOptions): Controls;

//# sourceMappingURL=types.d.ts.map
