export default function PageTemplate({ children, title }) {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-4">
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <div className="aspect-video rounded-xl bg-slate-100/10" />
        <div className="aspect-video rounded-xl bg-slate-100/10" />
        <div className="aspect-video rounded-xl bg-slate-100/10" />
      </div>
      <div className="min-h-[100vh] flex-1 rounded-xl bg-slate-100/10 md:min-h-min" />
      {children}
    </div>
  );
}

