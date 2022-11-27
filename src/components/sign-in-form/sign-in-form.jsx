import { useState, useContext } from "react";
import FormInput from "../form-input/form-input";
import Button, {BUTTON_TYPES_CLASSES} from "../button/button";
import {
  signInAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
  signInWithGooglePopup,
} from "../../utils/firebase/firebase.utils";

import {SignInContainer,ButtonsContainer} from  "./sign-in-form.styles.jsx";
import { UserContext } from "../../contexts/user.context";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);

  const { email, password } = formFields;

  const {setCurrentUser} = useContext(UserContext);

  const signInWithGoogle = async () => {
    const { user } = await signInWithGooglePopup();
    setCurrentUser(user);
    await createUserDocumentFromAuth(user);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { user } = await signInAuthUserWithEmailAndPassword(
        email,
        password
      );
      setCurrentUser(user);
      resetFormFields();
    } catch (error) {
      if (error.code === "auth/wrong-password") {
        alert("Password Incorrect for email");
      } else if (error.code === "auth/user-not-found") {
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
