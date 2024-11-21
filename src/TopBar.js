import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from './components/Firebase';


const TopBar = () => {

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('Guest');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
    // Dropdown visibility
    const toggleDropdown = () => {
      setDropdownOpen(!dropdownOpen);
    };
  
    // Handles login action
    const handleLogin = async () => {
      try {
          // Replace with actual user credentials or a popup for providers
         const userCredential = await signInWithEmailAndPassword(auth, email, password);
         setIsLoggedIn(true);
         setUsername(userCredential.user.displayName || userCredential.user.email || 'User');
         setDropdownOpen(false); // Close dropdown after login
      } catch (error) {
          console.error("Login failed", error.message);
      }
    };
  
    // Handles logout action
    const handleLogout = async () => {
      try {
        await signOut(auth);
        setIsLoggedIn(false);
        setUsername('Guest');
        setDropdownOpen(false); // Close dropdown after logout
      } catch (error) {
        console.error('Logout failed:', error.message);
      }
    };

    // Automatically check login state
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) =>  {
          if (user) {
              setIsLoggedIn(true);
              setUsername(user.displayName || user.email); // Set the username from Firebase
          } else {
              setIsLoggedIn(false);
              setUsername('Guest');
          }
      });
      return unsubscribe;
    }, []);

    return (
      <div style={styles.topBar}>
        <h1 style={styles.title}>Minorio</h1>
        <div style={styles.menuItems}>
          <a href="#home" style={styles.link}>Home</a>
          <a href="#about" style={styles.link}>About</a>
          <a href="#contact" style={styles.link}>Contact</a>
        </div>  
        <div style={styles.profileSection}>
          <button onClick={toggleDropdown} style={styles.profileButton}>
            {username} ▾
          </button>
          {dropdownOpen && (
            <div style={styles.dropdownMenu}>
              {!isLoggedIn ? (
                <div>
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={styles.input}
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={styles.input}
                  />
                  <button onClick={handleLogin} style={styles.dropdownItem}>Log In</button>
                </div>
              ) : (
                <>
                  <button onClick={handleLogout} style={styles.dropdownItem}>Log Out</button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    ); };
  
const styles = {
  topBar: {
    flexGrow: 1,
    width: '100%',
    height: '40px',
    backgroundColor: '#007ACC',
    color: '#fff',
    display: 'flex',
    position: 'fixed',
    top: 0,
    zIndex: 1,
  },
  title: {
    fontSize: '16px',
    fontWeight: 'bold',
  },
  menuItems: {
    display: 'flex',
    gap: '30px',
    fontSize: '11px',
  },
  profileSection: {
    position: 'relative',
  },
  profileButton: {
    backgroundColor: 'transparent',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
  },
  dropdownMenu: {
    position: 'absolute',
    top: '100%',
    right: 0,
    backgroundColor: '#fff',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
    borderRadius: '4px',
    overflow: 'hidden',
  },
  dropdownItem: {
    padding: '10px 20px',
    cursor: 'pointer',
    border: 'none',
    width: '100%',
    textAlign: 'left',
  },
};

export default TopBar;
