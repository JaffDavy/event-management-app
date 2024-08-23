import React, { useState, useEffect } from 'react';
import axios from 'axios';

function IconWrapper() {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:5000/event/categories');
        setCategories(response.data);
      } catch (error) {
        setError('Error fetching categories');
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const getIcon = (categoryName) => {
    switch (categoryName) {
      case 'Sports':
        return '⚽'; 
      case 'Social':
        return '👥'; 
      case 'Education':
        return '🎓'; 
      case 'Entertainment':
        return '🎭'; 
      case 'Business':
        return '💼'; 
      default:
        return '📁'; 
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className='iconCategoryBrowser'>
      <div className='iconCategoryWrapper'>
        {categories.length > 0 ? (
          categories.map((category) => (
            <div key={category.id} className="icon-item">
              <a href={`/category/${category.name}`} className="icon-button">
                <span className="category-icon">{getIcon(category.name)}</span>
              </a>
              <p>{category.name}</p>
            </div>
          ))
        ) : (
          <p>No categories available</p>
        )}
      </div>
    </div>
  );
}

export default IconWrapper;
