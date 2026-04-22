import { cn } from "@/lib/utils";

type ErrorMessageProps = {
  message?: string;
  className?: string;
};

function ErrorMessage({
  message = "An error occurred.",
  className,
}: ErrorMessageProps) {
  return (
    <p
      className={cn(
        "text-red-500 text-2xl font-medium py-10 px-4 w-full text-center",
        className,
      )}
    >
      {message}
    </p>
  );
}

export default ErrorMessage;
