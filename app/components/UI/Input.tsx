interface IInput {
  htmlFor?: string;
  label?: string;
  style?: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
}

export default function Input({ htmlFor, label, style, placeholder, value, onChange }: IInput) {
  return (
    <label htmlFor={htmlFor} className="flex flex-col w-full">
      {label}
      <input
        onChange={onChange}
        placeholder={placeholder}
        type="text"
        id={htmlFor}
        name={htmlFor}
        value={value}
        className={`p-2 border outline-none ${
          style ? style : 'border-slate-300 rounded focus:border-slate-400'
        }`}
      />
    </label>
  );
}
