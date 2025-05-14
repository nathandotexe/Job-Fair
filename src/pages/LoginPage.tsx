import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { GoogleLogin, CredentialResponse } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
var auth2;

interface LoginInputs {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginInputs>();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<LoginInputs> = async data => {
    try {
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
    }
  };

  const handleGoogle = (res: CredentialResponse) => {
    
    if (res.credential) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="login-container py-5 px-5" style={{marginTop: '100px', marginBottom: '100px'}}>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input
            id="email"
            type="email"
            {...register('email', { required: 'Email is required' })}
            aria-invalid={!!errors.email}
          />
          {errors.email && <span role="alert">{errors.email.message}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            {...register('password', { required: 'Password is required', minLength: 6 })}
            aria-invalid={!!errors.password}
          />
          {errors.password && <span role="alert">{errors.password.message}</span>}
        </div>

        <button type="submit" disabled={isSubmitting} className="btn btn-primary" style={{marginTop: '50px'}}>
          {isSubmitting ? 'Signing in…' : 'Sign In'}
        </button>
      </form>

      <div className="divider" aria-hidden="true">OR</div>
      <div className="google-btn">
        <GoogleLogin
          onSuccess={handleGoogle}
          onError={() => console.error('Google Login Failed')}
          width={'220px'}
        />
      </div>
    </div>
  );
};

export default LoginPage;
