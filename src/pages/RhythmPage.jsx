import { DAYS, DAY_DATA, PRACTICE_DETAIL } from '../data/practices';

export default function RhythmPage() {
  const now = new Date();
  const todayIndex = now.getDay();

  return (
    <div className="px-6 pt-10">
      {/* Header */}
      <div className="mb-8">
        <h1
          className="font-display font-light tracking-wide mb-1"
          style={{ fontSize: '30px', color: '#3D3830', lineHeight: 1.15 }}
        >
          The rhythm
        </h1>
        <p className="font-display italic font-light" style={{ fontSize: '15px', color: '#8B7D6B' }}>
          your weekly devotional map
        </p>
      </div>

      {/* Weekly schedule */}
      <div className="mb-10">
        {DAYS.map((day, i) => {
          const d = DAY_DATA[day];
          const isToday = i === todayIndex;

          return (
            <div
              key={day}
              className="rounded-[14px] p-5 mb-3 backdrop-blur-sm"
              style={{
                background: isToday
                  ? 'rgba(255,255,255,0.85)'
                  : 'rgba(255,255,255,0.5)',
                border: isToday
                  ? '1px solid rgba(107,143,113,0.25)'
                  : '1px solid rgba(139,125,107,0.10)',
                boxShadow: isToday
                  ? '0 2px 20px rgba(107,143,113,0.08)'
                  : 'none',
              }}
            >
              <div className="flex justify-between items-baseline mb-2 flex-wrap gap-1">
                <span
                  className="font-display"
                  style={{
                    fontSize: '18px',
                    fontWeight: isToday ? 500 : 300,
                    color: isToday ? '#3D3830' : '#6B6050',
                  }}
                >
                  {day}
                  {isToday && (
                    <span
                      className="ml-2 font-body"
                      style={{
                        fontSize: '10px',
                        color: 'var(--season-accent)',
                        letterSpacing: '0.18em',
                        textTransform: 'uppercase',
                      }}
                    >
                      today
                    </span>
                  )}
                </span>
                <span
                  className="font-display italic"
                  style={{ fontSize: '13px', color: '#8B7D6B' }}
                >
                  {d.theme}
                </span>
              </div>

              <div className="flex flex-wrap gap-1.5 mb-2.5">
                {d.practices.map((p) => {
                  const pd = PRACTICE_DETAIL[p];
                  return (
                    <span
                      key={p}
                      className="inline-block font-body px-3 py-1 rounded-full"
                      style={{
                        fontSize: '11px',
                        background: `${pd.color}15`,
                        color: pd.color,
                        border: `1px solid ${pd.color}25`,
                      }}
                    >
                      {pd.icon} {pd.label}
                    </span>
                  );
                })}
              </div>

              <p
                className="font-body italic leading-relaxed"
                style={{ fontSize: '12.5px', color: '#8B7D6B', lineHeight: 1.65 }}
              >
                {d.note}
              </p>
            </div>
          );
        })}
      </div>

      {/* When you miss a day */}
      <div className="text-center mb-12 px-4">
        <div
          className="mx-auto mb-5"
          style={{ width: '24px', height: '1px', background: 'rgba(139,125,107,0.25)' }}
        />
        <h3
          className="font-display font-light mb-3"
          style={{ fontSize: '18px', color: 'var(--season-accent)' }}
        >
          When you miss a day
        </h3>
        <p
          className="font-body italic leading-relaxed max-w-[360px] mx-auto"
          style={{ fontSize: '13.5px', color: '#6B6050', lineHeight: 1.7 }}
        >
          You will miss days. Do not add the missed practice to the next day.
          Do not make it mean anything about you. Simply{' '}
          <span
            className="not-italic"
            style={{ color: 'var(--season-accent)', fontWeight: 400 }}
          >
            begin again
          </span>
          .
        </p>
      </div>

      {/* Practice reference */}
      <div className="mb-10">
        <h3
          className="font-body mb-4"
          style={{
            fontSize: '11px',
            color: 'var(--season-accent)',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            fontWeight: 400,
          }}
        >
          practice reference
        </h3>

        {Object.entries(PRACTICE_DETAIL).map(([key, p]) => (
          <div
            key={key}
            className="rounded-[14px] p-4 mb-3 backdrop-blur-sm"
            style={{
              background: 'rgba(255,255,255,0.5)',
              border: '1px solid rgba(139,125,107,0.10)',
              borderLeft: `3px solid ${p.color}40`,
            }}
          >
            <div className="flex items-baseline gap-3 mb-1.5">
              <span className="text-xl leading-none" style={{ color: p.color }}>
                {p.icon}
              </span>
              <div>
                <div
                  className="font-display font-normal"
                  style={{ fontSize: '17px', color: '#3D3830' }}
                >
                  {p.label}
                </div>
                <div
                  className="font-body"
                  style={{ fontSize: '11px', color: '#A09080', letterSpacing: '0.06em' }}
                >
                  {p.duration} · {p.time}
                </div>
              </div>
            </div>
            <p
              className="font-body leading-relaxed"
              style={{ fontSize: '13px', color: '#6B6050', lineHeight: 1.65 }}
            >
              {p.description}
            </p>
          </div>
        ))}
      </div>

      {/* Permission slip */}
      <div
        className="p-6 rounded-[14px] text-center mb-4"
        style={{
          background: 'rgba(107,143,160,0.06)',
          border: '1px solid rgba(107,143,160,0.14)',
        }}
      >
        <div
          className="font-display font-light mb-3"
          style={{ fontSize: '17px', color: '#6B8FA0' }}
        >
          A permission slip
        </div>
        <div
          className="font-body leading-loose"
          style={{ fontSize: '13px', color: '#6B6050', lineHeight: 1.9 }}
        >
          You have permission to start with less than you think you should.
          <br />
          You have permission to modify every practice on migraine days.
          <br />
          You have permission to let rest be the most radical thing you do.
          <br />
          You have permission to let this be enough.
        </div>
      </div>
    </div>
  );
}
