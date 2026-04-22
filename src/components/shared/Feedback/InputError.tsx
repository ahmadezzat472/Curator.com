interface InputErrorProps {
  error?: string;
}

function InputError({ error }: InputErrorProps) {
  return (
    <div className="text-xs text-destructive">
      {error ?? "This field is required"}
    </div>
  );
}

export default InputError;
