import Header from "../ui/NavBar"
import Footer from "../ui/Footer"
import ProfileSellerNav from "../ui/ProfileSellerNav"
import ProfileSellerForm from "../ui/ProfileSellerForm";





export default function ProfileSellerPage() {
  return (
    <div className="bg-white">
      <Header />
      
      <main>
       <div className="flex w-full">
  <ProfileSellerNav />
  <ProfileSellerForm />
</div>
       
        
        
      </main>
      <Footer />
    </div>
  );
}