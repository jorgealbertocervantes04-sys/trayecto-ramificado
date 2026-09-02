import { JourneyProvider } from "./contexts/JourneyContext";
import { SceneContainer } from "./components/Scene/SceneContainer";

function App() {
  return (
    <JourneyProvider>
      <SceneContainer />
    </JourneyProvider>
  );
}

export default App;