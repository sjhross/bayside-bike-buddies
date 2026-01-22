import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import ReactGA from "react-ga4";

const GoogleAnalytics = () => {
    const location = useLocation();

    useEffect(() => {
        // Check if the measurement ID is available
        const gaId = import.meta.env.VITE_GA_ID;

        if (gaId) {
            if (!window.gaInitialized) {
                ReactGA.initialize(gaId);
                window.gaInitialized = true;
            }

            // Update the document title if available
            const title = document.title;

            // Send pageview with the current path
            ReactGA.send({
                hitType: "pageview",
                page: location.pathname + location.search,
                title: title
            });
        } else {
            console.warn("VITE_GA_ID is not defined in environment variables.")
        }
    }, [location]);

    return null;
};

export default GoogleAnalytics;
