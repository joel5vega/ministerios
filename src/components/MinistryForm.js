import React, { useState } from 'react';
import { addMinistry } from '../services/ministryService';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db } from '../firebase';

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
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  function handleFileChange(e) {
    setImageFile(e.target.files[0]);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    let imageUrl = '';

    try {
      // Convert tags to array and basic validation
      const tagsArray = form.tags.split(',').map(tag => tag.trim()).filter(tag => tag);
      if (!form.name || !form.description) throw new Error('Name and Description are required.');

      // If an image was selected, upload it to Firebase Storage
      if (imageFile) {
        const storage = getStorage();
        const imageRef = ref(storage, `ministerios/${Date.now()}-${imageFile.name}`);
        await uploadBytes(imageRef, imageFile);
        imageUrl = await getDownloadURL(imageRef);
      }

      await addMinistry({
        name: form.name,
        description: form.description,
        phone: form.phone,
        email: form.email,
        website: form.website,
        tags: tagsArray,
        imageUrl // Save image URL with ministry info
      });

      setSuccess('Ministry added successfully!');
      setForm(initialState);
      setImageFile(null);
      if (onAdded) onAdded();
    } catch (err) {
      setError(err.message || 'Error adding ministry.');
    }
    setLoading(false);
  }

  return (
    <form className="ministry-form" onSubmit={handleSubmit}>
      <h2>Añadir nuevo ministerio</h2>
      <div>
        <label>Nombre*</label>
        <input name="name" value={form.name} onChange={handleChange} required />
      </div>
      <div>
        <label>Descripión*</label>
        <textarea name="description" value={form.description} onChange={handleChange} required />
      </div>
      <div>
        <label>Teléfono</label>
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
        <label>Etiquetas (separadas por comas)</label>
        <input name="tags" value={form.tags} onChange={handleChange} />
      </div>
      <div>
        <label>Imagen</label>
        <input type="file" accept="image/*" onChange={handleFileChange} />
      </div>
      <button type="submit" disabled={loading}>{loading ? 'Adding...' : 'Add Ministry'}</button>
      {error && <div className="form-error">{error}</div>}
      {success && <div className="form-success">{success}</div>}
    </form>
  );
}
