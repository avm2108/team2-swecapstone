import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
import {Ref, forwardRef} from 'react';
const SvgComponent = (props: SvgProps, ref: Ref<SVGSVGElement>) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={12}
    height={13}
    fill="none"
    // @ts-ignore
    ref={ref}
    {...props}>
    <Path
      fill="#4EB780"
      d="M5.524 7.808c-1.255 0-2.28-1.045-2.28-2.338 0-1.294 1.025-2.333 2.28-2.333s2.28 1.045 2.28 2.339c0 1.293-1.025 2.332-2.28 2.332Zm0-3.765c-.766 0-1.396.64-1.396 1.433 0 .791.624 1.432 1.396 1.432.772 0 1.396-.64 1.396-1.432 0-.792-.63-1.433-1.396-1.433Z"
    />
    <Path
      fill="#4EB780"
      d="M5.523 13a3.47 3.47 0 0 1-2.433-1.01C1.353 10.275-.567 7.537.157 4.28.811 1.324 3.327 0 5.523 0h.006c2.197 0 4.712 1.324 5.366 4.285.719 3.258-1.201 5.99-2.94 7.706A3.47 3.47 0 0 1 5.524 13Zm0-12.093c-1.714 0-3.917.936-4.5 3.571-.636 2.847 1.107 5.3 2.686 6.854a2.56 2.56 0 0 0 3.634 0c1.573-1.553 3.317-4.007 2.692-6.854C9.446 1.843 7.237.907 5.523.907Z"
    />
  </Svg>
);
const LocationOutlineIcon = forwardRef(SvgComponent);
export {LocationOutlineIcon};
