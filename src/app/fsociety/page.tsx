"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Howl } from "howler";
import clsx from "clsx";

const fakeResponses: Record<string, string> = {
  "whoami": "fsociety member",
  "help": "Available commands: whoami, fsociety, clear, music, hack [target], elliot, join fsociety, scan network, camera on, camera off, self-destruct, talk fsociety, sniff, portscan [IP], bruteforce [hash], subdomains [domain], phish [target]",
  "fsociety": "Control is an illusion. We are fsociety.",
  "clear": "clear",
  "music": "Music toggled",
  "elliot": "Hello, friend. Hello, friend? That’s lame. Maybe I should give you a name...",
  "join fsociety": "Welcome to the revolution. Await further instructions...",
  "scan network": "Scanning network for active devices...",
  "camera on": "Activating camera...",
  "camera off": "Camera disabled.",
  "self-destruct": "Initiating self-destruct sequence...",
  "talk fsociety": "Connecting to fsociety AI..."
};

const backgroundMusic = new Howl({
  src: ["/mr_robot_theme.mp3"],
  volume: 0.5,
  loop: true
});

export default function Home() {
  const [input, setInput] = useState("");
  const [logs, setLogs] = useState(["Welcome to fsociety terminal", "Type 'help' for commands"]);
  const [glitch, setGlitch] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [hacking, setHacking] = useState(false);
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
    } else if (input.startsWith("hack ")) {
      const target = input.split(" ")[1];
      setLogs([...logs, `$ hack ${target}`, "Initializing attack..."]);
    } else if (input.trim() === "talk fsociety") {
      setLogs([...logs, "$ talk fsociety", "[fsociety] Who are you?", "[fsociety] Do you want to change the world?", "[fsociety] Remember, control is an illusion."]);
    } else if (input.startsWith("sniff")) {
      setLogs([...logs, "$ sniff", "Listening on network...", "Captured Packet: [192.168.1.100 → 192.168.1.1] GET /login.php"]);
    } else if (input.startsWith("portscan ")) {
      const ip = input.split(" ")[1];
      setLogs([...logs, `$ portscan ${ip}`, "Scanning..."]);
      setTimeout(() => {
        setLogs((prevLogs) => [...prevLogs, `- Port 22: OPEN (SSH)`, `- Port 80: OPEN (HTTP)`, `- Port 3306: CLOSED (MySQL)`, "Scan complete."]);
      }, 2000);
    } else if (input.startsWith("bruteforce ")) {
      const hash = input.split(" ")[1];
      setLogs([...logs, `$ bruteforce ${hash}`, "Trying common passwords..."]);
      setTimeout(() => {
        setLogs((prevLogs) => [...prevLogs, "Success! Hash corresponds to 'password123'"]);
      }, 3000);
    } else if (input.startsWith("subdomains ")) {
      const domain = input.split(" ")[1];
      setLogs([...logs, `$ subdomains ${domain}`, "Searching..."]);
      setTimeout(() => {
        setLogs((prevLogs) => [...prevLogs, `- api.${domain}`, `- mail.${domain}`, `- dev.${domain}`]);
      }, 3000);
    } else if (input.startsWith("phish ")) {
      const target = input.split(" ")[1];
      setLogs([...logs, `$ phish ${target}`, "Generating fake login page..."]);
      setTimeout(() => {
        setLogs((prevLogs) => [...prevLogs, `Generated fake login page: http://fake-${target}-login.com`]);
      }, 2000);
    } else {
      const response = fakeResponses[input.trim()] || "Unknown command";
      setLogs([...logs, `$ ${input}`, response]);
    }
    
    if (input.trim() === "fsociety" || input.trim() === "join fsociety") {
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