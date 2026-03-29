'use client'

import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html, useTexture, RoundedBox } from '@react-three/drei'
import * as THREE from 'three'
import type { Material, SurfaceType } from './KitchenVisualizer'

interface KitchenSceneProps {
  surfaceMaterials: Record<SurfaceType, Material>
  selectedSurface: SurfaceType | null
  onSurfaceClick: (surface: SurfaceType) => void
}

// Hotspot component for clickable surfaces
function Hotspot({
  position,
  surface,
  isSelected,
  onClick,
}: {
  position: [number, number, number]
  surface: SurfaceType
  isSelected: boolean
  onClick: () => void
}) {
  const [hovered, setHovered] = useState(false)
  const ref = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (ref.current) {
      ref.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 3) * 0.1)
    }
  })

  return (
    <group position={position}>
      {/* Outer ring */}
      <mesh
        ref={ref}
        onClick={(e) => {
          e.stopPropagation()
          onClick()
        }}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
      >
        <ringGeometry args={[0.12, 0.18, 32]} />
        <meshBasicMaterial
          color={isSelected ? '#c9a962' : hovered ? '#ffffff' : '#4a9eff'}
          transparent
          opacity={0.9}
          side={THREE.DoubleSide}
        />
      </mesh>
      {/* Inner circle */}
      <mesh position={[0, 0, 0.01]}>
        <circleGeometry args={[0.08, 32]} />
        <meshBasicMaterial
          color={isSelected ? '#c9a962' : '#4a9eff'}
          transparent
          opacity={0.6}
        />
      </mesh>
      {/* Check mark when selected */}
      {isSelected && (
        <Html position={[0, 0, 0.1]} center>
          <div className="text-accent-gold text-sm">✓</div>
        </Html>
      )}
    </group>
  )
}

// Surface component with material
function Surface({
  geometry,
  position,
  rotation,
  scale,
  material,
  surface,
  isSelected,
  onClick,
}: {
  geometry: 'box' | 'plane'
  position: [number, number, number]
  rotation?: [number, number, number]
  scale: [number, number, number]
  material: Material
  surface: SurfaceType
  isSelected: boolean
  onClick: () => void
}) {
  const [hovered, setHovered] = useState(false)

  // Create material with color
  const meshMaterial = new THREE.MeshStandardMaterial({
    color: material.color,
    roughness: 0.3,
    metalness: 0.1,
  })

  return (
    <mesh
      position={position}
      rotation={rotation ? rotation.map(r => r * Math.PI / 180) as [number, number, number] : undefined}
      scale={scale}
      onClick={(e) => {
        e.stopPropagation()
        onClick()
      }}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      castShadow
      receiveShadow
    >
      {geometry === 'box' ? (
        <boxGeometry args={[1, 1, 1]} />
      ) : (
        <planeGeometry args={[1, 1]} />
      )}
      <meshStandardMaterial
        color={material.color}
        roughness={0.3}
        metalness={0.1}
        emissive={isSelected || hovered ? '#c9a962' : '#000000'}
        emissiveIntensity={isSelected ? 0.15 : hovered ? 0.08 : 0}
      />
    </mesh>
  )
}

// Cabinet component
function Cabinet({
  position,
  size,
  color = '#2a2a2a',
}: {
  position: [number, number, number]
  size: [number, number, number]
  color?: string
}) {
  return (
    <RoundedBox
      position={position}
      args={size}
      radius={0.02}
      smoothness={4}
      castShadow
      receiveShadow
    >
      <meshStandardMaterial color={color} roughness={0.4} metalness={0.2} />
    </RoundedBox>
  )
}

export default function KitchenScene({
  surfaceMaterials,
  selectedSurface,
  onSurfaceClick,
}: KitchenSceneProps) {
  return (
    <group>
      {/* Floor */}
      <Surface
        geometry="box"
        position={[0, -0.05, 0]}
        scale={[12, 0.1, 10]}
        material={surfaceMaterials.floor}
        surface="floor"
        isSelected={selectedSurface === 'floor'}
        onClick={() => onSurfaceClick('floor')}
      />

      {/* Walls */}
      <mesh position={[0, 3, -5]} receiveShadow>
        <boxGeometry args={[12, 6, 0.2]} />
        <meshStandardMaterial color="#3a3a3a" roughness={0.8} />
      </mesh>
      <mesh position={[-6, 3, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <boxGeometry args={[10, 6, 0.2]} />
        <meshStandardMaterial color="#3a3a3a" roughness={0.8} />
      </mesh>

      {/* Main Counter with Cabinets (Back wall) */}
      <group position={[0, 0, -4]}>
        {/* Lower cabinets */}
        <Cabinet position={[-3, 0.45, 0]} size={[2, 0.9, 0.6]} />
        <Cabinet position={[-1, 0.45, 0]} size={[2, 0.9, 0.6]} />
        <Cabinet position={[1, 0.45, 0]} size={[2, 0.9, 0.6]} />
        <Cabinet position={[3, 0.45, 0]} size={[2, 0.9, 0.6]} />

        {/* Countertop */}
        <Surface
          geometry="box"
          position={[0, 0.95, 0]}
          scale={[8.2, 0.08, 0.7]}
          material={surfaceMaterials.countertop}
          surface="countertop"
          isSelected={selectedSurface === 'countertop'}
          onClick={() => onSurfaceClick('countertop')}
        />

        {/* Backsplash */}
        <Surface
          geometry="box"
          position={[0, 1.5, -0.3]}
          scale={[8.2, 1, 0.05]}
          material={surfaceMaterials.backsplash}
          surface="backsplash"
          isSelected={selectedSurface === 'backsplash'}
          onClick={() => onSurfaceClick('backsplash')}
        />

        {/* Upper cabinets */}
        <Cabinet position={[-3, 2.5, -0.15]} size={[2, 1, 0.4]} />
        <Cabinet position={[3, 2.5, -0.15]} size={[2, 1, 0.4]} />

        {/* Range hood */}
        <mesh position={[0, 2.2, 0]}>
          <boxGeometry args={[1.2, 0.8, 0.5]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.2} metalness={0.8} />
        </mesh>

        {/* Stove */}
        <mesh position={[0, 1.02, 0.05]}>
          <boxGeometry args={[1, 0.05, 0.6]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.3} metalness={0.6} />
        </mesh>

        {/* Hotspot for countertop */}
        <Hotspot
          position={[2, 1.2, 0.3]}
          surface="countertop"
          isSelected={selectedSurface === 'countertop'}
          onClick={() => onSurfaceClick('countertop')}
        />

        {/* Hotspot for backsplash */}
        <Hotspot
          position={[2.5, 1.5, -0.2]}
          surface="backsplash"
          isSelected={selectedSurface === 'backsplash'}
          onClick={() => onSurfaceClick('backsplash')}
        />
      </group>

      {/* Kitchen Island */}
      <group position={[0, 0, 1]}>
        {/* Island base */}
        <Cabinet position={[0, 0.45, 0]} size={[3, 0.9, 1.2]} />

        {/* Island countertop */}
        <Surface
          geometry="box"
          position={[0, 0.95, 0]}
          scale={[3.2, 0.08, 1.4]}
          material={surfaceMaterials.island}
          surface="island"
          isSelected={selectedSurface === 'island'}
          onClick={() => onSurfaceClick('island')}
        />

        {/* Island waterfall edge (front) */}
        <Surface
          geometry="box"
          position={[0, 0.47, 0.72]}
          scale={[3.2, 0.9, 0.06]}
          material={surfaceMaterials.island}
          surface="island"
          isSelected={selectedSurface === 'island'}
          onClick={() => onSurfaceClick('island')}
        />

        {/* Hotspot for island */}
        <Hotspot
          position={[0.8, 1.2, 0.5]}
          surface="island"
          isSelected={selectedSurface === 'island'}
          onClick={() => onSurfaceClick('island')}
        />
      </group>

      {/* Bar Stools */}
      {[-1, 0, 1].map((x, i) => (
        <group key={i} position={[x, 0, 2.5]}>
          {/* Seat */}
          <mesh position={[0, 0.75, 0]}>
            <cylinderGeometry args={[0.2, 0.18, 0.08, 32]} />
            <meshStandardMaterial color="#e8dcc8" roughness={0.6} />
          </mesh>
          {/* Legs */}
          <mesh position={[0, 0.35, 0]}>
            <cylinderGeometry args={[0.02, 0.02, 0.7, 8]} />
            <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
          </mesh>
          {/* Base */}
          <mesh position={[0, 0.02, 0]}>
            <cylinderGeometry args={[0.15, 0.18, 0.04, 32]} />
            <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
          </mesh>
        </group>
      ))}

      {/* Pendant Lights */}
      {[-0.8, 0, 0.8].map((x, i) => (
        <group key={i} position={[x, 3.5, 1]}>
          {/* Cord */}
          <mesh position={[0, -0.5, 0]}>
            <cylinderGeometry args={[0.01, 0.01, 1, 8]} />
            <meshStandardMaterial color="#1a1a1a" />
          </mesh>
          {/* Shade */}
          <mesh position={[0, -1.2, 0]}>
            <sphereGeometry args={[0.15, 32, 32]} />
            <meshStandardMaterial
              color="#ffffff"
              transparent
              opacity={0.9}
              emissive="#ffffff"
              emissiveIntensity={0.5}
            />
          </mesh>
          {/* Point light */}
          <pointLight position={[0, -1.2, 0]} intensity={0.5} distance={5} color="#fff5e6" />
        </group>
      ))}

      {/* Window (on back wall) */}
      <group position={[0, 2.5, -4.85]}>
        <mesh>
          <boxGeometry args={[3, 2, 0.1]} />
          <meshStandardMaterial color="#87ceeb" transparent opacity={0.3} />
        </mesh>
        {/* Window frame */}
        <mesh position={[0, 0, 0.05]}>
          <boxGeometry args={[3.1, 0.08, 0.12]} />
          <meshStandardMaterial color="#f5f0e8" />
        </mesh>
        <mesh position={[0, 0, 0.05]}>
          <boxGeometry args={[0.08, 2.1, 0.12]} />
          <meshStandardMaterial color="#f5f0e8" />
        </mesh>
      </group>

      {/* Side counter with sink (left wall) */}
      <group position={[-5.5, 0, -1]}>
        <Cabinet position={[0, 0.45, 0]} size={[0.6, 0.9, 2]} />
        <Cabinet position={[0, 0.45, 2]} size={[0.6, 0.9, 2]} />

        {/* Counter */}
        <Surface
          geometry="box"
          position={[0, 0.95, 1]}
          scale={[0.7, 0.08, 4.2]}
          material={surfaceMaterials.countertop}
          surface="countertop"
          isSelected={selectedSurface === 'countertop'}
          onClick={() => onSurfaceClick('countertop')}
        />

        {/* Sink */}
        <mesh position={[0.05, 0.92, 1]}>
          <boxGeometry args={[0.5, 0.2, 0.8]} />
          <meshStandardMaterial color="#c0c0c0" metalness={0.9} roughness={0.1} />
        </mesh>
      </group>

      {/* Hotspot for floor */}
      <Hotspot
        position={[2, 0.1, 2]}
        surface="floor"
        isSelected={selectedSurface === 'floor'}
        onClick={() => onSurfaceClick('floor')}
      />

      {/* Decorative items on counter */}
      <group position={[2.5, 1.05, -3.9]}>
        {/* Fruit bowl */}
        <mesh>
          <sphereGeometry args={[0.2, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial color="#f5f0e8" roughness={0.8} />
        </mesh>
        {/* Fruits */}
        <mesh position={[0, 0.1, 0]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial color="#ff6b6b" />
        </mesh>
        <mesh position={[0.1, 0.08, 0.05]}>
          <sphereGeometry args={[0.07, 16, 16]} />
          <meshStandardMaterial color="#ffd93d" />
        </mesh>
      </group>

      {/* Coffee maker */}
      <group position={[-2.5, 1.05, -3.9]}>
        <mesh>
          <boxGeometry args={[0.3, 0.4, 0.25]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.3} metalness={0.6} />
        </mesh>
      </group>
    </group>
  )
}
