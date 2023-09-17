import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
import {Ref, forwardRef} from 'react';
const SvgComponent = (props: SvgProps, ref: Ref<SVGSVGElement>) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={13}
    height={13}
    fill="none"
    // @ts-ignore
    ref={ref}
    {...props}>
    <Path
      fill="#214C34"
      d="M6.573 7.425H6.47C5.096 7.383 4.07 6.313 4.07 4.995a2.441 2.441 0 0 1 2.436-2.437 2.441 2.441 0 0 1 2.437 2.436 2.427 2.427 0 0 1-2.352 2.431h-.018ZM6.5 3.46a1.532 1.532 0 0 0-.06 3.06.508.508 0 0 1 .139 0 1.532 1.532 0 0 0-.079-3.06ZM6.5 13a6.476 6.476 0 0 1-4.383-1.705.457.457 0 0 1-.145-.381c.078-.72.526-1.39 1.27-1.886 1.801-1.198 4.722-1.198 6.518 0 .743.501 1.19 1.166 1.27 1.886a.433.433 0 0 1-.146.381A6.476 6.476 0 0 1 6.5 13Zm-3.579-2.207a5.568 5.568 0 0 0 3.58 1.3c1.312 0 2.575-.46 3.579-1.3-.109-.369-.399-.725-.828-1.016-1.488-.991-4.01-.991-5.509 0-.429.29-.713.647-.822 1.016Z"
    />
    <Path
      fill="#214C34"
      d="M6.5 13A6.505 6.505 0 0 1 0 6.5C0 2.914 2.914 0 6.5 0S13 2.914 13 6.5 10.086 13 6.5 13ZM6.5.907A5.6 5.6 0 0 0 .907 6.5 5.6 5.6 0 0 0 6.5 12.093 5.6 5.6 0 0 0 12.093 6.5 5.6 5.6 0 0 0 6.5.907Z"
    />
  </Svg>
);
const ProfileCircleIcon = forwardRef(SvgComponent);
export {ProfileCircleIcon};