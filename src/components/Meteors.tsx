import { useMemo, type CSSProperties } from "react";
import "./Meteors.css";

type MeteorsProps = {
  number?: number;
  className?: string;
};

type MeteorSeed = {
  id: number;
  left: number;
  top: number;
  delay: number;
  duration: number;
  tail: number;
  size: number;
};

type MeteorStyle = CSSProperties & {
  "--meteor-tail"?: string;
  "--meteor-size"?: string;
};

const randomBetween = (min: number, max: number) => Math.random() * (max - min) + min;

export default function Meteors({ number = 30, className = "" }: MeteorsProps) {
  const meteors = useMemo<MeteorSeed[]>(
    () =>
      Array.from({ length: number }, (_, id) => ({
        id,
        left: randomBetween(35, 120),
        top: randomBetween(-20, 55),
        delay: randomBetween(0, 5),
        duration: randomBetween(2.8, 6.2),
        tail: randomBetween(60, 150),
        size: randomBetween(1.2, 2.8),
      })),
    [number]
  );

  return (
    <div className={`meteors ${className}`.trim()} aria-hidden="true">
      {meteors.map((meteor) => {
        const style: MeteorStyle = {
          left: `${meteor.left}%`,
          top: `${meteor.top}%`,
          animationDelay: `${meteor.delay}s`,
          animationDuration: `${meteor.duration}s`,
          "--meteor-tail": `${meteor.tail}px`,
          "--meteor-size": `${meteor.size}px`,
        };

        return <span key={meteor.id} className="meteor" style={style} />;
      })}
    </div>
  );
}
