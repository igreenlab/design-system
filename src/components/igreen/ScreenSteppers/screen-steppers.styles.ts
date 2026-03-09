/**
 * ScreenSteppers Styles
 *
 * Responsive layout using design tokens.
 * Mobile: horizontal header with logo inline
 * Desktop (md+): vertical stacked layout with logo on top
 */

export const screenSteppersStyles = {
  /** Outer container - centered with max width */
  container: 'flex flex-col gap-6 md:gap-8 w-full max-w-[480px] mx-auto py-7 px-7 md:py-[72px]',

  /** Header section with logo and stepper */
  header: {
    /** Default responsive: mobile=horizontal, desktop=vertical */
    base: 'flex flex-row items-center gap-6 md:flex-col md:items-start md:gap-8',
    /** Force mobile layout (horizontal - logo inline) */
    mobile: 'flex flex-row items-center gap-6',
    /** Force desktop layout (vertical - logo on top) */
    desktop: 'flex flex-col items-start gap-8',
  },

  /** iGreen logo container */
  logo: 'bg-bg-primary rounded-sm size-9 flex items-center justify-center text-fg-on-primary shrink-0',

  /** Stepper wrapper - takes remaining space on mobile */
  stepperWrapper: {
    base: 'flex-1 md:w-full',
    mobile: 'flex-1',
    desktop: 'w-full',
  },

  /** Content area for children */
  content: 'w-full',
};
