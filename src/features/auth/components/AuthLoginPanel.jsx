import { ShieldCheck, UserRound } from "lucide-react";

import AuthFooter from "./AuthFooter";

const AuthLoginPanel = ({ onLogin }) => {
  return (
    <section
      className="
        flex min-h-screen
        items-center justify-center
        bg-background
        px-5 py-8
        sm:px-6 sm:py-10
        lg:px-10
      "
    >
      <div className="flex w-full max-w-md flex-col">
        {/* =========================================
            MOBILE BRAND
            ========================================= */}
        <div className="mb-10 lg:hidden">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
            University of Ilorin
          </p>

          <div className="mt-2 h-px w-12 bg-primary" />
        </div>

        {/* =========================================
            MAIN AUTH CONTENT
            ========================================= */}
        <div>
          <h1 className="text-2xl font-bold leading-tight text-text-primary sm:text-3xl">
            Your journey beyond the classroom starts here
          </h1>

          <p className="mt-4 text-sm leading-6 text-text-secondary">
            Access your personalized tech-entrepreneurship
            dashboard with your official university credentials.
          </p>

          {/* Login Button */}
          <button
            type="button"
            onClick={onLogin}
            className="
              mt-7 flex w-full
              items-center justify-center gap-3
              rounded-lg bg-primary
              px-5 py-3.5
              text-sm font-semibold text-white
              transition hover:opacity-90
              focus:outline-none
              focus:ring-2 focus:ring-primary/30
              focus:ring-offset-2
            "
          >
            <UserRound size={18} />

            <span>
              Continue with University of Ilorin
            </span>
          </button>

          {/* Divider */}
          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-border" />

            <span className="shrink-0 text-[10px] font-medium tracking-widest text-text-secondary">
              SSO SECURED
            </span>

            <div className="h-px flex-1 bg-border" />
          </div>

          {/* Security Notice */}
          <div className="flex items-start gap-3">
            <ShieldCheck
              size={18}
              className="mt-0.5 shrink-0 text-primary"
            />

            <p className="text-xs leading-5 text-text-secondary">
              Secure access using your University of Ilorin
              account. We do not store your private passwords or
              portal credentials.
            </p>
          </div>
        </div>

        {/* =========================================
            FOOTER
            ========================================= */}
        <div className="mt-12 sm:mt-16 lg:mt-24">
          <AuthFooter />
        </div>
      </div>
    </section>
  );
};

export default AuthLoginPanel;