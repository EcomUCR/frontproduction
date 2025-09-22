import Header from "../ui/NavBar"
import SellerBaner from "../ui/SellerBaner";
import Footer from "../ui/Footer";
import NavBarSeller from "../ui/NavBarSeller";
import SellerContact from "../ui/SellerContact";


export default function SellerPageContact() {
  return (
    <div className="bg-white">
      <Header />
      <SellerBaner />
      <NavBarSeller />
      <main className=" w-full">
       
       <SellerContact />
        
       
      </main>
      <Footer />
    </div>
  );
}