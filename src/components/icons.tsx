import type { SVGProps } from "react";

export const Logo = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 78 78"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <defs>
      <linearGradient
        id="paint0_linear_1_2"
        x1="39"
        y1="0"
        x2="39"
        y2="78"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#1E002B" />
        <stop offset="1" stopColor="#3533CD" />
      </linearGradient>
      <linearGradient
        id="paint1_linear_1_2"
        x1="39.5"
        y1="8"
        x2="39.5"
        y2="66"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#56146D" />
        <stop offset="1" stopColor="#A820E5" />
      </linearGradient>
    </defs>
    <path
      d="M39 0C17.46 0 0 17.46 0 39C0 60.54 17.46 78 39 78C60.54 78 78 60.54 78 39C78 17.46 60.54 0 39 0ZM54.6 39C54.6 47.49 47.49 54.6 39 54.6C30.51 54.6 23.4 47.49 23.4 39C23.4 30.51 30.51 23.4 39 23.4C47.49 23.4 54.6 30.51 54.6 39Z"
      fill="url(#paint0_linear_1_2)"
    />
    <path
      d="M44.5 8H40.25C38.04 8 36.25 9.79 36.25 12V43C36.25 46.86 33.11 50 29.25 50C25.39 50 22.25 46.86 22.25 43C22.25 39.14 25.39 36 29.25 36C30.28 36 31.25 36.24 32.11 36.65L32.75 33.74C31.68 33.26 30.5 33 29.25 33C23.58 33 19 37.47 19 43C19 48.53 23.58 53 29.25 53C34.92 53 39.5 48.53 39.5 43V20L44.5 19.2V30.5C44.5 31.88 45.62 33 47 33C48.38 33 49.5 31.88 49.5 30.5V17.37L51.87 17C52.55 16.9 53 16.27 53 15.58V10.1C53 8.94 52.06 8 50.9 8H44.5ZM51.36 38.31C50.41 37.5 49.27 37 48 37C45.24 37 43 39.24 43 42C43 44.76 45.24 47 48 47C50.76 47 53 44.76 53 42C53 40.82 52.56 39.75 51.81 38.91L51.36 38.31Z"
      fill="url(#paint1_linear_1_2)"
    />
  </svg>
);

const CowboyHat = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M12 4a4 4 0 0 0-4 4v2h8V8a4 4 0 0 0-4-4Z" />
    <path d="M4 14h16" />
    <path d="M4 14a4 4 0 0 0 4 4h8a4 4 0 0 0 4-4" />
  </svg>
);

const Cross = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M12 5v14" />
    <path d="M5 12h14" />
  </svg>
);

const DollarSign = (props: SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <line x1="12" y1="1" x2="12" y2="23" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  );

const Boot = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M6 10v10h12V10" />
    <path d="M6 14h12" />
    <path d="M6 10l3-6h6l3 6" />
  </svg>
);

const Heart = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const Music = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M9 18V5l12-2v13" />
    <circle cx="6" cy="18" r="3" />
    <circle cx="18" cy="16" r="3" />
  </svg>
);

export const GenreIcons = {
  Sertanejo: CowboyHat,
  Gospel: Cross,
  Trap: DollarSign,
  Piseiro: Boot,
  Arrocha: Heart,
  Funk: Music,
};
