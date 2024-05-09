import * as React from "react"
import Svg, {
  G,
  Mask,
  Path,
  Defs,
  LinearGradient,
  Stop,
  ClipPath,
} from "react-native-svg"
const LogoSvg = (props: any) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.width || 43}
    height={props.height || 43}
    fill="none"
    {...props}
  >
    <G clipPath="url(#a)">
      <Mask
        id="b"
        width={43}
        height={43}
        x={0}
        y={0}
        maskUnits="userSpaceOnUse"
        style={{
          maskType: "luminance",
        }}
      >
        <Path fill="#fff" d="M42.667 0H0v42.667h42.667V0Z" />
      </Mask>
      <G mask="url(#b)">
        <Path fill="#fff" d="M37.333 5.333h-32v32h32v-32Z" />
        <Path
          fill="url(#c)"
          d="M16 10.667h-5.333V16H16v-5.333Zm-1.333 4H12V12h2.667v2.667Zm12 17.333H32v-5.333h-5.333V32ZM28 28h2.667v2.667H28V28Zm5.333-25.333h-24a6.674 6.674 0 0 0-6.666 6.666v24A6.674 6.674 0 0 0 9.333 40h24A6.674 6.674 0 0 0 40 33.333v-24a6.674 6.674 0 0 0-6.667-6.666ZM8 9.333C8 8.597 8.597 8 9.333 8h8c.736 0 1.334.597 1.334 1.333v8c0 .736-.598 1.334-1.334 1.334h-8A1.334 1.334 0 0 1 8 17.333v-8Zm0 12h2.667v4H8v-4Zm5.333 12c0 .736-.597 1.334-1.333 1.334H8V32h2.667v-4c0-.736.597-1.333 1.333-1.333h4v2.666h-2.667v4Zm8 0c0 .736-.597 1.334-1.333 1.334h-4V32h2.667v-2.667h2.666v4Zm0-6.666h-2.666V24h-5.334v-2.667H20c.736 0 1.333.598 1.333 1.334v4Zm13.334 6.666c0 .736-.598 1.334-1.334 1.334h-8A1.334 1.334 0 0 1 24 33.333v-8c0-.736.597-1.333 1.333-1.333h8c.736 0 1.334.597 1.334 1.333v8Zm0-13.333c0 .736-.598 1.333-1.334 1.333H22.667A1.334 1.334 0 0 1 21.333 20V9.333c0-.736.598-1.333 1.334-1.333h10.666c.736 0 1.334.597 1.334 1.333V20ZM24 18.667h8v-8h-8v8Zm2.667-5.334h2.666V16h-2.666v-2.667Z"
        />
      </G>
    </G>
    <Defs>
      <LinearGradient
        id="c"
        x1={6.393}
        x2={37.518}
        y1={4.482}
        y2={38.607}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#BB304A" />
        <Stop offset={1} stopColor="#E8B74C" />
      </LinearGradient>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h42.667v42.667H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)
export default LogoSvg
