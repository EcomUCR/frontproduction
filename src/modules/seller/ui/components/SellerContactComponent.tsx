import { IconBrandFacebook, IconBrandInstagram, IconBrandX } from "@tabler/icons-react";
import logo from "../../../../img/resources/Group 50.png";

export default function SellerContactComponent() {
    return (
        <div className="flex flex-col mx-10 my-5 font-quicksand">
            <div className="flex items-center justify-center">
                <div className="flex items-center w-[40%]">
                    <img src={logo} alt="" />
                </div>
                {/*En el <p> están los br del cambio de linea, eso hay que modificarlo ya que es el formato que desee poner la tienda */}
                <div className="flex flex-col text-center w-[60%] gap-5">
                    <h2 className="text-3xl">Unstable Games</h2>
                    <p>Durante los últimos años, la misión de nuestro equipo ha sido diseñar juegos altamente interactivos que merezcan la pena jugar una y otra vez.
                        Queremos que nuestros juegos unan a las personas, les ayuden a expresarse y, en definitiva, a hacer del mundo un lugar mejor.
                        <br/><br/>Somos un equipo de creadores de corazón, y hemos identificado cuatro valores fundamentales que nos guían. Estos valores nos han
                        ayudado en todo momento a la hora de colaborar, superar nuestros límites creativos y construir nuestra marca.</p>
                </div>
            </div>
            <div className="flex justify-center gap-25">
                <div className="flex flex-col gap-2">
                    <h3 className="text-2xl font-bold">Contacto:</h3>
                    <p>+506 0000-0000</p>
                    <p>unstable@examples.com</p>
                </div>
                <div className="flex flex-col gap-2">
                    <h3 className="text-2xl font-bold">Direccion:</h3>
                    <p>Calle Principal, Ciudad, País</p>
                </div>
                <div className="flex flex-col gap-2 pb-10">
                    <h3 className="text-2xl font-bold">Páginas y Redes:</h3>
                        <p>
                            unstable.com
                        </p>
                        <ul className="flex gap-5">
                            <li><IconBrandInstagram /></li>
                            <li><IconBrandFacebook /></li>
                            <li><IconBrandX /></li>
                        </ul>
                </div>
            </div>
        </div>
    );
}