
"use client";

import { motion } from "framer-motion";
import { Car } from "lucide-react";

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-white">
      <div className="w-full max-w-md px-6">

        {/* Logo / Brand */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <h1 className="text-3xl font-black tracking-tight text-[#07111f]">
            SPOT<span className="text-cyan-500">-GO</span>
          </h1>

          <p className="mt-2 text-sm font-medium text-slate-500">
            Finding your perfect parking spot...
          </p>
        </motion.div>

        {/* Road */}
        <div className="relative h-24 w-full">

          {/* Road */}
          <div className="absolute bottom-5 left-0 right-0 h-[3px] bg-slate-200" />

          {/* Road dashed markings */}
          <div className="absolute bottom-[18px] left-0 right-0 flex justify-between overflow-hidden">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="h-[3px] w-10 rounded-full bg-slate-300"
                animate={{ x: [-20, 40] }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  ease: "linear",
                  delay: i * 0.1,
                }}
              />
            ))}
          </div>

          {/* Car */}
          <motion.div
            className="absolute bottom-7 left-0"
            animate={{
              x: ["0%", "calc(100vw - 120px)"],
            }}
            transition={{
              duration: 2.8,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <div className="relative">

              {/* Car shadow */}
              <div className="absolute -bottom-2 left-2 h-2 w-16 rounded-full bg-slate-200 blur-sm" />

              {/* Car body */}
              <div className="relative flex h-9 w-20 items-center justify-center rounded-lg bg-[#07111f] shadow-lg">

                {/* Windows */}
                <div className="absolute -top-4 left-5 h-5 w-10 rounded-t-lg bg-[#07111f]">
                  <div className="absolute left-1 top-1 h-3 w-4 rounded-sm bg-cyan-200/80" />
                  <div className="absolute right-1 top-1 h-3 w-4 rounded-sm bg-cyan-200/80" />
                </div>

                {/* Head light */}
                <div className="absolute right-0 top-3 h-2 w-1.5 rounded-l bg-cyan-300" />

                {/* Tail light */}
                <div className="absolute left-0 top-3 h-2 w-1.5 rounded-r bg-red-400" />

                {/* Car icon */}
                <Car className="h-5 w-5 text-white" strokeWidth={2} />
              </div>

              {/* Wheels */}
              <div className="absolute -bottom-2 left-3 h-4 w-4 rounded-full border-2 border-slate-700 bg-slate-900" />
              <div className="absolute -bottom-2 right-3 h-4 w-4 rounded-full border-2 border-slate-700 bg-slate-900" />

            </div>
          </motion.div>
        </div>

        {/* Loading dots */}
        <div className="mt-8 flex items-center justify-center gap-1.5">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="h-2 w-2 rounded-full bg-cyan-500"
              animate={{
                y: [0, -5, 0],
                opacity: [0.4, 1, 0.4],
              }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                delay: i * 0.15,
              }}
            />
          ))}
        </div>

        <p className="mt-3 text-center text-xs font-medium text-slate-400">
          Please wait...
        </p>
      </div>
    </div>
  );
}

