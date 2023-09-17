import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
import {Ref, forwardRef} from 'react';
const SvgComponent = (props: SvgProps, ref: Ref<SVGSVGElement>) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={11}
    height={14}
    fill="none"
    // @ts-ignore
    ref={ref}
    {...props}>
    <Path
      fill="#214C34"
      d="M10.352 4.43C9.737 1.367 7.346 0 5.252 0h-.007C3.156 0 .772 1.368.15 4.423c-.698 3.41 1.172 6.3 2.864 8.124.628.675 1.432 1.012 2.237 1.012.805 0 1.61-.337 2.231-1.012 1.692-1.824 3.562-4.707 2.87-8.118Zm-3.16.548L4.825 7.622a.417.417 0 0 1-.314.146.417.417 0 0 1-.313-.146l-.888-.991a.541.541 0 0 1 0-.701.414.414 0 0 1 .627 0l.574.641 2.054-2.294a.414.414 0 0 1 .627 0 .541.541 0 0 1 0 .7Z"
    />
  </Svg>
);
const LocationFillIcon = forwardRef(SvgComponent);
export {LocationFillIcon};
