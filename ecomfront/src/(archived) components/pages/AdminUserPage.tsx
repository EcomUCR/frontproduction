import React, { useEffect, useState } from "react";
import ButtonComponent from "../ui/ButtonComponent";
import NavBar from "../ui/NavBar";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../ui/table";
import NewUser from "../ui/NewUser";

interface Profile {
    id: number;
    username: string;
    name: string;
    last_name: string;
    type: string;
    status: boolean;
    image?: string;
    user_id: number;
    user?: {
        email?: string;
        last_login_at?: string;
    };
}

export default function AdminUserPage() {
    const [profiles, setProfiles] = useState<Profile[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
    const [newPassword, setNewPassword] = useState("");
    const [updating, setUpdating] = useState(false);
    const [updateMsg, setUpdateMsg] = useState("");
    const [updateStatus, setUpdateStatus] = useState(true);
    const [showNewUser, setShowNewUser] = useState(false);

    useEffect(() => {
        fetch("/api/profiles", { credentials: "include" })
            .then(res => res.json())
            .then(data => {
                setProfiles(data);
                setLoading(false);
            });
    }, []);

    const handleSelect = (profile: Profile) => {
        setSelectedProfile(profile);
        setUpdateMsg("");
    };

    const handleUpdatePassword = async () => {
        if (!selectedProfile || !newPassword) return;
        setUpdating(true);
        setUpdateMsg("");
        // Actualiza la contraseña del usuario
        const res = await fetch(`/api/users/${selectedProfile.user_id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ password: newPassword }),
        });
        let data = null;
        try {
            data = await res.json();
        } catch (e) {
            data = {};
        }
        setUpdating(false);
        if (res.ok) {
            setUpdateMsg("Contraseña actualizada correctamente");
            setNewPassword("");
        } else {
            setUpdateMsg((data && data.error) || "Error al actualizar");
        }
    };

    const refreshProfiles = () => {
        setLoading(true);
        fetch("/api/profiles", { credentials: "include" })
            .then(res => res.json())
            .then(data => {
                setProfiles(data);
                setLoading(false);
            });
    };

    return (
        <section className="">
            <NavBar />
            <div className="py-10 px-5 lg:px-20 ">
                <div className="flex justify-between items-center ">
                    <h1 className="font-quicksand font-bold text-xl lg:text-4xl">Lista de Usuarios</h1>
                    <ButtonComponent
                        text={showNewUser ? "Volver" : "Crear nuevo usuario"}
                        style="bg-purple-main text-xs lg:text-xl p-4 font-fugaz text-white rounded-lg"
                        onClick={() => setShowNewUser(prev => !prev)}
                    />
                </div>
                {showNewUser && (
                    <NewUser onCreated={() => {
                        setShowNewUser(false);
                        refreshProfiles();
                    }} />
                )}
                {!showNewUser && (
                <div className="flex flex-col lg:flex-row w-full space-x-2 space-y-2 lg:space-y-0 py-10">
                    <div className="w-full h-auto lg:w-2/3 bg-purple-main/50 rounded-2xl px-5">
                        <Table>
                            <TableCaption>Esto va al final de la lista</TableCaption>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="">ID</TableHead>
                                    <TableHead className="">Usuario</TableHead>
                                    <TableHead>Tipo</TableHead>
                                    <TableHead>Nombre</TableHead>
                                    <TableHead>Apellido</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Ultima conexión</TableHead>
                                    <TableHead>Estado</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {loading ? (
                                    <TableRow>
                                        <TableCell colSpan={7}>Cargando...</TableCell>
                                    </TableRow>
                                ) : (
                                    profiles.map(profile => (
                                        <TableRow
                                            key={profile.id}
                                            className={selectedProfile?.id === profile.id ? "bg-purple-200 cursor-pointer" : "cursor-pointer"}
                                            onClick={() => handleSelect(profile)}
                                        >
                                            <TableCell className="font-medium">{profile.id}</TableCell>
                                            <TableCell className="font-medium">{profile.username}</TableCell>
                                            <TableCell>{profile.type}</TableCell>
                                            <TableCell>{profile.name}</TableCell>
                                            <TableCell>{profile.last_name}</TableCell>
                                            <TableCell>{profile.user?.email || ""}</TableCell>
                                            <TableCell>{profile.user?.last_login_at ? new Date(profile.user.last_login_at).toLocaleString() : ""}</TableCell>
                                            <TableCell>
                                                <input
                                                    type="checkbox"
                                                    checked={!!profile.status}
                                                    onChange={async () => {
                                                        let newStatus = profile.status ? 0 : 1;
                                                        const res = await fetch(`/api/profiles/${profile.id}`, {
                                                            method: "PUT",
                                                            headers: { "Content-Type": "application/json" },
                                                            credentials: "include",
                                                            body: JSON.stringify({ status: newStatus })
                                                        });
                                                        if (res.ok) {
                                                            refreshProfiles();
                                                        } else {
                                                            console.log("Error al actualizar estado", await res.json());
                                                        }
                                                    }}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </div>
                    <div className="bg-purple-main/50 py-5 rounded-2xl lg:w-1/3 h-auto text-white">
                        <div className="text-center space-y-2 border-b-1 border-white">
                            <h2 className="font-bold text-xl">Resetear Contraseña</h2>
                            <p>Usuario seleccionado: <span>{selectedProfile ? `@${selectedProfile.username}` : "Ninguno"}</span></p>
                        </div>
                        <div className="flex flex-col items-center py-5">
                            <label htmlFor="">Nueva contraseña</label>
                            <input
                                type="password"
                                placeholder=""
                                className="rounded-lg p-2 m-2 bg-white text-gray-main w-[90%] px-5"
                                value={newPassword}
                                onChange={e => setNewPassword(e.target.value)}
                                disabled={!selectedProfile || updating}
                            />
                        </div>
                        <div className="flex flex-col items-center text-center">
                            <ButtonComponent
                                text={updating ? "Actualizando..." : "Actualizar contraseña manualmente"}
                                style="bg-blue-main text-white-main p-2 rounded-lg m-2  w-[40vh]"
                                onClick={handleUpdatePassword}
                                disabled={!selectedProfile || !newPassword || updating}
                            />
                            <ButtonComponent text="Enviar correo de cambio de contraseña" style="bg-yellow-main text-white p-2 rounded-lg m-2  w-[40vh]" />
                            {updateMsg && <p className="mt-2 text-green-200">{updateMsg}</p>}
                        </div>
                    </div>
                </div>
                )}
            </div>
        </section>
    );
}