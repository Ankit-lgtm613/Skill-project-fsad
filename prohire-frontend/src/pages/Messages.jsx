import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { fetchConversations, fetchMessages, sendMessage } from "../api";
import PageHeader from "../components/PageHeader";

export default function Messages() {
  const { user: currentUser } = useAuth();
  const location = useLocation();
  const [conversations, setConversations] = useState([]);
  const [selectedUser, setSelectedUser] = useState(location.state?.selectedUser || null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isChatLoading, setIsChatLoading] = useState(false);
  const scrollRef = useRef(null);

  const loadConversations = async () => {
    try {
      const data = await fetchConversations();
      setConversations(data || []);
      if (data?.length > 0 && !selectedUser) {
        setSelectedUser(data[0]);
      }
    } catch (err) {
      console.error("Failed to load conversations");
    } finally {
      setIsLoading(false);
    }
  };

  const loadMessages = async (userId) => {
    try {
      setIsChatLoading(true);
      const data = await fetchMessages(userId);
      setMessages(data || []);
    } catch (err) {
      console.error("Failed to load messages");
    } finally {
      setIsChatLoading(false);
    }
  };

  useEffect(() => {
    loadConversations();
  }, []);

  useEffect(() => {
    if (selectedUser) {
      loadMessages(selectedUser.id);
      const interval = setInterval(() => loadMessages(selectedUser.id), 5000);
      return () => clearInterval(interval);
    }
  }, [selectedUser]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedUser) return;

    try {
      const sent = await sendMessage(selectedUser.id, newMessage);
      setMessages([...messages, sent]);
      setNewMessage("");
    } catch (err) {
      alert("Failed to send message");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-8 animate-reveal">
         <div className="w-12 h-12 border-[3px] border-white/5 border-t-indigo-600 rounded-full animate-spin"></div>
         <p className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.5em] animate-pulse italic">Connecting to Neural Net...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 space-y-12 animate-reveal">
      <PageHeader 
        title="Encrypted Comms" 
        subtitle="Direct neural link between professionals and clients. Secure, encrypted, and real-time."
        badge="Protocol: Active"
      />

      <div className="grid lg:grid-cols-12 gap-8 h-[70vh]">
        {/* Sidebar */}
        <div className="lg:col-span-4 premium-glass bg-white/5 border-white/10 rounded-[3rem] overflow-hidden flex flex-col shadow-2xl">
          <div className="p-8 border-b border-white/5">
             <h3 className="text-[10px] font-black uppercase tracking-[0.6em] italic text-slate-500 pl-4 border-l-2 border-indigo-600">Active Contacts</h3>
          </div>
          <div className="flex-1 overflow-y-auto scrollbar-hide p-4 space-y-2">
            {conversations.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center opacity-20 p-10">
                <p className="text-4xl font-black italic uppercase">Void</p>
                <p className="text-[8px] font-black uppercase tracking-widest mt-4">No active transmissions</p>
              </div>
            ) : (
              conversations.map((u) => (
                <button
                  key={u.id}
                  onClick={() => setSelectedUser(u)}
                  className={`w-full p-6 rounded-[2rem] flex items-center gap-5 transition-all group ${selectedUser?.id === u.id ? 'bg-indigo-600 shadow-xl' : 'hover:bg-white/5'}`}
                >
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-lg font-black italic shadow-lg ${selectedUser?.id === u.id ? 'bg-white text-indigo-600' : 'bg-white/5'}`}>
                    {u.fullName?.[0] || u.email?.[0]}
                  </div>
                  <div className="text-left flex-1 min-w-0">
                    <p className={`text-sm font-black italic uppercase tracking-tighter truncate ${selectedUser?.id === u.id ? 'text-white' : 'text-slate-300'}`}>
                      {u.fullName || u.email}
                    </p>
                    <p className={`text-[9px] font-bold uppercase tracking-widest ${selectedUser?.id === u.id ? 'text-indigo-200' : 'text-slate-500'}`}>
                      {u.role}
                    </p>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>

        {/* Chat Area */}
        <div className="lg:col-span-8 premium-glass bg-white/5 border-white/10 rounded-[3rem] overflow-hidden flex flex-col shadow-2xl relative">
          {!selectedUser ? (
            <div className="h-full flex flex-col items-center justify-center text-center opacity-20">
               <div className="w-24 h-24 border-2 border-white/10 rounded-full flex items-center justify-center mb-8">
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path></svg>
               </div>
               <p className="text-2xl font-black italic uppercase tracking-[0.4em]">Select a node to begin comms</p>
            </div>
          ) : (
            <>
              {/* Chat Header */}
              <div className="p-8 border-b border-white/5 flex items-center justify-between bg-white/2">
                <div className="flex items-center gap-5">
                   <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-xl font-black italic shadow-xl">
                      {selectedUser.fullName?.[0] || selectedUser.email?.[0]}
                   </div>
                   <div className="space-y-1">
                      <h3 className="text-xl font-black italic uppercase tracking-tighter">{selectedUser.fullName || selectedUser.email}</h3>
                      <div className="flex items-center gap-2 text-emerald-500">
                         <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                         <span className="text-[9px] font-black uppercase tracking-[0.4em] italic">Encryption_Active</span>
                      </div>
                   </div>
                </div>
              </div>

              {/* Chat Messages */}
              <div ref={scrollRef} className="flex-1 overflow-y-auto p-10 space-y-8 scrollbar-hide">
                {isChatLoading && messages.length === 0 ? (
                  <div className="h-full flex items-center justify-center">
                    <div className="w-8 h-8 border-[2px] border-white/5 border-t-indigo-500 rounded-full animate-spin"></div>
                  </div>
                ) : messages.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center opacity-10">
                    <p className="text-5xl font-black italic uppercase">The Beginning</p>
                    <p className="text-[8px] font-black uppercase tracking-[0.8em] mt-4">Send a message to initiate protocol</p>
                  </div>
                ) : (
                  messages.map((msg, i) => {
                    const isMe = msg.sender?.id === currentUser?.id || msg.senderId === currentUser?.id;
                    return (
                      <div key={msg.id || i} className={`flex ${isMe ? 'justify-end' : 'justify-start'} animate-reveal`}>
                         <div className={`max-w-[70%] space-y-2`}>
                            <div className={`p-6 rounded-[2rem] text-sm font-medium leading-relaxed shadow-2xl ${isMe ? 'bg-indigo-600 text-white rounded-tr-none' : 'bg-white/5 border border-white/5 text-slate-300 rounded-tl-none'}`}>
                               {msg.content}
                            </div>
                            <p className={`text-[8px] font-black uppercase tracking-widest opacity-20 ${isMe ? 'text-right' : 'text-left'}`}>
                               {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </p>
                         </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Chat Input */}
              <form onSubmit={handleSend} className="p-8 border-t border-white/5 bg-white/2 flex gap-4">
                <input 
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Encode message..."
                  className="flex-1 bg-white/5 border-white/5 rounded-2xl px-6 py-4 text-sm font-bold italic focus:ring-2 ring-indigo-500/20 transition-all outline-none"
                />
                <button type="submit" className="px-10 py-4 bg-indigo-600 rounded-2xl text-[10px] font-black uppercase tracking-[0.4em] italic shadow-xl hover:bg-white hover:text-slate-950 transition-all active:scale-95">
                   Transmit
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
