import QRCodeGenerator from "./components/QRCodeGenerator";

const CreateQRCode = () => {
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="extension-header">
        <h1 className="text-sm font-semibold text-foreground">Create QR Code</h1>
        <div className="w-2 h-2 rounded-full bg-primary animate-scale-in" />
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto py-4 animate-slide-up">
        <QRCodeGenerator />
      </div>
    </div>
  );
};

export default CreateQRCode;
