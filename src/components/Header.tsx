import Logo from '@/components/icons/Logo';
import ThemeToggle from '@/components/ThemeToggle';

const Header = () => {
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
        </header>
    );
};

export { Header};
