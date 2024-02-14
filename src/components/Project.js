import React, {useEffect, useState, useCallback} from 'react'
import {useAuth} from '../contexts/AuthContext'

function Project() {
  const [idToken, setIdToken] = useState(null)
  const {currentUser} = useAuth()

  const sendTokenToBackend = useCallback(async (token) => {
     try {
        const response = fetch("http://localhost:8080/verifytoken", {
          method: 'POST',
          headers: {
            Authorization: "Bearer " + currentUser?.idToken, // Use user's idToken instead of accessToken
          },
        });

        if (response.ok) {
          const data = response.json();
          console.log(JSON.stringify(data));
        } else {
          alert("Failed to connect");
        }
      } catch (error) {
        alert("Failed to connect");
        console.log('Error sending ID token to backend:', error)
      }
    }, [currentUser]);
    /*
    // Example of sending the ID token to your backend
    fetch('http://localhost:8080/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Include the ID token in the Authorization header
        'Authorization': `Bearer ${token}`
      },
      // Optional: Include additional data in the request body
      body: JSON.stringify({ token })
    })
    .then(response => {
      // Handle response from the backend
      if (response.ok) {
        console.log('ID token sent to backend successfully');
      } else {
        throw new Error('Failed to send ID token to backend');
      }
    })
    .catch(error => {
      console.error('Error sending ID token to backend:', error);
    });
  };*/

  useEffect(() => {
    // Get current user's ID token
    const fetchIdToken = async () => {
      try {
        if (currentUser) {
          const token = await currentUser.getIdToken(/* forceRefresh */ true);
          setIdToken(token);
          console.log("id token for ", currentUser.email, " is ", idToken)
          // Send the ID token to your backend via HTTPS
          sendTokenToBackend(idToken);
        }
      } catch (error) {
        console.error('Error fetching ID token:', error);
      }
    };

    fetchIdToken();

    // Clean up
    return () => {
      console.log("Sending.....")
    };
  }, [currentUser, sendTokenToBackend, idToken]);
  /*
  const sendTokenToBackend = useCallback(async (token) => {
     try {
        const response = fetch("http://localhost:8080/user/current", {
          headers: {
            Authorization: "Bearer " + currentUser?.idToken, // Use user's idToken instead of accessToken
          },
        });

        if (response.ok) {
          const data = response.json();
          console.log(JSON.stringify(data));
        } else {
          alert("Failed to connect");
        }
      } catch (error) {
        alert("Failed to connect");
      }
    });
    
    // Example of sending the ID token to your backend
    fetch('http://localhost:8080/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Include the ID token in the Authorization header
        'Authorization': `Bearer ${token}`
      },
      // Optional: Include additional data in the request body
      body: JSON.stringify({ token })
    })
    .then(response => {
      // Handle response from the backend
      if (response.ok) {
        console.log('ID token sent to backend successfully');
      } else {
        throw new Error('Failed to send ID token to backend');
      }
    })
    .catch(error => {
      console.error('Error sending ID token to backend:', error);
    });
  };*/

  return (
    <div>
      {JSON.stringify(currentUser)}
    </div>
  );
}

export default Project;

