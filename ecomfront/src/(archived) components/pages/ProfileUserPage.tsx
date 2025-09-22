import NavBar from "../ui/NavBar"
import Footer from "../ui/Footer"
import UserProfile from "../ui/UserProfile"
import SideBar from "../ui/SideBar";




export default function ProfileUserPage() {
  return (
    <div>
      <NavBar />
      
      <main className=" w-full">
        <section className="flex">
          <div className="w-[33%]">
          <SideBar type="user"/>
          </div>
          <div className="w-[66%]">
          <UserProfile />
          </div>
        </section>
        
        
      </main>
      <Footer />
    </div>
  );
}