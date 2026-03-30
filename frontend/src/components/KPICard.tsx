import { TrendingUp, TrendingDown } from 'lucide-react';

interface KPICardProps {
  title: string;
  value: string | number;
  variation?: number;
  subtitle?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
}

export default function KPICard({ title, value, variation, subtitle, icon, onClick }: KPICardProps) {
  const isPositive = variation === undefined || variation >= 0;
  
  return (
    <div 
      className={`glass p-5 card-hover ${onClick ? 'cursor-pointer hover:shadow-md' : ''}`} 
      style={{ borderRadius: '4px' }}
      onClick={onClick}
      title={onClick ? 'Clique para ver detalhes' : undefined}
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <p className="text-xs font-normal text-cofre-grayLight uppercase" style={{ fontSize: '12px', letterSpacing: '0.5px' }}>
            {title}
          </p>
        </div>
        {icon && (
          <div className="p-2 bg-cofre-blue text-white" style={{ borderRadius: '4px' }}>
            {icon}
          </div>
        )}
      </div>
      
      <div className="mb-2">
        <h3 className="font-bold text-cofre-blue" style={{ fontSize: '28px', color: '#203d64' }}>
          {value}
        </h3>
      </div>
      
      {variation !== undefined && (
        <div className={`flex items-center gap-1 font-normal ${
          isPositive ? 'text-green-600' : 'text-red-600'
        }`} style={{ fontSize: '13px' }}>
          {isPositive ? (
            <TrendingUp className="w-4 h-4" />
          ) : (
            <TrendingDown className="w-4 h-4" />
          )}
          <span>{Math.abs(variation)}%</span>
        </div>
      )}
      
      {subtitle && (
        <p className="text-xs text-cofre-grayLight mt-2" style={{ fontSize: '11px' }}>{subtitle}</p>
      )}
    </div>
  );
}
