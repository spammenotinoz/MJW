import './App.css';
import {QueryClient, QueryClientProvider} from 'react-query';
import {MemoryRouter as Router, Route, Routes} from 'react-router-dom';
import {ChatPage} from '@/pages/Chat';
import 'virtual:uno.css';
import '@unocss/reset/tailwind.css';
import 'react-photo-view/dist/react-photo-view.css';

// import 'highlight.js/styles/github-dark-dimmed.css';
import 'katex/dist/katex.min.css';

const queryClient = new QueryClient();

//Authentication Logic
import React from 'react';
import { supabase } from './utils/supabaseClient';
import SignIn from './components/SignIn';

function App() {
    const session = supabase.auth.session();

    return (
        <>
            {!session ? <SignIn /> : "User's Dashboard or Protected Content"}
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
