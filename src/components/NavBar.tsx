import Profile from "../assets/pfp.webp"
import { NavLink } from "react-router"
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaDiscord } from "react-icons/fa";
import { FaMedium } from "react-icons/fa";
import { SiUdemy } from "react-icons/si";
import { cn } from "../cn";
import { ThemeToggle } from "./ThemeToggle";

const NavBar = () => {

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
                <div id="left" className="flex items-center justify-between sm:justify-start w-full sm:w-auto gap-3 sm:gap-5">
                    <div id="pfp"  className="rounded-xl hover:h-10 hover:w-10 cursor-pointer">
                        <img src={Profile} alt="text here" height={50} width={50} loading="lazy" decoding="async" className="rounded-xl hover:h-10 hover:w-10" />
                    </div>
                     <div id="links" className="flex flex-wrap gap-x-4 gap-y-2 text-sm sm:text-base">
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

                <div id="right" className="flex items-center justify-end gap-3 sm:gap-5 w-full sm:w-auto">
                    <div id="icon-links" className="text-lg sm:text-xl flex justify-end items-center gap-4 sm:gap-5 w-full sm:w-auto">
                       <div id="github" className="cursor-pointer transition-transform duration-300 hover:-translate-y-0.5 hover:scale-110 hover:text-[color:var(--color-accent)]">
                                                 <a href="https://github.com/suresurya" target="_blank" rel="noopener noreferrer"><FaGithub/>
                        </a>
                       </div>
                                             <div id="linkedin" className="cursor-pointer transition-transform duration-300 hover:-translate-y-0.5 hover:scale-110 hover:text-[color:var(--color-accent)]">
                                                                                                <a href="https://www.linkedin.com/in/sure-sri-veknat-rama-surya-b924a6332/" target="_blank" rel="noopener noreferrer"><FaLinkedin/>
                                                </a>
                                                                                         </div>
                                                            <div id="medium" className="cursor-pointer transition-transform duration-300 hover:-translate-y-0.5 hover:scale-110 hover:text-[color:var(--color-accent)]">
                                                                                                                                <a href="https://medium.com/@suresrivenkatramasurya" target="_blank" rel="noopener noreferrer"><FaMedium/>
                                                                </a>
                                                            </div>
                                                            <div id="udemy" className="cursor-pointer transition-transform duration-300 hover:-translate-y-0.5 hover:scale-110 hover:text-[color:var(--color-accent)]">
                                                                                                                                <a href="https://www.udemy.com/user/sure-sri-venkat-rama-surya/" target="_blank" rel="noopener noreferrer"><SiUdemy/>
                                                                </a>
                                                            </div>
                                             <div
                                                id="discord"
                                                className="flex items-center gap-1 cursor-default text-sm sm:text-base text-[color:var(--color-text-subtle)]"
                                                title="Discord: sure_surya_007_"
                                             >
                                                <span className="text-lg sm:text-xl transition-transform duration-300 hover:-translate-y-0.5 hover:scale-110 hover:text-[color:var(--color-accent)]">
                                                    <FaDiscord />
                                                </span>
                                                                        <span className="hidden sm:inline">sure_surya_007_</span>
                       </div>
                                               <ThemeToggle />
                    </div>
                </div>
                
               
            </nav>
        </header>
  )
}

export default NavBar