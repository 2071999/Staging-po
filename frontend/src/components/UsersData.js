// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const UsersData = () => {
//   const [users, setUsers] = useState([]);
//   const [newUser, setNewUser] = useState({
//     username: "",
//     password: "",
//     role: "user",
//   });

//   useEffect(() => {
//     const fetchUsers = async () => {
//       const token = localStorage.getItem("token");
//       const res = await axios.get("http://localhost:5002/api/users", {
//         headers: { "x-auth-token": token },
//       });
//       setUsers(res.data);
//     };
//     fetchUsers();
//   }, []);

//   const handleInputChange = (e) => {
//     setNewUser({ ...newUser, [e.target.name]: e.target.value });
//   };

//   const handleCreateUser = async (e) => {
//     e.preventDefault();
//     try {
//       const token = localStorage.getItem("token");
//       await axios.post("http://localhost:5002/api/users", newUser, {
//         headers: { "x-auth-token": token },
//       });
//       alert("User created successfully");
//       setNewUser({ username: "", password: "", role: "user" });
//       window.location.reload();
//     } catch (err) {
//       console.error(err);
//       alert("Failed to create user");
//     }
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Users Data</h1>

//       <form
//         onSubmit={handleCreateUser}
//         className="mb-6 p-4 bg-gray-100 rounded"
//       >
//         <h2 className="text-xl font-bold mb-2">Create New User</h2>
//         <input
//           type="text"
//           name="username"
//           placeholder="Username"
//           value={newUser.username}
//           onChange={handleInputChange}
//           className="w-full p-2 mb-2 border rounded"
//           required
//         />
//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           value={newUser.password}
//           onChange={handleInputChange}
//           className="w-full p-2 mb-2 border rounded"
//           required
//         />
//         <select
//           name="role"
//           value={newUser.role}
//           onChange={handleInputChange}
//           className="w-full p-2 mb-2 border rounded"
//         >
//           <option value="user">User</option>
//           <option value="admin">Admin</option>
//         </select>
//         <button
//           type="submit"
//           className="w-full p-2 bg-green-500 text-white rounded hover:bg-green-600"
//         >
//           Create User
//         </button>
//       </form>

//       <ul>
//         {users.map((user) => (
//           <li key={user._id} className="mb-2 p-2 bg-white rounded shadow">
//             <strong>Username:</strong> {user.username} | <strong>Role:</strong>{" "}
//             {user.role}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default UsersData;
