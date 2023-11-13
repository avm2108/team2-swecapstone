import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

const GreenColorTimer = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={17}
    height={18}
    fill="none"
    {...props}>
    <Path
      fill="#4EB780"
      d="M8.44 17.667c-4.389 0-7.955-3.924-7.955-8.75C.485 4.09 4.05.167 8.439.167s7.955 3.923 7.955 8.75c0 4.826-3.567 8.75-7.955 8.75Zm0-16.28c-3.774 0-6.845 3.379-6.845 7.53 0 4.15 3.07 7.529 6.844 7.529 3.774 0 6.845-3.378 6.845-7.53 0-4.15-3.07-7.528-6.845-7.528Z"
    />
    <Path
      fill="#4EB780"
      d="M11.184 12.116a.463.463 0 0 1-.28-.09L8.608 10.52c-.57-.374-.991-1.196-.991-1.92V5.261c0-.334.251-.61.555-.61.303 0 .555.276.555.61v3.337c0 .293.222.725.451.871l2.294 1.506c.266.17.348.545.192.838a.561.561 0 0 1-.48.302Z"
    />
  </Svg>
);
export {GreenColorTimer};
