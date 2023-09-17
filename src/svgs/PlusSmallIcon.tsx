import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
import {Ref, forwardRef} from 'react';
const SvgComponent = (props: SvgProps, ref: Ref<SVGSVGElement>) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={7}
    height={6}
    fill="none"
    // @ts-ignore
    ref={ref}
    {...props}>
    <Path
      fill="#4EB780"
      d="M3.502 5.648c-.161 0-.286-.044-.374-.132a.545.545 0 0 1-.132-.385V3.327h-1.77a.517.517 0 0 1-.364-.121.49.49 0 0 1-.132-.363c0-.154.044-.271.132-.352a.49.49 0 0 1 .363-.132h1.771V.61c0-.161.044-.286.132-.374.088-.088.216-.132.385-.132.161 0 .282.044.363.132.088.088.132.213.132.374v1.749H5.78c.161 0 .282.044.363.132.088.08.132.198.132.352a.49.49 0 0 1-.132.363c-.08.08-.202.121-.363.121H4.01v1.804c0 .161-.045.29-.133.385-.08.088-.205.132-.374.132Z"
    />
  </Svg>
);
const PlusSmallIcon = forwardRef(SvgComponent);
export {PlusSmallIcon};
