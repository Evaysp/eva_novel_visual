import React, { useState, useEffect, useRef } from 'react';
import { STORY_SCRIPT, CHARACTERS } from '../constants';
import { generateSceneBackground, generateCharacterSprite, getSceneInsight } from '../services/geminiService';
import { CharacterId } from '../types';

export const VisualNovelEngine: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [bgUrl, setBgUrl] = useState<string | null>(null);
  const [charUrl, setCharUrl] = useState<string | null>(null);
  const [isLoadingBg, setIsLoadingBg] = useState(false);
  const [isLoadingChar, setIsLoadingChar] = useState(false);
  const [insight, setInsight] = useState<string | null>(null);
  const [isLoadingInsight, setIsLoadingInsight] = useState(false);

  const node = STORY_SCRIPT[index];
  const speaker = CHARACTERS[node.speakerId];
  
  // Audio Context for TTS
  const synth = window.speechSynthesis;

  useEffect(() => {
    // Handle Background Generation
    const loadBackground = async () => {
      // Check if we can reuse previous BG to save API calls if prompt is identical
      const prevNode = index > 0 ? STORY_SCRIPT[index - 1] : null;
      if (!prevNode || prevNode.locationPrompt !== node.locationPrompt || !bgUrl) {
        setIsLoadingBg(true);
        const url = await generateSceneBackground(node.locationPrompt);
        if (url) setBgUrl(url);
        setIsLoadingBg(false);
      }
    };

    // Handle Character Generation
    const loadCharacter = async () => {
      if (node.characterVisible) {
        const prevNode = index > 0 ? STORY_SCRIPT[index - 1] : null;
        // Regenerate if character changed OR emotion changed significantly
        if (!prevNode || prevNode.characterVisible !== node.characterVisible || prevNode.characterEmotion !== node.characterEmotion || !charUrl) {
            setIsLoadingChar(true);
            const url = await generateCharacterSprite(node.characterVisible, node.characterEmotion || 'neutral');
            if (url) setCharUrl(url);
            setIsLoadingChar(false);
        }
      } else {
        setCharUrl(null);
      }
    };

    // TTS Playback
    const playAudio = () => {
      if (synth.speaking) synth.cancel();
      if (node.speakerId === CharacterId.NARRATOR) return; // Narrator is silent text

      const utterance = new SpeechSynthesisUtterance(node.text);
      utterance.lang = 'zh-CN'; // Chinese
      utterance.pitch = speaker.voicePitch;
      utterance.rate = speaker.voiceRate;
      
      // Attempt to find a Chinese voice
      const voices = synth.getVoices();
      const zhVoice = voices.find(v => v.lang.includes('zh'));
      if (zhVoice) utterance.voice = zhVoice;
      
      synth.speak(utterance);
    };

    loadBackground();
    loadCharacter();
    playAudio();
    setInsight(null); // Reset insight on new node

    return () => {
      synth.cancel();
    };
  }, [index]);

  const handleNext = () => {
    if (index < STORY_SCRIPT.length - 1) {
      setIndex(prev => prev + 1);
    }
  };

  const handleInsight = async () => {
    if (insight) {
      setInsight(null);
      return;
    }
    setIsLoadingInsight(true);
    const text = await getSceneInsight(node.text, speaker.name);
    setInsight(text);
    setIsLoadingInsight(false);
  };

  const isNarrator = node.speakerId === CharacterId.NARRATOR;

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden select-none font-serif text-white">
      
      {/* --- Background Layer --- */}
      <div className={`absolute inset-0 transition-opacity duration-1000 ${isLoadingBg ? 'opacity-50' : 'opacity-100'}`}>
        {bgUrl ? (
          <img src={bgUrl} alt="bg" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gray-900 flex items-center justify-center">
            <span className="animate-pulse text-cyan-500 tracking-widest">INITIALIZING SCENERY...</span>
          </div>
        )}
        {/* Vignette & Scanlines */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/40 pointer-events-none" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay"></div>
      </div>

      {/* --- Character Layer --- */}
      <div className="absolute inset-0 pointer-events-none flex items-end justify-center pb-0">
        {node.characterVisible && (
          <div className={`transition-all duration-700 transform ${isLoadingChar ? 'opacity-0 translate-y-10' : 'opacity-100 translate-y-0'}`}>
            {charUrl ? (
                // Use a mix-blend mode to help integrate the white background sprite or CSS mask if possible. 
                // Since we get raw jpg/png, we use a container constraints.
                <img 
                    src={charUrl} 
                    alt="character" 
                    className="h-[85vh] object-contain drop-shadow-[0_0_15px_rgba(0,0,0,0.8)]" 
                />
            ) : (
                 <div className="h-[80vh] w-[40vh] border-2 border-dashed border-white/20 animate-pulse flex items-center justify-center bg-black/20 backdrop-blur-sm">
                    <span className="text-xs text-white/50 rotate-90">A.T. FIELD GENERATING</span>
                 </div>
            )}
          </div>
        )}
      </div>

      {/* --- HUD / Insight Overlay --- */}
      {insight && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] z-50">
            <div className="glass-panel p-6 border-l-4 border-orange-500 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-2 opacity-20 font-mono text-xs text-orange-500">MAGI-01</div>
                <h3 className="text-orange-400 font-bold tracking-widest mb-2 text-lg uppercase border-b border-orange-500/30 pb-2">Psychological Analysis</h3>
                <p className="text-sm leading-relaxed text-orange-100 font-mono">{insight}</p>
                <button onClick={() => setInsight(null)} className="mt-4 text-xs text-orange-400 hover:text-white underline">CLOSE DATABASE</button>
            </div>
        </div>
      )}

      {/* --- Dialogue Interface --- */}
      <div className="absolute bottom-0 w-full p-6 z-40 flex justify-center">
        <div className="w-full max-w-5xl h-[240px] relative flex gap-4">
            
            {/* Avatar Box (Left) */}
            {!isNarrator && (
                <div className="hidden md:block w-[180px] h-full relative flex-shrink-0 glass-panel border border-cyan-500/30 overflow-hidden shadow-[0_0_20px_rgba(6,182,212,0.2)]">
                    {/* We use the generated char URL as avatar if available, else static */}
                    <img 
                        src={charUrl || speaker.avatarStatic} 
                        className="w-full h-full object-cover opacity-80 hover:scale-110 transition-transform duration-500"
                        alt="avatar"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                </div>
            )}

            {/* Text Box (Right) */}
            <div className="flex-grow relative glass-panel border-t-2 border-cyan-500 flex flex-col p-6 shadow-2xl">
                
                {/* Decorators */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-400"></div>
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan-400"></div>

                {/* Nameplate */}
                {!isNarrator && (
                    <div className="absolute -top-4 left-6 bg-gradient-to-r from-cyan-900 to-slate-900 border border-cyan-500 px-6 py-1 transform -skew-x-12 shadow-[0_0_10px_rgba(34,211,238,0.4)]">
                        <span className="block transform skew-x-12 text-cyan-100 font-bold tracking-widest text-lg uppercase font-sans">
                            {speaker.name}
                        </span>
                    </div>
                )}

                {/* Dialogue Text */}
                <div className="flex-grow mt-4 relative overflow-y-auto custom-scrollbar">
                    <p className={`text-xl leading-relaxed tracking-wide ${isNarrator ? 'text-gray-300 italic text-center pt-4' : 'text-white'}`}>
                       {isNarrator && <span className="text-cyan-500 mr-2">▶</span>} 
                       {node.text}
                    </p>
                </div>

                {/* Controls */}
                <div className="mt-4 flex justify-between items-center border-t border-white/10 pt-3">
                    <div className="flex gap-4">
                         <button 
                            onClick={handleInsight}
                            disabled={isLoadingInsight}
                            className="flex items-center gap-2 px-4 py-1 bg-slate-800 hover:bg-slate-700 border border-slate-600 text-xs tracking-widest uppercase transition-colors disabled:opacity-50"
                         >
                            <span className={`w-2 h-2 rounded-full ${isLoadingInsight ? 'bg-yellow-500 animate-ping' : 'bg-green-500'}`}></span>
                            {isLoadingInsight ? 'ANALYZING...' : 'MAGI INSIGHT'}
                         </button>
                    </div>
                    
                    <button 
                        onClick={handleNext}
                        className="group flex items-center gap-2 pl-6 pr-2 py-1 bg-gradient-to-r from-transparent to-cyan-900/50 hover:to-cyan-800/80 border-r-2 border-cyan-500 transition-all"
                    >
                        <span className="text-sm font-bold tracking-widest neon-text group-hover:mr-2 transition-all">NEXT</span>
                        <svg className="w-5 h-5 text-cyan-400 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                    </button>
                </div>
            </div>
        </div>
      </div>
      
      {/* Loading Overlay for initial load only if needed, though we handle inline */}
    </div>
  );
};
