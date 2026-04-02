import PixelSnow from './PixelSnow';

export default function PixelSnowBg() {
  return (
    <PixelSnow
      color="#ffffff"
      flakeSize={0.01}
      minFlakeSize={1.25}
      pixelResolution={250}
      speed={1}
      density={0.3}
      direction={125}
      brightness={1}
      depthFade={8}
      farPlane={20}
      gamma={0.4545}
      variant="square"
    />
  );
}
