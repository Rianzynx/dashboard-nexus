import React, { useState } from 'react';
import * as Icon from 'lucide-react'; 

interface Option {
  id: string;
  label: string;
  sublabel?: string;
  icon?: React.ReactNode;
}

interface OptionSelectProps {
  label: string;
  options: Option[];
  value: string;
  onChange: (id: string) => void;
  placeholder?: string;
}

export const OptionSelect = ({ label, options, value, onChange, placeholder }: OptionSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const safeOptions = options || [];
  const selectedOption = safeOptions.find(o => o.id === value);

  return (
    <div className="relative w-full min-w-0">
      <label className="block text-[10px] text-slate-400 uppercase font-bold mb-2 tracking-wider">
        {label}
      </label>
      
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-left flex items-center justify-between hover:bg-white/10 transition-all focus:border-slate-500/50"
      >
        <div className="flex items-center gap-3 min-w-0">
          {selectedOption?.icon}
          <span className="truncate text-sm text-white font-medium">
            {selectedOption ? selectedOption.label : placeholder}
          </span>
        </div>
        <Icon.ChevronDown className={`w-4 h-4 text-slate-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          
          <div className="absolute z-50 mt-2 w-full bg-nexus-darkM border border-white/10 rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 origin-top">
            <div className="max-h-60 overflow-y-auto overflow-x-hidden custom-scrollbar">
              {safeOptions.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => {
                    onChange(opt.id);
                    setIsOpen(false);
                  }}
                  className={`w-full px-4 py-3 text-left flex items-center gap-3 hover:bg-white/5 transition-colors border-b border-white/5 last:border-none ${value === opt.id ? 'bg-slate-500/10' : ''}`}
                >
                  {opt.icon}
                  <div className="min-w-0 flex-1">
                    <p className="text-white text-sm font-medium truncate">{opt.label}</p>
                    {opt.sublabel && <p className="text-slate-500 text-[10px] truncate">{opt.sublabel}</p>}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};