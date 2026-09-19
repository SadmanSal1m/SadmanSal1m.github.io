"use client";

import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { ContactShadows, Line, PerformanceMonitor, RoundedBox } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

/** The hero constellation: three device slabs: NaqiVerse, AIMARA, Grocs -
 *  resting on a drawn orbit. Runs on a demand frameloop: it renders during the
 *  opening settle and while the pointer moves, and costs ~nothing when idle. */

const DEVICES = [
  {
    key: "naqiverse",
    tex: "/media/textures/naqiverse.webp",
    shell: "#e9a7c2",
    pos: [-1.78, -0.12, -0.05] as const,
    rot: [0.0, 0.34, 0.045] as const,
    clearcoat: 0.65,
    roughness: 0.34,
  },
  {
    key: "aimara",
    tex: "/media/textures/aimara.webp",
    shell: "#151517",
    pos: [0, 0.1, 0.4] as const,
    rot: [0.0, -0.05, -0.015] as const,
    clearcoat: 1,
    roughness: 0.2,
  },
  {
    key: "grocs",
    tex: "/media/textures/grocs.webp",
    shell: "#0d1722",
    pos: [1.78, -0.16, -0.08] as const,
    rot: [0.0, -0.32, -0.04] as const,
    clearcoat: 0.4,
    roughness: 0.42,
  },
];

function Env() {
  const gl = useThree((s) => s.gl);
  // Build the PMREM environment once per renderer; attach declaratively so the
  // scene itself is never mutated from component code.
  const envTex = useMemo(() => {
    const pmrem = new THREE.PMREMGenerator(gl);
    const tex = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    pmrem.dispose();
    return tex;
  }, [gl]);
  useEffect(() => () => envTex.dispose(), [envTex]);
  return <primitive object={envTex} attach="environment" />;
}

function Slab({ d, settleRef }: { d: (typeof DEVICES)[number]; settleRef: React.RefObject<number> }) {
  const tex = useLoader(THREE.TextureLoader, d.tex);
  const g = useRef<THREE.Group>(null);
  const aspect = tex.image ? tex.image.height / tex.image.width : 2.15;
  const w = 0.98;
  const h = Math.min(2.1, w * aspect);

  useFrame(() => {
    if (!g.current) return;
    const t = settleRef.current;
    g.current.position.set(d.pos[0], d.pos[1] - (1 - t) * 0.45, d.pos[2]);
    g.current.rotation.set(d.rot[0], d.rot[1] + (1 - t) * 0.35, d.rot[2]);
    g.current.scale.setScalar(0.94 + t * 0.06);
  });

  return (
    <group ref={g} position={[d.pos[0], d.pos[1], d.pos[2]]}>
      <RoundedBox args={[w + 0.09, h + 0.09, 0.085]} radius={0.062} smoothness={4}>
        <meshPhysicalMaterial
          color={d.shell}
          roughness={d.roughness}
          metalness={0.12}
          clearcoat={d.clearcoat}
          clearcoatRoughness={0.25}
          envMapIntensity={0.9}
        />
      </RoundedBox>
      <mesh position={[0, 0, 0.0455]}>
        <planeGeometry args={[w, h]} />
        <meshBasicMaterial
          map={tex}
          map-colorSpace={THREE.SRGBColorSpace}
          map-anisotropy={4}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

function Orbit() {
  const points = useMemo(() => {
    const pts: [number, number, number][] = [];
    for (let i = 0; i <= 96; i++) {
      const a = (i / 96) * Math.PI * 2;
      pts.push([Math.cos(a) * 2.55, 0, Math.sin(a) * 0.85]);
    }
    return pts;
  }, []);
  return <Line points={points} color="#14181b" transparent opacity={0.28} lineWidth={1} position={[0, -1.18, 0]} />;
}

function Rig({ settleRef }: { settleRef: React.RefObject<number> }) {
  const { invalidate } = useThree();
  const group = useRef<THREE.Group>(null);
  const target = useRef({ x: 0, y: 0 });
  const start = useRef<number | null>(null);

  useEffect(() => {
    // opening settle: keep invalidating for its duration, then go quiet
    start.current = performance.now();
    let id = 0;
    const tick = () => {
      const t = (performance.now() - (start.current ?? 0)) / 1500;
      if (t < 1.05) {
        invalidate();
        id = requestAnimationFrame(tick);
      }
    };
    id = requestAnimationFrame(tick);
    const onMove = (e: PointerEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      target.current = { x: nx, y: ny };
      invalidate();
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener("pointermove", onMove);
    };
  }, [invalidate]);

  useFrame(() => {
    const t = Math.min(1, (performance.now() - (start.current ?? 0)) / 1500);
    // easeOutCubic
    settleRef.current = 1 - Math.pow(1 - t, 3);
    if (group.current) {
      group.current.rotation.y += (target.current.x * 0.055 - group.current.rotation.y) * 0.06;
      group.current.rotation.x += (target.current.y * 0.028 - group.current.rotation.x) * 0.06;
    }
  });

  return (
    <group ref={group}>
      <Orbit />
      {DEVICES.map((d) => (
        <Slab key={d.key} d={d} settleRef={settleRef} />
      ))}
      <ContactShadows position={[0, -1.24, 0]} opacity={0.12} blur={3.4} far={2.6} resolution={512} frames={1} color="#e27fa6" />
    </group>
  );
}

export default function HeroScene() {
  const settleRef = useRef(0);
  const [dpr, setDpr] = useState<[number, number]>([1, 1.75]);
  return (
    <Canvas
      aria-hidden="true"
      frameloop="demand"
      dpr={dpr}
      camera={{ position: [0, 0.25, 5.9], fov: 33 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance", preserveDrawingBuffer: true }}
      style={{ pointerEvents: "none" }}
    >
      <PerformanceMonitor onDecline={() => setDpr([1, 1.2])}>
        <Env />
        <ambientLight intensity={0.55} />
        <directionalLight position={[3, 4, 4]} intensity={1.1} />
        <Rig settleRef={settleRef} />
      </PerformanceMonitor>
    </Canvas>
  );
}
