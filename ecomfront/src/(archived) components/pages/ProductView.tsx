import Header from "../ui/NavBar"
import Footer from "../ui/Footer"
import ProductsView from "../ui/ProductsView";

export default function ProductView() {
  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Header />
      
      <main className="w-full flex-grow ">
      <ProductsView />
      </main>

      <Footer />
    </div>
  );
}
