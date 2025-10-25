import MailboxCard from "./MailboxCard";

export default function AdminMailBox() {
  const notifications = [
    {
      id: 1,
      type: "STORE_PENDING_VERIFICATION" as const,
      title: "Nueva tienda pendiente de verificación",
      message: "La tienda 'TechPlanet' requiere aprobación del administrador.",
      created_at: "2025-10-25T15:30:00Z",
      data: { store_id: 12 },
    },
    {
      id: 2,
      type: "CONTACT_MESSAGE" as const,
      title: "Nuevo mensaje de contacto",
      message: "Has recibido un nuevo mensaje desde el formulario de contacto.",
      created_at: "2025-10-25T16:45:00Z",
      data: {
        name: "Carlos Hernández",
        subject: "Consulta sobre colaboraciones",
        email: "carlos@email.com",
        message: "Hola, me gustaría conocer más sobre su programa de afiliados.",
      },
    },
  ];

  return (
    <section className="pl-2 sm:pl-4 font-quicksand">
      <div className="pl-0 sm:pl-5">
        {/* Header */}
        <div className="pb-6 sm:pb-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
          <h1 className="text-lg sm:text-2xl border-b-3 border-main w-fit">
            Buzón de administración
          </h1>
        </div>
      </div>

      {/* 🔹 Lista de notificaciones */}
      <div className="flex flex-col gap-4 sm:gap-6">
        {notifications.length === 0 ? (
          <p className="text-gray-500 text-sm text-center py-6">
            No hay notificaciones por el momento.
          </p>
        ) : (
          notifications.map((n) => <MailboxCard key={n.id} {...n} />)
        )}
      </div>
    </section>
  );
}
