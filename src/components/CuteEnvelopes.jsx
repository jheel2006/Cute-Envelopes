import React, { useState } from 'react';
import { Heart, Star, Sparkles, Sun, Moon, Flower, Rainbow, Gift } from 'lucide-react';

export default function CuteEnvelopes() {
    const [openedEnvelopes, setOpenedEnvelopes] = useState({});
    const [animations, setAnimations] = useState({});

    const envelopes = [
        {
            id: 1,
            color: 'from-pink-300 to-rose-400',
            message: "You’re just a really good person",
            subtitle: "The kind people feel lucky to know <3",
            icon: Heart,
            particles: ['🌸', '🌺', '💕'],
            bgColor: 'bg-pink-50'
        },
        {
            id: 2,
            color: 'from-purple-300 to-violet-400',
            message: "You make things better",
            subtitle: "People feel lighter when you're around <3",
            icon: Sparkles,
            particles: ['✨', '🌟', '💜'],
            bgColor: 'bg-purple-50'
        },
        {
            id: 3,
            color: 'from-blue-300 to-cyan-400',
            message: "There’s something special about you",
            subtitle: "It comes through, even when things are hard <3",

            icon: Sun,
            particles: ['🌙', '☀️', '💙'],
            bgColor: 'bg-blue-50'
        },
        {
            id: 4,
            color: 'from-green-300 to-emerald-400',
            message: "You’re doing just fine",
            subtitle: "Really — you don’t have to rush anything <3",
            icon: Flower,
            particles: ['🌻', '🌱', '💚'],
            bgColor: 'bg-green-50'
        }
    ];

    const handleEnvelopeClick = (envelopeId) => {
        setOpenedEnvelopes(prev => ({
            ...prev,
            [envelopeId]: !prev[envelopeId]
        }));

        // Trigger animation
        setAnimations(prev => ({ ...prev, [envelopeId]: true }));
        setTimeout(() => {
            setAnimations(prev => ({ ...prev, [envelopeId]: false }));
        }, 2000);
    };

    const FloatingParticles = ({ particles, isOpen }) => {
        if (!isOpen) return null;

        return (
            <div className="absolute inset-0 pointer-events-none">
                {[...Array(6)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute animate-bounce text-xl"
                        style={{
                            left: `${20 + i * 12}%`,
                            top: `${10 + (i % 2) * 20}%`,
                            animationDelay: `${i * 0.2}s`,
                            animationDuration: '1.5s'
                        }}
                    >
                        {particles[i % 3]}
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-pink-100 to-purple-100 p-8">
            <div className="max-w-4xl mx-auto">

                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent mb-4"
                        style={{ fontFamily: 'Comic Sans MS, cursive' }}>
                        Pick an Envelope!
                    </h1>
                    <p className="text-lg text-gray-600" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
                        Each one has a special surprise just for you :))
                    </p>
                </div>

                {/* Envelopes Grid */}
                <div className="grid grid-cols-2 gap-8 mb-8">
                    {envelopes.map((envelope) => {
                        const IconComponent = envelope.icon;
                        const isOpen = openedEnvelopes[envelope.id];
                        const isAnimating = animations[envelope.id];

                        return (
                            <div key={envelope.id} className="relative">

                                {/* Floating Particles */}
                                <FloatingParticles particles={envelope.particles} isOpen={isAnimating} />

                                {/* Envelope */}
                                <div
                                    onClick={() => handleEnvelopeClick(envelope.id)}
                                    className={`relative cursor-pointer transition-all duration-500 transform ${isOpen ? 'scale-105' : 'hover:scale-102'
                                        } ${isAnimating ? 'animate-pulse' : ''}`}
                                >

                                    {/* Envelope Body */}
                                    <div className={`w-full h-40 bg-gradient-to-br ${envelope.color} rounded-lg shadow-lg relative overflow-hidden`}>

                                        {/* Envelope Flap */}
                                        <div className={`absolute top-0 left-0 w-full h-16 bg-gradient-to-br ${envelope.color} transform origin-top transition-transform duration-700 ${isOpen ? 'rotate-180 translate-y-2' : ''
                                            }`}>
                                            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-white/20"></div>
                                        </div>

                                        {/* Envelope Content */}
                                        <div className={`absolute inset-4 top-8 ${envelope.bgColor} rounded transition-all duration-700 ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                                            }`}>

                                            <div className="h-full flex flex-col items-center justify-center text-center p-4">
                                                <IconComponent className={`w-8 h-8 mb-2 transition-all duration-500 ${isAnimating ? 'animate-spin text-yellow-500' : 'text-gray-600'
                                                    }`} />

                                                <p className="text-lg font-bold text-gray-800 mb-1"
                                                    style={{ fontFamily: 'Comic Sans MS, cursive' }}>
                                                    {envelope.message}
                                                </p>

                                                <p className="text-sm text-gray-600"
                                                    style={{ fontFamily: 'Comic Sans MS, cursive' }}>
                                                    {envelope.subtitle}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Wax Seal */}
                                        {!isOpen && (
                                            <div className="absolute bottom-4 right-4 w-8 h-8 bg-red-400 rounded-full flex items-center justify-center shadow-md">
                                                <Heart className="w-4 h-4 text-white fill-white" />
                                            </div>
                                        )}

                                        {/* Shimmer Effect */}
                                        <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transition-transform duration-1000 ${isAnimating ? 'translate-x-full' : '-translate-x-full'
                                            }`}></div>
                                    </div>

                                    {/* Cute Shadow */}
                                    <div className="absolute -bottom-2 left-2 right-2 h-4 bg-black/10 rounded-full blur-sm"></div>
                                </div>

                                {/* Click Hint */}
                                {!isOpen && (
                                    <div className="absolute -top-2 -right-2 animate-bounce">
                                        <div className="bg-yellow-400 text-yellow-900 text-xs px-2 py-1 rounded-full font-bold"
                                            style={{ fontFamily: 'Comic Sans MS, cursive' }}>
                                            Click me!
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* Bottom Message */}
                <div className="text-center">
                    <p className="text-gray-500 mb-4" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
                        Click any envelope again to close it!
                    </p>

                    {Object.keys(openedEnvelopes).filter(id => openedEnvelopes[id]).length === 4 && (
                        <div className="animate-fade-in">
                            <div className="bg-gradient-to-r from-pink-200 to-purple-200 rounded-2xl p-6 inline-block">
                                <p className="text-2xl font-bold text-gray-800 mb-2"
                                    style={{ fontFamily: 'Comic Sans MS, cursive' }}>
                                    Yayy you opened them all :)
                                </p>
                                <p className="text-lg text-gray-600"
                                    style={{ fontFamily: 'Comic Sans MS, cursive' }}>
                                    Just wanted to let you know that everything's going to be absolutely amazing!
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }
      `}</style>
        </div>
    );
}