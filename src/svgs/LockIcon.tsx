import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
import {Ref, forwardRef} from 'react';
const SvgComponent = (props: SvgProps, ref: Ref<SVGSVGElement>) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={12}
    height={12}
    fill="none"
    // @ts-ignore
    ref={ref}
    {...props}>
    <Path
      fill="#214C34"
      d="M9.349 5.302a.422.422 0 0 1-.419-.418V3.767C8.93 2.01 8.434.837 6 .837c-2.433 0-2.93 1.172-2.93 2.93v1.117c0 .229-.19.418-.419.418a.422.422 0 0 1-.418-.418V3.767C2.233 2.15 2.623 0 6 0s3.768 2.149 3.768 3.767v1.117c0 .229-.19.418-.42.418ZM6 10.046c-1 0-1.814-.814-1.814-1.813 0-1 .815-1.814 1.814-1.814 1 0 1.814.814 1.814 1.814 0 .999-.815 1.813-1.814 1.813Zm0-2.79a.981.981 0 0 0-.977.977c0 .535.441.976.977.976s.977-.44.977-.976A.981.981 0 0 0 6 7.256Z"
    />
    <Path
      fill="#214C34"
      d="M8.79 12H3.21C.747 12 0 11.252 0 8.79V7.675c0-2.46.748-3.209 3.21-3.209h5.58c2.462 0 3.21.748 3.21 3.21V8.79C12 11.252 11.252 12 8.79 12ZM3.21 5.302c-1.999 0-2.373.38-2.373 2.372v1.117c0 1.992.374 2.372 2.372 2.372h5.582c1.998 0 2.372-.38 2.372-2.372V7.674c0-1.992-.374-2.372-2.372-2.372H3.209Z"
    />
  </Svg>
);
const LockIcon = forwardRef(SvgComponent);
export {LockIcon};