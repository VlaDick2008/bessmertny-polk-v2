interface IInput {
  htmlFor?: string;
  label?: string;
  style?: string;
  placeholder?: string;
}

export default function Input({ htmlFor, label, style, placeholder }: IInput) {
  return (
    <label htmlFor={htmlFor} className="flex flex-col w-full">
      {label}
      <input
        placeholder={placeholder}
        type="text"
        id={htmlFor}
        name={htmlFor}
        className={`p-2 border outline-none ${
          style ? style : 'border-slate-300 rounded focus:border-slate-400'
        }`}
      />
    </label>
  );
}
