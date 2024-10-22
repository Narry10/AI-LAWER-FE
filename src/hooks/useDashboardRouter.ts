// hooks/useDashboardRouter.ts
import {
  useNavigate,
  useLocation,
  NavigateOptions as ReactRouterNavigateOptions,
} from "react-router-dom";
import { NavigateOptions as ToolpadNavigateOptions } from "@toolpad/core/AppProvider/AppProvider";

// Defining the return type of the hook
interface UseDashboardRouterReturn {
  navigateTo: (path: string) => void;
  initialPath: string;
  pathname: string;
  searchParams: URLSearchParams;
  navigate: (path: string, options?: ToolpadNavigateOptions) => void;
}

// Helper function to map ToolpadNavigateOptions to ReactRouterNavigateOptions
const mapNavigateOptions = (
  options?: ToolpadNavigateOptions
): ReactRouterNavigateOptions | undefined => {
  if (!options) return undefined;

  // Check if the options object has a 'replace' and 'state' property
  const mappedOptions: ReactRouterNavigateOptions = {};

  if ("replace" in options) {
    mappedOptions.replace =
      typeof options.replace === "boolean" ? options.replace : false;
  }

  if ("state" in options) {
    mappedOptions.state = options.state;
  }

  return mappedOptions;
};

// Main hook function
const useDashboardRouter = (initialPath: string): UseDashboardRouterReturn => {
  const navigate = useNavigate(); // React Router's navigation function
  const location = useLocation(); // Access the current location

  // Basic navigate function, navigating to a specific path
  const navigateTo = (path: string) => {
    navigate(path);
  };

  // Wrapper for navigation that also supports options from Toolpad
  const navigateWrapper = (path: string, options?: ToolpadNavigateOptions) => {
    const mappedOptions = mapNavigateOptions(options); // Map Toolpad options to React Router options
    navigate(path, mappedOptions); // Call react-router's navigate with the mapped options
  };

  // Returning values and functions for use in components
  return {
    navigateTo,
    initialPath,
    pathname: location.pathname, // Current pathname
    searchParams: new URLSearchParams(location.search), // Parse search params from the current URL
    navigate: navigateWrapper, // Enhanced navigate function
  };
};

export default useDashboardRouter;
