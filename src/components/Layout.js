import React from 'react';
import TopBar from '../TopBar';

const MainLayout = ({ children }) => {
 return (
    <div style={styles.Container}>
      <TopBar />  
      <div style={styles.subContainer}>  {children} </div>
    </div>
 );
};

const styles = {
    Container: {
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
       },
    subContainer: {
        display: 'flex',         // Flexbox to position sidebar and content side by side
        marginTop: '60px',       // pushing elements below topbar
    }
};

export default MainLayout;