import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-[#0A1A2F] flex items-center justify-center">
      <div className="max-w-md mx-auto text-center px-6">
        <div className="text-8xl font-bold bg-gradient-to-r from-secondary-bright to-accent-aqua bg-clip-text text-transparent mb-6">
          404
        </div>
        <h1 className="text-3xl font-bold text-white mb-4">
          Page Not Found
        </h1>
        <p className="text-gray-300 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-flex items-center justify-center rounded-lg bg-gradient-to-tr from-secondary-bright to-accent-aqua px-6 py-3 text-sm font-semibold text-white shadow-md hover:shadow-lg transition"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;

