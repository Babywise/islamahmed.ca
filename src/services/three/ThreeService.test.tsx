import {
  BoxGeometry,
  type Color,
  Group,
  Mesh,
  type MeshStandardMaterial,
  Scene,
  Vector3
} from "three";

import ThreeService from "./ThreeService";

vi.mock("three-stdlib", () => {
  /**
   * Creates a mock group with a single mesh.
   */
  const createMockGroup = () => {
    const mockGroup = new Group();
    const mockMesh = new Mesh(new BoxGeometry(1, 1, 1));
    mockGroup.add(mockMesh);
    return mockGroup;
  };

  const mockLoader = vi.fn().mockReturnValue({
    load: vi
      .fn()
      .mockImplementation(
        (
          path: string,
          onLoad: (group: Group | { scene: Group }) => void,
          onProgress?: (event: ProgressEvent) => void,
          onError?: (error: ErrorEvent) => void
        ) => {
          if (path.endsWith(".txt")) {
            onError?.(
              new ErrorEvent("error", { message: "Unsupported file type" })
            );
            return;
          }

          if (onProgress) {
            const progressEvent = new ProgressEvent("progress", {
              lengthComputable: true,
              loaded: 50,
              total: 100
            });
            onProgress(progressEvent);
          }

          if (path.endsWith(".gltf") || path.endsWith(".glb")) {
            // GLTF files return an object with a scene property
            onLoad({ scene: createMockGroup() });
          } else {
            // FBX and OBJ files return a Group directly
            onLoad(createMockGroup());
          }
        }
      )
  });

  return {
    FBXLoader: mockLoader,
    GLTFLoader: mockLoader,
    OBJLoader: mockLoader
  };
});

describe("threeService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("model", () => {
    describe("loadModel", () => {
      test("should load an fbx model successfully", async () => {
        expect.assertions(3);

        const model = await ThreeService.loadModel({ path: "test.fbx" });

        expect(model).toBeInstanceOf(Group);
        expect(model.children).toHaveLength(1);
        expect(model.children[0]).toBeInstanceOf(Mesh);
      });

      test("should load a GLTF model and return its scene", async () => {
        expect.assertions(3);

        const model = await ThreeService.loadModel({ path: "test.gltf" });

        expect(model).toBeInstanceOf(Group);
        expect(model.children).toHaveLength(1);
        expect(model.children[0]).toBeInstanceOf(Mesh);
      });

      test("should load a GLB model and return its scene", async () => {
        expect.assertions(3);

        const model = await ThreeService.loadModel({ path: "test.glb" });

        expect(model).toBeInstanceOf(Group);
        expect(model.children).toHaveLength(1);
        expect(model.children[0]).toBeInstanceOf(Mesh);
      });

      test("should load an OBJ model successfully", async () => {
        expect.assertions(3);

        const model = await ThreeService.loadModel({ path: "test.obj" });

        expect(model).toBeInstanceOf(Group);
        expect(model.children).toHaveLength(1);
        expect(model.children[0]).toBeInstanceOf(Mesh);
      });

      test("should throw an error for unsupported file type", async () => {
        expect.assertions(1);

        vi.spyOn(console, "error").mockImplementation(() => {});

        await expect(
          ThreeService.loadModel({ path: "test.txt" })
        ).rejects.toBeInstanceOf(Error);
      });

      test("should handle progress callback", async () => {
        expect.assertions(1);

        const mockProgress = vi.fn();

        await ThreeService.loadModel({
          onProgress: mockProgress,
          path: "test.fbx"
        });

        expect(mockProgress).toHaveBeenCalledWith(expect.any(ProgressEvent));
      });

      test("should handle error when loading model", async () => {
        expect.assertions(2);

        const mockError = vi.fn();

        const modelPromise = ThreeService.loadModel({
          onError: mockError,
          path: "test.txt"
        });

        await expect(modelPromise).rejects.toBeInstanceOf(Error);
        expect(mockError).toHaveBeenCalledWith(expect.any(ErrorEvent));
      });
    });

    describe("setColor", () => {
      test("should set color on a mesh", () => {
        expect.assertions(2);

        const mesh = new Mesh();
        const color = "#00ff00";

        ThreeService.setColor(mesh, color);

        const material = mesh.material as MeshStandardMaterial;

        expect(material).toBeDefined();
        expect(material.color.getHexString()).toStrictEqual(
          color.replace("#", "")
        );
      });
    });

    describe("calculateDimensions", () => {
      test("should calculate dimensions of a mesh", () => {
        expect.assertions(4);

        // Create a mesh with specific dimensions
        const geometry = new BoxGeometry(2, 3, 4); // width: 2, height: 3, depth: 4
        const mesh = new Mesh(geometry);
        mesh.position.set(1, 1, 1); // Set center position

        const dimensions = ThreeService.calculateDimensions(mesh);

        // Size should be 2x3x4
        expect(dimensions.size.x).toStrictEqual(2);
        expect(dimensions.size.y).toStrictEqual(3);
        expect(dimensions.size.z).toStrictEqual(4);

        // Center should be at 1,1,1
        expect(dimensions.center).toStrictEqual(new Vector3(1, 1, 1));
      });
    });
  });

  describe("scene", () => {
    describe("createScene", () => {
      test("should create a scene with background color", () => {
        expect.assertions(2);

        const backgroundColor = "#ff0000";
        const scene = ThreeService.createScene(backgroundColor);

        expect(scene).toBeInstanceOf(Scene);
        expect((scene.background as Color).getHexString()).toStrictEqual(
          backgroundColor.replace("#", "")
        );
      });
    });

    describe("setBackgroundColor", () => {
      test("should set background color of a scene", () => {
        expect.assertions(2);

        const scene = new Scene();
        const backgroundColor = "#00ff00";

        ThreeService.setBackgroundColor(scene, backgroundColor);

        expect((scene.background as Color).getHexString()).toStrictEqual(
          backgroundColor.replace("#", "")
        );
        expect(scene.children).toHaveLength(0);
      });
    });

    describe("addAmbientLight", () => {
      test("should add ambient light with custom parameters", () => {
        expect.assertions(3);

        const scene = new Scene();
        const color = "#ff0000";
        const intensity = 0.8;
        const light = ThreeService.addAmbientLight(scene, color, intensity);

        expect(light.color.getHexString()).toStrictEqual(
          color.replace("#", "")
        );
        expect(light.intensity).toStrictEqual(intensity);
        expect(scene.children).toContain(light);
      });
    });

    describe("addDirectionalLight", () => {
      test("should add directional light with custom parameters", () => {
        expect.assertions(4);

        const scene = new Scene();
        const position = new Vector3(1, 2, 3);

        const color = "#00ff00";
        const intensity = 0.6;

        const light = ThreeService.addDirectionalLight(
          scene,
          color,
          intensity,
          position
        );

        expect(light.color.getHexString()).toStrictEqual(
          color.replace("#", "")
        );
        expect(light.intensity).toStrictEqual(intensity);
        expect(light.position).toStrictEqual(position);
        expect(scene.children).toContain(light);
      });
    });
  });
});
