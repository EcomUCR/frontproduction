import { IconUser,IconClipboardText,IconBuildingStore } from "@tabler/icons-react";
import ButtonComponent from "./ButtonComponent";

interface SideBarProps {
    type: "user" | "vendor";
}
export default function SideBar(props: SideBarProps) {
    if (props.type === "user") {
        return (
            <div>
                <div className=" p-10 bg-white min-h-screen h-full">
                    <h2 className="text-3xl font-semibold font-quicksand text-gray-main mb-6">Mi perfil</h2>
                    <div className="space-y-4 pt-2">
                        <ButtonComponent icon={IconUser} iconStyle="w-5 h-5" text="Información de la cuenta" style="w-full p-3 rounded-lg text-white bg-purple-main gap-2 flex items-center"/>
                        <ButtonComponent icon={IconClipboardText} iconStyle="w-5 h-5" text="Historial de compras" style="w-full p-3 rounded-lg text-gray-main gap-2 flex items-center"/>
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div>
                <div className=" p-10 bg-white min-h-screen h-full">
                    <h2 className="text-3xl font-semibold font-quicksand text-gray-main mb-6">Mi perfil</h2>
                    <div className="space-y-4 pt-2">
                        <ButtonComponent icon={IconUser} iconStyle="w-5 h-5" text="Información de la cuenta" style="w-full p-3 rounded-lg text-white bg-purple-main gap-2 flex items-center"/>
                        <ButtonComponent icon={IconClipboardText} iconStyle="w-5 h-5" text="Historial de compras" style="w-full p-3 rounded-lg text-gray-main gap-2 flex items-center"/>
                        <ButtonComponent icon={IconBuildingStore} iconStyle="w-5 h-5" text="Mis Productos" style="w-full p-3 rounded-lg text-gray-main gap-2 flex items-center"/>
                    </div>
                </div>
            </div>
        );
    }
}