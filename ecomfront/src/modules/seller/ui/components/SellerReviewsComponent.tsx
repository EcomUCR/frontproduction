import LargeReviewComponent from "../../../../components/data-display/LargeReviewComponent";;

export default function SellerReviewsComponent() {
    return (
        <section className="mx-10 my-5">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold font-quicksand">Opiniones de clientes</h2>
            </div>
            <div className="flex w-full">
                <div className="flex border w-[35%] border-main rounded-2xl">
                    {/*Aquí va el componente que muestra el promedio de estrellas que tiene la tienda */}
                </div>
                <div className="flex flex-col w-[65%] pl-20">
                    <div className="flex items-center gap-2">
                        <h3>Opiniones</h3>
                        <p className="bg-main-dark/20 py-1 px-2 rounded-full text-xs">3</p>
                    </div>

                    {/*Aquí va el array que muestra las reseñas */}
                    <LargeReviewComponent />
                    <LargeReviewComponent />
                    <LargeReviewComponent />
                </div>
            </div>
        </section>
    );
}