import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  rotulo: string;
  icone: ReactNode;
}

export const EntradaTexto = forwardRef<HTMLInputElement, Props>(
  ({ rotulo, icone, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-2">
        <label className="text-gray-400 text-sm font-medium ml-1">{rotulo}</label>
        <div className="flex items-center bg-[#0b0e14] border border-gray-800 rounded-xl px-4 py-3 focus-within:border-[#1d9bf0] transition-all">
          <span className="text-gray-500 mr-3">{icone}</span>
          <input
            ref={ref} 
            className="bg-transparent border-none outline-none text-white w-full placeholder-gray-600"
            {...props}
          />
        </div>
      </div>
    );
  }
);
