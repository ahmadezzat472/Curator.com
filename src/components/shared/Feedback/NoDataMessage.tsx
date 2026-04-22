import { cn } from "@/lib/utils";
import { FiInbox } from "react-icons/fi";

type NoDataMessageProps = {
  message?: string;
  showIcon?: boolean;
  className?: string;
  iconClassName?: string;
  containerClassName?: string;
};

function NoDataMessage({
  message = "No data available.",
  showIcon = true,
  className,
  containerClassName,
  iconClassName,
}: NoDataMessageProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center w-full py-10 px-4 gap-4",
        containerClassName,
      )}
    >
      {showIcon && (
        <FiInbox className={cn("size-24 text-gray-500", iconClassName)} />
      )}
      <p className={cn("text-gray-600 text-2xl text-center", className)}>
        {message}
      </p>
    </div>
  );
}

export default NoDataMessage;
