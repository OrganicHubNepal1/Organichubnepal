import React, { useState } from 'react';

function App() {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({ name: '', price: '', image: '', video: '' });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image' || name === 'video') {
      const file = files[0];
      const url = URL.createObjectURL(file);
      setFormData({ ...formData, [name]: url });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price) return;
    setProducts([...products, formData]);
    setFormData({ name: '', price: '', image: '', video: '' });
  };

  return (
    <div style={{ padding: '20px', maxWidth: '900px', margin: 'auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h1>Organic Hub Nepal</h1>
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Ailurus_fulgens_RoterPanda_LesserPanda.jpg/640px-Ailurus_fulgens_RoterPanda_LesserPanda.jpg" alt="Logo" height="60" />
      </div>
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <input type="text" name="name" placeholder="Product Name" onChange={handleChange} value={formData.name} required />
        <input type="number" name="price" placeholder="Price" onChange={handleChange} value={formData.price} required />
        <input type="file" name="image" accept="image/*" onChange={handleChange} />
        <input type="file" name="video" accept="video/*" onChange={handleChange} />
        <button type="submit">Add Product</button>
      </form>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
        {products.map((product, index) => (
          <div key={index} style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '10px', background: '#fff' }}>
            <h3>{product.name}</h3>
            <p>Price: ₹{product.price}</p>
            {product.image && <img src={product.image} alt={product.name} style={{ width: '100%', height: '150px', objectFit: 'cover' }} />}
            {product.video && <video controls src={product.video} style={{ width: '100%', marginTop: '10px' }} />}
            <button style={{ marginTop: '10px', background: '#ff9900', border: 'none', padding: '10px', color: '#fff', borderRadius: '5px' }}>Order Now</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;