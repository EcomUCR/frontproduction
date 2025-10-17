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
    // 🧩 Determinar el ícono según el rol
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
        <div className="flex justify-between w-full items-center bg-main-dark/20 rounded-full px-5 py-3 hover:bg-main-dark/30 transition-all duration-200">
            <p>{id}</p>
            <p>@{username}</p>
            <p>{email}</p>

            <div className="flex items-center gap-2">
                {getRoleIcon()}
                <p>{role}</p>
            </div>

            <div className="flex justify-center">
                <Switch
                    checked={status}
                    onCheckedChange={(checked) => onStatusChange?.(checked)}
                />
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
