import Link from 'next/link';
import { useRouter } from 'next/router';

const NavLink = ({ href, children }) => {
    const { pathname } = useRouter();
    const isActive = pathname === href;

    const activeStyle = "bg-sky-500 text-white shadow-md scale-105";
    const inactiveStyle = "hover:bg-gray-100 hover:text-gray-900";

    return (
        <Link
            href={href}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300  ${isActive ? activeStyle : inactiveStyle}`}
        >
            {children}
        </Link>
    );
};

export default NavLink;
