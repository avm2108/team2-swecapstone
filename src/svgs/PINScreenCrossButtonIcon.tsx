import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

const PINScreenCrossButtonIcon = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={22}
    height={16}
    fill="none"
    {...props}>
    <Path
      fill="#4EB780"
      d="m6.545 15.273-.567.454a.727.727 0 0 0 .567.273v-.727ZM.727 8 .16 7.546a.727.727 0 0 0 0 .908L.727 8ZM6.545.727V0c-.22 0-.43.1-.567.273l.567.454Zm13.819 1.455v11.636h1.454V2.182h-1.454Zm-.728 12.364H6.546V16h13.09v-1.454Zm-12.523.273L1.295 7.546.16 8.454l5.819 7.273 1.135-.909ZM1.295 8.454l5.818-7.272-1.135-.91L.159 7.547l1.136.908Zm5.25-7h13.091V0H6.546v1.455Zm13.819 12.364a.727.727 0 0 1-.728.728V16a2.182 2.182 0 0 0 2.182-2.182h-1.454Zm1.454-11.636A2.182 2.182 0 0 0 19.636 0v1.455c.402 0 .728.325.728.727h1.454ZM8.94 5.605l5.818 5.818 1.03-1.028-5.82-5.818L8.94 5.605Zm5.818-1.028L8.94 10.395l1.029 1.028 5.818-5.818-1.029-1.028Z"
    />
  </Svg>
);
export {PINScreenCrossButtonIcon};