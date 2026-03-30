import { Filter, X } from 'lucide-react';
import DateRangePicker from './DateRangePicker';

interface FilterOption {
  value: string | number;
  label: string;
}

interface FilterConfig {
  label: string;
  name: string;
  options: FilterOption[];
  value: string | number;
  onChange: (value: string | number) => void;
}

interface DateRangeConfig {
  startDate: string;
  endDate: string;
  onStartDateChange: (date: string) => void;
  onEndDateChange: (date: string) => void;
  label?: string;
}

interface FilterBarProps {
  filters: FilterConfig[];
  dateRange?: DateRangeConfig;
  onReset?: () => void;
}

export default function FilterBar({ filters, dateRange, onReset }: FilterBarProps) {
  const hasActiveFilters = filters.some(f => f.value !== '' && f.value !== 'all') || 
    (dateRange && (dateRange.startDate !== '' || dateRange.endDate !== ''));

  return (
    <div className="bg-white p-5 mb-6 border border-cofre-grayBorder" style={{ borderRadius: '4px', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)' }}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5" style={{ color: '#203d64' }} />
          <h3 className="font-normal text-cofre-gray" style={{ fontSize: '16px' }}>Filtros</h3>
        </div>
        {hasActiveFilters && onReset && (
          <button
            onClick={onReset}
            className="flex items-center gap-1 text-cofre-grayLight hover:text-cofre-gray transition-colors"
            style={{ fontSize: '13px' }}
          >
            <X className="w-4 h-4" />
            Limpar filtros
          </button>
        )}
      </div>
      
      <div className="space-y-4">
        {dateRange && (
          <DateRangePicker
            startDate={dateRange.startDate}
            endDate={dateRange.endDate}
            onStartDateChange={dateRange.onStartDateChange}
            onEndDateChange={dateRange.onEndDateChange}
            label={dateRange.label}
          />
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filters.map((filter) => (
            <div key={filter.name}>
              <label className="filter-label block">
                {filter.label}
              </label>
              <select
                value={filter.value}
                onChange={(e) => filter.onChange(e.target.value)}
                className="w-full px-3 py-2 border border-cofre-grayBorder focus:ring-1 focus:ring-cofre-blue focus:border-cofre-blue outline-none bg-white text-cofre-gray"
                style={{ borderRadius: '4px', fontSize: '14px' }}
              >
                {filter.options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
