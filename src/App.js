import React, { useState } from 'react';
import MainLayout from './components/Layout';
import './App.css';

function App() {

  // State to keep track of the selected category && if I clicked before the button (category completed)
  const [selectedCategory, setSelectedCategory] = useState('main');
  const [completedCategories, setCompletedCategories] = useState({
    'What is open source': false,
    'Git, Github and Version control': false,
    'Testing in software projects': false,
    'Documentation': false,
    'Packages and Dependencies': false,
    'Cross-team': false
  });

  // Function to handle category selection
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  //Function to handle completed categories when button clicked
  const handleButtonClick = () => {
    setCompletedCategories(prevState => ({
      ...prevState,
      [selectedCategory]: true
    }));
  };

  // Function to render content based on the selected category
  const renderContent = () => {
     return (
           <>
             <p>This is the {selectedCategory} content.</p>
             <div style={{ height: '500px' }} /> {/* Simulating scrollable content */}
             <button onClick={handleButtonClick}> Button </button>
             {completedCategories[selectedCategory]&& <p>Mission done</p>}
           </>
           ); 
  };

  return (
    <MainLayout>
     {/* Fixed Sidebar */}
     <div style={styles.sidebar}>
       <h2> Sidebar </h2>
        <ul>
        {Object.keys(completedCategories).map((category) => (
            <li key={category} onClick={() => handleCategoryClick(category)}>
              {category} 
              {completedCategories[category] && (
                <span style={styles.checkmark}>✓</span> 
              )}
            </li>
          ))}
        </ul>
      </div>
      {/* Main Content */}
      <div style={styles.mainContent}>
        <p>
          Welcome @ Minorio
        </p>
        <a
          className="App-link"
          href="https://minorio.notion.site"
          target="_blank"
          rel="noopener noreferrer"
        >
          Main website
        </a>
        {renderContent()} {/* Render content based on selected category */}
        
      </div>
    </MainLayout>
  )
}

const styles = {
  sidebar: {
    width: '300px',          // Fixed width for sidebar
  },
  mainContent: {
    flexGrow: 1,             // The main content will take up the remaining space
  },
  checkmark: {
    marginLeft: '10px',         
  },
};

export default App;
