import React, { useState } from 'react';
import { addMinistry } from '../services/ministryService';

const initialState = {
  name: '',
  description: '',
  phone: '',
  email: '',
  website: '',
  tags: ''
};

export default function MinistryForm({ onAdded }) {
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Convert tags to array and basic validation
      const tagsArray = form.tags.split(',').map(tag => tag.trim()).filter(tag => tag);
      if (!form.name || !form.description) throw new Error('Name and Description are required.');

      await addMinistry({
        name: form.name,
        description: form.description,
        phone: form.phone,
        email: form.email,
        website: form.website,
        tags: tagsArray
      });

      setSuccess('Ministry added successfully!');
      setForm(initialState);
      if (onAdded) onAdded();
    } catch (err) {
      setError(err.message || 'Error adding ministry.');
    }
    setLoading(false);
  }

  return (
    <form className="ministry-form" onSubmit={handleSubmit}>
      <h2>Add a New Ministry</h2>
      <div>
        <label>Name*</label>
        <input name="name" value={form.name} onChange={handleChange} required />
      </div>
      <div>
        <label>Description*</label>
        <textarea name="description" value={form.description} onChange={handleChange} required />
      </div>
      <div>
        <label>Phone</label>
        <input name="phone" value={form.phone} onChange={handleChange} />
      </div>
      <div>
        <label>Email</label>
        <input name="email" type="email" value={form.email} onChange={handleChange} />
      </div>
      <div>
        <label>Website</label>
        <input name="website" type="url" value={form.website} onChange={handleChange} />
      </div>
      <div>
        <label>Tags (comma separated)</label>
        <input name="tags" value={form.tags} onChange={handleChange} />
      </div>
      <button type="submit" disabled={loading}>{loading ? 'Adding...' : 'Add Ministry'}</button>
      {error && <div className="form-error">{error}</div>}
      {success && <div className="form-success">{success}</div>}
    </form>
  );
}
