import * as React from 'react';
import Svg, {SvgProps, Path, Defs, Pattern, Use, Image} from 'react-native-svg';
import {Ref, forwardRef} from 'react';
const SvgComponent = (props: SvgProps, ref: Ref<SVGSVGElement>) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width={320}
    height={339}
    fill="none"
    // @ts-ignore
    ref={ref}
    {...props}>
    <Path fill="url(#a)" d="M-3 0h335v339H-3z" />
    <Defs>
      <Pattern
        id="a"
        width={1}
        height={1}
        patternContentUnits="objectBoundingBox">
        <Use xlinkHref="#b" transform="matrix(.00073 0 0 .00072 -.314 0)" />
      </Pattern>
      <Image
        id="b"
        width={2244}
        height={1394}
      />
    </Defs>
  </Svg>
);
const DummyMap = forwardRef(SvgComponent);
export {DummyMap};