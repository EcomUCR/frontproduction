// src/contexts/AlertContext.tsx
import {
    createContext,
    useCallback,
    useContext,
    useMemo,
    useState,
    type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import AlertComponent from "../../components/data-display/AlertComponent";

type AlertType = "info" | "success" | "warning" | "error";

export type AlertOptions = {
    title?: string;
    message?: string;
    type?: AlertType;
    confirmText?: string;
    cancelText?: string;
};

type AlertContextValue = {
    showAlert: (options: AlertOptions) => Promise<boolean>;
    hideAlert: () => void;
};

const AlertContext = createContext<AlertContextValue | undefined>(undefined);

export function AlertProvider({ children }: { children: ReactNode }) {
    const [visible, setVisible] = useState(false);
    const [options, setOptions] = useState<AlertOptions>({
        title: "",
        message: "",
        type: "info",
        confirmText: "Aceptar",
        cancelText: "Cancelar",
    });

    const [resolver, setResolver] = useState<
        ((value: boolean) => void) | null
    >(null);

    const showAlert = useCallback((opts: AlertOptions) => {
        return new Promise<boolean>((resolve) => {
            setOptions({
                title: "Alerta",
                message: "",
                type: "info",
                confirmText: "Aceptar",
                cancelText: "Cancelar",
                ...opts,
            });
            setVisible(true);
            setResolver(() => resolve);
        });
    }, []);

    const hideAlert = useCallback(() => {
        setVisible(false);
    }, []);

    const handleConfirm = useCallback(() => {
        resolver?.(true);
        hideAlert();
    }, [resolver, hideAlert]);

    const handleCancel = useCallback(() => {
        resolver?.(false);
        hideAlert();
    }, [resolver, hideAlert]);

    const value = useMemo(
        () => ({ showAlert, hideAlert }),
        [showAlert, hideAlert]
    );

    return (
        <AlertContext.Provider value={value}>
            {children}

            {typeof document !== "undefined" &&
                createPortal(
                    <AlertComponent
                        show={visible}
                        title={options.title}
                        message={options.message}
                        type={options.type}
                        confirmText={options.confirmText}
                        cancelText={options.cancelText}
                        onConfirm={handleConfirm}
                        onCancel={handleCancel}
                    />,
                    document.body
                )}
        </AlertContext.Provider>
    );
}

export function useAlert() {
    const ctx = useContext(AlertContext);
    if (!ctx) throw new Error("useAlert must be used within an AlertProvider");
    return ctx;
}
