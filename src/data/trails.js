export const trails = [
    {
        id: 'starter-1',
        name: "Ballam Park Basketball Courts, Frankston",
        level: 0,
        description: "Flat, zero traffic. Perfect for the very first time on a bike.",
        lat: -38.1528,
        lng: 145.1584,
    },
    {
        id: 'starter-2',
        name: "Bicentennial Park paths, Chelsea",
        level: 1,
        description: "Flat, paved/hard surface. Safe for a kid on a bike and a sibling on a scooter.",
        lat: -38.0499,
        lng: 145.1264,
    },
    {
        id: 'starter-3',
        name: "Seaford Wetlands Trail",
        level: 2,
        description: "Fine for most, but introduces gentle undulations that might tire little legs.",
        lat: -38.1046,
        lng: 145.1331,
    },
    {
        id: 'starter-4',
        name: "George Pentland Botanic Gardens",
        level: 3,
        description: "Challenging trails, internal loop with hills to test their skills.",
        lat: -38.1533,
        lng: 145.1287,
    },
    {
        id: 'starter-5',
        name: "Peninsula Link Trail (Baxter)",
        level: 4,
        description: "High effort for both parents and kids. Expect sweat and breaks!",
        lat: -38.1963,
        lng: 145.1611,
    },
];

export const difficultyLevels = {
    0: { label: "The Paddock", color: "bg-green-400", hex: "#4ade80", desc: "Flat, zero traffic." },
    1: { label: "Easy Cruiser", color: "bg-blue-400", hex: "#60a5fa", desc: "Flat, paved/hard surface." },
    2: { label: "The Independent", color: "bg-yellow-400", hex: "#facc15", desc: "Hills/elevation that might tire legs." },
    3: { label: "The Challenger", color: "bg-orange-500", hex: "#f97316", desc: "Challenging trails, some off-road." },
    4: { label: "The Burner", color: "bg-red-600", hex: "#dc2626", desc: "High effort, expect sweat!" },
};
