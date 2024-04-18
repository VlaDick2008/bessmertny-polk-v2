interface IInput {
  htmlFor?: string;
  label?: string;
  style?: string;
}

export default function Input({ htmlFor, label, style }: IInput) {
  return (
    <label htmlFor={htmlFor} className="flex flex-col w-full">
      {label}
      <input
        type="text"
        id={htmlFor}
        className={`p-2 border outline-none ${
          style ? style : 'border-slate-300 rounded focus:border-slate-400'
        }`}
      />
    </label>
  );
}
