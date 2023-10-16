import { useState } from 'react';
import { userAuth } from '../../../schema/user-schema';
import { signUpService } from '../../../services/auth-service';
import { useAppDispatch } from '../../../store/store';
import { useNavigate } from 'react-router-dom';

import { checkErrorAuth } from '../../../errors/auth-errors';

import './style.scss';

const SignUpForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [user, setUser] = useState<userAuth>({
    email: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    await dispatch(signUpService({ dataUser: user }))
      .unwrap()
      .then((status) => {
        if (status === 200) {
          navigate('/material');
        }
      })
      .catch((error: any) => {
        setError(checkErrorAuth(error.code));
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setUser((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  return (
    <form className="sign-up-form" onSubmit={(e) => handleSubmit(e)}>
      {error && <p className="text-error">{error}</p>}
      <label htmlFor="email">Email</label>
      <input
        type="text"
        name="email"
        id="email"
        onChange={(e) => handleChange(e)}
      />

      <label htmlFor="password">Mot de passe</label>
      <input
        type="password"
        name="password"
        id="password"
        onChange={(e) => handleChange(e)}
      />

      <input
        className={isLoading ? 'isLoading' : ''}
        type="submit"
        value="S'identifier"
      />
    </form>
  );
};

export default SignUpForm;
