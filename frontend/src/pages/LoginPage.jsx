import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import QelyxLogoNew from '../assets/Qelyx Logo_New.png';

// Demo credentials - In production, use proper backend authentication
const DEMO_CREDENTIALS = {
  username: import.meta.env.VITE_DEMO_USERNAME || 'admin',
  password: import.meta.env.VITE_DEMO_PASSWORD || 'Qelyx@123'
};

const MAX_ATTEMPTS = 5;
const LOCKOUT_DURATION = 30000; // 30 seconds

const LoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const attemptsRef = useRef(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (isLocked) {
      setError('Too many failed attempts. Please wait before trying again.');
      return;
    }
    
    setError('');
    setIsLoading(true);

    // Simulate authentication delay
    await new Promise(resolve => setTimeout(resolve, 500));

    if (username === DEMO_CREDENTIALS.username && password === DEMO_CREDENTIALS.password) {
      attemptsRef.current = 0;
      localStorage.setItem('qelyx_authenticated', 'true');
      localStorage.setItem('qelyx_auth_timestamp', Date.now().toString());
      navigate('/solutions');
    } else {
      attemptsRef.current += 1;
      if (attemptsRef.current >= MAX_ATTEMPTS) {
        setIsLocked(true);
        setError(`Too many failed attempts. Please wait ${LOCKOUT_DURATION / 1000} seconds.`);
        setTimeout(() => {
          setIsLocked(false);
          attemptsRef.current = 0;
          setError('');
        }, LOCKOUT_DURATION);
      } else {
        setError(`Invalid username or password. ${MAX_ATTEMPTS - attemptsRef.current} attempts remaining.`);
      }
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#0a0f1c] flex items-center justify-center py-12 px-6">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-6">
            <img src={QelyxLogoNew} alt="Qelyx" className="h-12 w-auto" loading="eager" />
            <span className="text-2xl font-bold bg-gradient-to-r from-[#00d9ff] via-[#00b8d4] to-[#6366f1] bg-clip-text text-transparent">
              Qelyx
            </span>
          </div>
          <h1 className="text-h2 font-extrabold text-white mb-2">
            Welcome Back
          </h1>
          <p className="text-body text-[#a0aec0]">
            Sign in to access the Solutions Suite
          </p>
        </div>

        <div className="card">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg text-body-small">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="username" className="block text-body-small font-medium text-white mb-2">
                Username
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full px-4 py-3 bg-[#151b2e] border border-[rgba(255,255,255,0.1)] rounded-lg text-white placeholder-[#718096] focus:outline-none focus:border-[#00d9ff] transition-colors"
                placeholder="Enter your username"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-body-small font-medium text-white mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 bg-[#151b2e] border border-[rgba(255,255,255,0.1)] rounded-lg text-white placeholder-[#718096] focus:outline-none focus:border-[#00d9ff] transition-colors"
                placeholder="Enter your password"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary w-full"
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
