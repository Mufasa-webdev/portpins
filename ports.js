var ports = [
  {
    terminal: "Noumea",
    location: "New Caledonia",
    coverImage: "media/noumea.jpeg",
    images: ["media/IMG_6653.JPG", "media/IMG_6652.WEBP"],
    details: "fas fa-anchor",
    categories: {
      Eat: [
        {
          name: "The Waterfront Bistro",
          image: "/www/media/waterfront.webp",
          description:
            "A seafood restaurant with stunning views of the harbor.",
          location: "123 Main St, Sydney",
          rating: 4.5,
          sides: ["free Wifi", "WaterFront", "Live Music"],
          map: "https://maps.app.goo.gl/LxDaykrG1J86KRDh9",
        },
        {
          name: "Yoci Bakes & Sweets",
          image: "media/yoci.jpg",
          description:
            "A seafood restaurant with stunning views of the harbor.",
          location: "123 Main St, Circular quay, Sydney",
          rating: 4.5,
          sides: "Crew Favorite",
          map: "https://maps.app.goo.gl/LxDaykrG1J86KRDh9",
        },
        {
          name: "Eastbank Cafe Bar",
          image: "media/eastbank.jpg",
          description: "Fresh Dinner.",
          location: "123 Main St, Circular quay, Sydney",
          rating: 4.5,
          sides: "5 minute wait",
          map: "https://maps.app.goo.gl/LxDaykrG1J86KRDh9",
        },
      ],
      Shop: [
        {
          name: "Sydney Market",
          image: "media/footlocker.webp",
          description:
            "A bustling marketplace with local crafts and souvenirs.",
          location: "456 Dock St, Sydney",
          rating: 4.2,
          sides: ["10% discount"],
          map: "redirect.html?url=https://www.google.com/maps/place/The+Waterfront+Bistro/@-33.8688,151.2093,17z/data=!3m1!4b1!4m5!3m4!1s0x6b12ae37b1cf754b:0x6b12ae37b1cf754c!8m2!3d-33.8688!4d151.2093",
        },
      ],
      Tours: [
        {
          name: "Turtle Tours",
          image: "media/turtles.jpg",
          time: "2.5 hrs",
          price: "$200",
          info: "A turtle watching experience with both good and ready folks",
          description: ["Turtles", "Whales"],
          location: "789 Pier St, Sydney",
          rating: 4.8,
          tag: "Recommended",
          cta: "https://google.com",
        },
      ],
      Hotels: [
        {
          name: "Sydney Harbor Cruise",
          image: "image3.jpg",
          description: "A guided tour of the harbor and surrounding waters.",
          location: "789 Pier St, Sydney",
          rating: 4.8,
          cta: "https://google.com",
        },
      ],
      Tips: [
        {
          description: "Freee shuttle bus from ship to information centre.",
        },
        {
          description:
            "Free wifi in the terminal, market stalls and several tour operators",
        },
        {
          description: "Hop on - Hop Off Bus $15 per person all day.",
        },
        {
          description:
            "Some Vendors accept AUD & USD. but public transports majorly all use the  local currency CFP franc!",
        },
      ],
    },
  },

  /*{
    terminal: "Lifou Isle",
    location: "New-Caledonia",
    coverImage: "media/jodi-nelson-JGbWyXvPXa4-unsplash.jpg",
    images: [
      "/www/media/0527-0634_sydney-circular-quay.jpg",
      "media/sydney-3.jpg",
    ],
    details: "fas fa-ship",
    categories: {
      Eat: [
        {
          name: "The Waterfront Bistro",
          image: "/www/media/waterfront.webp",
          description:
            "A seafood restaurant with stunning views of the harbor.",
          location: "123 Main St, Sydney",
          rating: 4.5,
          sides: ["free Wifi", "WaterFront", "Live Music"],
          map: "https://maps.app.goo.gl/LxDaykrG1J86KRDh9",
        },
        {
          name: "Yoci Bakes & Sweets",
          image: "media/yoci.jpg",
          description:
            "A seafood restaurant with stunning views of the harbor.",
          location: "123 Main St, Circular quay, Sydney",
          rating: 4.5,
          sides: "Crew Favorite",
          map: "https://maps.app.goo.gl/LxDaykrG1J86KRDh9",
        },
        {
          name: "Eastbank Cafe Bar",
          image: "media/eastbank.jpg",
          description: "Fresh Dinner.",
          location: "123 Main St, Circular quay, Sydney",
          rating: 4.5,
          sides: "5 minute wait",
          map: "https://maps.app.goo.gl/LxDaykrG1J86KRDh9",
        },
      ],
      Shop: [
        {
          name: "Sydney Market",
          image: "media/footlocker.webp",
          description:
            "A bustling marketplace with local crafts and souvenirs.",
          location: "456 Dock St, Sydney",
          rating: 4.2,
          sides: ["10% discount"],
          map: "redirect.html?url=https://www.google.com/maps/place/The+Waterfront+Bistro/@-33.8688,151.2093,17z/data=!3m1!4b1!4m5!3m4!1s0x6b12ae37b1cf754b:0x6b12ae37b1cf754c!8m2!3d-33.8688!4d151.2093",
        },
      ],
      Tour: [
        {
          name: "Sydney Harbor Cruise",
          image: "image3.jpg",
          description: "A guided tour of the harbor and surrounding waters.",
          location: "789 Pier St, Sydney",
          rating: 4.8,
          map: "googl.com",
        },
      ],
      Hotels: [
        {
          name: "Sydney Harbor Cruise",
          image: "image3.jpg",
          description: "A guided tour of the harbor and surrounding waters.",
          location: "789 Pier St, Sydney",
          rating: 4.8,
          map: "googl.com",
        },
      ],
      Hacks: [
        {
          name: "Sydney Harbor Cruise",
          image: "image3.jpg",
          description: "A guided tour of the harbor and surrounding waters.",
          location: "789 Pier St, Sydney",
          rating: 4.8,
          map: "googl.com",
        },
      ],
    },
  },

  {
    terminal: "Whits Sunday Terminal",
    location: "Airile Beach",
    coverImage: "media/whitsunday.jpeg",
    images: ["media/0527-0634_sydney-circular-quay.jpg", "media/sydney-3.jpg"],
    details: "fas fa-ship",
    Eat: [
      {
        name: "The Waterfront Bistro",
        image: "/www/media/waterfront.webp",
        description: "A seafood restaurant with stunning views of the harbor.",
        location: "123 Main St, Sydney",
        rating: 4.5,
        sides: ["free Wifi", "WaterFront", "Live Music"],
        map: "https://maps.app.goo.gl/LxDaykrG1J86KRDh9",
      },
      {
        name: "Yoci Bakes & Sweets",
        image: "media/yoci.jpg",
        description: "A seafood restaurant with stunning views of the harbor.",
        location: "123 Main St, Circular quay, Sydney",
        rating: 4.5,
        sides: "Crew Favorite",
        map: "https://maps.app.goo.gl/LxDaykrG1J86KRDh9",
      },
      {
        name: "Eastbank Cafe Bar",
        image: "media/eastbank.jpg",
        description: "Fresh Dinner.",
        location: "123 Main St, Circular quay, Sydney",
        rating: 4.5,
        sides: "5 minute wait",
        map: "https://maps.app.goo.gl/LxDaykrG1J86KRDh9",
      },
    ],
    Shop: [
      {
        name: "Sydney Market",
        image: "media/footlocker.webp",
        description: "A bustling marketplace with local crafts and souvenirs.",
        location: "456 Dock St, Sydney",
        rating: 4.2,
        sides: ["10% discount"],
        map: "redirect.html?url=https://www.google.com/maps/place/The+Waterfront+Bistro/@-33.8688,151.2093,17z/data=!3m1!4b1!4m5!3m4!1s0x6b12ae37b1cf754b:0x6b12ae37b1cf754c!8m2!3d-33.8688!4d151.2093",
      },
    ],
    Tour: [
      {
        name: "Sydney Harbor Cruise",
        image: "image3.jpg",
        description: "A guided tour of the harbor and surrounding waters.",
        location: "789 Pier St, Sydney",
        rating: 4.8,
        map: "googl.com",
      },
    ],
    Hotels: [
      {
        name: "Sydney Harbor Cruise",
        image: "image3.jpg",
        description: "A guided tour of the harbor and surrounding waters.",
        location: "789 Pier St, Sydney",
        rating: 4.8,
        map: "googl.com",
      },
    ],
    Hacks: [
      {
        name: "Sydney Harbor Cruise",
        image: "image3.jpg",
        description: "A guided tour of the harbor and surrounding waters.",
        location: "789 Pier St, Sydney",
        rating: 4.8,
        map: "googl.com",
      },
    ],
  },

  {
    terminal: "Cairns Cruise Terminal",
    location: "Cairns",
    coverImage: "media/cairns.jpeg",
    images: ["media/0527-0634_sydney-circular-quay.jpg", "media/sydney-3.jpg"],
    details: "fas fa-anchor",
    categories: {
      Eat: [
        {
          name: "The Waterfront Bistro",
          image: "media/waterfront.webp",
          description:
            "A seafood restaurant with stunning views of the harbor.",
          location: "123 Main St, Sydney",
          rating: 4.5,
          sides: ["free Wifi", "WaterFront", "Live Music"],
          map: "https://maps.app.goo.gl/LxDaykrG1J86KRDh9",
        },
        {
          name: "Yoci Bakes & Sweets",
          image: "media/yoci.jpg",
          description:
            "A seafood restaurant with stunning views of the harbor.",
          location: "123 Main St, Circular quay, Sydney",
          rating: 4.5,
          sides: "Crew Favorite",
          map: "https://maps.app.goo.gl/LxDaykrG1J86KRDh9",
        },
        {
          name: "Eastbank Cafe Bar",
          image: "media/eastbank.jpg",
          description: "Fresh Dinner.",
          location: "123 Main St, Circular quay, Sydney",
          rating: 4.5,
          sides: "5 minute wait",
          map: "https://maps.app.goo.gl/LxDaykrG1J86KRDh9",
        },
      ],
      Shop: [
        {
          name: "Sydney Market",
          image: "media/footlocker.webp",
          description:
            "A bustling marketplace with local crafts and souvenirs.",
          location: "456 Dock St, Sydney",
          rating: 4.2,
          sides: ["10% discount"],
          map: "redirect.html?url=https://www.google.com/maps/place/The+Waterfront+Bistro/@-33.8688,151.2093,17z/data=!3m1!4b1!4m5!3m4!1s0x6b12ae37b1cf754b:0x6b12ae37b1cf754c!8m2!3d-33.8688!4d151.2093",
        },
      ],
      Tour: [
        {
          name: "Sydney Harbor Cruise",
          image: "image3.jpg",
          description: "A guided tour of the harbor and surrounding waters.",
          location: "789 Pier St, Sydney",
          rating: 4.8,
          map: "googl.com",
        },
      ],
      Hotels: [
        {
          name: "Sydney Harbor Cruise",
          image: "image3.jpg",
          description: "A guided tour of the harbor and surrounding waters.",
          location: "789 Pier St, Sydney",
          rating: 4.8,
          map: "googl.com",
        },
      ],
      Hacks: [
        {
          name: "Sydney Harbor Cruise",
          image: "image3.jpg",
          description: "A guided tour of the harbor and surrounding waters.",
          location: "789 Pier St, Sydney",
          rating: 4.8,
          map: "googl.com",
        },
      ],
    },
  },

  {
    terminal: "Mystery Island",
    location: "Vanuatu",
    coverImage: "media/mystery island.jpeg",
    images: ["media/0527-0634_sydney-circular-quay.jpg", "media/sydney-3.jpg"],
    details: "fas fa-ship",
    categories: {
      Eat: [
        {
          name: "The Waterfront Bistro",
          image: "media/waterfront.webp",
          description:
            "A seafood restaurant with stunning views of the harbor.",
          location: "123 Main St, Sydney",
          rating: 4.5,
          sides: ["free Wifi", "WaterFront", "Live Music"],
          map: "https://maps.app.goo.gl/LxDaykrG1J86KRDh9",
        },
        {
          name: "Yoci Bakes & Sweets",
          image: "media/yoci.jpg",
          description:
            "A seafood restaurant with stunning views of the harbor.",
          location: "123 Main St, Circular quay, Sydney",
          rating: 4.5,
          sides: "Crew Favorite",
          map: "https://maps.app.goo.gl/LxDaykrG1J86KRDh9",
        },
        {
          name: "Eastbank Cafe Bar",
          image: "media/eastbank.jpg",
          description: "Fresh Dinner.",
          location: "123 Main St, Circular quay, Sydney",
          rating: 4.5,
          sides: "5 minute wait",
          map: "https://maps.app.goo.gl/LxDaykrG1J86KRDh9",
        },
      ],
      Shop: [
        {
          name: "Sydney Market",
          image: "media/footlocker.webp",
          description:
            "A bustling marketplace with local crafts and souvenirs.",
          location: "456 Dock St, Sydney",
          rating: 4.2,
          sides: ["10% discount"],
          map: "redirect.html?url=https://www.google.com/maps/place/The+Waterfront+Bistro/@-33.8688,151.2093,17z/data=!3m1!4b1!4m5!3m4!1s0x6b12ae37b1cf754b:0x6b12ae37b1cf754c!8m2!3d-33.8688!4d151.2093",
        },
      ],
      Tour: [
        {
          name: "Sydney Harbor Cruise",
          image: "image3.jpg",
          description: "A guided tour of the harbor and surrounding waters.",
          location: "789 Pier St, Sydney",
          rating: 4.8,
          map: "googl.com",
        },
      ],
      Hotels: [
        {
          name: "Sydney Harbor Cruise",
          image: "image3.jpg",
          description: "A guided tour of the harbor and surrounding waters.",
          location: "789 Pier St, Sydney",
          rating: 4.8,
          map: "googl.com",
        },
      ],
      Hacks: [
        {
          name: "Sydney Harbor Cruise",
          image: "image3.jpg",
          description: "A guided tour of the harbor and surrounding waters.",
          location: "789 Pier St, Sydney",
          rating: 4.8,
          map: "googl.com",
        },
      ],
    },
  },

  {
    terminal: "Tangalooma",
    location: "Moreton Island",
    coverImage: "media/moreton.jpeg",
    images: ["media/0527-0634_sydney-circular-quay.jpg", "media/sydney-3.jpg"],
    details: "fas fa-ship",
    categories: {
      Eat: [
        {
          name: "The Waterfront Bistro",
          image: "media/waterfront.webp",
          description:
            "A seafood restaurant with stunning views of the harbor.",
          location: "123 Main St, Sydney",
          rating: 4.5,
          sides: ["free Wifi", "WaterFront", "Live Music"],
          map: "https://maps.app.goo.gl/LxDaykrG1J86KRDh9",
        },
        {
          name: "Yoci Bakes & Sweets",
          image: "media/yoci.jpg",
          description:
            "A seafood restaurant with stunning views of the harbor.",
          location: "123 Main St, Circular quay, Sydney",
          rating: 4.5,
          sides: "Crew Favorite",
          map: "https://maps.app.goo.gl/LxDaykrG1J86KRDh9",
        },
        {
          name: "Eastbank Cafe Bar",
          image: "media/eastbank.jpg",
          description: "Fresh Dinner.",
          location: "123 Main St, Circular quay, Sydney",
          rating: 4.5,
          sides: "5 minute wait",
          map: "https://maps.app.goo.gl/LxDaykrG1J86KRDh9",
        },
      ],
      Shop: [
        {
          name: "Sydney Market",
          image: "media/footlocker.webp",
          description:
            "A bustling marketplace with local crafts and souvenirs.",
          location: "456 Dock St, Sydney",
          rating: 4.2,
          sides: ["10% discount"],
          map: "redirect.html?url=https://www.google.com/maps/place/The+Waterfront+Bistro/@-33.8688,151.2093,17z/data=!3m1!4b1!4m5!3m4!1s0x6b12ae37b1cf754b:0x6b12ae37b1cf754c!8m2!3d-33.8688!4d151.2093",
        },
      ],
      Tour: [
        {
          name: "Sydney Harbor Cruise",
          image: "image3.jpg",
          description: "A guided tour of the harbor and surrounding waters.",
          location: "789 Pier St, Sydney",
          rating: 4.8,
          map: "googl.com",
        },
      ],
      Hotels: [
        {
          name: "Sydney Harbor Cruise",
          image: "image3.jpg",
          description: "A guided tour of the harbor and surrounding waters.",
          location: "789 Pier St, Sydney",
          rating: 4.8,
          map: "googl.com",
        },
      ],
      Hacks: [
        {
          name: "Sydney Harbor Cruise",
          description: "A guided tour of the harbor and surrounding waters.",
          location: "789 Pier St, Sydney",
          rating: 4.8,
          map: "googl.com",
        },
      ],
    },
  },*/
];
