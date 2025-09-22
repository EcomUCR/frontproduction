import Header from "../ui/NavBar"
import Footer from "../ui/Footer"
import ProfileSellerNav from "../ui/ProfileSellerNav"
import SellerProductsList from "../ui/SellerProductsList";





export default function ProfileSellerProductsPage() {
  return (
    <div className="bg-white">
      <Header />
      
      <main>
       <div className="flex w-full">
  <ProfileSellerNav />
   <SellerProductsList />
 
</div> 
      </main>
      <Footer />
    </div>
  );
}