import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import { Header, Icon } from 'semantic-ui-react'
 
const ImageUpload = ({ setFiles }) => {

    const onDrop = useCallback((acceptedFiles) => {
        // setFile({ ...acceptedFiles, preview: URL.createObjectURL(acceptedFiles[0]) }); // doesn't work as expected

        setFiles(acceptedFiles.map(file => Object.assign(file, {
            preview: URL.createObjectURL(file)
        })))
        
    }, [setFiles])
    
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, multiple: false, accept: 'image/*' });

  return (
    <div {...getRootProps()} className={`dropzone ${isDragActive && "dropzone--isActive"}`}>
        <input {...getInputProps()} />
        <Icon name='upload' size='huge' />
        <Header content='Drop image here' />     
    </div>
  )
}

export default ImageUpload;