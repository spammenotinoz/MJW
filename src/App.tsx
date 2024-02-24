import React from 'react';
console.log('Preparing to load supabaseClient...');
import { supabase } from './utils/supabaseClient';
import './App.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
console.log('Import Chat Page...');
import { ChatPage } from './pages/Chat'; // Adjust the import path as necessary
console.log('Import Signing...');
import { SignIn } from './pages/SignIn'; // Import SignIn as a named import
console.log('Finish Imports...');
import 'virtual:uno.css';
import '@unocss/reset/tailwind.css';
import 'react-photo-view/dist/react-photo-view.css';
import 'katex/dist/katex.min.css';

const queryClient = new QueryClient();

function App() {
    console.log('Checking for Supabase session...');
    const session = supabase.auth.session();
    console.log('Supabase session:', session);

    return (
        <QueryClientProvider client={queryClient}>
            <Router>
                <main>
                    {session ? (
                        <ChatPage />
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
