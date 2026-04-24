import * as THREE from "three";
import { DRACOLoader, GLTF, GLTFLoader } from "three-stdlib";
import { setCharTimeline, setAllTimeline } from "../../utils/GsapScroll";
import { decryptFile } from "./decrypt";

const setCharacter = (
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera
) => {
  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("/draco/");
  loader.setDRACOLoader(dracoLoader);

  const loadCharacter = () => {
    return new Promise<GLTF | null>(async (resolve, reject) => {
      try {
        const encryptedBlob = await decryptFile(
          "/models/character.enc?v=2",
          "MyCharacter12"
        );
        const blobUrl = URL.createObjectURL(new Blob([encryptedBlob]));

        let character: THREE.Object3D;
        loader.load(
          blobUrl,
          async (gltf) => {
            character = gltf.scene;
            await renderer.compileAsync(character, camera, scene);
            character.traverse((child: any) => {
              if (child.isMesh) {
                const mesh = child as THREE.Mesh;
                console.log("Mesh name:", mesh.name); // Debug: see all available meshes

                // Change clothing colors as requested
                if (mesh.material) {
                  // Blue T-Shirt
                  if (mesh.name === "BODY.SHIRT" || mesh.name.includes("Shirt") || mesh.name.includes("shirt")) {
                    const newMat = (mesh.material as THREE.Material).clone() as THREE.MeshStandardMaterial;
                    newMat.color = new THREE.Color("#3b82f6"); // Bright blue t-shirt
                    newMat.metalness = 0.1;
                    newMat.roughness = 0.8;
                    mesh.material = newMat;
                  } 
                  // Light Brown Pants
                  else if (mesh.name === "Pant" || mesh.name.includes("Pant") || mesh.name.includes("pant")) {
                    const newMat = (mesh.material as THREE.Material).clone() as THREE.MeshStandardMaterial;
                    newMat.color = new THREE.Color("#d4a574"); // Light brown/khaki pants
                    newMat.metalness = 0.1;
                    newMat.roughness = 0.9;
                    mesh.material = newMat;
                  }
                  // Orange Cap (if exists)
                  else if (mesh.name.includes("Cap") || mesh.name.includes("cap") || mesh.name.includes("Hat") || mesh.name.includes("hat")) {
                    const newMat = (mesh.material as THREE.Material).clone() as THREE.MeshStandardMaterial;
                    newMat.color = new THREE.Color("#f97316"); // Orange cap
                    newMat.metalness = 0.1;
                    newMat.roughness = 0.7;
                    mesh.material = newMat;
                  }
                  // Black Glasses (if exists)
                  else if (mesh.name.includes("Glass") || mesh.name.includes("glass") || mesh.name.includes("Spectacle") || mesh.name.includes("Eye")) {
                    const newMat = (mesh.material as THREE.Material).clone() as THREE.MeshStandardMaterial;
                    newMat.color = new THREE.Color("#000000"); // Black square glasses
                    newMat.metalness = 0.8;
                    newMat.roughness = 0.2;
                    mesh.material = newMat;
                  }
                  // Dark Beard (if exists)
                  else if (mesh.name.includes("Beard") || mesh.name.includes("beard") || mesh.name.includes("FacialHair")) {
                    const newMat = (mesh.material as THREE.Material).clone() as THREE.MeshStandardMaterial;
                    newMat.color = new THREE.Color("#1a1a1a"); // Dark professional beard
                    newMat.metalness = 0.0;
                    newMat.roughness = 1.0;
                    mesh.material = newMat;
                  }
                  // Hair - Stylish dark
                  else if (mesh.name.includes("Hair")) {
                    const newMat = (mesh.material as THREE.Material).clone() as THREE.MeshStandardMaterial;
                    newMat.color = new THREE.Color("#1a1a1a");
                    mesh.material = newMat;
                  }
                }

                child.castShadow = true;
                child.receiveShadow = true;
                mesh.frustumCulled = true;
              }
            });
            resolve(gltf);
            setCharTimeline(character, camera);
            setAllTimeline();
            character!.getObjectByName("footR")!.position.y = 3.36;
            character!.getObjectByName("footL")!.position.y = 3.36;

            // Monitor scale is handled by GsapScroll.ts animations

            dracoLoader.dispose();
          },
          undefined,
          (error) => {
            console.error("Error loading GLTF model:", error);
            reject(error);
          }
        );
      } catch (err) {
        reject(err);
        console.error(err);
      }
    });
  };

  return { loadCharacter };
};

export default setCharacter;
