import SignUpForm from '../../components/forms/signUpForm/SignUpForm';

import './style.scss';

const SignUp = () => {
  return (
    <div className="sign-up-container flex">
      <div className="sign-up-content absolute absolute__center">
        <h2>Identification</h2>
        <SignUpForm />
      </div>
    </div>
  );
};

export default SignUp;
