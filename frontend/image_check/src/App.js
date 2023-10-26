import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [image, setImage] = useState(null);

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('image', image);

    try {
      await axios.post('http://localhost:3000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Image uploaded successfully.');
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <div>
      <h1>Image Upload Form</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="image">Choose an image:</label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>
        <div>
          <button type="submit">Upload Image</button>
        </div>
      </form>
    </div>
  );
}

export default App;
