import { useEffect, useState } from "react";
import { FiArrowUp } from "react-icons/fi";

const BackToTop = () => {
    const [isVisible, setIsVisible] = useState(() =>
        typeof window !== "undefined" ? window.scrollY > 300 : false
    );

    const toggleVisibility = () => {
        if (window.scrollY > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    useEffect(() => {
        window.addEventListener("scroll", toggleVisibility, { passive: true });
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    return (
        <button
            type="button"
            onClick={scrollToTop}
            className={`fixed bottom-6 right-6 z-[110] p-3 rounded-xl border theme-border-subtle bg-[color:var(--glass-bg)] text-[color:var(--color-text-main)] backdrop-blur-md shadow-2xl transition-all duration-300 cursor-pointer hover:bg-[color:var(--color-accent-soft)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-accent)]/70 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
            }`}
            aria-label="Scroll to top"
            title="Scroll to top"
        >
            <FiArrowUp size={20} />
        </button>
    );
};

export default BackToTop;
