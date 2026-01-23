import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, url }) => {
    const siteTitle = "Bayside Bike Buddies";
    const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;
    const siteUrl = import.meta.env.VITE_SITE_URL || "https://www.baysidebikebuddies.au";
    const fullUrl = url ? `${siteUrl}${url}` : siteUrl;

    return (
        <Helmet>
            {/* Basic */}
            <title>{fullTitle}</title>
            <meta name="description" content={description} />
            <link rel="canonical" href={fullUrl} />

            {/* Open Graph */}
            <meta property="og:type" content="website" />
            <meta property="og:url" content={fullUrl} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description} />
        </Helmet>
    );
};

export default SEO;
