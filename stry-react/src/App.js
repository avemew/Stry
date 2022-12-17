import './App.css';
import Weather from './Weather/Weather';
import $ from "jquery";
import ripples from "jquery.ripples";

function App() {

  $("body").ripples({
    resolution: 1024,
    perturbance: 1,
    interactive: false,
  });

  return (
      <Weather />
  );
}

export default App;
