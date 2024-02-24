import React, { useState } from 'react';
import { supabase } from '../utils/supabaseClient';

function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignIn = async (e) => {
        e.preventDefault();
        try {
            const { error } = await supabase.auth.signIn({ email, password });
            if (error) throw error;
            alert('Signed in successfully');
            // Redirect user or update UI
        } catch (error) {
            alert(error.error_description || error.message);
        }
    };

    return (
        <form onSubmit={handleSignIn}>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
            <button type="submit">Sign In</button>
        </form>
    );
}

export default SignIn;
