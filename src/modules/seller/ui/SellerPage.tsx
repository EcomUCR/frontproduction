import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import Footer from "../../../components/layout/Footer";
import NavBar from "../../../components/layout/NavBar";
import NavBarSeller from "./components/NavBarSeller";

import banner from '../../../img/resources/banner.png';
import HomeSeller from "./components/SellerHomeComponent";
import SellerOffers from "./components/SellerOffersComponent";
import SellerContactComponent from "./components/SellerContactComponent";
import SellerReviewsComponent from "./components/SellerReviewsComponent";
import { getStore } from '../infrastructure/storeService';
import type { Store } from '../../users/infrastructure/useUser';


export default function SellerPage() {
    const { id } = useParams();
    const [store, setStore] = useState<Store | null>(null);
    const [view, setView] = useState<'home' | 'offers' | 'contact' | 'reviews'>('home');

    useEffect(() => {
        if (!id) return;

        const fetchStore = async () => {
            const data = await getStore(Number(id));
            setStore(data);
        };

        fetchStore();
    }, [id]);

    if (!store) {
        return <p>Cargando tienda...</p>;
    }

    return (
        <div className="flex flex-col w-full">
            <NavBar />
            <div className='mx-auto max-w-[80rem]'>

                <header className="flex flex-col justify-center w-full px-5 py-5 gap-3 ">
                    <img src={store.banner || ""} alt="Banner Store" className="w-full h-[20rem] object-cover rounded-2xl" />
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
