import { useTheme } from "../context/ThemeContext";
import PageHeader from "../components/PageHeader";

export default function Settings() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="space-y-16 animate-reveal pb-20 max-w-4xl mx-auto">
      <PageHeader 
        title="System Config" 
        subtitle="Calibrate your interface parameters and notification matrices."
        badge="Node: Settings"
      />

      <div className="space-y-8">
        <div className="glass-panel p-10 bg-white/5 border-white/5 rounded-[2.5rem] shadow-2xl space-y-10 group hover:border-indigo-500/30 transition-all">
           <div className="flex items-center justify-between">
              <div className="space-y-2">
                 <h3 className="text-xl font-black italic uppercase leading-none">Interface Mode</h3>
                 <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest italic">Toggle between dark and light spectrums.</p>
              </div>
              <button 
                onClick={toggleTheme}
                className="w-16 h-8 bg-white/5 border border-white/10 rounded-full relative group/toggle transition-all overflow-hidden"
              >
                <div className={`absolute top-1 bottom-1 w-6 bg-indigo-600 rounded-full transition-all flex items-center justify-center text-[10px] ${theme === 'dark' ? 'left-9' : 'left-1'}`}>
                   {theme === 'dark' ? '🌙' : '☀️'}
                </div>
              </button>
           </div>
           
           <div className="h-[1px] bg-white/5 mx-[-2.5rem]"></div>

           <div className="flex items-center justify-between">
              <div className="space-y-2">
                 <h3 className="text-xl font-black italic uppercase leading-none">Neural Feed</h3>
                 <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest italic">Real-time mission updates via desktop uplink.</p>
              </div>
              <div className="w-16 h-8 bg-emerald-600 rounded-full relative">
                <div className="absolute top-1 bottom-1 left-9 w-6 bg-white rounded-full"></div>
              </div>
           </div>

           <div className="h-[1px] bg-white/5 mx-[-2.5rem]"></div>

           <div className="flex items-center justify-between">
              <div className="space-y-2">
                 <h3 className="text-xl font-black italic uppercase leading-none">Global Visibility</h3>
                 <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest italic">Allow your node to be discoverable in the experts grid.</p>
              </div>
              <div className="w-16 h-8 bg-white/5 border border-white/10 rounded-full relative">
                <div className="absolute top-1 bottom-1 left-1 w-6 bg-slate-600 rounded-full"></div>
              </div>
           </div>
        </div>

        <div className="glass-panel p-10 bg-white/5 border-white/5 rounded-[2.5rem] shadow-2xl space-y-8">
           <h3 className="text-[10px] font-black text-pink-500 uppercase tracking-[0.8em] italic opacity-40">Destructive Actions</h3>
           <div className="flex items-center justify-between">
               <div className="space-y-1">
                  <p className="text-sm font-black italic uppercase">Purge Local Cache</p>
                  <p className="text-[9px] text-slate-600 font-black italic tracking-widest leading-none">Force re-synchronization with central grid.</p>
               </div>
               <button className="px-6 py-3 border border-pink-500/20 text-pink-600 rounded-xl text-[8px] font-black uppercase tracking-widest italic hover:bg-pink-600/10 transition-all">Execute Purge</button>
           </div>
        </div>
      </div>
    </div>
  );
}
