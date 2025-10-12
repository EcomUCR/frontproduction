import NavBar from "../../../components/layout/NavBar";
import Footer from "../../../components/layout/Footer";

export default function AboutUsPage() {
  return (
    <div>
      <NavBar />
      <section className="mx-auto max-w-[80rem] pb-10">
        <div className="pt-10">
          <h1 className="text-3xl font-bold font-quicksand">Sobre nosotros</h1>
        </div>
      </section>

      <Footer />
    </div>
  );
}
