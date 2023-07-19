import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

export const GoogleAuth = () => {
  const GoogleClientId =
    "134281613651-o4se37l59hip1meeouhv0fe4pc3oon91.apps.googleusercontent.com";
  return (
    <GoogleOAuthProvider clientId={GoogleClientId}>
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          console.log(credentialResponse);
        }}
        onError={() => {
          console.log("Login Failed");
        }}
      />
    </GoogleOAuthProvider>
  );
};
