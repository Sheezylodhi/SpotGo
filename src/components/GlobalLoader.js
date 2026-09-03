"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

export default function GlobalLoader() {
  const [loading, setLoading] = useState(true);

  if (!loading) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[99999] overflow-hidden bg-white">
      {/* =====================================================
          SOFT BACKGROUND GLOW
      ====================================================== */}

      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.18, 0.3, 0.18],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-100 blur-3xl"
      />

      {/* =====================================================
          BRAND
      ====================================================== */}

      <div className="absolute inset-x-0 top-[20%] z-30 flex justify-center">
        <motion.div
          initial={{
            opacity: 0,
            y: -18,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.55,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="text-center"
        >
          <h1 className="text-4xl font-black tracking-[-0.06em] text-[#07111f] sm:text-5xl md:text-6xl">
            SPOT
            <span className="text-cyan-500">-GO</span>
          </h1>

          <motion.p
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              delay: 0.2,
              duration: 0.45,
            }}
            className="mt-3 text-sm font-medium text-slate-500 sm:text-base"
          >
            Smart parking made simple
          </motion.p>
        </motion.div>
      </div>

      {/* =====================================================
          LOCATION PIN 1
      ====================================================== */}

      <motion.div
        animate={{
          opacity: [0.15, 0.6, 0.15],
          y: [0, -6, 0],
        }}
        transition={{
          duration: 1.8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute left-[12%] top-[18%]"
      >
        <MapPin className="h-5 w-5 text-cyan-400" />
      </motion.div>

      {/* =====================================================
          LOCATION PIN 2
      ====================================================== */}

      <motion.div
        animate={{
          opacity: [0.1, 0.4, 0.1],
          y: [0, -5, 0],
        }}
        transition={{
          duration: 2.1,
          repeat: Infinity,
          delay: 0.3,
          ease: "easeInOut",
        }}
        className="absolute right-[14%] top-[25%]"
      >
        <MapPin className="h-4 w-4 text-slate-300" />
      </motion.div>

      {/* =====================================================
          LOCATION PIN 3
      ====================================================== */}

      <motion.div
        animate={{
          opacity: [0.1, 0.4, 0.1],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          delay: 0.6,
        }}
        className="absolute right-[28%] top-[16%]"
      >
        <MapPin className="h-3.5 w-3.5 text-cyan-300" />
      </motion.div>

      {/* =====================================================
          ROAD
      ====================================================== */}

      <div className="absolute bottom-[22%] left-0 right-0 h-[125px]">
        {/* Main road */}
        <div className="absolute bottom-0 left-0 right-0 h-[68px] bg-slate-100" />

        {/* Road borders */}
        <div className="absolute bottom-[67px] left-0 right-0 h-px bg-slate-200" />

        <div className="absolute bottom-0 left-0 right-0 h-px bg-slate-200" />

        {/* =================================================
            MOVING ROAD MARKINGS
        ================================================== */}

        <div className="absolute bottom-[29px] left-0 w-full overflow-hidden">
          <motion.div
            className="flex w-max items-center gap-16"
            animate={{
              x: ["0%", "-50%"],
            }}
            transition={{
              duration: 0.9,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {[...Array(40)].map((_, index) => (
              <div
                key={`road-one-${index}`}
                className="h-[5px] w-16 shrink-0 rounded-full bg-slate-300 sm:w-20"
              />
            ))}

            {[...Array(40)].map((_, index) => (
              <div
                key={`road-two-${index}`}
                className="h-[5px] w-16 shrink-0 rounded-full bg-slate-300 sm:w-20"
              />
            ))}
          </motion.div>
        </div>

        {/* Small road details */}

        <motion.div
          animate={{
            x: [0, -120],
          }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute bottom-[8px] left-0 flex gap-24"
        >
          {[...Array(30)].map((_, index) => (
            <div
              key={`detail-${index}`}
              className="h-[2px] w-20 shrink-0 bg-slate-200"
            />
          ))}
        </motion.div>
      </div>

      {/* =====================================================
          FERRARI
      ====================================================== */}

      <motion.div
        initial={{
          x: "-520px",
        }}
        animate={{
          x: "calc(100vw + 520px)",
        }}
        transition={{
          /*
            FAST PASS

            Ferrari ab pehle se kaafi jaldi
            screen cross karegi.
          */
          duration: 2.9,
          ease: "linear",
        }}
        onAnimationComplete={() => {
          /*
            Ferrari complete screen cross karte hi
            loader immediately remove.
          */
          setLoading(false);
        }}
        className="absolute bottom-[calc(22%_+_38px)] left-0 z-20"
      >
        <div className="relative">
          {/* =================================================
              EXHAUST SMOKE
          ================================================== */}

          <div className="absolute -left-12 bottom-[25px] h-[100px] w-[110px]">
            <motion.span
              animate={{
                x: [5, -20, -50],
                y: [0, -10, -32],
                scale: [0.25, 0.8, 1.7],
                opacity: [0.5, 0.3, 0],
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                ease: "easeOut",
              }}
              className="absolute bottom-1 left-6 h-5 w-5 rounded-full bg-slate-300/60 blur-[4px]"
            />

            <motion.span
              animate={{
                x: [0, -25, -60],
                y: [0, -8, -38],
                scale: [0.2, 0.9, 1.8],
                opacity: [0.45, 0.25, 0],
              }}
              transition={{
                duration: 1.4,
                delay: 0.15,
                repeat: Infinity,
                ease: "easeOut",
              }}
              className="absolute bottom-2 left-2 h-4 w-4 rounded-full bg-slate-400/50 blur-[4px]"
            />

            <motion.span
              animate={{
                x: [5, -15, -45],
                y: [0, -15, -45],
                scale: [0.25, 0.7, 1.5],
                opacity: [0.4, 0.2, 0],
              }}
              transition={{
                duration: 1.1,
                delay: 0.35,
                repeat: Infinity,
                ease: "easeOut",
              }}
              className="absolute bottom-0 left-10 h-3.5 w-3.5 rounded-full bg-slate-300/60 blur-[3px]"
            />

            <motion.span
              animate={{
                x: [0, -30, -65],
                y: [0, -15, -50],
                scale: [0.2, 0.8, 1.7],
                opacity: [0.4, 0.2, 0],
              }}
              transition={{
                duration: 1.5,
                delay: 0.55,
                repeat: Infinity,
                ease: "easeOut",
              }}
              className="absolute bottom-1 left-5 h-3 w-3 rounded-full bg-slate-400/50 blur-[3px]"
            />
          </div>

          {/* =================================================
              CAR SHADOW
          ================================================== */}

          <motion.div
            animate={{
              scaleX: [1, 0.94, 1],
              opacity: [0.35, 0.2, 0.35],
            }}
            transition={{
              duration: 0.45,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute -bottom-2 left-10 h-6 w-[330px] rounded-full bg-slate-400/30 blur-xl"
          />

          {/* =================================================
              FERRARI
          ================================================== */}

          <motion.img
            src="https://www.pngplay.com/wp-content/uploads/13/Ferrari-SF90-Transparent-File.png"
            alt="Ferrari"
            draggable="false"
            className="relative block h-auto w-[300px] max-w-none select-none object-contain drop-shadow-[0_16px_16px_rgba(15,23,42,0.18)] sm:w-[360px] md:w-[430px]"
            animate={{
              y: [0, -2, 0, 2, 0],
            }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* =================================================
              SPEED LINES
          ================================================== */}

          <div className="absolute -left-24 top-[38%]">
            <motion.div
              animate={{
                x: [25, -30],
                opacity: [0, 0.7, 0],
              }}
              transition={{
                duration: 0.55,
                repeat: Infinity,
                ease: "linear",
              }}
              className="mb-3 h-[3px] w-20 rounded-full bg-cyan-300"
            />

            <motion.div
              animate={{
                x: [35, -35],
                opacity: [0, 0.5, 0],
              }}
              transition={{
                duration: 0.65,
                delay: 0.1,
                repeat: Infinity,
                ease: "linear",
              }}
              className="mb-3 h-[2px] w-14 rounded-full bg-slate-300"
            />

            <motion.div
              animate={{
                x: [15, -25],
                opacity: [0, 0.35, 0],
              }}
              transition={{
                duration: 0.75,
                delay: 0.2,
                repeat: Infinity,
                ease: "linear",
              }}
              className="h-[2px] w-9 rounded-full bg-cyan-200"
            />
          </div>
        </div>
      </motion.div>

      {/* =====================================================
          LOADING AREA
      ====================================================== */}

      <div className="absolute bottom-[11%] left-0 right-0 z-30 flex flex-col items-center">
        {/* Progress */}
        <div className="mb-5 h-1 w-48 overflow-hidden rounded-full bg-slate-100 sm:w-60">
          <motion.div
            className="h-full rounded-full bg-cyan-500"
            animate={{
              x: ["-100%", "100%"],
            }}
            transition={{
              duration: 0.9,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>

        {/* Dots */}
        <div className="flex items-center gap-2">
          {[0, 1, 2].map((item) => (
            <motion.span
              key={item}
              className="h-2 w-2 rounded-full bg-cyan-500"
              animate={{
                y: [0, -5, 0],
                opacity: [0.3, 1, 0.3],
                scale: [0.8, 1, 0.8],
              }}
              transition={{
                duration: 0.7,
                repeat: Infinity,
                delay: item * 0.12,
              }}
            />
          ))}
        </div>

        {/* Text */}
        <motion.p
          animate={{
            opacity: [0.45, 1, 0.45],
          }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="mt-4 text-xs font-semibold tracking-wide text-slate-400 sm:text-sm"
        >
          Finding your parking spot...
        </motion.p>
      </div>
    </div>
  );
}

