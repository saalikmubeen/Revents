import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isLoaded } from 'react-redux-firebase';
import { Segment, Header, Divider, Grid, Button } from 'semantic-ui-react';
import { uploadProfilePhoto } from '../actions/authActions';
import ImageUpload from '../components/ImageUpload';
import Loading from '../components/Loading';

const PhotosPage = () => {
    const dispatch = useDispatch();
    const profile = useSelector((state) => state.firebase.profile)
     const { loading } = useSelector((state) => state.async);
    const [files, setFiles] = useState(null);


    useEffect(() => {
        files && files.forEach((file) => URL.revokeObjectURL(file.preview));
    }, [files]);


    const handleUploadImage = () => {
        if (files && files.length > 0) {
            dispatch(uploadProfilePhoto(files[0], files[0].name))
        }
    }

    const handleCancelUpload = () => {
        setFiles(null);
    }

    if (!isLoaded(profile)) {
        return <Loading/>
    }

        return (
            <Segment>
                <Header dividing size='large' content='Change profile image' />
                <Grid stackable> 
                    <Grid.Row />
                    <Grid.Column  mobile={16} tablet={4} computer={4}>
                        <Header color='teal' sub content='Add Photo' />
                        <ImageUpload setFiles={setFiles} />
                        <Button.Group style={{width: "100%"}}>
                            <Button onClick={handleUploadImage} positive icon='check' loading={ loading }/>
                            <Button  onClick={handleCancelUpload} icon='close' />
                        </Button.Group>
                    </Grid.Column>
                    <Grid.Column width={1} />
                    <Grid.Column mobile={16} tablet={4} computer={4}>
                        <Header sub color='teal' content='Preview' />
                        {files && files.length > 0 &&
                            <img src={files[0].preview} style={{ width: "90%", height: "90%", objectFit: "cover" }} alt="profile pic"/>
                        }
                    </Grid.Column>
                    <Grid.Column width={1} />
                    <Grid.Column mobile={16} tablet={4} computer={4}>
                        <Header sub color='teal' content='Your Profile Image' />
                        <img src={profile.photoURL || '/assets/images/user.png'} alt="profile pic" style={{ width: "90%", height: "90%", objectFit: "cover" }}/>
                    </Grid.Column>

                </Grid>

                <Divider/>
            </Segment>
        );
}

export default PhotosPage;
