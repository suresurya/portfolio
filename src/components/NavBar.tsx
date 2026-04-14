import Profile from "../assets/pfp.webp";
import { NavLink } from "react-router";
import { FaDiscord, FaGithub, FaLinkedin, FaMedium, FaRegCopy } from "react-icons/fa";
import { SiUdemy } from "react-icons/si";
import { cn } from "../cn";
import { ThemeToggle } from "./ThemeToggle";
import { SOCIAL, SOCIAL_LINKS, type SocialPlatform } from "../data/constants";
import type { IconType } from "react-icons";
import { toast } from "sonner";
import { copyTextToClipboard } from "../utils/clipboard";

const NavBar = () => {
    const socialIconMap: Record<SocialPlatform, IconType> = {
        github: FaGithub,
        linkedin: FaLinkedin,
        medium: FaMedium,
        udemy: SiUdemy,
    };

    const nav_links = [
        {
            to:"/",
            name:"Work"
        },
        {
            to:"/projects",
            name:"Projects"
        },
        {
            to:"/resume",
            name:"Resume"
        }

    ]

    const handleCopyDiscord = async () => {
        const didCopy = await copyTextToClipboard(SOCIAL.discord);

        if (didCopy) {
            toast.success("Discord handle copied!");
            return;
        }

        toast.error("Unable to copy Discord handle automatically.");
    };
  return (
        <header className="sticky top-0 z-[100] rounded-2xl py-3 sm:py-4 pt-[max(0.75rem,env(safe-area-inset-top))]">
            <nav className="theme-card-glass flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 rounded-2xl px-3 py-2.5 sm:px-4 sm:py-3"> 
                <div className="flex items-center justify-between sm:justify-start w-full sm:w-auto gap-2.5 sm:gap-5">
                    <div className="shrink-0 rounded-xl cursor-pointer">
                        <img src={Profile} alt="Sure Surya profile photo" height={50} width={50} loading="lazy" decoding="async" className="rounded-xl size-10 sm:size-[50px]" />
                    </div>
                     <div className="flex flex-wrap gap-x-3 gap-y-1 text-[13px] sm:text-base">
                    {
                        nav_links.map((item)=>(
                            <NavLink
                            to={item.to}
                            key={item.to} 
                            className={({isActive})=>
                            cn(
                                "text-[color:var(--color-text-subtle)] hover:text-[color:var(--color-accent)]",
                                isActive && "text-[color:var(--color-accent)]"
                            )}
                            
                            >
                                {item.name}
                            </NavLink>
                        ))
                    }
                </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-2 sm:gap-5 w-full sm:w-auto">
                    <div className="text-lg sm:text-xl flex flex-wrap justify-end items-center gap-3 sm:gap-5 w-full sm:w-auto" aria-label="Social links">
                        {SOCIAL_LINKS.map((social) => {
                            const Icon = socialIconMap[social.key];

                            return (
                                <a
                                    key={social.key}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={social.ariaLabel}
                                    title={social.label}
                                    className="inline-flex items-center justify-center rounded-md p-1 cursor-pointer transition-transform duration-300 hover:-translate-y-0.5 hover:scale-110 hover:text-[color:var(--color-accent)]"
                                >
                                    <Icon aria-hidden="true" />
                                </a>
                            );
                        })}
                        <div
                                                className="inline-flex items-center gap-1.5 cursor-default text-xs sm:text-sm text-[color:var(--color-text-subtle)] rounded-full border theme-border-subtle px-2 py-1"
                                                title={`Discord: ${SOCIAL.discord}`}
                                                aria-label={`Discord username ${SOCIAL.discord}`}
                                             >
                                                <span className="text-base sm:text-xl transition-transform duration-300 hover:-translate-y-0.5 hover:scale-110 hover:text-[color:var(--color-accent)]">
                                                    <FaDiscord aria-hidden="true" />
                                                </span>
                                                <span className="hidden md:inline">{SOCIAL.discord}</span>
                                                <button
                                                    onClick={() => {
                                                        void handleCopyDiscord();
                                                    }}
                                                    className="p-1 hover:text-[color:var(--color-accent)] transition-colors cursor-pointer rounded-md hover:bg-[color:var(--color-accent-soft)]"
                                                    title="Copy handle"
                                                    aria-label="Copy Discord handle"
                                                >
                                                    <FaRegCopy size={12} />
                                                </button>
                       </div>
                       <div className="shrink-0">
                          <ThemeToggle />
                       </div>
                    </div>
                </div>
                
               
            </nav>
        </header>
  )
}

export default NavBar;