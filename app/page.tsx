'use client'

import { useState, useEffect, useRef } from 'react'
import styles from './page.module.css'

export default function Home() {
  const [phase, setPhase] = useState<'countdown' | 'boot'>('countdown')
  const [countdown, setCountdown] = useState(10)
  const [bootProgress, setBootProgress] = useState(0)
  const [bootStage, setBootStage] = useState(0)
  const [systemLogs, setSystemLogs] = useState<string[]>([])
  const [coreOnline, setCoreOnline] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const bootSequence = [
    'INITIALIZING NEURAL CORE...',
    'LOADING QUANTUM PROCESSORS... [OK]',
    'ESTABLISHING SECURE CHANNELS...',
    'CALIBRATING TEMPORAL MATRICES...',
    'SYNCING DISTRIBUTED NODES... [OK]',
    'ACTIVATING DEFENSE PROTOCOLS...',
    'LOADING MISSION PARAMETERS...',
    'VERIFYING IDENTITY SIGNATURES... [OK]',
    'ESTABLISHING UPLINK...',
    'NEURAL PATHWAYS SYNCHRONIZED...',
    'SYSTEM ARMED AND OPERATIONAL',
    'AI CORE: ONLINE'
  ]

  // Countdown phase
  useEffect(() => {
    if (phase === 'countdown' && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    } else if (countdown === 0 && phase === 'countdown') {
      setTimeout(() => setPhase('boot'), 500)
    }
  }, [countdown, phase])

  // Boot sequence phase
  useEffect(() => {
    if (phase === 'boot') {
      // Progress bar
      const progressInterval = setInterval(() => {
        setBootProgress(prev => {
          if (prev >= 100) {
            clearInterval(progressInterval)
            return 100
          }
          return prev + 1
        })
      }, 80)

      // System logs
      const logInterval = setInterval(() => {
        setBootStage(prev => {
          if (prev < bootSequence.length - 1) {
            setSystemLogs(logs => [...logs, bootSequence[prev]])
            return prev + 1
          } else {
            clearInterval(logInterval)
            setTimeout(() => setCoreOnline(true), 1000)
            return prev
          }
        })
      }, 600)

      return () => {
        clearInterval(progressInterval)
        clearInterval(logInterval)
      }
    }
  }, [phase])

  if (phase === 'countdown') {
    return (
      <div className={styles.container}>
        <div className={styles.gradientBg} />
        <div className={styles.scanline} />
        <div className={styles.grid} />

        <div className={styles.countdownContainer}>
          <div className={styles.label}>SYSTEM ACTIVATION IN</div>
          <div className={styles.countdownNumber}>
            {countdown.toString().padStart(2, '0')}
          </div>
          <div className={styles.sublabel}>SECONDS</div>

          <div className={styles.statusBar}>
            <div className={styles.statusIndicator}>
              <span className={styles.statusDot}></span>
              STANDBY MODE
            </div>
          </div>
        </div>

        <div className={styles.cornerElements}>
          <div className={styles.cornerTL}></div>
          <div className={styles.cornerTR}></div>
          <div className={styles.cornerBL}></div>
          <div className={styles.cornerBR}></div>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.gradientBg} />
      <div className={styles.scanline} />
      <div className={styles.grid} />

      {!coreOnline ? (
        <div className={styles.bootContainer}>
          <div className={styles.bootHeader}>
            <div className={styles.systemLabel}>
              <span className={styles.glitchText}>◢ NEURAL CORE v4.7.2 ◣</span>
            </div>
          </div>

          <div className={styles.progressSection}>
            <div className={styles.progressBar}>
              <div
                className={styles.progressFill}
                style={{ width: `${bootProgress}%` }}
              />
            </div>
            <div className={styles.progressText}>{bootProgress}%</div>
          </div>

          <div className={styles.logContainer}>
            {systemLogs.map((log, idx) => (
              <div key={idx} className={styles.logLine}>
                <span className={styles.logTimestamp}>
                  [{new Date().toLocaleTimeString()}]
                </span>
                <span className={styles.logMessage}> {log}</span>
              </div>
            ))}
            <div className={styles.cursor}>_</div>
          </div>

          <div className={styles.hexGrid}>
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className={styles.hexagon}
                style={{
                  animationDelay: `${i * 0.1}s`,
                  left: `${(i % 5) * 20}%`,
                  top: `${Math.floor(i / 5) * 25}%`
                }}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className={styles.finalContainer}>
          <div className={styles.coreCircle}>
            <div className={styles.coreRing}></div>
            <div className={styles.coreRing} style={{ animationDelay: '0.5s' }}></div>
            <div className={styles.coreRing} style={{ animationDelay: '1s' }}></div>
            <div className={styles.coreCenter}>
              <div className={styles.corePulse}></div>
            </div>
          </div>

          <div className={styles.finalText}>
            <h1 className={styles.coreTitle}>AI CORE ONLINE</h1>
            <p className={styles.coreSubtitle}>All systems operational</p>
          </div>

          <div className={styles.readyIndicator}>
            <span className={styles.readyDot}></span>
            READY FOR DEMO
          </div>

          <div className={styles.dataStream}>
            {[...Array(30)].map((_, i) => (
              <div
                key={i}
                className={styles.dataLine}
                style={{
                  animationDelay: `${i * 0.1}s`,
                  left: `${Math.random() * 100}%`
                }}
              />
            ))}
          </div>
        </div>
      )}

      <div className={styles.cornerElements}>
        <div className={styles.cornerTL}></div>
        <div className={styles.cornerTR}></div>
        <div className={styles.cornerBL}></div>
        <div className={styles.cornerBR}></div>
      </div>
    </div>
  )
}
