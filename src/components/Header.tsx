import { GITHUB_ORG_URL, MJW_STATS } from '@/utils/constants';

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
                Powered by {MJW_STATS}
            </p>
        </header>
    );
};
