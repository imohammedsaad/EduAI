import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

interface RobotModelProps {
  isPlaying: boolean;
}

const RobotModel = ({ isPlaying }: RobotModelProps) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const robotRef = useRef<THREE.Group | null>(null);
  const mouthBarsRef = useRef<THREE.Mesh[]>([]);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup with transparent background
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    camera.position.z = 5;
    camera.position.y = 1;

    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true,
      preserveDrawingBuffer: false
    });
    renderer.setClearColor(0x000000, 0);
    renderer.setSize(300, 300);
    mountRef.current.appendChild(renderer.domElement);

    // Enhanced lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 2);
    scene.add(ambientLight);
    
    const frontLight = new THREE.DirectionalLight(0xa855f7, 2);
    frontLight.position.set(0, 2, 5);
    scene.add(frontLight);

    const backLight = new THREE.DirectionalLight(0x22d3ee, 1);
    backLight.position.set(0, 2, -5);
    scene.add(backLight);

    // Create enhanced robot
    const robot = new THREE.Group();
    robotRef.current = robot;

    // Head with more detail
    const headGeometry = new THREE.BoxGeometry(1.2, 1.2, 1.2);
    const headMaterial = new THREE.MeshPhongMaterial({
      color: 0xa855f7,
      emissive: 0x2f1d47,
      shininess: 90,
      specular: 0xffffff
    });
    const head = new THREE.Mesh(headGeometry, headMaterial);
    robot.add(head);

    // Enhanced eyes with glow
    const eyeGeometry = new THREE.SphereGeometry(0.12, 32, 32);
    const eyeMaterial = new THREE.MeshPhongMaterial({
      color: 0x22d3ee,
      emissive: 0x22d3ee,
      emissiveIntensity: 0.5,
      shininess: 100
    });

    const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    leftEye.position.set(-0.3, 0.2, 0.6);
    head.add(leftEye);

    const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    rightEye.position.set(0.3, 0.2, 0.6);
    head.add(rightEye);

    // Antenna with crystal
    const antennaGeometry = new THREE.CylinderGeometry(0.05, 0.05, 0.4, 16);
    const antennaMaterial = new THREE.MeshPhongMaterial({
      color: 0x9333ea,
      shininess: 100
    });
    const antenna = new THREE.Mesh(antennaGeometry, antennaMaterial);
    antenna.position.y = 0.8;
    head.add(antenna);

    const crystalGeometry = new THREE.OctahedronGeometry(0.15);
    const crystalMaterial = new THREE.MeshPhongMaterial({
      color: 0x22d3ee,
      emissive: 0x22d3ee,
      emissiveIntensity: 0.5,
      shininess: 100,
      transparent: true,
      opacity: 0.9
    });
    const crystal = new THREE.Mesh(crystalGeometry, crystalMaterial);
    crystal.position.y = 1;
    head.add(crystal);

    // Replace mouth with visualizer bars
    const barWidth = 0.08;
    const barSpacing = 0.12;
    const barGeometry = new THREE.BoxGeometry(barWidth, 0.17, 0.1);
    const barMaterial = new THREE.MeshPhongMaterial({
      color: 0x22d3ee,
      emissive: 0x22d3ee,
      emissiveIntensity: 0.5,
      shininess: 100
    });

    // Create three bars
    const bars: THREE.Mesh[] = [];
    for (let i = 0; i < 3; i++) {
      const bar = new THREE.Mesh(barGeometry, barMaterial);
      const xPos = (i - 1) * barSpacing;
      bar.position.set(xPos, -0.2, 0.6);
      head.add(bar);
      bars.push(bar);
    }
    mouthBarsRef.current = bars;

    // Enhanced body
    const bodyGeometry = new THREE.CylinderGeometry(1, 0.5, 1.8, 8, 0.7, false, 0, Math.PI * 2);
    const bodyMaterial = new THREE.MeshPhongMaterial({
      color: 0x9333ea,
      emissive: 0x2f1d47,
      shininess: 90,
      specular: 0xffffff
    });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.y = -1.5;
    robot.add(body);

    // Glowing core
    const coreGeometry = new THREE.TorusGeometry(0.3, 0.1, 16, 32);
    const coreMaterial = new THREE.MeshPhongMaterial({
      color: 0x22d3ee,
      emissive: 0x22d3ee,
      emissiveIntensity: 0.8,
      transparent: true,
      opacity: 0.9
    });
    const core = new THREE.Mesh(coreGeometry, coreMaterial);
    core.rotation.x = Math.PI / 2;
    core.position.y = -1.5;
    core.position.z = 0.4;
    robot.add(core);

    scene.add(robot);

    // Remove OrbitControls and replace with fixed position
    camera.lookAt(robot.position);
    robot.rotation.y = -Math.PI * 0.1; // Slight angle for better perspective

    // Updated animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      if (robotRef.current && mouthBarsRef.current.length) {
        const time = Date.now() * 0.002;
        
        // Subtle floating motion with updated base rotation
        robot.position.y = Math.sin(time) * 0.1;
        robot.rotation.y = -Math.PI * 0.1 + Math.sin(time * 0.5) * 0.05;
        
        if (isPlaying) {
          // Visualizer bars animation
          mouthBarsRef.current.forEach((bar, index) => {
            const offset = index * 0.5;
            const height = 0.15 + Math.sin(time * 10 + offset) * 0.5;
            bar.scale.y = height;
            bar.position.y = -0.2 + (height - 1) * 0.075;
            (bar.material as THREE.MeshPhongMaterial).emissiveIntensity = 
              0.5 + Math.sin(time * 2) * 0.5;
          });
          
          // Core and crystal animations
          core.rotation.z = time;
          crystal.rotation.y = time;
          
          // Pulse effect
          const pulseIntensity = Math.sin(time * 2) * 0.3 + 0.7;
          coreMaterial.emissiveIntensity = pulseIntensity;
          crystalMaterial.emissiveIntensity = pulseIntensity;
          leftEye.material.emissiveIntensity = pulseIntensity;
          rightEye.material.emissiveIntensity = pulseIntensity;
        } else {
          // Reset bars to default position
          mouthBarsRef.current.forEach(bar => {
            bar.scale.y = 1;
            bar.position.y = -0.2;
            (bar.material as THREE.MeshPhongMaterial).emissiveIntensity = 0.5;
          });
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      mountRef.current?.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="w-[300px] h-[300px]" />;
};

export default RobotModel; 