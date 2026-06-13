import { useState } from 'react';
import NavLink from './NavLink';
import { VscFeedback } from "react-icons/vsc";
import { FiMenu, FiX } from "react-icons/fi"; 

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="bg-sky-50 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">

                    {/* لوگو */}
                    <div className="flex-shrink-0 flex items-center text-sky-800 gap-2">
                        <VscFeedback className='text-3xl' />
                        <span className="text-xl font-bold">Feedback</span>
                    </div>

                    {/* منوی دسکتاپ */}
                    <nav className="hidden md:flex space-x-2">
                        <NavLink href="/">صفحه اصلی</NavLink>
                        <NavLink href="/dashboard">پنل مدیریت</NavLink>
                    </nav>

                    {/* دکمه منوی موبایل */}
                    <button 
                        className="md:hidden p-2 text-sky-800 rounded-lg hover:bg-sky-100 transition"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <FiX className="text-2xl" /> : <FiMenu className="text-2xl" />}
                    </button>
                </div>
            </div>

            {/* منوی موبایل (Dropdown) */}
            {isMenuOpen && (
                <div className="md:hidden bg-sky-50 border-t border-sky-100 px-4 py-4">
                    <div className="flex flex-col space-y-3">
                        <div onClick={() => setIsMenuOpen(false)}>
                            <NavLink href="/">صفحه اصلی</NavLink>
                        </div>
                        <div onClick={() => setIsMenuOpen(false)}>
                            <NavLink href="/dashboard">پنل مدیریت</NavLink>
                        </div>
                    </div>
                </div>
            )}

            <div className="h-px w-full bg-gradient-to-r from-transparent via-sky-300 to-transparent"></div>
        </header>
    );
};
export default Header;