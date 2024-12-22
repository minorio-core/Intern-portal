import React, { useState, useEffect } from 'react';
import MainLayout from './components/Layout';
import './App.css';
import { auth } from "./components/Firebase";  
import { getDatabase, ref, update, onValue } from "firebase/database"; 


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
  const [lastLogin, setLastLogin] = useState('');
  const [progressPercentage, setProgressPercentage] = useState('');


   // Load user data on login
  useEffect(() => {
   const db = getDatabase();
   const userId = auth.currentUser?.uid;

   if (userId) {
    // Fetch user data
    const userRef = ref(db, `users/${userId}`);
    onValue(userRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setCompletedCategories(data.completedCategories || {});
        setProgressPercentage(data.progressPercentage || 0);
        setLastLogin(data.lastLogin || ''); // Set the last login time
      }
    });

    // Update last login time without overwriting other data
    update(userRef, {
      lastLogin: new Date().toISOString(),
    }).catch((error) => {
      console.error("Error updating last login:", error);
    });
  }
   }, [auth.currentUser]);
   const formattedLastLogin = lastLogin ? new Date(lastLogin).toLocaleString() : 'Not available';


  // Function to handle category selection
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  //Function to handle completed categories when button clicked
  const handleButtonClick = () => {
    setCompletedCategories((prevState) => {
      const updatedCategories = {
        ...prevState,
        [selectedCategory]: true, // Mark the selected category as completed
      };
      const totalCategories = Object.keys(updatedCategories).length;
      const completedCount = Object.values(updatedCategories).filter((isCompleted) => isCompleted).length;
      const progressPercentage = Math.round((completedCount / totalCategories) * 100);

      const db = getDatabase();
      const userId = auth.currentUser?.uid;
      if (userId) {
        const userRef = ref(db, `users/${userId}`);
        update(userRef, {
            completedCategories: updatedCategories,
            progressPercentage: progressPercentage, // Save progress percentage
        })
            .then(() => {
                console.log(`Progress updated to ${progressPercentage}% for user ${userId}`);
            })
            .catch((error) => {
                console.error("Error updating database:", error);
            });
      } else {
        console.error("User not logged in.");
      }

    return updatedCategories; // Update local state with the new data
    });
  };
  const [progress, setProgress] = useState(0); // Track progress percentage

  useEffect(() => {
    // Calculate progress when `completedCategories` changes
    const totalCategories = Object.keys(completedCategories).length;
    const completedCount = Object.values(completedCategories).filter((val) => val).length;
    const percentage = Math.round((completedCount / totalCategories) * 100);
    setProgress(percentage);
  }, [completedCategories]);

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
        <div style={styles.lastLoginContainer}>
            <p>Last Login: {formattedLastLogin}</p>
        </div>
        <div>
         <h3>Progress: {progress}%</h3>
         <div style={styles.progressBarContainer}>
            <div style={{ ...styles.progressBar, width: `${progress}%` }}></div>
         </div>
        </div>
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
  progressBarContainer: {
    width: '100%',
    backgroundColor: '#e0e0e0',
    borderRadius: '10px',
    overflow: 'hidden',
    marginTop: '20px',
  },
  progressBar: {
    height: '20px',
    backgroundColor: '#4caf50',
    transition: 'width 0.5s ease',
  },
  lastLoginContainer: {
    margin: '10px 0',
    fontSize: '14px',
    color: '#555',
},
};

export default App;
