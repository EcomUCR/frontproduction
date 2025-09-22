import { Button } from "./button";

interface ModalButtonProps {
  onCancel?: () => void;
  onSave?: () => void;
}

const ModalButton: React.FC<ModalButtonProps> = ({ onCancel, onSave }) => {
  return (
    <div className="mt-6 mb-8 text-center">
      <p className="text-sm text-red-700 mb-4">
        Every change will be notified to the account owner.
      </p>
      <div className="flex justify-center gap-4">
        <Button
          variant="destructive"
          className="bg-black text-white px-6 py-2 rounded-lg"
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button
          variant="default"
          className="bg-blue-main text-white px-6 py-2 rounded-lg"
          onClick={onSave}
        >
          Save
        </Button>
      </div>
    </div>
  );
};

export default ModalButton;
