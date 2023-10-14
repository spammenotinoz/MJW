import Logo from '@/components/icons/Logo';
import ThemeToggle from '@/components/ThemeToggle';
import { useState, useEffect } from 'react'; // Import the necessary hooks

const Header = () => {
    const [stats, setStats] = useState(''); // State to store the stats content

    useEffect(() => {
        // Fetch the 'stats.txt' file from the root of the web server
        fetch('/stats.txt')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch stats');
                }
                return response.text();
            })
            .then((data) => {
                setStats(data); // Update the state with the file content
            })
            .catch((error) => {
                console.error('Error fetching stats:', error);
            });
    }, []); // The empty array [] as the second argument ensures that this effect runs only once on component mount

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
                {stats} {/* Display the stats content */}
            </p>
        </header>
    );
};

export { Header };
