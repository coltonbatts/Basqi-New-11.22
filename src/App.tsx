import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { SupabaseProvider, useSupabase } from './providers/SupabaseProvider';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Artists from './pages/Artists';
import JoinWaitlist from './pages/JoinWaitlist';
import About from './pages/About';
import Login from './pages/auth/Login';
import Dashboard from './pages/Dashboard';
import Upload from './pages/Upload';
import Profile from './pages/Profile';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useSupabase();
  
  if (loading) return null;
  if (!user) return <Navigate to="/login" />;
  
  // If user hasn't completed their profile, redirect to profile page
  if (!user.name || !user.medium) {
    return <Navigate to="/profile" />;
  }
  
  return <>{children}</>;
}

function App() {
  return (
    <BrowserRouter>
      <SupabaseProvider>
        <div className="min-h-screen bg-black text-white">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/join-waitlist" element={<JoinWaitlist />} />
              <Route path="/about" element={<About />} />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/upload"
                element={
                  <ProtectedRoute>
                    <Upload />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/artists"
                element={
                  <ProtectedRoute>
                    <Artists />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>
        </div>
      </SupabaseProvider>
    </BrowserRouter>
  );
}

export default App;