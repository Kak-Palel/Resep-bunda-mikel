import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { type ISourceOptions, type Container } from "@tsparticles/engine";
import { useEffect, useMemo, useState } from "react";
import particlesConfig from "../particles.json";

export default function ComingSoon() {
  const [, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = async (container?: Container): Promise<void> => {
    console.log(container);
  };

  const options: ISourceOptions = useMemo(() => particlesConfig as ISourceOptions, []);

  return (
    <main className="relative overflow-clip pb-14 min-h-screen min-w-screen">
      <div>
        <Particles
          id="tsparticles"
          particlesLoaded={particlesLoaded}
          options={options}
        />
      </div>

      <div className="w-full text-light bg-light">
        Error uy
      </div>
    </main>
  );
}
