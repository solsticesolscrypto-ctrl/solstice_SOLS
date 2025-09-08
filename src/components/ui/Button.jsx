import React from 'react';

const sizeMap = {
  sm: 'px-3 py-2 text-sm',
  md: 'px-5 py-3 text-base',
  lg: 'px-6 py-3 text-lg',
};

const base = 'inline-flex items-center justify-center rounded-full font-bold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)]/40 disabled:opacity-60 disabled:cursor-not-allowed';

const variants = {
  primary: 'btn-primary',
  outline: 'btn-outline text-[var(--brand)]',
  ghost: 'bg-transparent text-gray-200 hover:bg-white/5',
  link: 'bg-transparent px-0 py-0 text-[var(--brand)] hover:text-white underline-offset-4 hover:underline',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  type = 'button',
  loading = false,
  disabled = false,
  className = '',
  leftIcon = null,
  rightIcon = null,
  ...props
}) {
  const cls = [base, sizeMap[size] || sizeMap.md, variants[variant] || variants.primary, className]
    .filter(Boolean)
    .join(' ');

  return (
    <button type={type} className={cls} disabled={disabled || loading} {...props}>
      {loading ? (
        <span className="inline-flex items-center gap-2">
          <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span>...</span>
        </span>
      ) : (
        <span className="inline-flex items-center gap-2">
          {leftIcon}
          <span>{children}</span>
          {rightIcon}
        </span>
      )}
    </button>
  );
}
