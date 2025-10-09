import { useState } from 'react';
import { Link, useParams } from "react-router-dom";
import Footer from "../../../components/layout/Footer";
import NavBar from "../../../components/layout/NavBar";
import NavBarSeller from "./components/NavBarSeller";

import banner from '../../../img/resources/banner.png';
import HomeSeller from "./components/SellerHomeComponent";
import SellerOffers from "./components/SellerOffersComponent";
import SellerContactComponent from "./components/SellerContactComponent";
import SellerReviewsComponent from "./components/SellerReviewsComponent";


export default function SellerPage() {
    const { id } = useParams();
    const [view, setView] = useState<'home' | 'offers' | 'contact' | 'reviews'>('home');


    return (
        <div className="flex flex-col w-full">
            <NavBar />
            <div className='mx-auto max-w-[80rem]'>

            <header className="flex flex-col justify-center w-full px-5 py-5 gap-3 ">
                <img src={banner} alt="" className="w-full h-auto object-cover rounded-2xl" />
                <NavBarSeller setView={setView} currentView={view} />
            </header>

            {view === 'home' && <HomeSeller />}
            {view === 'offers' && <SellerOffers />}
            {view === 'contact' && <SellerContactComponent />}
            {view === 'reviews' && <SellerReviewsComponent />}

            </div>
            <Footer />
        </div>
    );
}
