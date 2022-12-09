import './App.css';
import GridDisplay from './components/GridDisplay/GridDisplay';
import Resizer from './components/Resizer';
import { css } from '@emotion/react';
import WindMapContainer from './components/WindMap/WindMapContainer';

function App() {
  return (
    <div className="App">
      {/* <div css={css({ width: 800, height: 700 })}>
        <GridDisplay width={800} height={800} resolution={{ x: 4, y: 4 }}></GridDisplay>
      </div> */}
      <WindMapContainer></WindMapContainer>
    </div>
  );
}

export default App;
