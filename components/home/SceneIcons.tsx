import type { SVGProps } from "react";

// Flat illustrations for the category tiles. They are the stand-in for the 3D
// objects (monitor, brain, PCB, server, flask) and also the static fallback for
// phones. Color comes from `currentColor`, so set it with a text-cat-* class.
function Illustration(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 96 96"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    />
  );
}

const TINT = { fill: "currentColor", fillOpacity: 0.16 } as const;

export function MonitorIllustration(props: SVGProps<SVGSVGElement>) {
  return (
    <Illustration {...props}>
      <rect x="10" y="14" width="76" height="50" rx="8" {...TINT} />
      <path d="M48 64v10M30 78h36" strokeWidth={3} />
      <path d="M24 30l9 8-9 8M42 48h16" />
    </Illustration>
  );
}

export function BrainIllustration(props: SVGProps<SVGSVGElement>) {
  // One hemisphere, drawn twice (the second is mirrored around the middle).
  const hemisphere = (
    <>
      <path
        d="M48 20C42 11 27 13 24 25 14 27 11 40 18 46 12 55 19 68 30 67 33 76 44 78 48 72Z"
        {...TINT}
      />
      <path d="M30 32c7 0 9 5 6 10M22 50c7-1 11 3 9 9M40 24c0 6 3 9 8 9" />
    </>
  );
  return (
    <Illustration {...props}>
      {hemisphere}
      <g transform="translate(96 0) scale(-1 1)">{hemisphere}</g>
      <path d="M48 72v8" strokeWidth={3} />
    </Illustration>
  );
}

export function PcbIllustration(props: SVGProps<SVGSVGElement>) {
  return (
    <Illustration {...props}>
      <rect x="10" y="14" width="76" height="68" rx="9" {...TINT} />
      <rect x="35" y="36" width="26" height="26" rx="4" />
      <path d="M41 30v6M55 30v6M41 62v6M55 62v6M29 43h6M29 55h6M61 43h6M61 55h6" />
      <path d="M20 26h12l5 4M76 70H64l-5-4M20 68h12l3-6M76 28H66l-5 8" />
      <circle cx="20" cy="26" r="2.5" fill="currentColor" stroke="none" />
      <circle cx="76" cy="70" r="2.5" fill="currentColor" stroke="none" />
      <circle cx="20" cy="68" r="2.5" fill="currentColor" stroke="none" />
      <circle cx="76" cy="28" r="2.5" fill="currentColor" stroke="none" />
    </Illustration>
  );
}

export function ServerIllustration(props: SVGProps<SVGSVGElement>) {
  return (
    <Illustration {...props}>
      {[14, 38, 62].map((y) => (
        <g key={y}>
          <rect x="14" y={y} width="68" height="20" rx="6" {...TINT} />
          <circle
            cx="27"
            cy={y + 10}
            r="2.5"
            fill="currentColor"
            stroke="none"
          />
          <path d={`M40 ${y + 10}h26`} />
        </g>
      ))}
      <path d="M30 82v6M66 82v6" />
    </Illustration>
  );
}

export function FlaskIllustration(props: SVGProps<SVGSVGElement>) {
  return (
    <Illustration {...props}>
      <path
        d="M40 14h16M43 14v24L22 72a7 7 0 0 0 6 10h40a7 7 0 0 0 6-10L53 38V14"
        {...TINT}
      />
      <path d="M31 62h34" />
      <circle cx="44" cy="71" r="2.5" fill="currentColor" stroke="none" />
      <circle cx="55" cy="67" r="2" fill="currentColor" stroke="none" />
      <circle cx="49" cy="24" r="1.5" fill="currentColor" stroke="none" />
    </Illustration>
  );
}
