import { ShieldCheck, UserRound } from "lucide-react";

import AuthFooter from "./AuthFooter";

const AuthLoginPanel = ({ onLogin }) => {
  return (
    <section className="flex min-h-screen items-center justify-center bg-background px-6">
      
      <div className="flex w-full max-w-md flex-col">
        
        {/* Main Auth Content */}
        <div>
          <h1 className="text-3xl font-bold text-text-primary">
            Your journey beyond the classroom starts here
          </h1>

          <p className="mt-4 text-sm leading-6 text-text-secondary">
            Access your personalized tech-entrepreneurship dashboard
            with your official university credentials.
          </p>

          {/* Login Button */}
          <button
            onClick={onLogin}
            className="mt-8 flex w-full items-center justify-center gap-3 rounded-lg bg-primary px-5 py-3.5 text-sm font-semibold text-white transition hover:opacity-90"
          >
            <UserRound size={18} />

            Continue with University of Ilorin
          </button>

          {/* Divider */}
          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-border" />

            <span className="text-[10px] font-medium tracking-widest text-text-secondary">
              SSO SECURED
            </span>

            <div className="h-px flex-1 bg-border" />
          </div>

          {/* Security Notice */}
          <div className="flex gap-3">
            <ShieldCheck
              size={18}
              className="mt-0.5 text-primary"
            />

            <p className="text-xs leading-5 text-text-secondary">
              Secure access using your University of Ilorin account.
              We do not store your private passwords or portal credentials.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-24">
          <AuthFooter />
        </div>
      </div>
    </section>
  );
};

export default AuthLoginPanel;