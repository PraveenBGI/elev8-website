/**
 * Image registry: one place for every photo the site uses.
 *
 * Files live in public/images/<name>.jpg and are downloaded by
 * scripts/download-images.ps1, which reads this file. To use your own photo,
 * replace public/images/<name>.jpg with a file of the same name.
 *
 * `source` is the Unsplash photo id the image came from.
 */
export const IMAGES = {
  // home and shared
  "hero-port-containers": { source: "photo-1601897690942-bcacbad33e55", alt: "Stacked shipping containers in a port" },
  "hero-team-laptops": { source: "photo-1522202176988-66273c2fd55f", alt: "Team working together at a table with laptops" },
  "cta-city-night": { source: "photo-1621680696874-edd80ce57b72", alt: "City skyline at night" },
  "gov-building": { source: "photo-1523292562811-8fa7962a78c8", alt: "White government building under a clear sky" },
  "investor-charts": { source: "photo-1560221328-12fe60f83ab8", alt: "Monitor showing financial charts" },
  "business-meeting": { source: "photo-1758518731457-5ef826b75b3b", alt: "Business professionals in a meeting" },

  // pillars
  "pillar-procurement": { source: "photo-1450101499163-c8848c66ca85", alt: "Person signing a document" },
  "pillar-b2b": { source: "photo-1521791136064-7986c2920216", alt: "Two people shaking hands" },
  "pillar-import": { source: "photo-1606185540834-d6e7483ee1a4", alt: "Cargo ship at sea" },
  "pillar-export": { source: "photo-1765206257996-9b4a5d886a2c", alt: "Container ships and cranes at a busy port" },
  "pillar-investment": { source: "photo-1606813332135-228593b6e201", alt: "Aerial view of a coastal city" },
  "pillar-icv": { source: "photo-1496247749665-49cf5b1022e9", alt: "Interior of a large industrial factory" },
  "pillar-sustainability": { source: "photo-1509391366360-2e959784a276", alt: "Solar panels on a green field" },
  "pillar-governance": { source: "photo-1523292562811-8fa7962a78c8", alt: "White government building under a clear sky" },

  // countries
  "country-oman": { source: "photo-1599743777555-e362a2feab39", alt: "Mosque with a blue tiled dome in Muscat" },
  "country-india": { source: "photo-1562979314-bee7453e911c", alt: "Bridge in Mumbai at golden hour" },
  "country-tanzania": { source: "photo-1589177900326-900782f88a55", alt: "Aerial view of Dar es Salaam" },
  "country-uk": { source: "photo-1549483249-f0b359d1e289", alt: "London skyline" },

  // Oman: governorates and cities
  "om-muscat": { source: "photo-1606813332135-228593b6e201", alt: "Aerial view of Muscat by the sea" },
  "om-dhofar": { source: "photo-1693561596793-8a06b850dc68", alt: "Waterfall in green hills in Dhofar" },
  "om-musandam": { source: "photo-1624608496439-d24694e1e434", alt: "Blue sea beside rocky mountains in Musandam" },
  "om-al-buraimi": { source: "photo-1763544376828-c42241c75ba9", alt: "Stone fort with palm trees" },
  "om-ad-dakhiliyah": { source: "photo-1623680904963-5580d963e18e", alt: "Historic building in Nizwa under blue sky" },
  "om-ad-dhahirah": { source: "photo-1771974391053-af28b7ce2a81", alt: "Vehicles crossing open desert" },
  "om-north-batinah": { source: "photo-1773126378915-793b5c48fb38", alt: "Shipping containers stacked at a busy port" },
  "om-south-batinah": { source: "photo-1708417589176-cfc0bb426f75", alt: "Historic fort with a flag on top" },
  "om-sharqiyah-north": { source: "photo-1680180486530-ef36f1bfc606", alt: "Sand dunes under a blue sky" },
  "om-sharqiyah-south": { source: "photo-1615399144021-822ba908c6f3", alt: "Wooden boat on the sea near mountains" },
  "om-al-wusta": { source: "photo-1670121180530-cfcba4438038", alt: "Large cargo ship at a dock" },

  // India
  "in-tamil-nadu": { source: "photo-1642516861335-97971622499e", alt: "Large temple in Tamil Nadu" },
  "in-chennai": { source: "photo-1637080618498-b4a1cad84ae0", alt: "Red and white heritage building in Chennai" },
  "in-coimbatore": { source: "photo-1595433306946-233f47e4af3a", alt: "Green fields near mountains outside Coimbatore" },
  "in-karnataka": { source: "photo-1659126574791-13313aa424bd", alt: "Mysore Palace illuminated at night" },
  "in-bengaluru": { source: "photo-1596176530529-78163a4f7af2", alt: "Aerial view of Bengaluru" },
  "in-mangaluru": { source: "photo-1622173324953-adb598835e7a", alt: "Beach with palm trees near Mangaluru" },
  "in-gujarat": { source: "photo-1693629704084-0f4600ba9ffd", alt: "Bridge over the river in Ahmedabad" },
  "in-ahmedabad": { source: "photo-1651408451633-ff492f347ec1", alt: "Bridge over water in Ahmedabad" },
  "in-mundra": { source: "photo-1601897690942-bcacbad33e55", alt: "Stacked shipping containers in a port" },
  "in-maharashtra": { source: "photo-1572782252655-9c8771392601", alt: "Stone fort in Maharashtra" },
  "in-mumbai": { source: "photo-1768822854434-c7cefc3b494a", alt: "Mumbai skyline with skyscrapers" },
  "in-kerala": { source: "photo-1602216056096-3b40cc0c9944", alt: "Boat on the backwaters of Kerala" },
  "in-kochi": { source: "photo-1605955794720-651b9ae7f5e7", alt: "Boats on the sea at Kochi" },

  // Tanzania
  "tz-dar-es-salaam": { source: "photo-1589177900326-900782f88a55", alt: "Aerial view of Dar es Salaam" },
  "tz-zanzibar": { source: "photo-1695643875095-f5620748605d", alt: "Market street in Stone Town, Zanzibar" },
  "tz-arusha": { source: "photo-1624805539790-5baa0b8c66a0", alt: "Mountain under a blue sky near Arusha" },

  // United Kingdom
  "uk-england": { source: "photo-1549483249-f0b359d1e289", alt: "London skyline" },
  "uk-london": { source: "photo-1543832923-44667a44c804", alt: "Tower Bridge in London" },
  "uk-manchester": { source: "photo-1619284518317-85b1ab8c7723", alt: "Manchester city skyline" },
  "uk-scotland": { source: "photo-1589489873423-d1745278a8f4", alt: "Kilchurn Castle by a loch in Scotland" },
  "uk-aberdeen": { source: "photo-1628946578676-e1ee0a952c35", alt: "Granite buildings in Aberdeen" },

  // opportunities
  "opp-oil-gas": { source: "photo-1516199423456-1f1e91b06f25", alt: "Oil pump jack at sunset" },
  "opp-warehousing": { source: "photo-1586528116311-ad8dd3c8310d", alt: "Boxes on warehouse shelves" },
  "opp-fabrication": { source: "photo-1647427060118-4911c9821b82", alt: "Factory with orange machines" },
  "opp-solar": { source: "photo-1508514177221-188b1cf16e9d", alt: "Solar panel under blue sky" },
  "opp-cargo": { source: "photo-1595587637401-83ff822bd63e", alt: "Cargo ship at a dock" },
  "opp-seafood": { source: "photo-1634646809203-f3b4adff9127", alt: "Containers stacked at a port" },
} as const;

export type ImageName = keyof typeof IMAGES;

export const img = (name: ImageName) => ({ src: `/images/${name}.jpg`, alt: IMAGES[name].alt });

/** Flags in public/images/flags/<code>.png (downloaded by the same script). */
export const FLAGS = ["om", "in", "tz", "gb"] as const;
export type FlagCode = (typeof FLAGS)[number];
export const flag = (code: FlagCode) => `/images/flags/${code}.png`;
