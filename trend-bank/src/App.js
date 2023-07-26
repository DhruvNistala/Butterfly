import React, { useState } from 'react';
import './App.css';
import { useTable } from 'react-table';

// Login Page Component
const LoginPage = ({ handleLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLoginClick = () => {
    handleLogin(username, password);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Trend Bank</h1>
        <div className="input-container">
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
          />
        </div>
        <div className="input-container">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
        </div>
        <button onClick={handleLoginClick}>Login</button>
      </div>
    </div>
  );
};

// Table Page Component
const TablePage = () => {
  // Sample data for the table
  const data = React.useMemo(
    () => [
      { id: 1, name: 'John Doe', age: 28, email: 'john.doe@example.com' },
      { id: 2, name: 'Jane Smith', age: 34, email: 'jane.smith@example.com' },
      { id: 3, name: 'Mike Johnson', age: 45, email: 'mike.johnson@example.com' },
      // Add more data as needed
    ],
    []
  );

  // Define table columns
  const columns = React.useMemo(
    () => [
      { Header: 'ID', accessor: 'id' },
      { Header: 'Name', accessor: 'name' },
      { Header: 'Age', accessor: 'age' },
      { Header: 'Email', accessor: 'email' },
    ],
    []
  );

  // Create a table instance using react-table
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data });

  return (
    <div className="table-container">
      <h1>User Information Table</h1>
      <table {...getTableProps()} className="user-table">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = (username, password) => {
    // Your login logic here...
    // For simplicity, we'll set loggedIn to true directly in this example.
    setLoggedIn(true);
  };

  return (
    <div>
      {!loggedIn ? <LoginPage handleLogin={handleLogin} /> : <TablePage />}
    </div>
  );
};

export default App;
