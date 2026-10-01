import React, { useState } from 'react';
import { Mail, Lock, User, ArrowRight, AlertCircle, CheckCircle } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export default function LoginPage({ onNavigate }) {
  const { signIn, signUp } = useAuth();
  const [mode, setMode] = useState('signin'); // 'signin' or 'signup'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    if (mode === 'signup') {
      const { data, error } = await signUp(email, password);
      setLoading(false);
      if (error) {
        setError(error.message);
        return;
      }
      setMessage('Account created! Check your email to confirm, then sign in.');
      setMode('signin');
    } else {
      const { data, error } = await signIn(email, password);
      setLoading(false);
      if (error) {
        setError(error.message);
        return;
      }
      onNavigate && onNavigate('account');
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-card">
          <span className="section-eyebrow">Annette Pure</span>
          <h1 className="login-title">
            {mode === 'signin' ? 'Welcome Back' : 'Create Your Account'}
          </h1>
          <p className="login-subtitle">
            {mode === 'signin'
              ? 'Sign in to view your orders and saved scents.'
              : 'Join to track orders, save favorites, and earn rewards.'}
          </p>

          {error && (
            <div className="login-alert error">
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}
          {message && (
            <div className="login-alert success">
              <CheckCircle size={16} />
              <span>{message}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="login-form">
            {mode === 'signup' && (
              <div className="form-group">
                <label>Full Name</label>
                <div className="input-with-icon">
                  <User size={16} />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Your name"
                    className="form-input"
                  />
                </div>
              </div>
            )}

            <div className="form-group">
              <label>Email Address</label>
              <div className="input-with-icon">
                <Mail size={16} />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-group">
              <label>Password</label>
              <div className="input-with-icon">
                <Lock size={16} />
                <input
                  type="password"
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  className="form-input"
                />
              </div>
            </div>

            <button type="submit" className="btn-luxury-cta login-submit-btn" disabled={loading}>
              <span>{loading ? 'Please wait...' : mode === 'signin' ? 'Sign In' : 'Create Account'}</span>
              <ArrowRight size={16} />
            </button>
          </form>

          <p className="login-toggle-text">
            {mode === 'signin' ? (
              <>Don't have an account?{' '}
                <button className="login-toggle-link" onClick={() => { setMode('signup'); setError(''); setMessage(''); }}>
                  Create one
                </button>
              </>
            ) : (
              <>Already have an account?{' '}
                <button className="login-toggle-link" onClick={() => { setMode('signin'); setError(''); setMessage(''); }}>
                  Sign in
                </button>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}