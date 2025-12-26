import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, lazy, Suspense, useState } from 'react';
import Layout from './components/Layout';
import ErrorBoundary from './components/ErrorBoundary';
import ProtectedRoute from './components/ProtectedRoute';
import SolutioningApp from './pages/SolutioningApp';

// Eager load critical pages
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';

// Lazy load other pages for better performance
const WhyQelyxPage = lazy(() => import('./pages/WhyQelyxPage'));
const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const IndustriesPage = lazy(() => import('./pages/IndustriesPage'));
const TeamPage = lazy(() => import('./pages/TeamPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const BlogListPage = lazy(() => import('./pages/BlogListPage'));
const BlogPostPage = lazy(() => import('./pages/BlogPostPage'));
const QHubPage = lazy(() => import('./pages/QHubPage'));
const SolutionsSuitePage = lazy(() => import('./pages/SolutionsSuitePage'));
const SolutionDetailPage = lazy(() => import('./pages/SolutionDetailPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));

// Loading component for lazy loaded pages
const PageLoader = () => (
  <div className="min-h-screen bg-[#0a0f1c] flex items-center justify-center">
    <div className="text-center">
      <div className="w-12 h-12 border-4 border-[#00d9ff] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-[#a0aec0]">Loading...</p>
    </div>
  </div>
);

// ScrollToTop component
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

// Authentication check hook
const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const authStatus = localStorage.getItem('qelyx_authenticated') === 'true';
      const authTimestamp = localStorage.getItem('qelyx_auth_timestamp');
      
      if (authStatus && authTimestamp) {
        const elapsed = Date.now() - parseInt(authTimestamp, 10);
        const SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 hours
        if (elapsed < SESSION_DURATION) {
          setIsAuthenticated(true);
          setIsChecking(false);
          return;
        } else {
          // Session expired, clear it
          localStorage.removeItem('qelyx_authenticated');
          localStorage.removeItem('qelyx_auth_timestamp');
        }
      }
      setIsAuthenticated(false);
      setIsChecking(false);
    };

    checkAuth();
    // Check auth status periodically
    const interval = setInterval(checkAuth, 1000);
    return () => clearInterval(interval);
  }, []);

  return { isAuthenticated, isChecking };
};

// Inner component that uses useLocation
function AppRoutes() {
  const { isAuthenticated, isChecking } = useAuth();
  const location = useLocation();

  // Show loading while checking authentication
  if (isChecking) {
    return <PageLoader />;
  }

  // If authenticated and not on login page
  if (isAuthenticated && location.pathname !== '/login') {
    // Show SolutioningApp which handles its own routing including code-assistant
    return <SolutioningApp />;
  }

  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="why-qelyx" element={<WhyQelyxPage />} />
          <Route path="services" element={<ServicesPage />} />
          <Route path="industries" element={<IndustriesPage />} />
          <Route path="team" element={<TeamPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="blog" element={<BlogListPage />} />
          <Route path="blog/:id" element={<BlogPostPage />} />
          <Route path="q-hub" element={<QHubPage />} />
          <Route path="solutions" element={
            <ProtectedRoute>
              <SolutionsSuitePage />
            </ProtectedRoute>
          } />
          <Route path="solutions/:solutionId" element={
            <ProtectedRoute>
              <SolutionDetailPage />
            </ProtectedRoute>
          } />
          <Route path="login" element={<LoginPage />} />
          {/* 404 catch-all route */}
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

function App() {
  return (
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <ErrorBoundary>
        <ScrollToTop />
        <AppRoutes />
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default App;
