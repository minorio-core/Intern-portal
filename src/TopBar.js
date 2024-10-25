import React from 'react';

const TopBar = () => {
  return (
    <div style={styles.topBar}>
      <h1 style={styles.title}>Minorio</h1>
      <div style={styles.menuItems}>
        <a href="#home" style={styles.link}>Home</a>
        <a href="#about" style={styles.link}>About</a>
        <a href="#contact" style={styles.link}>Contact</a>
      </div>  
    </div>
  );
};

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
};

export default TopBar;
