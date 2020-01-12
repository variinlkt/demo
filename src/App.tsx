import React, { useRef } from 'react';
import './App.scss';
import FileLoader from './baseCmp/File';

function App() {
  const fileRef: any = useRef(null)
  const handleSubmit = (e: any) => {
    const file = fileRef.current.files[0];
    const fl = new FileLoader(file)
    fl.upload()

    
    e.preventDefault();
  }
  return (
    <div>
      {/* <form onSubmit={handleSubmit}>
        <label>
          Upload file: */}
          <input type="file" ref={fileRef} onChange={handleSubmit}/>
        {/* </label>
        <br />
        <button type="submit">Submit</button>
      </form> */}
    </div>
  );
}

export default App;
