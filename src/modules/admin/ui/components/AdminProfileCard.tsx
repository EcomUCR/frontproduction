import { IconSettings, /*IconUser,*/ IconBuildingStore } from "@tabler/icons-react";
import { Switch } from "../../../../components/ui/switch";
import ButtonComponent from "../../../../components/ui/ButtonComponent";

export default function AdminProfileCard() {
    
    return (
        <div className="flex justify-between w-full items-center bg-main-dark/20 rounded-full px-5 py-3 hover:bg-main-dark/30 transition-all duration-200">
            <p>1.1</p>
            <p>@example_1</p>
            <p>example@gmail.com</p>
            <div className="flex items-center gap-2">
                <IconBuildingStore size={18} />
                <p>Seller</p>
            </div>
            <div className="flex justify-center">
                <Switch />
            </div>
            <div className="flex justify-center">
                <ButtonComponent
                    style="flex justify-center text-center"
                    icon={<IconSettings />}
                />
            </div>
        </div>
    );
}
