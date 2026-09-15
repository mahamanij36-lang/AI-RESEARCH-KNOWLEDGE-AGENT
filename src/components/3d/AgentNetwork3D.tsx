import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { AGENTS } from '../../data/agents';

interface AgentNetwork3DProps {
  className?: string;
  activeAgentId?: string | null;
  onSelectAgent?: (id: string) => void;
}

export const AgentNetwork3D: React.FC<AgentNetwork3DProps> = ({
  className = '',
  activeAgentId,
  onSelectAgent
}) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 550;
    const height = container.clientHeight || 450;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.set(0, 10, 36);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Central Orchestrator Mesh
    const centralGeo = new THREE.IcosahedronGeometry(3.6, 2);
    const centralMat = new THREE.MeshStandardMaterial({
      color: 0x06b6d4,
      wireframe: true,
      emissive: 0x0891b2,
      emissiveIntensity: 0.8
    });
    const centralNode = new THREE.Mesh(centralGeo, centralMat);
    scene.add(centralNode);

    // Central pulsing core
    const coreGeo = new THREE.SphereGeometry(2.2, 16, 16);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.65
    });
    const coreNode = new THREE.Mesh(coreGeo, coreMat);
    scene.add(coreNode);

    // Orbiting Agent Nodes (excluding orchestrator in orbit)
    const orbitAgents = AGENTS.filter(a => a.id !== 'agent-orchestrator');
    const agentMeshes: { mesh: THREE.Mesh; id: string; angle: number; radius: number; line: THREE.Line }[] = [];

    const radius = 16;
    orbitAgents.forEach((agent, index) => {
      const angle = (index / orbitAgents.length) * Math.PI * 2;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const y = Math.sin(index * 1.5) * 3;

      const subGeo = new THREE.DodecahedronGeometry(1.6, 0);
      const subMat = new THREE.MeshStandardMaterial({
        color: agent.id === activeAgentId ? 0x10b981 : 0xa855f7,
        emissive: agent.id === activeAgentId ? 0x059669 : 0x7e22ce,
        emissiveIntensity: 0.7,
        roughness: 0.3
      });

      const subMesh = new THREE.Mesh(subGeo, subMat);
      subMesh.position.set(x, y, z);
      scene.add(subMesh);

      // Connecting communication line to orchestrator
      const lineGeo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(x, y, z)
      ]);
      const lineMat = new THREE.LineBasicMaterial({
        color: agent.id === activeAgentId ? 0x10b981 : 0x06b6d4,
        transparent: true,
        opacity: 0.35
      });
      const line = new THREE.Line(lineGeo, lineMat);
      scene.add(line);

      agentMeshes.push({ mesh: subMesh, id: agent.id, angle, radius, line });
    });

    // Orbital ring guide
    const guideGeo = new THREE.TorusGeometry(radius, 0.08, 12, 64);
    const guideMat = new THREE.MeshBasicMaterial({ color: 0x334155, transparent: true, opacity: 0.4 });
    const guide = new THREE.Mesh(guideGeo, guideMat);
    guide.rotation.x = Math.PI / 2;
    scene.add(guide);

    // Dynamic light
    const pointLight = new THREE.PointLight(0x06b6d4, 2.5, 60);
    pointLight.position.set(0, 5, 10);
    scene.add(pointLight);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    let animationId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Rotate central node
      centralNode.rotation.y = elapsed * 0.4;
      centralNode.rotation.x = elapsed * 0.2;
      coreNode.scale.setScalar(1 + Math.sin(elapsed * 4) * 0.12);

      // Orbit agents
      agentMeshes.forEach((item, i) => {
        const currentAngle = item.angle + elapsed * 0.15;
        const x = Math.cos(currentAngle) * item.radius;
        const z = Math.sin(currentAngle) * item.radius;
        const y = Math.sin(elapsed * 0.8 + i) * 2.5;

        item.mesh.position.set(x, y, z);
        item.mesh.rotation.y = elapsed * 0.8;
        item.mesh.rotation.x = elapsed * 0.5;

        // Update line endpoints
        const positions = item.line.geometry.attributes.position.array as Float32Array;
        positions[3] = x;
        positions[4] = y;
        positions[5] = z;
        item.line.geometry.attributes.position.needsUpdate = true;
      });

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
  }, [activeAgentId, onSelectAgent]);

  return (
    <div className={`relative flex items-center justify-center overflow-hidden ${className}`}>
      <div ref={mountRef} className="w-full h-full" />
      <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs font-mono bg-slate-950/70 border border-purple-500/20 backdrop-blur-md px-3 py-1.5 rounded-lg pointer-events-none">
        <span className="text-cyan-300">ORCHESTRATOR HUB: 8 AGENTS SYNCED</span>
        <span className="text-emerald-400">IPC BUS: REALTIME WEBSOCKET</span>
      </div>
    </div>
  );
};
