import "./Three404.css";

import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useRef, useState } from "react";
import { Color, type Group, type Mesh, Vector3 } from "three";

import ThreeService from "../../services/three/ThreeService";

const FOUR_MODEL_PATH = `/models/Four.fbx`;
const ZERO_MODEL_PATH = `/models/Zero.fbx`;

interface Three404Props {
  className?: string;
}

/**
 * 404 page component.
 * @param Three404Props The component props object.
 * @param Three404Props.className The class name for the component.
 */
function Three404({ className }: Three404Props) {
  const [firstFourModel, setFirstFourModel] = useState<Group | null>(null);
  const [secondFourModel, setSecondFourModel] = useState<Group | null>(null);
  const [zeroModel, setZeroModel] = useState<Group | null>(null);
  const [hoveredModel, setHoveredModel] = useState<Group | Mesh | null>(null);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const angleRef = useRef<number>(0);

  // Constants
  const scale = new Vector3(0.0075, 0.0075, 0.0075);
  const originOffsetX = 1.75;
  const originOffsetY = -0.8;

  // Load models
  useEffect(() => {
    // Fours
    ThreeService.loadModel({
      /**
       * Callback to handle model loading progress.
       * @param xhr The XHR object.
       */
      onProgress(xhr) {
        const PERCENTAGE_MULTIPLIER = 100;
        const percentageLoaded = xhr.total
          ? (xhr.loaded / xhr.total) * PERCENTAGE_MULTIPLIER
          : 0;
        console.log(`Four model: ${percentageLoaded.toFixed(2)}% loaded`);
      },
      path: FOUR_MODEL_PATH
    })
      .then(model => {
        setFirstFourModel(model.clone());
        setSecondFourModel(model.clone());
      })
      .catch((error: unknown) => {
        console.error("Error loading Four model:", error);
      });

    // Zero
    ThreeService.loadModel({
      /**
       * Callback to handle model loading progress.
       * @param xhr The XHR object.
       */
      onProgress(xhr) {
        const PERCENTAGE_MULTIPLIER = 100;
        const percentageLoaded = xhr.total
          ? (xhr.loaded / xhr.total) * PERCENTAGE_MULTIPLIER
          : 0;
        console.log(`Zero model: ${percentageLoaded.toFixed(2)}% loaded`);
      },
      path: ZERO_MODEL_PATH
    })
      .then(model => {
        setZeroModel(model);
      })
      .catch((error: unknown) => {
        console.error("Error loading Zero model:", error);
      });
  }, []);

  // Setup models
  useEffect(() => {
    if (!firstFourModel || !secondFourModel || !zeroModel) {
      return;
    }

    // First Four
    ThreeService.setScale(firstFourModel, scale);
    ThreeService.setPosition(
      firstFourModel,
      new Vector3(-originOffsetX, originOffsetY, 0)
    );
    ThreeService.setColor(firstFourModel, new Color(0xff0000));

    // Second Four
    ThreeService.setScale(secondFourModel, scale);
    ThreeService.setPosition(
      secondFourModel,
      new Vector3(originOffsetX, originOffsetY, 0)
    );
    ThreeService.setColor(secondFourModel, new Color(0xff0000));

    // Zero
    ThreeService.setScale(zeroModel, scale);
    ThreeService.setPosition(zeroModel, new Vector3(0, originOffsetY, 0));
    ThreeService.setColor(zeroModel, new Color(0xff0000));
  }, [firstFourModel, secondFourModel, zeroModel]);

  // Hover effect
  useEffect(() => {
    if (hoveredModel) {
      ThreeService.setColor(hoveredModel, new Color(0x00ff00)); // Green
      return () => {
        ThreeService.setColor(hoveredModel, new Color(0xff0000)); // Red
      };
    }
    return undefined;
  }, [hoveredModel]);

  // Animation
  useEffect(() => {
    if (!firstFourModel || !secondFourModel || !zeroModel || !isAnimating)
      return () => {};

    let animationFrameId = 0;
    let lastTime = performance.now();

    /**
     * Animates the models in a circular motion around the zero.
     * Uses time-based animation for smooth movement across different refresh rates.
     * @param currentTime The current time in milliseconds.
     */
    const animate = (currentTime: number) => {
      const deltaTime = (currentTime - lastTime) / 1000; // Convert to seconds
      lastTime = currentTime;

      // Update angle based on time (0.5 radians per second)
      angleRef.current += 0.5 * deltaTime;

      // Rotate first 4 around zero
      ThreeService.rotateAround(
        firstFourModel,
        zeroModel.position,
        originOffsetX, // Radius (distance from zero)
        angleRef.current,
        [ThreeService.RotationAxis.Y]
      );

      // Rotate second 4 around zero (offset by PI for opposite position)
      ThreeService.rotateAround(
        secondFourModel,
        zeroModel.position,
        originOffsetX, // Radius (distance from zero)
        angleRef.current + Math.PI, // Offset by PI to place it opposite to first 4
        [ThreeService.RotationAxis.Y]
      );

      // Request next animation frame
      animationFrameId = requestAnimationFrame(animate);
    };

    // Start the animation
    animationFrameId = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isAnimating]);

  return (
    <Canvas
      aria-hidden="true"
      className={className}
      gl={{ antialias: true }}
      id="three404-canvas"
      onClick={() => {
        setIsAnimating(prev => !prev);
      }}>
      <Suspense fallback={null}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[0, 0, 1]} />
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        <OrbitControls
          dampingFactor={0.01}
          enablePan={false}
          enableZoom={false}
          maxAzimuthAngle={25 * (Math.PI / 180)}
          maxDistance={5}
          maxPolarAngle={95 * (Math.PI / 180)}
          minAzimuthAngle={-25 * (Math.PI / 180)}
          minDistance={5}
          minPolarAngle={85 * (Math.PI / 180)}
          panSpeed={0.3}
          rotateSpeed={0.3}
          target={new Vector3(0, -0.5, 0)}
          touches={{}}
        />
        <ThreeService.Model model={firstFourModel} />
        <ThreeService.Model model={zeroModel} />
        <ThreeService.Model model={secondFourModel} />
        <ThreeService.ModelInteractionComponent
          models={[firstFourModel, secondFourModel, zeroModel]}
          onHoverChange={setHoveredModel}
        />
      </Suspense>
    </Canvas>
  );
}

export default Three404;
