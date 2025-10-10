import visa from "../../img/resources/logo_visa.png";
import mastercard from "../../img/resources/logo_mastercard.png";
import paypal from "../../img/resources/logo_paypal.png";
import american_express from "../../img/resources/american_express_logo.png";
import { IconMapPin } from "@tabler/icons-react";

export default function FormShopping() {
    return (
        <div className="font-quicksand">
            <h2 className="text-xl font-bold">Detalles de la compra</h2>
            <div className="flex flex-col gap-6 pt-10">
                <div className="border-t pt-5 flex flex-col gap-2">
                    <div className="flex justify-between">
                        <p>Subtotal de la compra:</p>
                        <p className="text-main">₡13.000</p>
                    </div>
                   {/* <div className="flex justify-between">
                        <p>Descuento de cupones</p>
                        <p className="text-main">-₡500 </p>
                    </div> */}
                </div>
                <div className="border-t pt-5">
                    <div className="flex justify-between">
                        <p className="font-bold">Total:</p>
                        <p className="font-bold text-main">₡8.500</p>
                    </div>
                </div>
            </div>
            <div className="pt-10 flex gap-2 text-contrast-main">
                <IconMapPin />
                <p>Enviar a [Usuario]</p>
            </div>
            <div className="pt-10 flex flex-col gap-4">
                {/*<input type="text" placeholder="Código de descuento" className="border-2 border-main text-main rounded-full px-3 py-2 w-full font-quicksand" name="" id="" />
                <button className="bg-main text-white rounded-full py-3 px-4 w-full font-quicksand">Aplicar cupon</button>*/}
                <button className="bg-contrast-secondary text-white rounded-full py-3 px-4 w-full font-quicksand">Finalizar compra</button>
            </div>
            <div className="pt-10">
                <h3>Métodos de pago</h3>
                <div className="flex gap-4">
                    <img className="h-10 w-auto" src={visa} alt="" />
                    <img className="h-10 w-auto" src={mastercard} alt="" />
                    <img className="h-10 w-auto" src={paypal} alt="" />
                    <img className="h-10 w-auto" src={american_express} alt="" />
                </div>
            </div>
        </div>
    );
}