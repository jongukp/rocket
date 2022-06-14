import React from 'react';
import './App.css';

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <h1>QA Exercise</h1>
      </header>
      <Boxes />
    </div>
  );
}

const Boxes = () => {
  const [boxes, setBoxes] = React.useState([]);
  const [showError, setShowError] = React.useState(false);
  const MAX_BOXES = 20;
  const MIN_BOXES = 0;

  const handleAddBox = (e) => {
    e.preventDefault();
    if (boxes.length === 0) setShowError(false);
    const newBoxes = [...boxes, 'New Box'];
    setBoxes(newBoxes);
  };

  const handleRemoveBox = (e) => {
    e.preventDefault();
    if (boxes.length > 0) {
      const newBoxes = [...boxes];
      newBoxes.pop();
      setBoxes(newBoxes);
    } else {
      setShowError(true);
    }
  };

  return (
    <>
      <main>
        {showError ? (
          <div
            style={{
              alignItems: 'center',
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
              justifyContent: 'center',
              width: '100%',
            }}
          >
            <div className='errorMsg'>
              <p>Error: Can't Process Request</p>
            </div>
          </div>
        ) : null}
        <div className='boxes'>
          {boxes.map((box, idx) => {
            return (
              <div className='box'
                   key={idx}
                   data-testid={`box_${idx}`}
              >
                {idx}
              </div>
            );
          })}
        </div>
      </main>
      <footer>
        <button
          className='addBtn'
          data-testid="add_button"
          onClick={(e) => handleAddBox(e)}
          disabled={boxes.length >= MAX_BOXES}
        >
          Add Box
        </button>
        <button
          className='removeBtn'
          data-testid="remove_button"
          onClick={(e) => handleRemoveBox(e)}
          disabled={boxes.length <= MIN_BOXES}
        >
          Remove Box
        </button>
      </footer>
    </>
  );
};

export default App;
