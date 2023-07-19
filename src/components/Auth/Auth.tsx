import { useState } from "react";

import { SignIn } from "./SignIn/SignIn";
import { SignUp } from "./SignUp/SignUp";

export const Auth = () => {
  const [isAuth, setIsAuth] = useState<Boolean>(true);

  const toggleAuth = () => {
    setIsAuth((prevIsAuth) => !prevIsAuth);
  };

  return (
    <>
      {isAuth ? (
        <SignIn
          closeSignIn={toggleAuth}
        />
      ) : (
        <SignUp
          closeSignUp={toggleAuth}
        />
      )}
    </>
  );
};
