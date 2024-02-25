// App.tsx
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { supabase } from './utils/supabaseClient';
import ChatPage from './pages/Chat'; // Adjust the import path as necessary
import SignIn from './pages/SignIn'; // Adjust the import path as necessary
import './App.css';
// Import CSS files as before

const queryClient = new QueryClient();

function App() {
    const [session, setSession] = useState(supabase.auth.session());

    useEffect(() => {
        const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });

        return () => {
            authListener?.unsubscribe();
        };
    }, []);

    return (
        <QueryClientProvider client={queryClient}>
            <Router>
                <main>
                    <Routes>
                        {!session ? (
                            <Route path="/" element={<SignIn />} />
                        ) : (
                            <Route path="/" element={<ChatPage />} />
                        )}
                        {/* Redirect all unknown routes to SignIn or ChatPage based on session */}
                        <Route
                            path="*"
                            element={session ? <Navigate to="/" /> : <Navigate to="/" replace />}
                        />
                    </Routes>
                </main>
            </Router>
        </QueryClientProvider>
    );
}

export default App;
