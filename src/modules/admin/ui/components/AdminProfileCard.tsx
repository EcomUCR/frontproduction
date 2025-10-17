import { IconSettings, IconUser, IconCash } from "@tabler/icons-react";
import { Switch } from "../../../../components/ui/switch";
import ButtonComponent from "../../../../components/ui/ButtonComponent";

interface AdminProfileCardProps {
    id: string | number;
    username: string;
    email: string;
    role: "CUSTOMER" | "SELLER" | "ADMIN";
    status: boolean;
    onStatusChange?: (newStatus: boolean) => void;
}

export default function AdminProfileCard({
    id,
    username,
    email,
    role,
    status,
    onStatusChange,
}: AdminProfileCardProps) {
    const getRoleIcon = () => {
        switch (role) {
            case "CUSTOMER":
                return <IconUser size={18} />;
            case "SELLER":
                return <IconCash size={18} />;
            default:
                return <IconSettings size={18} />;
        }
    };

    return (
        <div className="flex items-center w-full bg-main-dark/20 rounded-full px-5 py-3 hover:bg-main-dark/30 transition-all duration-200">
            {/* Las columnas deben tener el mismo ancho que las del encabezado */}
            <p className="w-22">{id}</p>
            <p className="w-38 truncate pr-2">@{username}</p>
            <p className="w-55 truncate pr-2">{email}</p>

            <div className="w-32 flex items-center gap-2">
                {getRoleIcon()}
                <p>{role}</p>
            </div>

            <div className="flex justify-center w-24">
                <Switch
                    checked={status}
                    onCheckedChange={(checked) => onStatusChange?.(checked)}
                />
            </div>

            <div className="flex justify-center w-16">
                <ButtonComponent
                    style="flex justify-center text-center"
                    icon={<IconSettings />}
                />
            </div>
        </div>
    );
}
