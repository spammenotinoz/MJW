import React, { useState } from 'react';
import {Header} from '@/components/Header';
import { supabase } from '../utils/supabaseClient';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
//import { Brand } from "@/components/brand";
import { SubmitButton } from "@/components/submit-button";

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
        <form
            
            className="animate-in text-foreground flex w-full flex-1 flex-col justify-center gap-2"
            onSubmit={handleSignIn}
        >
            <input
                className="mb-3 rounded-md border bg-inherit px-4 py-2"
                type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required 
            />
            <input
                className="mb-6 rounded-md border bg-inherit px-4 py-2"
                type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="********" required 
            />
                <button type="submit" className="mb-2 rounded-md bg-blue-700 !bg-blue-500 px-4 py-2 text-white">Sign In</button>
            </form>
        </div>
    );
}
