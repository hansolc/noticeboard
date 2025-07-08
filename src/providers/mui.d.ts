declare module "@mui/system" {
  interface BreakpointOverrides {
    // Your custom breakpoints
    mobile: true;
    desktop: true;
    // Remove default breakpoints
    xs: false;
    sm: false;
    md: false;
    lg: false;
    xl: false;
  }
}
