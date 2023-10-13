import {MJW_STATS} from '@/utils/constants';
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
            <p className="mt-1 opacity-60">
                {MJW_STATS}
            </p>
        </header>
    );
};

export { Header};
