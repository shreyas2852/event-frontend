import React, { useEffect, useState } from 'react';
import EventGuide from './components/EventGuide';
import GoogleLoginComponent from './components/GoogleLoginComponent';
import { jwtDecode } from "jwt-decode";
import Navbar from './components/Navbar';
import './index.css';


const App = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [googleScriptError, setGoogleScriptError] = useState(false);
  useEffect(() => {
    const loadGoogleSignIn = () => {
      try {
        const script = document.createElement('script');
        script.src = 'https://accounts.google.com/gsi/client';
        script.onload = () => {
          google.accounts.id.initialize({
            client_id: '471140071117-dshucruajv187nc0kjqgrg961css3jr1.apps.googleusercontent.com',
            callback: handleCallbackResp
          });
          google.accounts.id.renderButton(
            document.getElementById("signInDiv"),
            { theme: 'outline', size: 'large' }
          );
        };
        script.onerror = () => {
          console.error("Failed to load Google API script.");
          setGoogleScriptError(true);
        };
        document.body.appendChild(script);
      } catch (error) {
        console.error("Error initializing Google Sign-In:", error);
        setGoogleScriptError(true);
      }
    };

    loadGoogleSignIn();
  }, [isSignedIn]);

  const handleCallbackResp = (resp) => {
    console.log("Encoded JWT token: ", resp.credential);
    setIsSignedIn(true);
    alert('You have login successfully!');
  };

  const handleSignOut = () => {
    setIsSignedIn(false);
    alert('You have successfully logged out!');
  };



  return (
    <div className="flex-col items-center justify-center min-h-screen bg-gray-100">
      {!isSignedIn ? (
        <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="p-10 bg-white rounded shadow-lg text-center">
            <h2 className="text-lg font-semibold mb-2">Sign in with Google</h2>
            <p>Use your Google Account to sign in</p>
            <div id="signInDiv"></div>
            {googleScriptError && (
                <p className="text-red-500 mt-2">Failed to load Google API. Check your connection and try again.</p>
            )}
        </div>
    </div>
      ) : (
        <>
          <Navbar handleSignOut={handleSignOut} />
          <EventGuide />
        </>
      )}
    </div>
  );
};

export default App;
