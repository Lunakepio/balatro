import { WebGLCanvas } from "./renderer/WebGLCanvas";
import { Balatro } from "./renderer/Balatro";
import { Game } from "./Game";
// import { Card } from "./renderer/Card";
import { Slot } from "./renderer/Slot";

function App() {
  return (
    <div className="App" style={{ width: "100vw", height: "100dvh" }}>
      <WebGLCanvas>
        <Balatro />
        <group position={[0, 0, 0]}>
          <Slot />
        </group>
        <directionalLight
        intensity={10}
        position={[0, 10, 0]}
        castShadow
        shadow-mapSize-height={2048}
        shadow-mapSize-width={2048}
        shadow-camera-far={100}
        shadow-camera-near={0}
        shadow-camera-bottom={-20}
        shadow-camera-top={20}
        shadow-camera-right={20}
        shadow-camera-left={20}
      />
      </WebGLCanvas>

      {/* <Game /> */}
    </div>
  );
}

export default App;
