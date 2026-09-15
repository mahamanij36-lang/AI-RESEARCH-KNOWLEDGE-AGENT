import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface VectorDatabase3DProps {
  className?: string;
  isSearching?: boolean;
}

export const VectorDatabase3D: React.FC<VectorDatabase3DProps> = ({
  className = '',
  isSearching = false
}) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 500;
    const height = container.clientHeight || 450;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 18, 42);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Glowing Database Cylinders (3 tiered cluster)
    const cylinderGroup = new THREE.Group();
    const cylinderMaterial = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      roughness: 0.2,
      metalness: 0.85,
      transparent: true,
      opacity: 0.85
    });

    const glowMaterial = new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      wireframe: true,
      transparent: true,
      opacity: 0.4
    });

    const coreLightMaterial = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.65
    });

    const cylinderCount = 5;
    const cylinderPositions = [
      [-12, -4, -6],
      [12, -4, -6],
      [0, -4, -12],
      [-7, -4, 8],
      [7, -4, 8]
    ];

    const rings: THREE.Mesh[] = [];

    cylinderPositions.forEach(([x, y, z]) => {
      const cMesh = new THREE.Mesh(new THREE.CylinderGeometry(4.5, 4.5, 14, 24), cylinderMaterial);
      cMesh.position.set(x, y, z);
      const wire = new THREE.Mesh(new THREE.CylinderGeometry(4.6, 4.6, 14.1, 16, 6), glowMaterial);
      wire.position.set(x, y, z);
      
      // Internal glowing core
      const core = new THREE.Mesh(new THREE.CylinderGeometry(2, 2, 13.8, 16), coreLightMaterial);
      core.position.set(x, y, z);

      // Floating data rings around cylinders
      for (let r = 0; r < 3; r++) {
        const ring = new THREE.Mesh(
          new THREE.TorusGeometry(5.2, 0.12, 12, 32),
          new THREE.MeshBasicMaterial({ color: 0x06b6d4, transparent: true, opacity: 0.7 })
        );
        ring.position.set(x, y - 5 + r * 5, z);
        ring.rotation.x = Math.PI / 2;
        rings.push(ring);
        cylinderGroup.add(ring);
      }

      cylinderGroup.add(cMesh);
      cylinderGroup.add(wire);
      cylinderGroup.add(core);
    });

    scene.add(cylinderGroup);

    // Vector Embedding Particles (incoming data streams from documents to database)
    const particleCount = 280;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);
    const particleVel = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      // Start in a wide halo above
      particlePos[i * 3] = (Math.random() - 0.5) * 45;
      particlePos[i * 3 + 1] = 15 + Math.random() * 20;
      particlePos[i * 3 + 2] = (Math.random() - 0.5) * 45;

      particleVel[i * 3] = (Math.random() - 0.5) * 0.15;
      particleVel[i * 3 + 1] = -0.12 - Math.random() * 0.15; // flow downward
      particleVel[i * 3 + 2] = (Math.random() - 0.5) * 0.15;

      // Electric cyan / emerald / magenta
      const cType = Math.random();
      if (cType < 0.6) {
        particleColors[i * 3] = 0.02; particleColors[i * 3 + 1] = 0.8; particleColors[i * 3 + 2] = 0.95; // cyan
      } else if (cType < 0.85) {
        particleColors[i * 3] = 0.65; particleColors[i * 3 + 1] = 0.2; particleColors[i * 3 + 2] = 0.95; // purple
      } else {
        particleColors[i * 3] = 0.1; particleColors[i * 3 + 1] = 0.95; particleColors[i * 3 + 2] = 0.5; // emerald
      }
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 1.4,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending
    });

    const vectorParticleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(vectorParticleSystem);

    // Floor holographic grid
    const gridHelper = new THREE.GridHelper(60, 30, 0x06b6d4, 0x1e293b);
    gridHelper.position.y = -11.5;
    scene.add(gridHelper);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x0f172a, 1.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x06b6d4, 3, 80);
    pointLight.position.set(0, 15, 10);
    scene.add(pointLight);

    const purpleLight = new THREE.PointLight(0xa855f7, 2, 70);
    purpleLight.position.set(0, -5, 0);
    scene.add(purpleLight);

    let animationId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Rotate whole cluster slowly
      cylinderGroup.rotation.y = elapsed * 0.08;

      // Animate rings
      rings.forEach((ring, idx) => {
        ring.position.y += Math.sin(elapsed * 2 + idx) * 0.02;
        ring.scale.setScalar(1 + Math.sin(elapsed * 3 + idx) * 0.04);
      });

      // Update particle stream
      const positions = particleGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        positions[i * 3 + 1] += particleVel[i * 3 + 1] * (isSearching ? 2.5 : 1);
        positions[i * 3] += Math.sin(elapsed + i) * 0.03;

        // When particle hits bottom cylinder base, reset to top
        if (positions[i * 3 + 1] < -10) {
          positions[i * 3] = (Math.random() - 0.5) * 40;
          positions[i * 3 + 1] = 20 + Math.random() * 15;
          positions[i * 3 + 2] = (Math.random() - 0.5) * 40;
        }
      }
      particleGeo.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [isSearching]);

  return (
    <div className={`relative flex items-center justify-center overflow-hidden ${className}`}>
      <div ref={mountRef} className="w-full h-full" />
      <div className="absolute top-3 left-4 flex flex-col gap-1 text-xs font-mono bg-slate-950/70 border border-cyan-500/20 backdrop-blur-md px-3 py-2 rounded-lg pointer-events-none">
        <div className="text-cyan-300 font-bold flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          QDRANT HYPERPLANE CLUSTER
        </div>
        <div className="text-slate-400 text-[11px]">DIMENSIONS: 1536 (Cosine)</div>
        <div className="text-emerald-400 text-[11px]">HNSW GRAPH: CONVERGED</div>
      </div>
    </div>
  );
};
