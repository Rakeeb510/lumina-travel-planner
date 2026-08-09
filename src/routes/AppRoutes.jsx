import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import { Compass } from 'lucide-react';

// Lazy Loaded Pages
const Landing = lazy(() => import('../pages/Landing'));
const Login = lazy(() => import('../pages/Login'));
const Register = lazy(() => import('../pages/Register'));
const Dashboard = lazy(() => import('../pages/Dashboard'));
const TripPlanner = lazy(() => import('../pages/TripPlanner'));
const NotFound = lazy(() => import('../pages/NotFound'));

// Global Fallback Loader
const PageLoader = () => (
  <div className="min-h-screen bg-[#0A0F06] flex items-center justify-center">
    <Compass className="h-12 w-12 text-[#1F7D53] animate-spin" strokeWidth={1.5} />
  </div>
);

const AppRoutes = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/planner" element={<TripPlanner />} />
        </Route>

        {/* Default Fallback */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;