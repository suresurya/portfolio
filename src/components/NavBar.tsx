import Profile from "../assets/pfp.webp";
import { NavLink } from "react-router";
import { FaDiscord, FaGithub, FaLinkedin, FaMedium, FaRegCopy } from "react-icons/fa";
import { SiUdemy } from "react-icons/si";
import { cn } from "../cn";
import { ThemeToggle } from "./ThemeToggle";
import { SOCIAL, SOCIAL_LINKS, type SocialPlatform } from "../data/constants";
import type { IconType } from "react-icons";
import { toast } from "sonner";

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
  return (
        <header className="py-3 sm:py-4 sticky top-0 backdrop-blur-sm z-100 rounded-2xl">
            <nav className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4"> 
                <div className="flex items-center justify-between sm:justify-start w-full sm:w-auto gap-3 sm:gap-5">
                    <div className="rounded-xl hover:h-10 hover:w-10 cursor-pointer">
                        <img src={Profile} alt="Sure Surya profile photo" height={50} width={50} loading="lazy" decoding="async" className="rounded-xl hover:h-10 hover:w-10" />
                    </div>
                     <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm sm:text-base">
                    {
                        nav_links.map((item,index)=>(
                            <NavLink
                            to={item.to}
                            key={index} 
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

                <div className="flex items-center justify-end gap-3 sm:gap-5 w-full sm:w-auto">
                    <div className="text-lg sm:text-xl flex justify-end items-center gap-4 sm:gap-5 w-full sm:w-auto" aria-label="Social links">
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
                                    className="cursor-pointer transition-transform duration-300 hover:-translate-y-0.5 hover:scale-110 hover:text-[color:var(--color-accent)]"
                                >
                                    <Icon aria-hidden="true" />
                                </a>
                            );
                        })}
                        <div
                                                className="flex items-center gap-1 cursor-default text-sm sm:text-base text-[color:var(--color-text-subtle)]"
                                                title={`Discord: ${SOCIAL.discord}`}
                                                aria-label={`Discord username ${SOCIAL.discord}`}
                                             >
                                                <span className="text-lg sm:text-xl transition-transform duration-300 hover:-translate-y-0.5 hover:scale-110 hover:text-[color:var(--color-accent)]">
                                                    <FaDiscord aria-hidden="true" />
                                                </span>
                                                <span className="hidden sm:inline">{SOCIAL.discord}</span>
                                                <button
                                                    onClick={() => {
                                                        navigator.clipboard.writeText(SOCIAL.discord);
                                                        toast.success("Discord handle copied!");
                                                    }}
                                                    className="ml-1 p-1 hover:text-[color:var(--color-accent)] transition-colors cursor-pointer rounded-md hover:bg-[color:var(--color-accent-soft)]"
                                                    title="Copy handle"
                                                    aria-label="Copy Discord handle"
                                                >
                                                    <FaRegCopy size={12} />
                                                </button>
                       </div>
                                               <ThemeToggle />
                    </div>
                </div>
                
               
            </nav>
        </header>
  )
}

export default NavBar;