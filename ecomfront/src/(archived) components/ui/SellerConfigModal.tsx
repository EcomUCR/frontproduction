import { Button } from './button';
import SellerForm from './SellerForm';
import ModalButton from './ModalButton';
import backArrowIcon from '../../img/backArrow.png';

interface SellerConfigModalProps {
  onCancel?: () => void;
  onSave?: () => void;
}

const SellerConfigModal: React.FC<SellerConfigModalProps> = ({ onCancel, onSave }) => {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-3xl shadow-lg w-full max-w-5xl max-h-[80vh] overflow-y-auto flex flex-col">


        <div className="flex items-center justify-between mb-6 p-8 relative">
          <Button className="flex items-center bg-white border px-3 py-2 rounded-md shadow-sm text-black">
            <img src={backArrowIcon} alt="Volver" className="w-4 h-4 mr-2" />
            <span className="text-black">Back</span>
          </Button>

          <h2 className="absolute left-1/2 transform -translate-x-1/2 text-3xl font-bold">
            Modificar Vendedor
          </h2>
        </div>


        <div className="px-8 pb-8">
          <SellerForm />
          <ModalButton onCancel={onCancel} onSave={onSave} />
        </div>

      </div>
    </div>
  );
};

export default SellerConfigModal;
