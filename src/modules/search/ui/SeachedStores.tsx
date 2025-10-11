import NavBar from "../../../components/layout/NavBar";
import Footer from "../../../components/layout/Footer";
import StoreBannerStatic from "./StoreBannerStatic"; // 👈 importa el banner quemado

export default function SearchedStores() {
  return (
    <div>
      <NavBar />

      {/* Contenedor de los banners */}
      <div className="max-w-6xl mx-auto my-10 flex flex-col gap-8 px-6">
        <StoreBannerStatic />
      </div>

      <Footer />
    </div>
  );
}
