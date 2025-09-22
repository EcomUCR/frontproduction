import { useLocation, Link } from 'react-router-dom';
import logo from "../../img/unstable-games-logo.png";
import ButtonComponent from './ButtonComponent';
import { IconSearch } from '@tabler/icons-react';

const NavBarSeller = () => {
    const location = useLocation();

    const getNavLinkClass = (path: string) => {
        return location.pathname === path
            ? 'text-purple-main font-bold font-quicksand'
            : 'text-white hover:text-purple-main transition-colors duration-500 font-quicksand';
    };

    return (
        <div className="bg-yellow-main flex items-center justify-between px-8 py-4">

            <div className="flex-shrink-0 ml-24">
                <Link to="/seller-page">
                    <img className="h-12" src={logo} alt="Unstable Games Logo" />
                </Link>
            </div>

            <div className="hidden md:flex items-center gap-5">
                <nav className="flex space-x-6 items-center pr-5">
                    <Link to="/seller-page" className={getNavLinkClass('/seller-page')}>
                        Tienda
                    </Link>
                    <Link to="/seller-offers-page" className={getNavLinkClass('/seller-offers')}>
                        Ofertas
                    </Link>
                    <Link to="/seller-page-contacts" className={getNavLinkClass('/seller-page-contacts')}>
                        Contacto
                    </Link>
                </nav>
                <div className="flex">
                    <input
                        type="text"
                        placeholder="Buscar en Unstable Games"
                        className="bg-white rounded-l-lg py-2 px-4 w-64 focus:outline-none"
                    />
                    <ButtonComponent
                        style="bg-purple-main rounded-r-lg py-2 px-4 transition-colors duration-200 cursor-pointer hover:bg-gray-main"
                        icon={IconSearch}
                        iconStyle="h-5 w-5 text-white"
                    />
                </div>
            </div>
        </div>
    );
};

export default NavBarSeller;
