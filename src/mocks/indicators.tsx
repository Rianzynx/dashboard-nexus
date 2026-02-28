import * as Icons from '../components/icons';
import type { Indicator } from '../types';


export const mockIndicators: Indicator[] = [
  {
    id: 1,
    label: "Total Depositado",
    value: "R$ 15.200,00",
    color: "text-green-500",
    icon: <Icons.Deposit className="w-7 h-7" />
  },
  { 
    id: 2, 
    label: "Total Sacado", 
    value: "R$ 4.850,00", 
    color: "text-red-500",
    icon: <Icons.Withdraw className="w-7 h-7" /> 
  },
  { 
    id: 3, 
    label: "Usuários Ativos", 
    value: "1.284", 
    color: "text-blue-500",
    icon: <Icons.Users className="w-7 h-7" />    
  },
  { 
    id: 4, 
    label: "Volume em BRL", 
    value: "R$ 850.400,00", 
    color: "text-yellow-500",
    icon: <Icons.PiggyBank className="w-7 h-7" /> 
  },
];