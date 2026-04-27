import { useState, useEffect } from "react";
import { fetchDashboardMetrics } from "../api";
import PageHeader from "../components/PageHeader";

export default function AdminDashboard({ user }) {
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const m = await fetchDashboardMetrics();
        setMetrics(m);
      } catch (err) {
        console.error("Admin telemetry fail");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-8 animate-reveal">
      <div className="w-12 h-12 border-[3px] border-white/5 border-t-pink-600 rounded-full animate-spin"></div>
      <p className="text-[10px] font-black text-pink-500 uppercase tracking-[0.5em] animate-pulse italic">Scanning Enterprise Grid...</p>
    </div>
  );

  return (
    <div className="space-y-24 animate-reveal pb-20">
      <PageHeader 
        title="Admin Overlook" 
        subtitle="Global platform synchronization and enterprise node management."
        badge="Node: Superuser"
      />

      <div className="grid lg:grid-cols-4 gap-8">
        {[
          { label: "Total Revenue", value: `$${metrics?.totalRevenue || 0}`, icon: "💰", color: "text-emerald-500", bg: "bg-emerald-500/10" },
          { label: "Total Professionals", value: metrics?.totalProfessionals || 0, icon: "🎖️", color: "text-teal-500", bg: "bg-teal-500/10" },
          { label: "Global Missions", value: metrics?.totalServices || 0, icon: "🚀", color: "text-indigo-500", bg: "bg-indigo-500/10" },
          { label: "System Health", value: "OPTIMAL", icon: "💎", color: "text-pink-500", bg: "bg-pink-500/10" }
        ].map((stat, i) => (
          <div key={i} className="tactile-node p-10 bg-white/5 border-white/5 shadow-2xl rounded-[3rem] group hover:border-pink-500/40 transition-all">
            <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-xl flex items-center justify-center text-xl mb-8 italic`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.5em] mb-2 italic opacity-40">{stat.label}</p>
              <h3 className={`text-4xl font-black ${stat.color} tracking-tight leading-none italic uppercase`}>{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-10">
         <div className="glass-panel p-12 bg-white/5 border-white/5 rounded-[3.5rem] shadow-2xl space-y-10">
            <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.8em] italic opacity-40 border-l-2 border-pink-500 pl-6">Grid Performance Analyser</h3>
            <div className="h-64 flex items-end gap-4">
               {[40, 70, 55, 90, 65, 85, 100].map((h, i) => (
                 <div key={i} className="flex-1 bg-gradient-to-t from-pink-600 to-indigo-600 rounded-t-xl group relative cursor-pointer" style={{ height: `${h}%` }}>
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white text-slate-900 px-2 py-1 rounded text-[8px] font-bold opacity-0 group-hover:opacity-100 transition truncate italic">NODES: {h*10}</div>
                 </div>
               ))}
            </div>
            <div className="flex justify-between text-[8px] font-black uppercase text-slate-600 tracking-widest italic pt-6 border-t border-white/5">
                <span>01. MON</span>
                <span>02. TUE</span>
                <span>03. WED</span>
                <span>04. THU</span>
                <span>05. FRI</span>
                <span>06. SAT</span>
                <span>07. SUN</span>
            </div>
         </div>

         <div className="glass-panel p-12 bg-white/5 border-white/5 rounded-[3.5rem] shadow-2xl flex flex-col justify-center space-y-10">
            <div className="space-y-4">
                <h4 className="text-3xl font-black italic uppercase italic leading-none">Global Sync Status</h4>
                <p className="text-sm text-slate-500 font-black italic leading-relaxed opacity-60">All sectors are operational. Data throughput at 98.4% capacity.</p>
            </div>
            <div className="space-y-6">
                <div className="space-y-2">
                    <div className="flex justify-between text-[9px] font-black uppercase italic tracking-widest leading-none">
                        <span>Database Node</span>
                        <span className="text-emerald-500">Active</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full w-[95%] bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]"></div>
                    </div>
                </div>
                <div className="space-y-2">
                    <div className="flex justify-between text-[9px] font-black uppercase italic tracking-widest leading-none">
                        <span>External API Mesh</span>
                        <span className="text-emerald-500">Synced</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full w-[88%] bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]"></div>
                    </div>
                </div>
            </div>
            <button className="py-6 bg-pink-600 text-white rounded-[1.5rem] font-black italic text-[9px] uppercase tracking-[0.4em] shadow-2xl hover:scale-105 active:scale-95 transition-all">
                Enter Advanced Management
            </button>
         </div>
      </div>
    </div>
  );
}
