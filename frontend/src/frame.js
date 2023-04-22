import React from 'react';

function Frame() {
  const styles = {
    height: '100vh',
    width: '100vw',
  };

  return (
    <iframe src={"http://localhost:8601"} style={styles}/>
  );
}

export default Frame;