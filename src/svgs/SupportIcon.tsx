import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
import {Ref, forwardRef} from 'react';
const SvgComponent = (props: SvgProps, ref: Ref<SVGSVGElement>) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={12}
    height={14}
    fill="none"
    // @ts-ignore
    ref={ref}
    {...props}>
    <Path
      fill="#214C34"
      d="M6 13.225c-.43 0-.868-.166-1.194-.493l-1.052-1.04c-.265-.258-.61-.4-.979-.4h-.467A2.3 2.3 0 0 1 0 9.003V2.29A2.3 2.3 0 0 1 2.308 0h7.384A2.3 2.3 0 0 1 12 2.29v6.713a2.3 2.3 0 0 1-2.308 2.29h-.467c-.37 0-.72.14-.979.4l-1.052 1.04A1.692 1.692 0 0 1 6 13.224ZM2.308.917c-.763 0-1.385.615-1.385 1.366v6.714c0 .757.622 1.366 1.385 1.366h.467c.616 0 1.194.24 1.631.67l1.052 1.04a.78.78 0 0 0 1.09 0l1.052-1.04a2.31 2.31 0 0 1 1.63-.67h.462c.763 0 1.385-.615 1.385-1.366V2.283c0-.757-.622-1.366-1.385-1.366H2.308Z"
    />
    <Path
      fill="#214C34"
      d="M5.003 8.154H3.354a.84.84 0 0 1-.683-.351.8.8 0 0 1-.117-.714c.215-.658.745-1.015 1.212-1.335.493-.332.77-.542.77-.899a.578.578 0 1 0-1.157 0c0 .253-.21.462-.462.462a.465.465 0 0 1-.461-.462c0-.824.67-1.501 1.501-1.501A1.5 1.5 0 0 1 5.46 4.855c0 .868-.653 1.311-1.176 1.668-.326.222-.634.43-.787.708h1.501c.252 0 .462.209.462.461a.46.46 0 0 1-.456.462ZM8.485 8.154a.465.465 0 0 1-.461-.462v-.424H6.812a.852.852 0 0 1-.733-.419.84.84 0 0 1 0-.849c.419-.72.905-1.538 1.348-2.252a.818.818 0 0 1 1.514.437V6.35h.135c.252 0 .462.209.462.461 0 .253-.21.462-.462.462h-.13v.424a.456.456 0 0 1-.46.456Zm-.461-3.612a99.23 99.23 0 0 0-1.077 1.803h1.077V4.542Z"
    />
  </Svg>
);
const SupportIcon = forwardRef(SvgComponent);
export {SupportIcon};