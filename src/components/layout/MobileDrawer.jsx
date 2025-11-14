import { X } from 'lucide-react';
import { Button } from '../ui/button';
import Sidebar from './Sidebar';

export default function MobileDrawer({ isOpen, onClose }) {
  if (!isOpen) return null;
  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />
      <div className="fixed left-0 top-0 bottom-0 z-50 w-64">
        <div className="relative h-full">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 z-10"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </Button>
          <Sidebar />
        </div>
      </div>
    </>
  );
}

