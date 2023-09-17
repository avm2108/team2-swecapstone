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
      fill="#214C34"
      d="M10.77 12.093h-.485V8.314c0-3.005-1.955-5.442-4.365-5.442S1.555 5.31 1.555 8.314v3.779H1.07c-.2 0-.364.206-.364.454 0 .247.165.453.364.453h9.7c.199 0 .364-.206.364-.454 0-.247-.165-.453-.364-.453ZM5.92 1.512c-.2 0-.364-.206-.364-.454V.453c0-.247.165-.453.364-.453.199 0 .364.206.364.453v.605c0 .248-.165.454-.364.454ZM2.525 2.722a.328.328 0 0 1-.257-.133l-.485-.605a.54.54 0 0 1 0-.64.317.317 0 0 1 .514 0l.485.604a.54.54 0 0 1 0 .64.328.328 0 0 1-.257.134ZM9.316 2.722a.328.328 0 0 1-.257-.133.54.54 0 0 1 0-.641l.485-.605a.317.317 0 0 1 .514 0 .54.54 0 0 1 0 .641l-.485.605a.328.328 0 0 1-.257.133Z"
    />
  </Svg>
);
const SOSIcon = forwardRef(SvgComponent);
export {SOSIcon};
