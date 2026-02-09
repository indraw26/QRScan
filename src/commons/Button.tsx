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

  // Define vibrant colors for each variant
  const getVariantStyles = () => {
    switch (variant) {
      case "primary":
        return {
          style: {
            backgroundColor: 'oklch(60% 0.18 220)', // Vibrant blue (matches theme primary)
            color: 'white',
          },
          className: 'hover:opacity-90 hover:scale-[1.02] shadow-md hover:shadow-lg'
        };
      case "secondary":
        return {
          style: {
            backgroundColor: 'oklch(70% 0.12 220)', // Lighter blue (matches theme)
            color: 'white',
          },
          className: 'hover:opacity-90 hover:scale-[1.02] shadow-md hover:shadow-lg'
        };
      case "outline":
        return {
          style: {},
          className: 'bg-transparent text-primary border-2 border-primary hover:bg-primary/5 hover:scale-[1.02]'
        };
    }
  };

  const variantConfig = getVariantStyles();

  return (
    <button
      style={variantConfig.style}
      className={`${baseStyles} ${variantConfig.className} ${widthStyles} ${className}`}
      {...props}
    >
      {Icon && <Icon className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />}
      {children}
    </button>
  );
};

export default Button;
