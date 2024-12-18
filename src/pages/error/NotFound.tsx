import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useState } from "react";
import type { Group, Mesh } from "three";
import { Color, Vector3 } from "three";

import ThreeService from "../../services/three/ThreeService";

const FOUR_MODEL_PATH = `/models/Four.fbx`;
const ZERO_MODEL_PATH = `/models/Zero.fbx`;

/**
 * 404 page component.
 */
function NotFound() {
  const [firstFourModel, setFirstFourModel] = useState<Group | null>(null);
  const [secondFourModel, setSecondFourModel] = useState<Group | null>(null);
  const [zeroModel, setZeroModel] = useState<Group | null>(null);
  const [hoveredModel, setHoveredModel] = useState<Group | Mesh | null>(null);

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
        console.log("Four model loaded:", model);
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
        console.log("Zero model loaded:", model);
      })
      .catch((error: unknown) => {
        console.error("Error loading Zero model:", error);
      });
  }, []);

  useEffect(() => {
    if (!firstFourModel || !secondFourModel) {
      return;
    }
    // First Four
    ThreeService.setScale(firstFourModel, new Vector3(0.01, 0.01, 0.01));
    ThreeService.setPosition(firstFourModel, new Vector3(-2.5, -0.8, 0));
    ThreeService.setColor(firstFourModel, new Color(0xff0000));

    // Second Four
    ThreeService.setScale(secondFourModel, new Vector3(0.01, 0.01, 0.01));
    ThreeService.setPosition(secondFourModel, new Vector3(2.5, -0.8, 0));
    ThreeService.setColor(secondFourModel, new Color(0xff0000));
  }, [firstFourModel, secondFourModel]);

  useEffect(() => {
    if (!zeroModel) {
      return;
    }
    ThreeService.setScale(zeroModel, new Vector3(0.01, 0.01, 0.01));
    ThreeService.setPosition(zeroModel, new Vector3(0, -0.8, 0));
    ThreeService.setColor(zeroModel, new Color(0xff0000));
  }, [zeroModel]);

  useEffect(() => {
    if (hoveredModel) {
      ThreeService.setColor(hoveredModel, new Color(0x00ff00)); // Green
      return () => {
        ThreeService.setColor(hoveredModel, new Color(0xff0000)); // Red
      };
    }
    return undefined;
  }, [hoveredModel]);

  return (
    <>
      <Canvas
        className="aspect-video max-h-52"
        gl={{ antialias: true }}
        id="canvas">
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[0, 0, 1]} />
          <directionalLight position={[0, 0, -1]} />
          <PerspectiveCamera makeDefault position={[0, 0, 0]} />
          <OrbitControls
            dampingFactor={0.01}
            enablePan={false}
            enableZoom={false}
            maxDistance={5}
            maxPolarAngle={90 * (Math.PI / 180)}
            minDistance={5}
            minPolarAngle={90 * (Math.PI / 180)}
            mouseButtons={{}}
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

      <p className="text-center">
        The page you are looking for does not exist.
      </p>
    </>
  );
}

export default NotFound;
