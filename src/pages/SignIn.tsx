import React, { useState } from 'react';
import {Header} from '@/components/Header';
import { supabase } from '../utils/supabaseClient';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

export function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // Create navigate function

    const handleSignIn = async (e) => {
        e.preventDefault();
        try {
            const { error } = await supabase.auth.signIn({ email, password });
            if (error) throw error;
            alert('Signed in successfully');
            navigate('/dashboard'); // Redirect to the dashboard or another route
        } catch (error) {
            alert(error.error_description || error.message);
        }
    };

    return (
        <div className="flex w-full flex-1 flex-col justify-center gap-2 px-8 sm:max-w-md">           
        <form onSubmit={handleSignIn}>          
            <input type="email" className="mb-3 rounded-md border bg-inherit px-4 py-2" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required />
                        
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
            <SubmitButton className="mb-2 rounded-md bg-blue-700 px-4 py-2 text-white">
              Login
            </SubmitButton>
        </form>

        </div>        
    );
}
