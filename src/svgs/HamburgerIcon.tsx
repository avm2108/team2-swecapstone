import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
import {Ref, forwardRef} from 'react';
const SvgComponent = (props: SvgProps, ref: Ref<SVGSVGElement>) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={17}
    fill="none"
    // @ts-ignore
    ref={ref}
    {...props}>
    <Path
      stroke="#214C34"
      strokeWidth={1.5}
      d="M0 1.25h20M0 8.75h20M0 16.25h20"
    />
  </Svg>
);
const HamburgerIcon = forwardRef(SvgComponent);
export {HamburgerIcon};
