'use client';

import { motion } from 'framer-motion';
import { Code2, Laptop, Sparkles, Brain } from 'lucide-react';

export function CodeBattleLoader() {
  return (
    <div className="fixed inset-0 bg-background/95 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="relative w-96 h-48">
        {/* Left coder */}
        <motion.div
          className="absolute left-0 top-1/2 -translate-y-1/2"
          animate={{
            x: [0, 20, 0],
            rotate: [-5, 5, -5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Laptop className="w-16 h-16 text-primary" />
          <motion.div
            animate={{
              opacity: [0, 1, 0],
              y: [-10, -20, -10],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
            }}
            className="absolute -top-8 right-0"
          >
            <Code2 className="w-6 h-6 text-primary" />
          </motion.div>
        </motion.div>

        {/* Right coder */}
        <motion.div
          className="absolute right-0 top-1/2 -translate-y-1/2"
          animate={{
            x: [0, -20, 0],
            rotate: [5, -5, 5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Laptop className="w-16 h-16 text-primary" />
          <motion.div
            animate={{
              opacity: [0, 1, 0],
              y: [-10, -20, -10],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: 0.5,
            }}
            className="absolute -top-8 left-0"
          >
            <Brain className="w-6 h-6 text-primary" />
          </motion.div>
        </motion.div>

        {/* Battle sparks */}
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <Sparkles className="w-12 h-12 text-primary" />
        </motion.div>

        {/* Loading text */}
        <motion.p
          className="absolute bottom-0 left-1/2 -translate-x-1/2 text-lg font-semibold"
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          Loading...
        </motion.p>
      </div>
    </div>
  );
}