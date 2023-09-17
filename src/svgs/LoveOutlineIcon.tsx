import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
import {Ref, forwardRef} from 'react';
const SvgComponent = (props: SvgProps, ref: Ref<SVGSVGElement>) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={15}
    height={14}
    fill="none"
    // @ts-ignore
    ref={ref}
    {...props}>
    <Path
      stroke="#4EB780"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M7.903 12.511a1.417 1.417 0 0 1-.806 0C5.212 11.868 1 9.184 1 4.635A3.623 3.623 0 0 1 4.614 1c1.183 0 2.23.572 2.886 1.456A3.594 3.594 0 0 1 10.386 1 3.623 3.623 0 0 1 14 4.633c0 4.55-4.212 7.235-6.097 7.878Z"
    />
  </Svg>
);
const LoveOutlineIcon = forwardRef(SvgComponent);
export {LoveOutlineIcon};
