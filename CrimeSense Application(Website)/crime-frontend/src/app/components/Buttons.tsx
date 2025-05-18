export function PrimaryButton({ children, ...props }) {
    return (
      <button
        className="px-5 py-2 bg-(--color-primary) text-white rounded-lg shadow-md hover:bg-(--color-primary-dark) transition"
        {...props}
      >
        {children}
      </button>
    );
  }
  export function SecondaryButton({ children, ...props }) {
    return (
      <button
        className="px-5 py-2 bg-white text-(--color-primary) border border-(--color-primary) rounded-lg shadow-sm hover:bg-(--color-primary) hover:text-white transition"
        {...props}
      >
        {children}
      </button>
    );
  }