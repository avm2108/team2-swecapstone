import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
import {Ref, forwardRef} from 'react';
const SvgComponent = (props: SvgProps, ref: Ref<SVGSVGElement>) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={6}
    height={6}
    fill="none"
    // @ts-ignore
    ref={ref}
    {...props}>
    <Path
      fill="#4EB780"
      d="M1.03 5.47a.466.466 0 0 1-.31.03.398.398 0 0 1-.21-.15.462.462 0 0 1-.09-.24.457.457 0 0 1 .29-.46l4.36-1.83v.62L.71 1.61a.474.474 0 0 1-.23-.19A.487.487 0 0 1 .51.9.398.398 0 0 1 .72.75a.466.466 0 0 1 .31.03l4 1.7c.307.127.46.34.46.64 0 .153-.04.287-.12.4a.771.771 0 0 1-.34.26l-4 1.69Z"
    />
  </Svg>
);
const ArrowRightSmallIcon = forwardRef(SvgComponent);
export {ArrowRightSmallIcon};
