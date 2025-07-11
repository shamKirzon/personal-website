import { Home, Calendar, BarChart3, Sun } from "lucide-react";

const BottomNav = () => {
  return (
    <div className="flex items-center justify-between bg-zinc-900 border border-cyan-500 rounded-full px-4 py-3 w-fit mx-auto gap-4 shadow-[0_0_12px_3px_rgba(6,182,212,0.5)]">
      <Home className="text-white w-6 h-6" />
      <Calendar className="text-white w-6 h-6" />
      <BarChart3 className="text-white w-6 h-6" />

      {/* Divider */}
      <div className="h-6 w-px bg-zinc-700 mx-2" />

      <Sun className="text-white w-6 h-6" />
    </div>
  );
};

export default BottomNav;
