const AuthFooter = () => {
  return (
    <footer className="flex justify-center gap-6 text-xs text-text-secondary">
      <button className="transition hover:text-primary">
        Help & Documentation
      </button>

      <span>•</span>

      <button className="transition hover:text-primary">
        Privacy Policy
      </button>

      <span>•</span>

      <button className="transition hover:text-primary">
        Terms of Service
      </button>
    </footer>
  );
};

export default AuthFooter;