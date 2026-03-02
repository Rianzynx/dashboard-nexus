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
      {/* LABEL SUPERIOR */}
      <label className="block text-[10px] text-slate-500 dark:text-slate-400 uppercase font-bold mb-2 tracking-wider px-1">
        {label}
      </label>
      
      {/* BOTÃO TRIGGER */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-white dark:bg-white/5 border border-slate-300 dark:border-white/10 rounded-xl px-4 py-3.5 text-left flex items-center justify-between hover:bg-slate-50 dark:hover:bg-white/10 transition-all focus:border-slate-400 dark:focus:border-slate-500/50 shadow-sm dark:shadow-none"
      >
        <div className="flex items-center gap-3 min-w-0">
          {selectedOption?.icon}
          <span className={`truncate text-sm font-bold ${selectedOption ? 'text-slate-700 dark:text-white' : 'text-slate-400 dark:text-slate-500'}`}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
        </div>
        <Icon.ChevronDown className={`w-4 h-4 text-slate-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* DROPDOWN MENU */}
      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          
          <div className="absolute z-50 mt-2 w-full bg-white dark:bg-nexus-darkM border border-slate-200 dark:border-white/10 rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 origin-top transition-colors">
            <div className="max-h-60 overflow-y-auto overflow-x-hidden custom-scrollbar">
              {safeOptions.length > 0 ? (
                safeOptions.map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => {
                      onChange(opt.id);
                      setIsOpen(false);
                    }}
                    className={`w-full px-4 py-3 text-left flex items-center gap-3 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors border-b border-slate-100 dark:border-white/5 last:border-none 
                      ${value === opt.id ? 'bg-slate-50 dark:bg-slate-500/10' : ''}`}
                  >
                    {opt.icon}
                    <div className="min-w-0 flex-1">
                      <p className="text-slate-700 dark:text-white text-sm font-bold truncate">{opt.label}</p>
                      {opt.sublabel && <p className="text-slate-500 dark:text-slate-500 text-[10px] font-medium truncate">{opt.sublabel}</p>}
                    </div>
                  </button>
                ))
              ) : (
                <div className="px-4 py-8 text-center text-slate-400 text-xs font-bold uppercase tracking-widest opacity-50">
                  Nenhuma opção
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};