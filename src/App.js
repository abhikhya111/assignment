import './App.css';
import WineData from './components/winedata/WineData';
import WineGammaData from './components/winedata/WineGammaData';
import { useNavigate } from 'react-router';
import { Routes, Route } from 'react-router-dom';
function App() {

  const navigate = useNavigate()
  const handleFlavonoids = () => {
    navigate('/wineData')
  }

  const handleGammaData = () => {
    navigate('/wineDataByGamma');
  }
  return (
    <div className="App">
    <h1>Assignment</h1>
    <button type="button" onClick={handleFlavonoids}>Flavinoids wise Data</button>
    <button type="button" onClick={handleGammaData}>Gamma wise Data</button>
        <Routes>
          <Route exact path="/wineData" Component={WineData}/>
          <Route exact path="/wineDataByGamma" Component={WineGammaData}/>
        </Routes>
    </div>
  );
}

export default App;
