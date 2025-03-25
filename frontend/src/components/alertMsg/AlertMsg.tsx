import { CheckCircle, XCircle, Info, AlertTriangle, X } from "lucide-react";

export type AlertType = "success" | "error" | "warning" | "info";

const AlertMsg = ({
  type,
  message,
  isOpen,
  onClose,
}: {
  type: AlertType;
  message: string;
  isOpen: boolean;
  onClose: () => void;
}): JSX.Element | null => {
  if (!isOpen || !message) return null;

  const alertConfigs = {
    success: {
      icon: CheckCircle,
      title: "Success",
      bgClass: "bg-green-50 border-green-200",
      iconClass: "text-green-600",
      titleClass: "text-green-800",
      descClass: "text-green-700",
      borderClass: "border-l-4 border-green-500",
    },
    error: {
      icon: XCircle,
      title: "Error",
      bgClass: "bg-red-50 border-red-200",
      iconClass: "text-red-600",
      titleClass: "text-red-800",
      descClass: "text-red-700",
      borderClass: "border-l-4 border-red-500",
    },
    warning: {
      icon: AlertTriangle,
      title: "Warning",
      bgClass: "bg-yellow-50 border-yellow-200",
      iconClass: "text-yellow-600",
      titleClass: "text-yellow-800",
      descClass: "text-yellow-700",
      borderClass: "border-l-4 border-yellow-500",
    },
    info: {
      icon: Info,
      title: "Information",
      bgClass: "bg-blue-50 border-blue-200",
      iconClass: "text-blue-600",
      titleClass: "text-blue-800",
      descClass: "text-blue-700",
      borderClass: "border-l-4 border-blue-500",
    },
  };

  const config = alertConfigs[type];
  const Icon = config.icon;

  return (
    <div
      className="fixed inset-0 bg-gray-500 bg-opacity-50 z-50 flex justify-center items-start pt-4"
      onClick={onClose}
    >
      <div
        className={`w-full max-w-md p-4 rounded-lg shadow ${config.bgClass} ${config.borderClass} flex items-start gap-3`}
        onClick={(e) => e.stopPropagation()} 
      >
        <Icon className={`h-5 w-5 ${config.iconClass}`} />
        <div className="flex justify-between w-full">
          <div>
            <h3 className={`font-semibold ${config.titleClass}`}>
              {config.title}
            </h3>
            <p className={`text-sm ${config.descClass}`}>{message}</p>
          </div>
          <div>
            <button
              className="text-xl text-black"
              onClick={onClose} 
            >
              <X className="h-5 w-5" /> 
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertMsg;
