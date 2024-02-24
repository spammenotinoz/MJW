import React from 'react'; // Import React from 'react'
import { Header } from '@/components/Header';
import Generator from '@/components/Generator';
import QuickGo from '@/components/QuickGo';
import { Footer } from '@/components/Footer';

export function SignIn() {
    return (
        <div>
            <Header/>
            <Generator/>
            <Footer/>
            <QuickGo/>
        </div>
    );
}
