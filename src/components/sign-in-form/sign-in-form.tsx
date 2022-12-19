import { useState,FormEvent,ChangeEvent } from "react";
import FormInput from "../form-input/form-input";
import Button, {BUTTON_TYPES_CLASSES} from "../button/button";
import { useDispatch } from "react-redux";


import { AuthError, AuthErrorCodes } from "firebase/auth";

import {SignInContainer,ButtonsContainer} from  "./sign-in-form.styles";
import { googleSignInStart, emailSignInStart } from "../../store/user/user.action";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);

  const { email, password } = formFields;

  const dispatch = useDispatch();

  const signInWithGoogle = () => {

    dispatch(googleSignInStart());
  };

  const handleChange = (event:ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event:FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      dispatch(emailSignInStart(email,password));
      resetFormFields();
    } catch (error) {
      if ((error as AuthError).code === AuthErrorCodes.INVALID_PASSWORD) {
        alert("Password Incorrect for email");
      } else if ((error as AuthError).code === AuthErrorCodes.INVALID_EMAIL) {
        alert("User not found");
      } else {
        console.log("User creation encountered an error", error);
      }
    }
  };

  return (
    <SignInContainer>
      <h2>I already have an account?</h2>
      <span>Sign in with you email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          type="email"
          required
          onChange={handleChange}
          name="email"
          value={email}
        />
        <FormInput
          label="Password"
          type="password"
          required
          onChange={handleChange}
          name="password"
          value={password}
        />
        <ButtonsContainer>
          <Button type="submit">SIGN IN</Button>
          <Button type="button" buttonType={BUTTON_TYPES_CLASSES.google} onClick={signInWithGoogle}>
            Google sign in
          </Button>
        </ButtonsContainer>
      </form>
    </SignInContainer>
  );
};
export default SignInForm;
