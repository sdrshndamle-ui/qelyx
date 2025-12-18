import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, lazy, Suspense } from 'react';
import Layout from './components/Layout';
import ErrorBoundary from './components/ErrorBoundary';
import ProtectedRoute from './components/ProtectedRoute';

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

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <ScrollToTop />
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
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
