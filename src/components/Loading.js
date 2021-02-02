import React from 'react';
import { Dimmer, Loader } from 'semantic-ui-react';

const LoadingComponent = ({ inverted = true, content = 'Loading...' }) => {
    return (
        <Dimmer inverted={inverted} active={true} style={{minHeight: "100vh", width: "100%"}}>
            <Loader content={content} />
        </Dimmer>
    )
}


export default LoadingComponent;