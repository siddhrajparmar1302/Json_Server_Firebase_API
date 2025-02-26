import React, { useState, useEffect } from 'react';
import axios from 'axios';

const JsonServerApp = () => {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [editingId, setEditingId] = useState(null);

  const fetchUsers = async () => {
    const response = await axios.get('http://localhost:5000/users');
    setUsers(response.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const addUser = async () => {
    await axios.post('http://localhost:5000/users', { name, email });
    setName('');
    setEmail('');
    fetchUsers();
  };

  const editUser = (user) => {
    setEditingId(user.id);
    setName(user.name);
    setEmail(user.email);
  };

  const updateUser = async () => {
    if (editingId) {
      await axios.put(`http://localhost:5000/users/${editingId}`, { name, email });
      setEditingId(null);
      setName('');
      setEmail('');
      fetchUsers();
    }
  };

  const deleteUser = async (id) => {
    await axios.delete(`http://localhost:5000/users/${id}`);
    fetchUsers();
  };

  return (
    <div className="p-5">
      <input 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
        placeholder="Name" 
      />
      <input 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
        placeholder="Email" 
      />
      {editingId ? (
        <button onClick={updateUser}>Update User</button>
      ) : (
        <button onClick={addUser}>Add User</button>
      )}

      <table border="1" style={{ width: '100%', marginTop: '20px' }}>
        <thead>
          <tr>
            <th>Serial No.</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <button onClick={() => editUser(user)}>Edit</button>
                <button onClick={() => deleteUser(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default JsonServerApp;
