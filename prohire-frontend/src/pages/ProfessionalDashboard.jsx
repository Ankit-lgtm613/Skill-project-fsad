import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchHires, fetchDashboardMetrics } from "../api";
import PageHeader from "../components/PageHeader";

export default function ProfessionalDashboard({ user }) {
  const navigate = useNavigate();
  const [missions, setMissions] = useState([]);
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [h, m] = await Promise.all([fetchHires(), fetchDashboardMetrics()]);
        setMissions(h || []);
        setMetrics(m);
      } catch (err) {
        console.error("Professional telemetry failed");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-8 animate-reveal">
      <div className="w-12 h-12 border-[3px] border-white/5 border-t-emerald-600 rounded-full animate-spin"></div>
      <p className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.5em] animate-pulse italic">Syncing Professional Node...</p>
    </div>
  );

  const earnings = missions.reduce((acc, m) => acc + (m.amount || 0), 0);

  return (
    <div className="space-y-24 animate-reveal pb-20">
      <PageHeader 
        title="Expert Console" 
        subtitle="Manage your tactical missions and optimize your professional output."
        badge="Node: Specialist"
      />

      <div className="grid lg:grid-cols-4 gap-8">
        {[
          { label: "Active Missions", value: missions.length, icon: "🚀", color: "text-indigo-500", bg: "bg-indigo-500/10" },
          { label: "Total Revenue", value: `$${earnings}`, icon: "💰", color: "text-emerald-500", bg: "bg-emerald-500/10" },
          { label: "Ranking", value: "ELITE", icon: "🎖️", color: "text-amber-500", bg: "bg-amber-500/10" },
          { label: "Grid Status", value: "ONLINE", icon: "⚡", color: "text-teal-500", bg: "bg-teal-500/10" }
        ].map((stat, i) => (
          <div key={i} className="tactile-node p-10 bg-white/5 border-white/5 shadow-2xl rounded-[3rem] group hover:border-indigo-500/40 transition-all">
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

      <div className="grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 glass-panel p-12 bg-white/5 border-white/5 rounded-[3.5rem] shadow-2xl">
           <div className="flex items-center justify-between mb-10 border-l-[3px] border-indigo-500 px-6">
              <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.8em] italic opacity-40">Operational Mission Queue</h3>
              <button onClick={() => navigate("/jobs")} className="text-[8px] font-black uppercase tracking-[0.3em] text-indigo-500 italic">Browse New Tasks</button>
           </div>
           
           <div className="space-y-4">
              {missions.slice(0, 5).map((mission, i) => (
                <div key={i} className="p-6 bg-white/3 border border-white/5 rounded-2xl flex items-center justify-between group hover:bg-white/10 transition-all">
                   <div className="flex items-center gap-6">
                      <div className="w-10 h-10 rounded-lg bg-indigo-500/20 flex items-center justify-center text-[10px] font-black text-indigo-500 italic"> {mission.serviceTitle?.[0]} </div>
                      <div className="space-y-1">
                         <p className="text-[14px] font-black italic uppercase leading-none">{mission.serviceTitle}</p>
                         <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest">{mission.clientName || 'Market Client'}</p>
                      </div>
                   </div>
                   <div className="text-right">
                      <p className="text-xl font-black italic text-emerald-500">${mission.amount}</p>
                      <p className="text-[8px] font-black text-slate-600 uppercase italic">Contracted</p>
                   </div>
                </div>
              ))}
              {missions.length === 0 && (
                <div className="py-20 text-center opacity-20 italic font-black uppercase text-[10px] tracking-widest">
                  No mission data uplinks found in queue.
                </div>
              )}
           </div>
        </div>

        <div className="lg:col-span-4 space-y-8">
           <div className="glass-panel p-10 bg-white/5 border-white/5 rounded-[3rem] shadow-2xl text-center space-y-6">
              <div className="w-20 h-20 bg-indigo-600 rounded-[2rem] flex items-center justify-center text-white text-3xl font-black mx-auto shadow-2xl"> {user?.name?.[0]} </div>
              <div>
                <h4 className="text-xl font-black italic uppercase">{user?.name}</h4>
                <p className="text-[10px] text-indigo-500 font-black tracking-widest uppercase italic mt-1 leading-none opacity-60">{user?.role}</p>
              </div>
              <div className="flex flex-wrap gap-2 justify-center">
                {['React', 'NodeJS', 'AI Architecture'].map(s => (
                  <span key={s} className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-[8px] font-black text-slate-500 uppercase tracking-wider italic">{s}</span>
                ))}
              </div>
              <button 
                onClick={() => navigate("/profile")}
                className="w-full py-4 border border-white/10 text-slate-400 hover:text-white hover:bg-white/5 rounded-2xl text-[9px] font-black uppercase tracking-[0.4em] italic transition-all"
              >
                Refine Skills
              </button>
           </div>
        </div>
      </div>
    </div>
  );
}
