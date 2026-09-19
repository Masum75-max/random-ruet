'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function Home() {
  const [apiStatus, setApiStatus] = useState('sending'); // 'sending' | 'success' | 'error'

  useEffect(() => {
    // পেজ লোড হলেই ব্যাকএন্ডে API Call পাঠাবে
    const triggerVisitApi = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/visit`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          setApiStatus('success');
        } else {
          setApiStatus('error');
        }
      } catch (error) {
        console.error('API Call failed:', error);
        setApiStatus('error');
      }
    };

    triggerVisitApi();
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 text-white flex items-center justify-center p-4 overflow-hidden relative">
      {/* Background Glowing Effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 sm:w-96 sm:h-96 bg-pink-600/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 translate-y-1/2 w-72 h-72 sm:w-96 sm:h-96 bg-purple-600/30 rounded-full blur-3xl pointer-events-none" />

      {/* Main Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="w-full max-w-lg bg-white/10 backdrop-blur-md border border-white/20 p-6 sm:p-10 rounded-3xl shadow-2xl text-center z-10 relative"
      >
        {/* Animated Badge */}
        <motion.div
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="inline-block bg-red-500/20 border border-red-500/40 text-red-300 px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide uppercase mb-6"
        >
          🚨 Caught In The Act!
        </motion.div>

        {/* Catchphrase Header */}
        <motion.h1
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: [1, 1.1, 1], opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-4xl sm:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-pink-400 to-red-500 mb-6 tracking-wider"
        >
          KYA KYA KYA!
        </motion.h1>

        {/* Funny Confrontation Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="space-y-4 text-base sm:text-lg text-slate-200 font-medium leading-relaxed"
        >
          <p>Kono jaygay msg seen koros na, ar ehene aisa kya? 🤔</p>
          <p className="text-pink-300">
            Khali dekhlam je msg seen kortasu na iccha koira... 😒
          </p>
          
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.4 }}
            className="p-4 bg-red-950/50 border border-red-500/30 rounded-2xl text-red-200 font-semibold mt-4 shadow-inner"
          >
            🔥 Ei link e click korsu mane dhora poira gesu! Amr kase notification chole aise! 😏
          </motion.div>
        </motion.div>

        {/* API Status Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-8 text-xs text-slate-400 flex items-center justify-center gap-2"
        >
          <span
            className={`h-2.5 w-2.5 rounded-full ${
              apiStatus === 'success'
                ? 'bg-green-400 animate-pulse'
                : apiStatus === 'error'
                ? 'bg-amber-400'
                : 'bg-blue-400 animate-ping'
            }`}
          ></span>
          <span>
            {apiStatus === 'sending' && 'Notifying backend...'}
            {apiStatus === 'success' && 'Backend notified successfully!'}
            {apiStatus === 'error' && 'Backend offline (UI Demo Mode)'}
          </span>
        </motion.div>
      </motion.div>
    </main>
  );
}