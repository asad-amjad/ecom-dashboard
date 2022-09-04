import { any } from 'prop-types'
import { React, useState } from 'react'

const ImageSelector = (props) => {
  const { selectedImage, removeSelectedImage } = props
  // This function will be triggered when the file field change
  // This function will be triggered when the "Remove This Image" button is clicked

  return (
    <>
      <div style={styles.container}>
        <div style={styles.preview}>
          <img src={URL.createObjectURL(selectedImage)} style={styles.image} alt="Thumb" />
          <button onClick={removeSelectedImage} style={styles.delete}>
            Remove This Image
          </button>
        </div>
      </div>
    </>
  )
}

// export default App;

// Just some styles
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    // paddingTop: 50,
  },
  preview: {
    marginTop: 50,
    display: 'flex',
    flexDirection: 'column',
  },
  image: { maxWidth: '100%', maxHeight: 180 },
  delete: {
    marginTop: '5px',
    cursor: 'pointer',
    padding: 15,
    background: 'red',
    color: 'white',
    border: 'none',
  },
}

ImageSelector.defaultProps = {
  selectedImage: any,
  removeSelectedImage: any,
}

ImageSelector.propTypes = {
  selectedImage: any,
  removeSelectedImage: any,
}

export default ImageSelector
