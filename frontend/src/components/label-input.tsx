import { InputHTMLAttributes } from 'react';

type LabelInputProps = {
  label: string;
} & InputHTMLAttributes<HTMLInputElement>;

export function LabelInput({ label, ...props }: LabelInputProps) {
  return (
    <div className="my-2">
      <label
        className="text-slate-500"
        htmlFor="nom">
        {label}
      </label>
      <input
        className="w-full px-2 py-1 border rounded"
        {...props}
      />
    </div>
  );
}
