const AuthBrandPanel = () => {
  return (
    <section className="relative hidden min-h-screen flex-col justify-between bg-primary p-10 text-white lg:flex">
      
      {/* Logo */}
      <div>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-primary">
            <span className="font-bold">T</span>
          </div>

          <div>
            <h2 className="text-lg font-bold tracking-wide">
              TECuCONNECT
            </h2>

            <p className="text-[10px] uppercase tracking-widest text-secondary">
              UNILORIN TEC
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-md">
        <h1 className="text-4xl font-bold leading-tight">
          Nurturing the Next
          <br />
          Generation of Entrepreneur
        </h1>

        <p className="mt-5 text-sm leading-7 text-white/70">
          The University of Ilorin Technology Entrepreneurship Centre
          connects academic rigor with real-world venture creation,
          competency tracking, and mentorship.
        </p>

        {/* Ecosystem Card */}
        <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-5">
          
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-secondary">
              ● Live Ecosystem Nodes
            </span>

            <span className="text-xs text-white/50">
              Active Session
            </span>
          </div>

          <div className="my-6 h-px bg-white/10" />

          {/* Fake graph */}
          <div className="relative h-20">
            <div className="absolute left-6 top-4 h-px w-52 rotate-10deg bg-secondary" />

            <div className="absolute left-16 top-10 h-px w-52 rotate-14deg bg-secondary" />
          </div>

          <div className="mt-4 grid grid-cols-3 gap-4">
            <div>
              <h3 className="font-bold">1,250+</h3>
              <p className="mt-1 text-[10px] text-white/50">
                Active Ventures
              </p>
            </div>

            <div>
              <h3 className="font-bold">₦45M+</h3>
              <p className="mt-1 text-[10px] text-white/50">
                Sustained Funding
              </p>
            </div>

            <div>
              <h3 className="font-bold">12</h3>
              <p className="mt-1 text-[10px] text-white/50">
                Competencies
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="flex items-center justify-between text-xs text-white/40">
        <span>TEC © 2026</span>

        <div className="flex gap-5">
          <span>Unilorin Portal</span>
          <span>Support</span>
        </div>
      </div>
    </section>
  );
};

export default AuthBrandPanel;