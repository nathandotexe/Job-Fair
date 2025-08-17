// src/pages/UsersPage.tsx
import React, { useState, useEffect } from 'react';
import { apiClient, User } from '../api';
import '../style.css';
import 'bootstrap/dist/css/bootstrap.css';
import NavBar from '../components/NavBar';
import BottomBar from '../components/BottomBar';
import pathofimage from '../assets/logo.png';

const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userData = await apiClient.getUsers();
        console.log('Fetched users:', userData);
        setUsers(userData);
      } catch (err: any) {
        console.error('Error fetching users:', err);
        setError('Failed to load users.');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <>
      <NavBar imagepath={pathofimage} />
      <div className="container mt-5">
        <h1 className="title text-center mb-4">Registered Users</h1>

        {loading && <p className="text-center">Loading users...</p>}
        {error && <p className="text-danger text-center">{error}</p>}
        {!loading && !error && users.length === 0 && (
          <p className="text-center">No users found.</p>
        )}

        <div className="row">
          {users.map((user) => (
            <div className="col-md-4 mb-4" key={user.id}>
              <div className="card shadow-sm user-card">
                <div className="card-body">
                  <h5 className="card-title">{user.first_name} {user.last_name}</h5>
                  <p className="card-text"><strong>Email:</strong> {user.email}</p>
                  <p className="card-text"><strong>Role:</strong> {user.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default UsersPage;
