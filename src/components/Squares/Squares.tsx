import React from "react";
import "./squares.css";
export const Squares = React.memo(SquaresMemo);
function SquaresMemo({ quantity = 30 }) {
  function getRandomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  const squares = React.useMemo(() => {
    let ret = [];
    for (let index = 0; index < quantity; index++) {
      let size = getRandomInt(5, 50);
      let delay = getRandomInt(5, 0.1);
      let duration = getRandomInt(24, 12);
      let position = getRandomInt(1, 99);
      ret.push(
        <li
          key={index}
          style={{
            height: `200px`,
            width: `200px`,
            top: `-500px`,
            left: `${position}%`,
            animationDelay: `${delay}s`,
            animationDuration: `${duration}s`,
            animationTimingFunction: `cubic-bezier(${Math.random()},${Math.random()},${Math.random()},${Math.random()})`,
            background: `#4c4d4e42`,
            boxShadow: `0 0 ${size}px #1313136`,
            borderRadius: `0px`,
          }}
        ></li>
      );
    }

    return ret;
  }, [quantity]);
  return <ul className="squares">{squares.map((item) => item)}</ul>;
}
