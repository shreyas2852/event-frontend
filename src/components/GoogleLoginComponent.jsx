import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { FaGoogle } from 'react-icons/fa'; 

const clientId = '471140071117-dshucruajv187nc0kjqgrg961css3jr1.apps.googleusercontent.com';

const GoogleLoginComponent = () => {
    const onSuccess = (response) => {
        alert('Login Successful !');
    };

    const onFailure = (error) => {
        alert('Login failed !');
    };

    return (
        <div>
            <h1>Event Management</h1>
            <GoogleLogin
                clientId={clientId}
                buttonText="Login with Google"
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy="single_host_origin" 
                render={(renderProps) => (
                    <button type="button" onClick={renderProps.onClick} className="google-login-btn">
                        <FaGoogle size={24} /> Sign in with Google
                    </button>
                )}
            />
        </div>
    );
};

export default GoogleLoginComponent;