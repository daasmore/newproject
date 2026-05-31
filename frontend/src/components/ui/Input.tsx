'use client';
import { forwardRef, type InputHTMLAttributes } from 'react';
interface InputProps extends InputHTMLAttributes<HTMLInputElement> { label?: string; error?: string; }
const Input = forwardRef<HTMLInputElement, InputProps>(({ label, error, className = '', ...props }, ref) => (
  <div>
    {label && <label className="block text-xs text-white/40 mb-2 font-[Inter]">{label}</label>}
    <input ref={ref} className={`w-full px-4 py-3 rounded-xl input-dark font-[Inter] text-sm ${className}`} {...props} />
    {error && <p className="text-red-400 text-xs mt-1 font-[Inter]">{error}</p>}
  </div>
));
Input.displayName = 'Input';
export default Input;
