import React, { useEffect, useRef } from "react";
import VanillaTilt, { TiltOptions } from "vanilla-tilt";

interface Tilt extends HTMLDivElement {
  vanillaTilt: {
    destroy: () => void;
  };
}
interface Props
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  options: TiltOptions;
}
export default function Tilt(props: Props) {
  const { options, ...rest } = props;
  const tilt = useRef<Tilt | null>(null);

  useEffect(() => {
    const tiltDiv = tilt.current;
    if (tiltDiv) VanillaTilt.init(tiltDiv, options);
    return () => {
      if (tiltDiv) {
        tiltDiv.vanillaTilt.destroy();
      }
    };
  }, [options]);

  return <div ref={tilt} {...rest} />;
}
