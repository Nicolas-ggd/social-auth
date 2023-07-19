import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import axios from "axios";

interface DecodedToken {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const GoogleAuth = () => {
  const [decodedUser, setDecodedUser] = useState<DecodedToken | null>(null);
  const navigate = useNavigate();
  const GoogleClientId =
    "134281613651-o4se37l59hip1meeouhv0fe4pc3oon91.apps.googleusercontent.com";

  const decodeJwtToken = (token: string) => {
    try {
      const decodedToken: DecodedToken = jwt_decode(token);
      setDecodedUser(decodedToken);
      console.log(decodedToken);
    } catch (error: any) {
      console.log("error decoded jwt token", error.message);
    }
  };

  useEffect(() => {
    const registerGoogleUser = async () => {
      if (!decodedUser) {
        return;
      }

      try {
        await axios.post("http://localhost:8000/register", {
          name: decodedUser.name,
          email: decodedUser.email,
          password: decodedUser.name,
          confirmPassword: decodedUser.name,
        })
        .then((res) => {
            const data = res.data;
            console.log(data, 'data')
            // navigate('/dashboard');
        })
      } catch (error) {
        console.error(error);
      }
    };

    registerGoogleUser();
  }, [decodedUser]);

  return (
    <GoogleOAuthProvider clientId={GoogleClientId}>
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          const jwtToken = credentialResponse.credential || "";
          if (jwtToken) {
            decodeJwtToken(jwtToken);
          }
        }}
        onError={() => {
          console.log("Login Failed");
        }}
      />
    </GoogleOAuthProvider>
  );
};
