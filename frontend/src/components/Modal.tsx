import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export default function Modal({ isOpen, onClose, title, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" 
      onClick={onClose}
      style={{ zIndex: 9999 }}
    >
      <div 
        className="bg-white shadow-xl max-w-4xl w-full mx-4 max-h-[80vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
        style={{ borderRadius: '4px' }}
      >
        <div className="flex items-center justify-between p-5 border-b border-cofre-grayBorder bg-cofre-blueBright">
          <h2 className="font-bold text-white uppercase" style={{ fontSize: '18px', letterSpacing: '0.5px' }}>
            {title}
          </h2>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 transition-colors"
            style={{ cursor: 'pointer' }}
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="p-5 overflow-y-auto flex-1 bg-white">
          {children}
        </div>
      </div>
    </div>
  );
}
