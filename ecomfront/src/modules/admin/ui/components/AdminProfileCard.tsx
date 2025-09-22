import { IconSettings } from "@tabler/icons-react";
import { Switch } from "../../../../components/ui/switch";
import ButtonComponent from "../../../../components/ui/ButtonComponent";

/*interface ProfileCardProps{
    uuid:string;
    username:string;
    email:string;
    type:string;
    lastConnection:string;
    state:boolean;
}*/
{/*Hay que implementar las props con props:ProfileCardProps para que se lleven por default*/}
export default function AdminProfileCard(){
    return(
        <div className="flex w-full py-3 px-10 bg-main-dark/20 rounded-full hover:bg-main-dark/30 items-center">
            <p className="w-1/12">1.1</p>
            <p className="w-2/12">@example_1</p>
            <p className="w-3/12">example@gmail.com</p>
            <p className="w-2/12">Seller</p>{/*Recordar que hay que poner el icono de si es tienda o user, es con <IconBuildingStore /> o <IconUser /> */}
            <p className="w-2/12">12/10/2025 12:51:00</p>
            <div className="w-1/12"><Switch /></div>{/*Hay que crear un state para el switch y así sacar el valor de si está enable o no */}
            <ButtonComponent style="w-1/12 text-center flex justify-center" icon={<IconSettings />}/>
        </div>
    );
}