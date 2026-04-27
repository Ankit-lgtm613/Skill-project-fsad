import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { shareViaWebService, resetShareState } from "../store/shareSlice";

const ShareComponent = ({ title, url }) => {
  const dispatch = useDispatch();
  const { loading, success, error } = useSelector((state) => state.share);

  const handleShare = () => {
    dispatch(shareViaWebService({ title, url }));
  };

  const handleReset = () => {
    dispatch(resetShareState());
  };

  return (
    <div className="glass-panel p-10 bg-white/5 border-white/5 rounded-[3rem] shadow-2xl w-full flex flex-col items-center text-center space-y-6">
      <div className="p-4 bg-blue-600/20 text-blue-500 rounded-full text-2xl">📤</div>
      <h4 className="text-xl font-black italic uppercase tracking-tighter">Share Node</h4>
      
      <div className="space-y-2">
        <p className="text-sm text-slate-500 font-bold italic leading-relaxed">Sharing: {title}</p>
        <p className="text-[10px] text-slate-600 font-black tracking-widest uppercase truncate max-w-[200px]">{url}</p>
      </div>
      
      <div className="flex gap-4 w-full">
        <button
          onClick={handleShare}
          disabled={loading}
          className={`w-full py-4 rounded-2xl text-[9px] font-black uppercase tracking-[0.4em] italic shadow-xl transition-all ${
            loading 
              ? "bg-slate-800 text-slate-500 cursor-not-allowed" 
              : "bg-blue-600 text-white hover:bg-white hover:text-slate-950"
          }`}
        >
          {loading ? "Uplinking..." : "Share Now"}
        </button>
        {success && (
          <button
            onClick={handleReset}
            className="w-full py-4 bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 rounded-2xl text-[9px] font-black uppercase tracking-[0.4em] italic transition-all"
          >
            Reset
          </button>
        )}
      </div>

      {success && (
        <p className="text-emerald-500 text-[10px] font-black uppercase tracking-widest mt-3 animate-pulse">
          Uplink Successful!
        </p>
      )}
      {error && (
        <p className="text-rose-500 text-[10px] font-black uppercase tracking-widest mt-3">
          Error: {error}
        </p>
      )}
    </div>
  );
};

export default ShareComponent;
