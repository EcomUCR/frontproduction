import bannerImage from "../../img/banner.png";

export default function SellerBanner() {
  return (
    <section>
      <div>
        <img
          src={bannerImage}
          alt="Hero Banner"
          className="w-full h-auto object-cover"
        />
      </div>
    </section>
  );
}
