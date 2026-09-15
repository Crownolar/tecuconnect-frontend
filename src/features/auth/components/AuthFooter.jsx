const AuthFooter = () => {
  return (
    <footer
      className="
        flex flex-wrap
        items-center justify-center
        gap-x-4 gap-y-2
        text-center text-xs
        text-text-secondary
      "
    >
      <button
        type="button"
        className="transition hover:text-primary"
      >
        Help & Documentation
      </button>

      <span
        aria-hidden="true"
        className="hidden sm:inline"
      >
        •
      </span>

      <button
        type="button"
        className="transition hover:text-primary"
      >
        Privacy Policy
      </button>

      <span
        aria-hidden="true"
        className="hidden sm:inline"
      >
        •
      </span>

      <button
        type="button"
        className="transition hover:text-primary"
      >
        Terms of Service
      </button>
    </footer>
  );
};

export default AuthFooter;