"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Activity, Flame, Footprints, Pause, Play, RotateCcw, Ruler, Square, Timer } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import {
  calculateHomeWalkMetrics,
  createStepDetectorState,
  detectStepFromMagnitude,
  getElapsedSessionSeconds,
  isValidHomeWalkProfile,
  isValidManualHomeWalkInput,
  HOMEWALK_STEP_THRESHOLD,
} from "@/lib/homewalk";

type TrackerMode = "live" | "manual";
type LiveStatus = "idle" | "running" | "paused" | "stopped" | "unsupported" | "denied" | "error";

const fieldClass = "mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-slate-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white";
const labelClass = "block text-sm font-semibold text-slate-700 dark:text-slate-200";

function formatDuration(totalSeconds: number) {
  const safeSeconds = Math.max(0, Math.floor(totalSeconds));
  const hours = Math.floor(safeSeconds / 3600);
  const minutes = Math.floor((safeSeconds % 3600) / 60);
  const seconds = safeSeconds % 60;
  return [hours, minutes, seconds].map((part) => String(part).padStart(2, "0")).join(":");
}

function MetricCard({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950/70">
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
        <Icon className="h-4 w-4 text-brand-600 dark:text-brand-400" aria-hidden="true" />
        {label}
      </div>
      <p className="mt-2 break-words text-xl font-black text-slate-900 dark:text-white sm:text-2xl">{value}</p>
    </div>
  );
}

export function HomeWalkTracker() {
  const [mode, setMode] = useState<TrackerMode>("live");
  const [liveStatus, setLiveStatus] = useState<LiveStatus>("idle");
  const [isStarting, setIsStarting] = useState(false);
  const [unitSystem, setUnitSystem] = useState<"metric" | "imperial">("metric");
  const [weightKg, setWeightKg] = useState<number | null>(null);
  const [heightCm, setHeightCm] = useState<number | null>(null);
  const [customStrideCm, setCustomStrideCm] = useState("");
  const [steps, setSteps] = useState(0);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [sensitivity, setSensitivity] = useState(HOMEWALK_STEP_THRESHOLD);
  const [motionMessage, setMotionMessage] = useState("Live tracking needs a supported phone browser with motion access.");
  const [sensorReceived, setSensorReceived] = useState(false);
  const [manualDuration, setManualDuration] = useState("");
  const [manualSteps, setManualSteps] = useState("");
  const [manualSpeed, setManualSpeed] = useState("");

  const elapsedBeforeRunRef = useRef(0);
  const runStartedAtRef = useRef(0);
  const startInProgressRef = useRef(false);
  const timerRef = useRef<number | null>(null);
  const motionHandlerRef = useRef<((event: DeviceMotionEvent) => void) | null>(null);
  const detectorRef = useRef(createStepDetectorState());
  const sensitivityRef = useRef(sensitivity);
  const sensorReceivedRef = useRef(false);
  const noMotionWarningShownRef = useRef(false);
  const lastSensorAtRef = useRef(0);

  sensitivityRef.current = sensitivity;

  const customStrideNumber = customStrideCm === "" ? undefined : Number(customStrideCm);
  const validProfile = weightKg !== null && heightCm !== null
    && isValidHomeWalkProfile(weightKg, heightCm, customStrideNumber);

  const liveMetrics = useMemo(() => validProfile
    ? calculateHomeWalkMetrics({
        weightKg: weightKg ?? 0,
        heightCm: heightCm ?? 0,
        customStrideLengthCm: customStrideNumber,
        steps,
        durationSeconds: elapsedSeconds,
        minimumReliableDurationSeconds: 30,
      })
    : null, [weightKg, heightCm, customStrideNumber, steps, elapsedSeconds, validProfile]);

  const manualDurationNumber = Number(manualDuration);
  const manualDurationSeconds = Number.isFinite(manualDurationNumber) && manualDurationNumber > 0 && manualDurationNumber <= 1440
    ? manualDurationNumber * 60
    : 0;
  const manualStepsNumber = manualSteps === "" ? undefined : Number(manualSteps);
  const manualSpeedNumber = manualSpeed === "" ? undefined : Number(manualSpeed);
  const manualInputValid = isValidManualHomeWalkInput({
    weightKg: weightKg ?? 0,
    heightCm: heightCm ?? 0,
    customStrideLengthCm: customStrideNumber,
    durationSeconds: manualDurationNumber * 60,
    steps: manualStepsNumber,
    speedMph: manualSpeedNumber,
  });

  const manualMetrics = useMemo(() => manualInputValid
    ? calculateHomeWalkMetrics({
        weightKg: weightKg ?? 0,
        heightCm: heightCm ?? 0,
        customStrideLengthCm: customStrideNumber,
        durationSeconds: manualDurationNumber * 60,
        steps: manualStepsNumber,
        speedMph: manualSpeedNumber,
      })
    : null, [manualInputValid, weightKg, heightCm, customStrideNumber, manualDurationNumber, manualStepsNumber, manualSpeedNumber]);

  const removeMotionListener = useCallback(() => {
    if (motionHandlerRef.current && typeof window !== "undefined") {
      window.removeEventListener("devicemotion", motionHandlerRef.current);
      motionHandlerRef.current = null;
    }
  }, []);

  const stopClock = useCallback(() => {
    if (timerRef.current !== null) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const pauseSession = useCallback((message?: string) => {
    if (liveStatus !== "running") return;
    const now = Date.now();
    const elapsed = getElapsedSessionSeconds(elapsedBeforeRunRef.current, runStartedAtRef.current, now);
    elapsedBeforeRunRef.current = elapsed;
    setElapsedSeconds(elapsed);
    stopClock();
    removeMotionListener();
    setLiveStatus("paused");
    if (message) setMotionMessage(message);
  }, [liveStatus, removeMotionListener, stopClock]);

  const beginClock = useCallback(() => {
    if (timerRef.current !== null) window.clearInterval(timerRef.current);
    runStartedAtRef.current = Date.now();
    timerRef.current = window.setInterval(() => {
      const elapsed = getElapsedSessionSeconds(elapsedBeforeRunRef.current, runStartedAtRef.current, Date.now());
      setElapsedSeconds(elapsed);
      const sensorDataIsStale = !sensorReceivedRef.current || Date.now() - lastSensorAtRef.current > 5000;
      if (elapsed >= 5 && sensorDataIsStale && !noMotionWarningShownRef.current) {
        noMotionWarningShownRef.current = true;
        elapsedBeforeRunRef.current = elapsed;
        stopClock();
        removeMotionListener();
        setLiveStatus("paused");
        setMotionMessage("Motion readings are unavailable or stopped, so the session has been paused. Resume to retry, or use Manual Calculator.");
      }
    }, 250);
  }, [removeMotionListener, stopClock]);

  const attachMotionListener = useCallback(() => {
    removeMotionListener();
    const handler = (event: DeviceMotionEvent) => {
      const linear = event.acceleration;
      const acceleration = linear && [linear.x, linear.y, linear.z].every((axis) => typeof axis === "number" && Number.isFinite(axis))
        ? linear
        : event.accelerationIncludingGravity;
      if (!acceleration || [acceleration.x, acceleration.y, acceleration.z].some((axis) => typeof axis !== "number" || !Number.isFinite(axis))) {
        return;
      }

      if (!sensorReceivedRef.current) {
        sensorReceivedRef.current = true;
        setSensorReceived(true);
        setMotionMessage("Motion data received. Steps are estimates and depend on phone position and movement.");
      } else if (noMotionWarningShownRef.current) {
        noMotionWarningShownRef.current = false;
        setMotionMessage("Motion readings resumed. Steps are estimates and depend on phone position and movement.");
      }
      lastSensorAtRef.current = Date.now();

      const magnitude = Math.hypot(acceleration.x as number, acceleration.y as number, acceleration.z as number);
      const detection = detectStepFromMagnitude(detectorRef.current, magnitude, Date.now(), sensitivityRef.current);
      detectorRef.current = detection.state;
      if (detection.detected) setSteps((current) => current + 1);
    };
    motionHandlerRef.current = handler;
    window.addEventListener("devicemotion", handler);
  }, [removeMotionListener]);

  const resetSession = useCallback(() => {
    stopClock();
    removeMotionListener();
    elapsedBeforeRunRef.current = 0;
    runStartedAtRef.current = 0;
    detectorRef.current = createStepDetectorState();
    sensorReceivedRef.current = false;
    noMotionWarningShownRef.current = false;
    lastSensorAtRef.current = 0;
    setSteps(0);
    setElapsedSeconds(0);
    setSensorReceived(false);
    setLiveStatus("idle");
    setMotionMessage("Ready to start. Keep the page open while tracking.");
  }, [removeMotionListener, stopClock]);

  const startWalking = async () => {
    if (startInProgressRef.current) return;
    startInProgressRef.current = true;
    setIsStarting(true);
    try {
      if (!validProfile) {
        setMotionMessage("Enter a valid weight, height, and optional stride length before starting.");
        return;
      }
      if (!window.isSecureContext) {
        setLiveStatus("unsupported");
        setMotionMessage("Motion tracking requires a secure HTTPS page. Use Manual Calculator mode here.");
        return;
      }
      const motionConstructor = window.DeviceMotionEvent as (typeof DeviceMotionEvent & {
        requestPermission?: () => Promise<PermissionState | "granted" | "denied">;
      }) | undefined;
      if (typeof motionConstructor !== "function") {
        setLiveStatus("unsupported");
        setMotionMessage("This browser does not expose device motion sensors. Use Manual Calculator mode instead.");
        return;
      }

      if (typeof motionConstructor.requestPermission === "function") {
        try {
          const permission = await motionConstructor.requestPermission();
          if (permission !== "granted") {
            setLiveStatus("denied");
            setMotionMessage("Motion permission was not granted. Switch to Manual Calculator to continue.");
            return;
          }
        } catch {
          setLiveStatus("denied");
          setMotionMessage("The browser could not grant motion access. Check browser permissions or use Manual Calculator.");
          return;
        }
      }

      elapsedBeforeRunRef.current = 0;
      runStartedAtRef.current = 0;
      detectorRef.current = createStepDetectorState();
      sensorReceivedRef.current = false;
      noMotionWarningShownRef.current = false;
      lastSensorAtRef.current = 0;
      setSensorReceived(false);
      setSteps(0);
      setElapsedSeconds(0);
      setMotionMessage("Waiting for motion samples. Hold your phone consistently while walking.");
      try {
        attachMotionListener();
        beginClock();
        setLiveStatus("running");
      } catch {
        stopClock();
        removeMotionListener();
        setLiveStatus("error");
        setMotionMessage("The browser could not start device motion tracking. Try again or use Manual Calculator.");
      }
    } finally {
      startInProgressRef.current = false;
      setIsStarting(false);
    }
  };

  const resumeWalking = () => {
    if (liveStatus !== "paused") return;
    try {
      lastSensorAtRef.current = Date.now();
      noMotionWarningShownRef.current = false;
      attachMotionListener();
      beginClock();
      setLiveStatus("running");
      setMotionMessage("Tracking resumed. Keep the phone in a consistent position.");
    } catch {
      stopClock();
      removeMotionListener();
      setLiveStatus("error");
      setMotionMessage("The browser could not resume device motion tracking. Try again or use Manual Calculator.");
    }
  };

  const stopWalking = () => {
    if (liveStatus === "running") {
      const elapsed = getElapsedSessionSeconds(elapsedBeforeRunRef.current, runStartedAtRef.current, Date.now());
      elapsedBeforeRunRef.current = elapsed;
      setElapsedSeconds(elapsed);
    }
    stopClock();
    removeMotionListener();
    setLiveStatus("stopped");
    setMotionMessage("Session stopped. Review the estimate below or reset to start again.");
  };

  const selectMode = (nextMode: TrackerMode) => {
    if (nextMode === "manual" && liveStatus === "running") {
      pauseSession("Live tracking paused because you switched modes. Resume it from the Live Walking Tracker tab.");
    }
    setMode(nextMode);
  };

  useEffect(() => {
    const handleVisibility = () => {
      if (document.visibilityState === "hidden" && liveStatus === "running") {
        pauseSession("Tracking paused because this tab became hidden. Return to the page and press Resume.");
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, [liveStatus, pauseSession]);

  useEffect(() => () => {
    if (timerRef.current !== null) window.clearInterval(timerRef.current);
    if (motionHandlerRef.current) window.removeEventListener("devicemotion", motionHandlerRef.current);
  }, []);

  const displayedWeight = weightKg === null
    ? ""
    : unitSystem === "metric" ? weightKg : weightKg / 0.45359237;
  const weightUnitLabel = unitSystem === "metric" ? "kg" : "lb";
  const liveStatusLabel = {
    idle: "Ready",
    running: "Tracking",
    paused: "Paused",
    stopped: "Completed",
    unsupported: "Unsupported",
    denied: "Permission denied",
    error: "Unable to start",
  }[liveStatus];
  const formatNumber = (value: number, places = 2) => value.toFixed(places);
  const showMetrics = (metrics: ReturnType<typeof calculateHomeWalkMetrics> | null, duration: number) => (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
      <MetricCard icon={Footprints} label="Estimated steps" value={metrics?.steps.toLocaleString() ?? "—"} />
      <MetricCard icon={Timer} label="Duration" value={formatDuration(duration)} />
      <MetricCard icon={Ruler} label="Estimated distance" value={metrics ? `${formatNumber(metrics.distanceMiles)} mi · ${formatNumber(metrics.distanceKm)} km` : "—"} />
      <MetricCard icon={Activity} label="Estimated pace" value={metrics?.pacePerMile ? `${metrics.pacePerMile} · ${metrics.pacePerKm}` : "—"} />
      <MetricCard icon={Flame} label="Estimated gross calories" value={metrics?.grossCalories === null || !metrics ? "—" : `${metrics.grossCalories} kcal`} />
    </div>
  );

  return (
    <section id="home-walking-tracker" className="my-12 scroll-mt-24" aria-labelledby="tracker-heading">
      <div className="mb-5 max-w-3xl">
        <div className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700 dark:bg-brand-950 dark:text-brand-300">
          <Footprints className="h-3.5 w-3.5" aria-hidden="true" /> Indoor walking tool
        </div>
        <h2 id="tracker-heading" className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
          Home Walking Tracker &amp; Calorie Calculator
        </h2>
        <p className="mt-2 text-slate-600 dark:text-slate-300">
          Track an indoor session using your mobile device. Estimate steps, walking duration, distance, pace, and calories without a treadmill.
        </p>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-xl shadow-slate-900/5 dark:border-slate-800 dark:bg-slate-900 sm:p-7">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <label htmlFor="homewalk-weight" className={labelClass}>Body weight ({weightUnitLabel})</label>
            <input id="homewalk-weight" className={fieldClass} type="number" inputMode="decimal" min={unitSystem === "metric" ? 20 : 44} max={unitSystem === "metric" ? 300 : 661} step="0.1" placeholder="Enter weight" value={displayedWeight === "" ? "" : formatNumber(displayedWeight, 1)} onChange={(event) => {
              if (event.target.value === "") {
                setWeightKg(null);
                return;
              }
              const value = Number(event.target.value);
              if (Number.isFinite(value)) setWeightKg(unitSystem === "metric" ? value : value * 0.45359237);
            }} />
          </div>
          <div>
            <label htmlFor="homewalk-units" className={labelClass}>Weight units</label>
            <select id="homewalk-units" className={fieldClass} value={unitSystem} onChange={(event) => setUnitSystem(event.target.value as "metric" | "imperial")}>
              <option value="metric">Metric (kg)</option>
              <option value="imperial">Imperial (lb)</option>
            </select>
          </div>
          <div>
            <label htmlFor="homewalk-height" className={labelClass}>Height (cm)</label>
            <input id="homewalk-height" className={fieldClass} type="number" inputMode="numeric" min="100" max="230" placeholder="Enter height" value={heightCm ?? ""} onChange={(event) => setHeightCm(event.target.value === "" ? null : Number(event.target.value))} />
          </div>
          <div>
            <label htmlFor="homewalk-stride" className={labelClass}>Custom stride (cm, optional)</label>
            <input id="homewalk-stride" className={fieldClass} type="number" inputMode="decimal" min="30" max="150" placeholder="Use height estimate" value={customStrideCm} onChange={(event) => setCustomStrideCm(event.target.value)} />
          </div>
        </div>
        {!validProfile && weightKg === null && heightCm === null && customStrideCm === "" && <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">Enter your weight and height to enable the tracker and calculations.</p>}
        {!validProfile && (weightKg !== null || heightCm !== null || customStrideCm !== "") && <p className="mt-3 text-sm text-rose-600 dark:text-rose-400" role="alert">Use a weight of 20–300 kg, height of 100–230 cm, and optional stride of 30–150 cm.</p>}

        <div className="mt-6 flex flex-wrap gap-2" role="group" aria-label="Choose a tracking method">
          <button type="button" aria-pressed={mode === "live"} disabled={isStarting} onClick={() => selectMode("live")} className={`rounded-xl px-4 py-2.5 text-sm font-bold transition-colors disabled:cursor-not-allowed disabled:opacity-60 ${mode === "live" ? "bg-brand-600 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"}`}>
            Live Walking Tracker
          </button>
          <button type="button" aria-pressed={mode === "manual"} disabled={isStarting} onClick={() => selectMode("manual")} className={`rounded-xl px-4 py-2.5 text-sm font-bold transition-colors disabled:cursor-not-allowed disabled:opacity-60 ${mode === "manual" ? "bg-brand-600 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"}`}>
            Manual Calculator
          </button>
        </div>

        {mode === "live" ? (
          <div className="mt-5 space-y-5">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950/60">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="font-bold text-slate-900 dark:text-white">Live sensor status</h3>
                <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${liveStatus === "running" ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300" : "bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300"}`}>
                  {liveStatusLabel}
                </span>
              </div>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300" role="status" aria-live="polite">{motionMessage}</p>
              {!sensorReceived && liveStatus === "running" && <p className="mt-1 text-xs text-amber-700 dark:text-amber-300">Waiting for device motion data; no steps are added until real sensor peaks are detected.</p>}
            </div>

            {showMetrics(liveMetrics, elapsedSeconds)}

            {liveStatus === "stopped" && (
              <div className="rounded-2xl border border-brand-200 bg-brand-50 p-4 dark:border-brand-900 dark:bg-brand-950/50">
                <h3 className="font-bold text-brand-900 dark:text-brand-100">Session summary</h3>
                <p className="mt-1 text-sm text-brand-800 dark:text-brand-200">These are estimates based on motion peaks, your stride setting, session duration, and the site’s walking calorie method.</p>
              </div>
            )}

            <div className="flex flex-wrap gap-2">
              {(liveStatus === "idle" || liveStatus === "unsupported" || liveStatus === "denied" || liveStatus === "error") && (
                <button type="button" onClick={startWalking} disabled={!validProfile || isStarting} className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-brand-600 px-5 py-2.5 font-bold text-white hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-50">
                  <Play className="h-4 w-4" aria-hidden="true" /> {isStarting ? "Requesting motion access…" : "Start Walking"}
                </button>
              )}
              {liveStatus === "running" && (
                <>
                  <button type="button" onClick={() => pauseSession()} className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-amber-500 px-5 py-2.5 font-bold text-white hover:bg-amber-600"><Pause className="h-4 w-4" aria-hidden="true" /> Pause</button>
                  <button type="button" onClick={stopWalking} className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-slate-800 px-5 py-2.5 font-bold text-white hover:bg-slate-900 dark:bg-slate-700 dark:hover:bg-slate-600"><Square className="h-4 w-4" aria-hidden="true" /> Stop</button>
                </>
              )}
              {liveStatus === "paused" && (
                <>
                  <button type="button" onClick={resumeWalking} className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-brand-600 px-5 py-2.5 font-bold text-white hover:bg-brand-700"><Play className="h-4 w-4" aria-hidden="true" /> Resume</button>
                  <button type="button" onClick={stopWalking} className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-slate-800 px-5 py-2.5 font-bold text-white hover:bg-slate-900 dark:bg-slate-700 dark:hover:bg-slate-600"><Square className="h-4 w-4" aria-hidden="true" /> Stop</button>
                </>
              )}
              {liveStatus !== "idle" && (
                <button type="button" onClick={resetSession} className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-slate-100 px-5 py-2.5 font-bold text-slate-800 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"><RotateCcw className="h-4 w-4" aria-hidden="true" /> Reset</button>
              )}
            </div>

            <div className="rounded-2xl border border-slate-200 p-4 dark:border-slate-800">
              <label htmlFor="step-sensitivity" className={labelClass}>Motion peak threshold: {sensitivity.toFixed(1)} m/s²</label>
              <input id="step-sensitivity" type="range" min="0.3" max="2.5" step="0.1" value={sensitivity} onChange={(event) => setSensitivity(Number(event.target.value))} className="mt-2 w-full accent-brand-600" />
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Lower thresholds detect smaller movement; higher thresholds may reduce false peaks but miss steps. Detection uses a smoothed acceleration magnitude and a 300 ms minimum interval.</p>
            </div>

            <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400">Live step counts are estimates, not medical-grade readings. Phone position and arm movement affect detection. Keep this page open and the screen active; the tracker does not promise background or locked-screen tracking.</p>
          </div>
        ) : (
          <div className="mt-5 space-y-5">
            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <label htmlFor="manual-duration" className={labelClass}>Walking duration (minutes)</label>
                <input id="manual-duration" className={fieldClass} type="number" inputMode="decimal" min="0.1" max="1440" step="0.1" value={manualDuration} onChange={(event) => setManualDuration(event.target.value)} />
              </div>
              <div>
                <label htmlFor="manual-steps" className={labelClass}>Steps (optional)</label>
                <input id="manual-steps" className={fieldClass} type="number" inputMode="numeric" min="1" max="200000" step="1" placeholder="Enter steps" value={manualSteps} onChange={(event) => setManualSteps(event.target.value)} />
              </div>
              <div>
                <label htmlFor="manual-speed" className={labelClass}>Walking speed (mph, optional)</label>
                <input id="manual-speed" className={fieldClass} type="number" inputMode="decimal" min="0.5" max="6" step="0.1" placeholder="e.g. 3.0" value={manualSpeed} onChange={(event) => setManualSpeed(event.target.value)} />
              </div>
            </div>
            {!manualInputValid && <p className="text-sm text-slate-600 dark:text-slate-300" role="status">Enter a valid duration and either steps or a walking speed to calculate an estimate.</p>}
            {showMetrics(manualMetrics, manualDurationSeconds)}
            <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400">When speed is blank, the calculator estimates pace from steps, stride length, and duration. When steps are blank, it estimates steps from speed, duration, and stride length.</p>
          </div>
        )}

        <div className="mt-5 rounded-2xl bg-slate-100 p-4 text-sm text-slate-600 dark:bg-slate-800/70 dark:text-slate-300">
          <strong className="text-slate-900 dark:text-white">How estimates are calculated:</strong> estimated distance = steps × stride length. Stride length defaults to height × 0.414 unless you enter a custom value. Calorie estimates use the existing site walking calculator’s gross-calorie MET method. Indoor distance is not GPS-measured.
        </div>
      </div>
    </section>
  );
}
