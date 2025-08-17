// src/pages/CreateUserPage.tsx
import React, { useState } from 'react';
import { apiClient } from '../api';
import '../style.css'; 

const CreateUserPage: React.FC = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    role: 'job_seeker',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiClient.createUser(formData);
      setMessage('User created successfully!');
      setFormData({ first_name: '', last_name: '', email: '', password: '', role: 'job_seeker' });
    } catch (error) {
      console.error('Error creating user:', error);
      setMessage('Failed to create user.');
    }
  };

  return (
    <div className="container">
      <h2 className='title'>Create New User</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit} className="form">
        <input name="first_name" placeholder="First Name" value={formData.first_name} onChange={handleChange} required />
        <input name="last_name" placeholder="Last Name" value={formData.last_name} onChange={handleChange} required />
        <input name="email" placeholder="Email" type="email" value={formData.email} onChange={handleChange} required />
        <input name="password" placeholder="Password" type="password" value={formData.password} onChange={handleChange} required />
        <select name="role" value={formData.role} onChange={handleChange}>
          <option value="job_seeker">Job Seeker</option>
          <option value="recruiter">Recruiter</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit">Create User</button>
      </form>
    </div>
  );
};

export default CreateUserPage;
