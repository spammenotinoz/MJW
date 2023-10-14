import Logo from '@/components/icons/Logo';
import ThemeToggle from '@/components/ThemeToggle';
import { useState, useEffect } from 'react';

const Header = () => {
    const [stats, setStats] = useState('');

    useEffect(() => {
        // Function to fetch the 'stats.txt' file
        const fetchStats = () => {
            fetch('/stats.txt')
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Failed to fetch stats');
                    }
                    return response.text();
                })
                .then((data) => {
                    setStats(data);
                })
                .catch((error) => {
                    console.error('Error fetching stats:', error);
                });
        };

        // Fetch stats initially when the component mounts
        fetchStats();

        // Set up an interval to fetch stats every 5 minutes
        const intervalId = setInterval(fetchStats, 300000); // 5 minutes = 300,000 milliseconds

        // Clear the interval when the component unmounts
        return () => clearInterval(intervalId);
    }, []);

    return (
        <header>
            <div className="fb">
                <Logo />
                <ThemeToggle />
            </div>
            <div className="fi mt-2">
                <span className="gpt-title">MIDJOURNEY</span>
                <span className="gpt-subtitle">WEB</span>
            </div>
            <p className="mt-1 opacity-60">
                {stats}
            </p>
        </header>
    );
};

export { Header };
