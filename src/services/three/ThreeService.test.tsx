import {
  BoxGeometry,
  type Color,
  Mesh,
  type MeshStandardMaterial,
  Scene,
  Vector3
} from "three";

import ThreeService from "./ThreeService";

vi.mock("three-stdlib", () => ({
  FBXLoader: vi.fn(),
  GLTFLoader: vi.fn(),
  OBJLoader: vi.fn()
}));

describe("threeService", () => {
  describe("model", () => {
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
