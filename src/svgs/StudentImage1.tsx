import * as React from 'react';
import Svg, {SvgProps, Rect, Defs, Pattern, Use, Image} from 'react-native-svg';

const StudentImage1 = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width={15}
    height={15}
    fill="none"
    {...props}>
    <Rect width={15} height={15} fill="url(#a)" rx={7.5} />
    <Defs>
      <Pattern
        id="a"
        width={1}
        height={1}
        patternContentUnits="objectBoundingBox">
        <Use xlinkHref="#b" transform="scale(.00093)" />
      </Pattern>
      <Image
        id="b"
        width={1080}
        height={1080}
      />
    </Defs>
  </Svg>
);
export {StudentImage1};