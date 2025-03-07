"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Howl } from "howler";
import clsx from "clsx";

const fakeResponses: Record<string, string> = {
  "whoami": "Elite Hacker",
  "help": "Available commands: whoami, hack the planet, clear, music, crash and burn, acid burn, zero cool, join hackers, trace [target], encrypt [message], decrypt [message]",
  "hack the planet": "Hack the planet! Hack the planet!",
  "clear": "clear",
  "music": "Music toggled",
  "crash and burn": "Remember, crash and burn.",
  "acid burn": "Elite hacker detected: Acid Burn.",
  "zero cool": "Legendary hacker: Zero Cool.",
  "join hackers": "Welcome to the underground. Await further instructions...",
  "trace": "Tracing target...",
  "encrypt": "Encrypting message...",
  "decrypt": "Deciphering message..."
};

const backgroundMusic = new Howl({
  src: ["/hackers_1995_theme.mp3"],
  volume: 0.5,
  loop: true
});

export default function HackersTerminal() {
  const [input, setInput] = useState("");
  const [logs, setLogs] = useState(["Welcome to Hackers 1995 Terminal", "Type 'help' for commands"]);
  const [glitch, setGlitch] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [displayedLogs, setDisplayedLogs] = useState<string[]>([]);

  useEffect(() => {
    if (glitch) {
      const timer = setTimeout(() => setGlitch(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [glitch]);

  useEffect(() => {
    if (logs.length > displayedLogs.length) {
      const timer = setTimeout(() => {
        setDisplayedLogs((prevLogs) => [...prevLogs, logs[prevLogs.length]]);
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [logs, displayedLogs]);

  const handleCommand = () => {
    if (!hasInteracted) {
      backgroundMusic.play();
      setHasInteracted(true);
      setIsPlaying(true);
    }

    if (input.trim() === "clear") {
      setLogs([]);
      setDisplayedLogs([]);
    } else if (input.trim() === "music") {
      if (isPlaying) {
        backgroundMusic.pause();
      } else {
        backgroundMusic.play();
      }
      setIsPlaying(!isPlaying);
    } else {
      const response = fakeResponses[input.trim()] || "Unknown command";
      setLogs([...logs, `$ ${input}`, response]);
    }
    
    if (input.trim() === "hack the planet" || input.trim() === "join hackers") {
      setGlitch(true);
    }
    
    setInput("");
  };

  return (
    <div className={clsx("h-screen w-screen bg-black text-green-400 p-4 font-mono", glitch && "glitch-effect")}> 
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {displayedLogs.map((log, index) => (
          <div key={index} className="text-lg">{log}</div>
        ))}
        <div className="flex items-center">
          <span className="mr-2">$</span>
          <input
            className="bg-transparent outline-none text-green-400 w-full caret-transparent"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleCommand()}
            autoFocus
          />
          <span className="animate-blink ml-1">_</span>
        </div>
      </motion.div>
    </div>
  );
}