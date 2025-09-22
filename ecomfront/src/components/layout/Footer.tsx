import { IconBrandFacebook, IconBrandInstagram, IconBrandTiktok, IconBrandX } from "@tabler/icons-react";
import logo from "../../img/tucaShopLogo.png";
export default function Footer() {
    return (
        <footer className="h-auto py-10 bg-main text-white flex flex-col items-center font-quicksand px-10 space-y-10">
            <div className="flex w-[90%] justify-between">
                <div className=" space-y-15  w-[33%]">
                    <div className="flex justify-center mx-10 gap-2 text-xs font-light">
                        <ul className="mr-10 space-y-4">
                            <li><a href="">Ofertas</a></li>
                            <li><a href="">Tiendas</a></li>
                            <li><a href="">Explorar</a></li>
                        </ul>
                        <ul className="space-y-4">
                            <li><a href="">Conócenos</a></li>
                            <li><a href="">Vender</a></li>
                            <li><a href="">Lo más vendido</a></li>
                        </ul>
                    </div>
                    <div className="flex flex-col gap-3 items-center">
                        <p>Síguenos en</p>
                        <div className="flex gap-4">
                            <IconBrandFacebook className="" />
                            <IconBrandInstagram className="" />
                            <IconBrandTiktok className="" />
                            <IconBrandX className="" />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-center gap-2 w-[33%]">
                    <img src={logo} alt="TucaShop" className="h-12 w-auto" />
                    <a className="text-2xl font-fugaz" href="">TucaShop</a>
                </div>
                <div className="flex flex-col gap-3 text-xs w-[33%] items-center">
                    <p>Contactanos</p>
                    <form className="flex flex-col gap-3 w-[90%]" action="" onSubmit={(e) => e.preventDefault()}>
                        <input type="text" placeholder="Ingresa tu nombre" className="rounded-full p-2 text-white border border-white w-full" />
                        <input type="email" placeholder="Ingresa tu email" className="rounded-full p-2 text-white border border-white w-full" />
                        <textarea name="" placeholder="Ingresa tu mensaje" className="rounded-3xl p-2 text-white border border-white w-full h-20" />
                        <button type="submit" className="bg-contrast-secondary p-2 rounded-full hover:bg-contrast-main transition-all duration-300">Enviar</button>
                    </form>

                </div>
            </div>
            <p className="text-xs">© 2025 Ecom. Todos los derechos reservados. Todas las marcas son propiedad de sus respectivos dueños</p>
        </footer>
    );
}