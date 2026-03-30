interface ChartCardProps {
  title: string;
  children: React.ReactNode;
}

export default function ChartCard({ title, children }: ChartCardProps) {
  return (
    <div className="glass p-5 card-hover" style={{ borderRadius: '4px' }}>
      <h3 className="font-normal text-cofre-gray mb-4 pb-3 border-b border-cofre-grayBorder" style={{ fontSize: '16px' }}>
        {title}
      </h3>
      <div className="h-80">
        {children}
      </div>
    </div>
  );
}
