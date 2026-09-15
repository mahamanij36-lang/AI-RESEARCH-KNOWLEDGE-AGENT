import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface NeuralBrain3DProps {
  intensity?: number;
  className?: string;
  activeAgentsCount?: number;
}

export const NeuralBrain3D: React.FC<NeuralBrain3DProps> = ({
  intensity = 1.0,
  className = '',
  activeAgentsCount = 4
}) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 400;
    const height = container.clientHeight || 400;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 45;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Brain structure using connected nodes
    const nodeCount = 140;
    const nodes: THREE.Vector3[] = [];
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(nodeCount * 3);
    const colors = new Float32Array(nodeCount * 3);

    // Generate dual-hemisphere brain geometry
    for (let i = 0; i < nodeCount; i++) {
      const hemisphere = i % 2 === 0 ? 1 : -1;
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 10 + Math.random() * 4;

      const x = r * Math.sin(phi) * Math.cos(theta) * 0.9 + (hemisphere * 3.5);
      const y = r * Math.sin(phi) * Math.sin(theta) * 1.2;
      const z = r * Math.cos(phi) * 1.5;

      nodes.push(new THREE.Vector3(x, y, z));
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      // Electric Cyan to Vivid Purple gradient
      const t = Math.random();
      colors[i * 3] = t > 0.5 ? 0.02 : 0.65;     // R
      colors[i * 3 + 1] = t > 0.5 ? 0.85 : 0.2;   // G
      colors[i * 3 + 2] = 0.95;                  // B
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Particle nodes
    const particleMaterial = new THREE.PointsMaterial({
      size: 1.8,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending
    });
    const particleSystem = new THREE.Points(geometry, particleMaterial);
    scene.add(particleSystem);

    // Connecting synaptic lines
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x06b6d4,
      transparent: true,
      opacity: 0.22,
      blending: THREE.AdditiveBlending
    });

    const linePositions: number[] = [];
    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        const dist = nodes[i].distanceTo(nodes[j]);
        if (dist < 6.5) {
          linePositions.push(nodes[i].x, nodes[i].y, nodes[i].z);
          linePositions.push(nodes[j].x, nodes[j].y, nodes[j].z);
        }
      }
    }

    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lines);

    // Outer orbital ring representing multi-agent telemetry
    const ringGeometry = new THREE.TorusGeometry(18, 0.2, 16, 100);
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: 0xa855f7,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending
    });
    const ring = new THREE.Mesh(ringGeometry, ringMaterial);
    ring.rotation.x = Math.PI / 3;
    scene.add(ring);

    // Second cyan orbital ring
    const ring2Geometry = new THREE.TorusGeometry(16, 0.15, 16, 80);
    const ring2Material = new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      wireframe: true,
      transparent: true,
      opacity: 0.25,
      blending: THREE.AdditiveBlending
    });
    const ring2 = new THREE.Mesh(ring2Geometry, ring2Material);
    ring2.rotation.y = Math.PI / 4;
    scene.add(ring2);

    // Mouse tracking interaction
    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseX = ((event.clientX - rect.left) / width) * 2 - 1;
      mouseY = -(((event.clientY - rect.top) / height) * 2 - 1);
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Resize handling
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Gentle rotation + reactive mouse tilt
      const targetRotationY = elapsedTime * 0.25 + mouseX * 0.4;
      const targetRotationX = Math.sin(elapsedTime * 0.2) * 0.1 + mouseY * 0.3;

      particleSystem.rotation.y += (targetRotationY - particleSystem.rotation.y) * 0.05;
      particleSystem.rotation.x += (targetRotationX - particleSystem.rotation.x) * 0.05;

      lines.rotation.y = particleSystem.rotation.y;
      lines.rotation.x = particleSystem.rotation.x;

      ring.rotation.z = elapsedTime * 0.3;
      ring2.rotation.z = -elapsedTime * 0.4;

      // Pulse brightness
      particleMaterial.opacity = 0.7 + Math.sin(elapsedTime * 3) * 0.2 * intensity;
      lineMaterial.opacity = 0.15 + Math.sin(elapsedTime * 2) * 0.08 * intensity;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      particleMaterial.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      ringGeometry.dispose();
      ringMaterial.dispose();
      ring2Geometry.dispose();
      ring2Material.dispose();
      renderer.dispose();
    };
  }, [intensity, activeAgentsCount]);

  return (
    <div className={`relative flex items-center justify-center overflow-hidden ${className}`}>
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />
      <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-cyan-400/80 font-mono pointer-events-none bg-slate-950/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-cyan-500/20">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          SYNAPTIC CORE ACTIVE
        </span>
        <span className="text-purple-300/80">LATENCY: 12ms</span>
      </div>
    </div>
  );
};
