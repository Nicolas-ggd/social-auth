import React, { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import axios from "axios";

import { GoogleAuth } from "./GoogleAuth/GoogleAuth";

interface SignInProps {
  closeSignIn: () => void;
}

export const SignIn: React.FC<SignInProps> = ({ closeSignIn }) => {
  const navigate = useNavigate();
  const [isError, setIsError] = useState<boolean>(false);
  const [isAuthnticate, setIsAuthnticate] = useState<boolean>(false);
  const [isErrorMessage, setIsErrorMessage] = useState<string>("");
  const [isForgot, setIsForgot] = useState<boolean>(false);
  const [signInData, setSignInData] = useState<{
    email: string;
    password: string;
  }>({
    email: "",
    password: "",
  });
  const [searchVerifyCode] = useSearchParams();
  const searchParamsCode = searchVerifyCode.get("verifyCode");

  const toggleForgotPassword = () => {
    setIsForgot((prevIsForgot) => !prevIsForgot);
  };

  const submitSignInData = async (event: FormEvent<HTMLFormElement>) => {
    if (signInData?.email?.length === 0 || signInData?.password?.length === 0) {
      return setIsError(true);
    }
    event.preventDefault();

    try {
      const res = await axios.post("http://localhost:8000/auth", {
        email: signInData.email,
        password: signInData.password,
        verificationCode: searchParamsCode,
      });
      const data = res.data;
      localStorage.setItem("access_token", data?.access_token);
      localStorage.setItem("userId", data?._id);
      console.log(data);
      navigate("/dashboard");
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message || "Authentication failed";
      setIsAuthnticate(true);
      setIsErrorMessage(errorMessage);
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-800 transiton duration-300">
      {!isForgot && (
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 transiton duration-300 sm:p-8 dark:bg-gray-700 dark:rounded-md">
              <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-gray-900 dark:text-white">
                Sign in to your account
              </h1>
              <form
                className="space-y-4 md:space-y-6"
                onSubmit={submitSignInData}
              >
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    style={{
                      borderColor:
                        isError && signInData?.email?.length === 0 ? "red" : "",
                    }}
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none"
                    placeholder="name@company.com"
                    required
                    value={signInData.email}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setSignInData((prevSendData) => ({
                        ...prevSendData,
                        email: e.target.value,
                      }))
                    }
                  />
                </div>
                {isError && signInData?.email?.length <= 0 && (
                  <span style={{ color: "red", margin: "3px" }}>
                    Please fill the email
                  </span>
                )}

                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium dark:text-white text-gray-900"
                  >
                    Password
                  </label>
                  <input
                    style={{
                      borderColor:
                        isError && signInData?.password?.length === 0
                          ? "red"
                          : "",
                    }}
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none"
                    required
                    value={signInData.password}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setSignInData((prevSendData) => ({
                        ...prevSendData,
                        password: e.target.value,
                      }))
                    }
                  />
                </div>
                {isError && signInData?.password?.length === 0 && (
                  <span style={{ color: "red", margin: "3px" }}>
                    Please fill the password
                  </span>
                )}

                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="remember"
                        aria-describedby="remember"
                        type="checkbox"
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-600 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-primary-300"
                        required
                      />
                    </div>
                    <div className="ml-3 text-sm text-gray-300 text-gray-500">
                      <label
                        htmlFor="remember"
                        className="block mb-2 text-sm font-medium text-dark dark:text-white"
                      >
                        Remember me
                      </label>
                    </div>
                  </div>
                  <Link
                    onClick={toggleForgotPassword}
                    to="/reset-password"
                    className="transition text-sky-400 hover:text-sky-700 transition duration-200 hover:underline text-sm mb-2 isDarkMode dark:text-white text-gray-900"
                  >
                    Forgot password?
                  </Link>
                </div>

                <button
                  onClick={submitSignInData}
                  type="button"
                  className="w-full transition delay-50 border-none text-white bg-sky-400 hover:bg-sky-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-md text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 outline-none"
                >
                  Sign in
                </button>
                
                <GoogleAuth />

                <p className="block mb-2 text-sm font-medium text-dark text-gray-900 dark:text-white">
                  Don't have an account yet?{" "}
                  <a
                    onClick={closeSignIn}
                    className="font-medium text-sky-400 hover:text-sky-700 transition duration-200 hover:underline dark:text-primary-500 cursor-pointer outline-none"
                  >
                    Sign up
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
