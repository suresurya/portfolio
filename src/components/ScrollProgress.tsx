import { useEffect, useState } from "react";

const ScrollProgress = () => {
    const [progress, setProgress] = useState(0);

    const onScroll = () => {
        const winScroll = document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        if (height === 0) {
            setProgress(0);
            return;
        }
        const scrolled = (winScroll / height) * 100;
        setProgress(scrolled);
    };

    useEffect(() => {
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <div className="fixed top-0 left-0 w-full h-[3px] z-[110] pointer-events-none">
            <div 
                className="h-full bg-gradient-to-r from-[color:var(--color-accent)] to-[color:var(--color-text-main)] transition-[width] duration-150 ease-out"
                style={{ width: `${progress}%` }}
            />
        </div>
    );
};

export default ScrollProgress;
