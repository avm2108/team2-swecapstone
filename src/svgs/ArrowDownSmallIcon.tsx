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
      d="M2.993 5.08a.76.76 0 0 1-.44-.13.958.958 0 0 1-.3-.4L.663.86a.847.847 0 0 1-.07-.41.443.443 0 0 1 .18-.3.7.7 0 0 1 .43-.12c.154 0 .277.037.37.11.094.067.177.197.25.39l1.35 3.37h-.3L4.263.52c.074-.187.157-.313.25-.38.1-.073.234-.11.4-.11.147 0 .264.04.35.12.087.073.14.173.16.3a.692.692 0 0 1-.07.4l-1.62 3.7a.86.86 0 0 1-.3.4.731.731 0 0 1-.44.13Z"
    />
  </Svg>
);
const ArrowDownSmallIcon = forwardRef(SvgComponent);
export {ArrowDownSmallIcon};
