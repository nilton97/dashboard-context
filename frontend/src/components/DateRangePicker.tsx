import { Calendar } from 'lucide-react';

interface DateRangePickerProps {
  startDate: string;
  endDate: string;
  onStartDateChange: (date: string) => void;
  onEndDateChange: (date: string) => void;
  label?: string;
}

export default function DateRangePicker({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  label = 'Período',
}: DateRangePickerProps) {
  const today = new Date().toISOString().split('T')[0];
  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
  const minDate = oneYearAgo.toISOString().split('T')[0];

  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <label className="filter-label block">
          {label} - Início
        </label>
        <div className="relative">
          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4" style={{ color: '#999999' }} />
          <input
            type="date"
            value={startDate}
            onChange={(e) => onStartDateChange(e.target.value)}
            min={minDate}
            max={today}
            className="w-full pl-9 pr-3 py-2 border border-cofre-grayBorder focus:ring-1 focus:ring-cofre-blue focus:border-cofre-blue outline-none bg-white text-cofre-gray"
            style={{ borderRadius: '4px', fontSize: '14px' }}
          />
        </div>
      </div>
      <div>
        <label className="filter-label block">
          {label} - Fim
        </label>
        <div className="relative">
          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4" style={{ color: '#999999' }} />
          <input
            type="date"
            value={endDate}
            onChange={(e) => onEndDateChange(e.target.value)}
            min={startDate || minDate}
            max={today}
            className="w-full pl-9 pr-3 py-2 border border-cofre-grayBorder focus:ring-1 focus:ring-cofre-blue focus:border-cofre-blue outline-none bg-white text-cofre-gray"
            style={{ borderRadius: '4px', fontSize: '14px' }}
          />
        </div>
      </div>
    </div>
  );
}
