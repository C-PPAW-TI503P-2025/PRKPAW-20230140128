import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {
  const [nama, setNama] = useState('');
  const [submittedNama, setSubmittedNama] = useState('');

  const handleInputChange = (e) => {
    setNama(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedNama(nama);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Masukkan nama Anda"
            value={nama}
            onChange={handleInputChange}
          />
          <button type="submit">Kirim</button>
        </form>
        {submittedNama && (
          <h2>Hello, {submittedNama}!</h2>
        )}
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;