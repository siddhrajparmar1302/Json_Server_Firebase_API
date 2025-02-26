import React, { useState, useEffect } from "react";
import { db, auth, signOut } from "../../firebase_config";
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Crud = () => {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const usersCollectionRef = collection(db, "users");

  const fetchUsers = async () => {
    try {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();

    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      navigate("/");
    }
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("user"); 
      navigate("/");
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  const addUser = async () => {
    if (!name || !email) {
      alert("Please enter both Name and Email!");
      return;
    }
    try {
      await addDoc(usersCollectionRef, { name, email });
      alert("User added successfully!");
      setName("");
      setEmail("");
      fetchUsers();
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  const deleteUser = async (id) => {
    try {
      await deleteDoc(doc(db, "users", id));
      alert("User deleted!");
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="p-5">
      <div className="flex justify-between items-center">
        <h2>CRUD Operations</h2>
        <button onClick={handleLogout}>Logout</button>
      </div>

      
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
      <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <button onClick={addUser}>Add User</button>

  
      <table border="1" style={{ width: "100%", marginTop: "20px" }}>
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
                <button onClick={() => deleteUser(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Crud;
