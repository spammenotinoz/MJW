import { supabase } from './utils/supabaseClient';
import React from 'react';
import './App.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { ChatPage } from './pages/Chat'; // Adjust the import path as necessary
import SignIn from './components/SignIn';


import 'virtual:uno.css';
import '@unocss/reset/tailwind.css';
import 'react-photo-view/dist/react-photo-view.css';
import 'katex/dist/katex.min.css';

const queryClient = new QueryClient();

function App() {

    return (
        <>
            <QueryClientProvider client={ queryClient }>
                <Router>
                    <main>
                        <Routes>
                            <Route path="" element={ <ChatPage/> }/>
                        </Routes>
                    </main>
                </Router>
            </QueryClientProvider>
        </>
    );
}

export default App;


export default App;
