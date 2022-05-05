import {useState, FormEvent, ChangeEvent} from "react";
import FormInput from "../form-input/form-input.component";
import "./sign-in-form.styles.scss";
import Button, {BUTTON_TYPE_CLASSES} from "../button/button.component";
import {useDispatch} from "react-redux";
import {emailSignInStart, googleSignInStart} from "../../store/user/user.action";
import {ButtonsContainer, SignInContainer} from "./sign-in-form.styles";
import {AuthError, AuthErrorCodes} from "firebase/auth";

const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const {email, password} = formFields;
  const dispatch = useDispatch();

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const signInWithGoogle = async () => {
    dispatch(googleSignInStart());
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      dispatch(emailSignInStart(email, password));
      resetFormFields();
    } catch (error) {
      switch ((error as AuthError).code) {
        case AuthErrorCodes.INVALID_PASSWORD:
          alert('Incorrect password for email');
          break;
        case AuthErrorCodes.USER_DELETED:
          alert('No user associated with this email');
          break;
        default:
          console.log('error', error);
      }
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    setFormFields({...formFields, [name]: value});
  };

  return (
    <SignInContainer>
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label='Email'
          type='email'
          required
          onChange={handleChange}
          name='email'
          value={email}
        />

        <FormInput
          label='Password'
          type='password'
          required
          onChange={handleChange}
          name='password'
          value={password}
        />
        <ButtonsContainer>
          <Button type='submit'>Sign In</Button>
          <Button
            buttonType={BUTTON_TYPE_CLASSES.google}
            type='button'
            onClick={signInWithGoogle}
          >
            Sign In With Google
          </Button>
        </ButtonsContainer>
      </form>
    </SignInContainer>
  );
};

export default SignInForm;