import React, { useMemo } from 'react';
import { RosaryStep, MysteryType } from '../types/rosary';
import { Sparkles, Cross as CrossIcon } from 'lucide-react';

interface RosaryVisualizerProps {
  currentStepIndex: number;
  steps: RosaryStep[];
  mysteryType: MysteryType;
  onSelectStep: (index: number) => void;
  compactView?: boolean;
}

interface BeadCoordinate {
  id: string;
  stepIndex: number;
  x: number;
  y: number;
  r: number;
  type: 'crucifix' | 'our_father' | 'hail_mary' | 'medal';
  label: string;
  decade?: number;
  subIndex?: number;
}

export const RosaryBeadsVisualizer: React.FC<RosaryVisualizerProps> = ({
  currentStepIndex,
  steps,
  onSelectStep,
  compactView = false,
}) => {
  const currentStep = steps[currentStepIndex] || steps[0];

  // Calculate coordinates for the physical Rosary loop and tail
  const beadCoords = useMemo<BeadCoordinate[]>(() => {
    const list: BeadCoordinate[] = [];

    // 1. Crucifix
    const crucifixStep = steps.find(s => s.beadType === 'sign_of_cross' || s.beadType === 'creed') || steps[0];
    list.push({
      id: 'bead_crucifix',
      stepIndex: crucifixStep.index,
      x: 190,
      y: 405,
      r: 15,
      type: 'crucifix',
      label: 'Crucifixo (Sinal da Cruz & Creio)',
    });

    // 2. Intro Pai Nosso
    const introOf = steps.find(s => s.id === 'our_father_intro');
    if (introOf) {
      list.push({
        id: 'bead_intro_our_father',
        stepIndex: introOf.index,
        x: 190,
        y: 362,
        r: 8.5,
        type: 'our_father',
        label: '1º Pai Nosso (Santo Padre)',
      });
    }

    // 3. Intro 3 Ave Marias (Fé, Esperança, Caridade)
    const introHms = [
      { id: 'bead_intro_hm_1', stepId: 'hail_mary_intro_1', y: 336, label: 'Ave Maria pela Fé' },
      { id: 'bead_intro_hm_2', stepId: 'hail_mary_intro_2', y: 314, label: 'Ave Maria pela Esperança' },
      { id: 'bead_intro_hm_3', stepId: 'hail_mary_intro_3', y: 292, label: 'Ave Maria pela Caridade' },
    ];
    introHms.forEach(hm => {
      const step = steps.find(s => s.id === hm.stepId);
      if (step) {
        list.push({
          id: hm.id,
          stepIndex: step.index,
          x: 190,
          y: hm.y,
          r: 6.5,
          type: 'hail_mary',
          label: hm.label,
        });
      }
    });

    // 4. Center Medal (Medalha de Nossa Senhora)
    const medalStep = steps.find(s => s.beadType === 'medal' || s.beadType === 'salve_regina') || steps[steps.length - 2];
    list.push({
      id: 'bead_medal',
      stepIndex: medalStep.index,
      x: 190,
      y: 260,
      r: 12,
      type: 'medal',
      label: 'Medalha de Nossa Senhora (Salve Rainha)',
    });

    // 5. Main loop: 5 Decades (each has 1 Pai Nosso + 10 Ave Marias)
    // The loop begins just clockwise from the bottom medal (around angle 100 deg to 440 deg)
    const loopCenterX = 190;
    const loopCenterY = 142;
    const rx = 135;
    const ry = 105;

    // Total elements on the loop = 5 decades * (1 OF + 10 HM) = 55 elements
    const totalLoopItems = 55;
    // Map items from angle ~98 deg (just left of bottom) around clockwise to ~82 deg (just right of bottom)
    const startAngle = 102 * (Math.PI / 180);
    const totalSweep = 336 * (Math.PI / 180);

    let loopElementIndex = 0;
    for (let d = 1; d <= 5; d++) {
      // Decade Pai Nosso
      const ofStep = steps.find(s => s.id === `decade_${d}_our_father`);
      const angleOf = startAngle + (loopElementIndex / totalLoopItems) * totalSweep;
      const xOf = loopCenterX + rx * Math.cos(angleOf);
      const yOf = loopCenterY + ry * Math.sin(angleOf);

      if (ofStep) {
        list.push({
          id: `bead_dec_${d}_of`,
          stepIndex: ofStep.index,
          x: Math.round(xOf),
          y: Math.round(yOf),
          r: 8.5,
          type: 'our_father',
          decade: d,
          label: `${d}º Mistério: Pai Nosso`,
        });
      }
      loopElementIndex++;

      // 10 Ave Marias for decade d
      for (let h = 1; h <= 10; h++) {
        const hmStep = steps.find(s => s.id === `decade_${d}_hm_${h}`);
        const angleHm = startAngle + (loopElementIndex / totalLoopItems) * totalSweep;
        const xHm = loopCenterX + rx * Math.cos(angleHm);
        const yHm = loopCenterY + ry * Math.sin(angleHm);

        if (hmStep) {
          list.push({
            id: `bead_dec_${d}_hm_${h}`,
            stepIndex: hmStep.index,
            x: Math.round(xHm),
            y: Math.round(yHm),
            r: 5.8,
            type: 'hail_mary',
            decade: d,
            subIndex: h,
            label: `${d}º Mistério: ${h}ª Ave Maria`,
          });
        }
        loopElementIndex++;
      }
    }

    return list;
  }, [steps]);

  // Current active bead coordinate
  const activeCoord = useMemo(() => {
    return beadCoords.find(b => b.id === currentStep.beadVisualId) || beadCoords[0];
  }, [beadCoords, currentStep.beadVisualId]);

  return (
    <div className="relative w-full flex flex-col items-center">
      {/* Visual Bead Container */}
      <div className={`relative w-full transition-all duration-300 ${compactView ? 'max-w-[280px]' : 'max-w-[340px]'}`}>
        <svg
          viewBox="0 0 380 440"
          className="w-full h-auto select-none touch-manipulation drop-shadow-xl"
        >
          <defs>
            {/* Ambient Radial Gradient for Rosary Field */}
            <radialGradient id="holyGlowBg" cx="50%" cy="40%" r="50%">
              <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.12" />
              <stop offset="60%" stopColor="#d97706" stopOpacity="0.04" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0" />
            </radialGradient>

            {/* Glowing Golden Bead Filter */}
            <filter id="sacredAura" x="-80%" y="-80%" width="260%" height="260%">
              <feGaussianBlur stdDeviation="6" result="blur1" />
              <feGaussianBlur stdDeviation="14" result="blur2" />
              <feMerge>
                <feMergeNode in="blur2" />
                <feMergeNode in="blur1" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Regular Bead Gradient (Ivory Pearl) */}
            <radialGradient id="pearlBead" cx="35%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="45%" stopColor="#e2e8f0" />
              <stop offset="85%" stopColor="#94a3b8" />
              <stop offset="100%" stopColor="#475569" />
            </radialGradient>

            {/* Passed Bead Gradient (Warm Honey Gold) */}
            <radialGradient id="passedBead" cx="35%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="45%" stopColor="#f59e0b" />
              <stop offset="85%" stopColor="#b45309" />
              <stop offset="100%" stopColor="#78350f" />
            </radialGradient>

            {/* Active Radiant Bead (Divine Light) */}
            <radialGradient id="activeLightBead" cx="40%" cy="40%" r="60%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="30%" stopColor="#fef08a" />
              <stop offset="70%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#d97706" />
            </radialGradient>

            {/* Center Medal Gradient */}
            <radialGradient id="goldMedalGrad" cx="30%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#fef3c7" />
              <stop offset="40%" stopColor="#f59e0b" />
              <stop offset="85%" stopColor="#b45309" />
              <stop offset="100%" stopColor="#78350f" />
            </radialGradient>
          </defs>

          {/* Sacred subtle aura backdrop */}
          <circle cx="190" cy="150" r="140" fill="url(#holyGlowBg)" />

          {/* Chain Paths (Interconnecting lines) */}
          {/* Main Loop Chain */}
          <ellipse
            cx="190"
            cy="142"
            rx="135"
            ry="105"
            fill="none"
            stroke="#78350f"
            strokeWidth="2"
            strokeDasharray="2 3"
            opacity="0.65"
          />

          {/* Chain from Loop to Medal */}
          <line x1="184" y1="245" x2="188" y2="252" stroke="#b45309" strokeWidth="2" />
          <line x1="196" y1="245" x2="192" y2="252" stroke="#b45309" strokeWidth="2" />

          {/* Vertical Strand Chain */}
          <line
            x1="190"
            y1="272"
            x2="190"
            y2="390"
            stroke="#78350f"
            strokeWidth="2.2"
            strokeDasharray="1 2.5"
            opacity="0.8"
          />

          {/* Decades Separators / Annotations (Subtle Roman Numerals I to V) */}
          <g className="select-none font-serif text-[11px] font-bold fill-amber-300/40 pointer-events-none">
            <text x="65" y="215">I</text>
            <text x="75" y="95">II</text>
            <text x="187" y="45" textAnchor="middle">III</text>
            <text x="298" y="95">IV</text>
            <text x="312" y="215">V</text>
          </g>

          {/* Render all beads */}
          {beadCoords.map(bead => {
            const isActive = bead.id === currentStep.beadVisualId;
            const isPassed = bead.stepIndex < currentStepIndex;

            if (bead.type === 'crucifix') {
              return (
                <g
                  key={bead.id}
                  onClick={() => onSelectStep(bead.stepIndex)}
                  className="cursor-pointer transition-transform active:scale-95"
                >
                  {/* Active Light Glow Behind Crucifix */}
                  {isActive && (
                    <circle
                      cx={bead.x}
                      cy={bead.y}
                      r={28}
                      fill="#f59e0b"
                      opacity="0.35"
                      className="animate-halo-pulse"
                      filter="url(#sacredAura)"
                    />
                  )}

                  {/* Crucifix Body */}
                  <rect
                    x={bead.x - 4}
                    y={bead.y - 20}
                    width="8"
                    height="32"
                    rx="2"
                    fill={isActive ? '#fef08a' : isPassed ? '#d97706' : '#94a3b8'}
                    stroke={isActive ? '#fbbf24' : '#475569'}
                    strokeWidth="1.5"
                    filter={isActive ? 'url(#sacredAura)' : undefined}
                  />
                  {/* Crossbeam */}
                  <rect
                    x={bead.x - 14}
                    y={bead.y - 12}
                    width="28"
                    height="7"
                    rx="2"
                    fill={isActive ? '#fef08a' : isPassed ? '#d97706' : '#94a3b8'}
                    stroke={isActive ? '#fbbf24' : '#475569'}
                    strokeWidth="1.5"
                    filter={isActive ? 'url(#sacredAura)' : undefined}
                  />

                  {/* INRI plaque */}
                  <rect
                    x={bead.x - 5}
                    y={bead.y - 19}
                    width="10"
                    height="4"
                    rx="1"
                    fill="#fef3c7"
                    opacity="0.9"
                  />

                  {/* Center Corpus highlight */}
                  <circle
                    cx={bead.x}
                    cy={bead.y - 8}
                    r="2.5"
                    fill={isActive ? '#ffffff' : '#f8fafc'}
                  />
                </g>
              );
            }

            if (bead.type === 'medal') {
              return (
                <g
                  key={bead.id}
                  onClick={() => onSelectStep(bead.stepIndex)}
                  className="cursor-pointer transition-transform active:scale-95"
                >
                  {/* Active Glow */}
                  {isActive && (
                    <circle
                      cx={bead.x}
                      cy={bead.y}
                      r={24}
                      fill="#f59e0b"
                      opacity="0.4"
                      className="animate-halo-pulse"
                      filter="url(#sacredAura)"
                    />
                  )}

                  {/* Oval medal */}
                  <ellipse
                    cx={bead.x}
                    cy={bead.y}
                    rx={bead.r}
                    ry={bead.r + 2}
                    fill={isActive ? 'url(#activeLightBead)' : isPassed ? 'url(#passedBead)' : 'url(#goldMedalGrad)'}
                    stroke={isActive ? '#ffffff' : '#b45309'}
                    strokeWidth={isActive ? 2.5 : 1.5}
                    filter={isActive ? 'url(#sacredAura)' : undefined}
                  />

                  {/* Monogram 'M' on Medal */}
                  <text
                    x={bead.x}
                    y={bead.y + 4}
                    textAnchor="middle"
                    className="font-serif font-black text-[10px] fill-amber-950 pointer-events-none select-none"
                  >
                    M
                  </text>
                </g>
              );
            }

            // Standard or Our Father Bead
            const isOurFather = bead.type === 'our_father';
            const radius = bead.r;

            return (
              <g
                key={bead.id}
                onClick={() => onSelectStep(bead.stepIndex)}
                className="cursor-pointer group active:scale-90 transition-transform"
              >
                {/* Luminous Pulsing Halo when this bead is active! */}
                {isActive && (
                  <>
                    <circle
                      cx={bead.x}
                      cy={bead.y}
                      r={radius + 12}
                      fill="#f59e0b"
                      opacity="0.3"
                      className="animate-halo-pulse"
                      filter="url(#sacredAura)"
                    />
                    <circle
                      cx={bead.x}
                      cy={bead.y}
                      r={radius + 6}
                      fill="#fbbf24"
                      opacity="0.6"
                      className="animate-sacred-glow"
                    />
                  </>
                )}

                {/* Bead Sphere */}
                <circle
                  cx={bead.x}
                  cy={bead.y}
                  r={radius}
                  fill={
                    isActive
                      ? 'url(#activeLightBead)'
                      : isPassed
                      ? 'url(#passedBead)'
                      : isOurFather
                      ? '#cbd5e1'
                      : 'url(#pearlBead)'
                  }
                  stroke={
                    isActive
                      ? '#ffffff'
                      : isPassed
                      ? '#f59e0b'
                      : isOurFather
                      ? '#64748b'
                      : '#64748b'
                  }
                  strokeWidth={isActive ? 2.5 : 1}
                  filter={isActive ? 'url(#sacredAura)' : undefined}
                  className="transition-all duration-300"
                />

                {/* Divine glint on bead */}
                <circle
                  cx={bead.x - radius * 0.3}
                  cy={bead.y - radius * 0.3}
                  r={radius * 0.28}
                  fill="#ffffff"
                  opacity={isActive ? 0.95 : 0.6}
                />

                {/* Hover ring */}
                <circle
                  cx={bead.x}
                  cy={bead.y}
                  r={radius + 3}
                  fill="none"
                  stroke="#fbbf24"
                  strokeWidth="1.5"
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                />
              </g>
            );
          })}

          {/* Current Step Active Indicator Badge */}
          {activeCoord && (
            <g transform={`translate(${activeCoord.x}, ${activeCoord.y})`} className="pointer-events-none">
              <circle
                r="3"
                fill="#ffffff"
                className="animate-ping"
              />
            </g>
          )}
        </svg>

        {/* Floating current bead label */}
        <div className="absolute top-2 left-0 right-0 flex justify-center pointer-events-none">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/85 backdrop-blur-md border border-amber-500/30 text-amber-300 text-xs font-medium shadow-lg">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span>{activeCoord.label}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
