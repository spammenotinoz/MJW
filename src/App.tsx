import React from 'react';
import { supabase } from './utils/supabaseClient';
import './App.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ChatPage } from './pages/Chat'; // Adjust the import path as necessary
import { SignIn } from './pages/SignIn'; // Import SignIn as a named import

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
                <main>
                    {session ? (
                        <SignIn />
                    ) : (
                        <Routes>
                            <Route path="" element={<ChatPage />} />
                        </Routes>
                    )}
                </main>
            </Router>
        </QueryClientProvider>
    );
}

export default App;
