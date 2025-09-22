import Header from "../ui/NavBar"
import Footer from "../ui/Footer"
import CrudProductForm from "../ui/CrudProductForm";

export default function CrudProductsPage() {
  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Header />
      
      <main className="w-full flex-grow ">
        <CrudProductForm />
      </main>

      <Footer />
    </div>
  );
}
