import React, { useState } from 'react';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Invalid credentials');
        }
      })
      .then(data => {
        setIsLoggedIn(true);
        setUserData(data);
      })
      .catch(error => {
        console.error('Error logging in:', error);
      });
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserData(null);
  };

  if (!isLoggedIn) {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Trend Bank Login</h1>
          <div>
            <label>Username: </label>
            <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
          </div>
          <div>
            <label>Password: </label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
          </div>
          <button onClick={handleLogin}>Login</button>
        </header>
      </div>
    );
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome, {userData.username}!</h1>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {userData.transactions.map(transaction => (
              <tr key={transaction.date}>
                <td>{transaction.date}</td>
                <td>{transaction.description}</td>
                <td>{transaction.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <h2>Checking Balance: ${userData.checking}</h2>
        <h2>Savings Balance: ${userData.savings}</h2>
        <button onClick={handleLogout}>Logout</button>
      </header>
    </div>
  );
}

export default App;
