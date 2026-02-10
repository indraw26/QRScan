import type { ButtonHTMLAttributes, ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  icon?: LucideIcon;
  children: ReactNode;
  fullWidth?: boolean;
  isLoading?: boolean;
}

const Button = ({
  variant = "primary",
  icon: Icon,
  children,
  fullWidth = false,
  isLoading = false,
  className = "",
  ...props
}: ButtonProps) => {
  const baseStyles = "flex items-center justify-center gap-2 h-11 rounded-xl text-sm font-medium transition-all cursor-pointer";
  const widthStyles = fullWidth ? "w-full" : "flex-1";

  // Define vibrant colors for each variant with proper dark mode support
  const getVariantStyles = () => {
    switch (variant) {
      case "primary":
        return {
          className: 'hover:opacity-90 hover:scale-[1.02] shadow-md hover:shadow-lg',
          style: {
            backgroundColor: 'var(--color-primary)',
            color: 'var(--color-primary-foreground)'
          }
        };
      case "secondary":
        return {
          className: 'hover:opacity-90 hover:scale-[1.02] shadow-md hover:shadow-lg',
          style: {
            backgroundColor: 'var(--color-secondary)',
            color: 'var(--color-secondary-foreground)'
          }
        };
      case "outline":
        return {
          className: 'bg-transparent hover:scale-[1.02]',
          style: {
            color: 'var(--color-primary)',
            borderWidth: '2px',
            borderColor: 'var(--color-primary)',
            backgroundColor: 'transparent'
          }
        };
    }
  };

  const variantConfig = getVariantStyles();

  return (
    <button
      className={`${baseStyles} ${variantConfig.className} ${widthStyles} ${className}`}
      style={variantConfig.style}
      {...props}
    >
      {Icon && <Icon className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />}
      {children}
    </button>
  );
};

export default Button;
