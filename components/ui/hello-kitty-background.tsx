"use client"

import React from 'react'

export function HelloKittyBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 opacity-60" />
      
      {/* Floating Hello Kitty Elements */}
      <div className="absolute inset-0">
        {/* Hello Kitty Heads */}
        <div className="absolute top-10 left-10 text-6xl animate-float opacity-20">
          🐱
        </div>
        <div className="absolute top-32 right-20 text-4xl animate-bounce opacity-15">
          🎀
        </div>
        <div className="absolute bottom-20 left-16 text-5xl animate-kitty-bounce opacity-20">
          🐱
        </div>
        <div className="absolute top-1/2 right-10 text-3xl animate-float opacity-25">
          💕
        </div>
        <div className="absolute bottom-32 right-32 text-4xl animate-pulse opacity-15">
          🌸
        </div>
        
        {/* Hearts */}
        <div className="absolute top-20 left-1/2 text-2xl animate-heart-pulse opacity-20">
          💖
        </div>
        <div className="absolute bottom-40 left-1/4 text-3xl animate-float opacity-15">
          💝
        </div>
        <div className="absolute top-40 right-1/3 text-2xl animate-bounce opacity-20">
          💘
        </div>
        
        {/* Flowers and Stars */}
        <div className="absolute top-60 left-1/3 text-3xl animate-kitty-bounce opacity-15">
          🌺
        </div>
        <div className="absolute bottom-60 right-1/4 text-2xl animate-float opacity-20">
          ⭐
        </div>
        <div className="absolute top-1/3 left-20 text-4xl animate-pulse opacity-15">
          🌟
        </div>
        
        {/* Additional Hello Kitty themed elements */}
        <div className="absolute bottom-16 left-1/2 text-3xl animate-bounce opacity-20">
          🎀
        </div>
        <div className="absolute top-16 right-1/2 text-2xl animate-heart-pulse opacity-15">
          💗
        </div>
        <div className="absolute top-3/4 left-1/5 text-4xl animate-float opacity-20">
          🐱
        </div>
        <div className="absolute bottom-1/4 right-1/5 text-3xl animate-kitty-bounce opacity-15">
          🌸
        </div>
      </div>
      
      {/* Subtle Pattern Overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 20% 20%, rgba(255, 182, 193, 0.3) 2px, transparent 2px),
                           radial-gradient(circle at 80% 80%, rgba(221, 160, 221, 0.3) 1px, transparent 1px),
                           radial-gradient(circle at 40% 60%, rgba(255, 192, 203, 0.2) 1px, transparent 1px)`,
          backgroundSize: '100px 100px, 150px 150px, 80px 80px'
        }} />
      </div>
    </div>
  )
}