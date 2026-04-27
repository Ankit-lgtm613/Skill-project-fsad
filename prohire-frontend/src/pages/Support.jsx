import PageHeader from "../components/PageHeader";

export default function Support() {
  const tickets = [
    { id: "T-882", subject: "Uplink Failure in Sector 7", status: "OPEN", priority: "HIGH" },
    { id: "T-891", subject: "Expert Node Validation Pending", status: "RESOLVED", priority: "MED" },
    { id: "T-904", subject: "Resource Transfer Delay", status: "IN_PROGRESS", priority: "URGENT" },
  ];

  return (
    <div className="space-y-16 animate-reveal pb-20">
      <PageHeader 
        title="Support Nexus" 
        subtitle="Submit technical queries or report grid instabilities to central command."
        badge="Node: Support"
      />

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
           <div className="glass-panel p-12 bg-white/5 border-white/5 rounded-[3rem] shadow-2xl space-y-10">
              <h3 className="text-2xl font-black italic uppercase italic leading-none border-l-2 border-indigo-600 pl-6">Active Tickets</h3>
              <div className="space-y-4">
                 {tickets.map((t, i) => (
                   <div key={i} className="p-6 bg-white/3 border border-white/5 rounded-2xl flex items-center justify-between group hover:bg-white/10 transition-all cursor-pointer">
                      <div className="flex items-center gap-6">
                         <div className="text-[10px] font-black text-indigo-500 font-mono tracking-tighter italic"> {t.id} </div>
                         <div className="space-y-1">
                            <p className="text-[14px] font-black italic uppercase leading-none">{t.subject}</p>
                            <p className={`text-[8px] font-black uppercase tracking-widest ${t.priority === 'URGENT' ? 'text-pink-500' : 'text-slate-500'}`}>{t.priority} PRIORITY</p>
                         </div>
                      </div>
                      <div className="text-right">
                         <span className={`px-4 py-1.5 rounded-full text-[8.5px] font-black uppercase tracking-[0.2em] italic border ${t.status === 'RESOLVED' ? 'border-emerald-500/20 text-emerald-500 bg-emerald-500/10' : 'border-indigo-500/20 text-indigo-500 bg-indigo-500/10'}`}>{t.status}</span>
                      </div>
                   </div>
                 ))}
              </div>
              <button className="w-full py-6 bg-indigo-600 text-white rounded-[1.5rem] font-black italic text-[9px] uppercase tracking-[0.4em] shadow-2xl hover:scale-105 active:scale-95 transition-all">
                 Initiate New Support Uplink
              </button>
           </div>
        </div>

        <div className="space-y-8">
            <div className="glass-panel p-10 bg-white/5 border-white/5 rounded-[3rem] shadow-2xl space-y-8">
               <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.8em] italic opacity-40">Knowledge Base</h4>
               <div className="space-y-6">
                  {['Grid Connectivity', 'Expert Node Verification', 'Resource Transfer Protocols'].map(item => (
                    <div key={item} className="group cursor-pointer">
                       <p className="text-sm font-black italic uppercase group-hover:text-indigo-500 transition-all">{item}</p>
                       <p className="text-[8px] text-slate-600 font-bold uppercase tracking-widest mt-1">Read Protocol Docs</p>
                    </div>
                  ))}
               </div>
            </div>
            <div className="glass-panel p-10 bg-white/5 border-white/5 rounded-[3rem] shadow-2xl text-center space-y-6">
                <div className="text-3xl">🤖</div>
                <h4 className="text-xl font-black italic uppercase">AI Sentinel</h4>
                <p className="text-[10px] text-slate-500 font-bold italic leading-relaxed">Neural assistant available for immediate platform triage.</p>
                <button className="w-full py-4 border border-white/10 text-slate-400 hover:text-white hover:bg-white/5 rounded-2xl text-[9px] font-black uppercase tracking-[0.4em] italic transition-all">Start Triage</button>
            </div>
        </div>
      </div>
    </div>
  );
}
