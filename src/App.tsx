import React from 'react';
import './App.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { ChatPage } from './pages/Chat'; // Adjust the import path as necessary
import SignIn from './components/SignIn';
import { supabase } from './utils/supabaseClient';

import 'virtual:uno.css';
import '@unocss/reset/tailwind.css';
import 'react-photo-view/dist/react-photo-view.css';
import 'katex/dist/katex.min.css';

const queryClient = new QueryClient();

function App() {
    const session = supabase.auth.session();

    return (
        <QueryClientProvider client={queryClient}>
            <Router>
                <Routes>
                    {/* Redirect based on authentication status */}
                    <Route path="/" element={session ? <Navigate to="/chat" /> : <SignIn />} />
                    {/* Protected Route */}
                    <Route path="/chat" element={session ? <ChatPage /> : <Navigate to="/" />} />
                    {/* Add more routes as needed */}
                </Routes>
            </Router>
        </QueryClientProvider>
    );
}

export default App;
