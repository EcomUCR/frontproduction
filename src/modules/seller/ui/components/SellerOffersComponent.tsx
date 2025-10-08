
import audifonos from '../../../../img/resources/audifonos.jpg';
import ProductCard from '../../../../components/data-display/ProductCard';
export default function SellerOffersPage() {
    return (
        <div className="mx-10 my-5">
            <h2 className="text-2xl font-semibold font-quicksand">Ofertas</h2>
            <div className="flex justify-between my-5">
                    <ProductCard shop="Razer" title="Audifonos Razer x Pokemon | Edición Gengar" price="100.000" discountPrice="50.000" img={audifonos} edit={false} id={0} />
                    <ProductCard shop="Razer" title="Audifonos Razer x Pokemon | Edición Gengar" price="100.000" discountPrice="50.000" img={audifonos} edit={false} id={0}/>
                    <ProductCard shop="Razer" title="Audifonos Razer x Pokemon | Edición Gengar" price="100.000" discountPrice="50.000" img={audifonos} edit={false} id={0}/>
                    <ProductCard shop="Razer" title="Audifonos Razer x Pokemon | Edición Gengar" price="100.000" discountPrice="50.000" img={audifonos} edit={false} id={0}/>
                    <ProductCard shop="Razer" title="Audifonos Razer x Pokemon | Edición Gengar" price="100.000" discountPrice="50.000" img={audifonos} edit={false} id={0}/>
                </div>
        </div>
    );
}