const SchemaMarkup = ({ trails }) => {
    if (!trails || trails.length === 0) return null;

    const schemaData = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "itemListElement": trails.map((trail, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "item": {
                "@type": "Place",
                "name": trail.name,
                "description": trail.description,
                "geo": {
                    "@type": "GeoCoordinates",
                    "latitude": trail.lat,
                    "longitude": trail.lng
                },
                "hasMap": `https://www.google.com/maps/search/?api=1&query=${trail.lat},${trail.lng}`
            }
        }))
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
    );
};

export default SchemaMarkup;
