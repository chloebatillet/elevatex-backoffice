import { db } from "./simple-connect";
// import * as schema from "./schema";
import {
  UsersTable,
  ProductsTable,
  OrdersTable,
  OrderDetailsTable,
} from "./schema";

export const seed = async () => {
  try {
    console.log(`Seeding...`);

    // Empty DB -------------
    await db.delete(OrderDetailsTable);
    await db.delete(OrdersTable);
    await db.delete(UsersTable);
    await db.delete(ProductsTable);

    // Insert data
    await db.insert(ProductsTable).values([
      {
        title: "ElevateX Pro",
        price: 199.99,
        slug: "elevatex-pro",
        description:
          "Experience unparalleled comfort and advanced performance with the ElevateX Pro. Its innovative design combines lightweight materials and state-of-the-art cushioning technology.",
        composition:
          "Upper: Synthetic mesh, Midsole: EVA foam, Outsole: Rubber",
        entretien: "Spot clean with a damp cloth",
        colour: ["black"],
        collection: ["Neon"],
        likes: 1253,
        images: [
          "elevatex_pro_1.jpg",
          "elevatex_pro_2.jpg",
          "elevatex_pro_3.jpg",
          "elevatex_pro_4.jpg",
        ],
        releaseDate: "2023-01-15",
        size_range: [36, 37, 38, 39, 40, 41, 42, 43, 44, 45],
        size_available: [36, 37, 38, 39, 42, 45],
      },
      {
        title: "HyperStride XT",
        price: 179.99,
        slug: "hyperstride-xt",
        description:
          "Take your running to the next level with the HyperStride XT. Its responsive sole and breathable upper provide enhanced speed and agility.",
        composition:
          "Upper: Knit fabric, Midsole: React foam, Outsole: Carbon fiber",
        entretien: "Machine washable in cold water",
        colour: ["greenyellow"],
        collection: ["Neon"],
        likes: 1785,
        images: [
          "hyperstride_xt_1.jpg",
          "hyperstride_xt_2.jpg",
          "hyperstride_xt_3.jpg",
          "hyperstride_xt_4.jpg",
        ],
        releaseDate: "2023-01-15",
        size_range: [36, 37, 38, 39, 40, 41, 42, 43, 44, 45],
        size_available: [38, 41, 44],
      },
      {
        title: "QuantumSole 3000",
        price: 229.99,
        slug: "quantumsole-3000",
        description:
          "Step into the future with the QuantumSole 3000. Its advanced energy-return system and adaptive fit technology provide unmatched comfort and performance.",
        composition:
          "Upper: Synthetic leather, Midsole: Quantum foam, Outsole: Traction rubber",
        entretien: "Wipe clean with a soft cloth",
        colour: ["hotpink"],
        collection: ["Neon"],
        likes: 925,
        images: [
          "quantumsole_3000_1.jpg",
          "quantumsole_3000_2.jpg",
          "quantumsole_3000_3.jpg",
          "quantumsole_3000_4.jpg",
        ],
        releaseDate: "2023-01-15",
        size_range: [36, 37, 38, 39, 40, 41, 42, 43, 44, 45],
        size_available: [37, 40, 41, 43, 44, 45],
      },
      {
        title: "AeroTech Ultra",
        price: 219.99,
        slug: "aerotech-ultra",
        description:
          "Reach new heights with the AeroTech Ultra. Its lightweight construction and aerodynamic design give you the edge in speed and vertical leap.",
        composition:
          "Upper: Breathable mesh, Midsole: Air cushioning, Outsole: High-traction rubber",
        entretien: "Hand wash with mild detergent",
        colour: ["white"],
        collection: ["Neon"],
        likes: 2340,
        images: [
          "aerotech_ultra_1.jpg",
          "aerotech_ultra_2.jpg",
          "aerotech_ultra_3.jpg",
          "aerotech_ultra_4.jpg",
        ],
        releaseDate: "2023-01-15",
        size_range: [36, 37, 38, 39, 40, 41, 42, 43, 44, 45],
        size_available: [36, 39, 42, 45],
      },
      {
        title: "NovaGlide X",
        price: 189.99,
        slug: "novaglide-x",
        description:
          "Experience smooth and effortless strides with the NovaGlide X. Its streamlined design and responsive cushioning provide optimal comfort and performance.",
        composition:
          "Upper: Synthetic fabric, Midsole: Nova foam, Outsole: Durable rubber",
        entretien: "Spot clean with a damp cloth",
        colour: ["steelblue"],
        collection: ["Platinum"],
        likes: 3752,
        images: [
          "novaglide_x_1.jpg",
          "novaglide_x_2.jpg",
          "novaglide_x_3.jpg",
          "novaglide_x_4.jpg",
        ],
        releaseDate: "2024-01-15",
        size_range: [36, 37, 38, 39, 40, 41, 42, 43, 44, 45],
        size_available: [37, 38, 41, 44],
      },
      {
        title: "SynapseSprint Pro",
        price: 209.99,
        slug: "synapsesprint-pro",
        description:
          "Unleash your speed with the SynapseSprint Pro. Its lightweight and breathable construction, along with superior traction, make it the ultimate racing shoe.",
        composition:
          "Upper: Synthetic mesh, Midsole: EVA foam, Outsole: High-grip rubber",
        entretien: "Spot clean with a damp cloth",
        colour: ["dimgrey"],
        collection: ["Platinum"],
        likes: 2387,
        images: [
          "synapsesprint_pro_1.jpg",
          "synapsesprint_pro_2.jpg",
          "synapsesprint_pro_3.jpg",
          "synapsesprint_pro_4.jpg",
        ],
        releaseDate: "2024-01-15",
        size_range: [36, 37, 38, 39, 40, 41, 42, 43, 44, 45],
        size_available: [36, 39, 42, 45],
      },
      {
        title: "XenoShift Evo",
        price: 249.99,
        slug: "xenoshift-evo",
        description:
          "Experience the next evolution in footwear technology with the XenoShift Evo. Its adaptive fit system and advanced stability features provide unparalleled support and performance.",
        composition:
          "Upper: Synthetic material, Midsole: Dynamic cushioning, Outsole: High-grip rubber",
        entretien: "Wipe clean with a damp cloth",
        colour: ["dimgrey"],
        collection: ["Platinum"],
        likes: 2089,
        images: [
          "xenoshift_evo_1.jpg",
          "xenoshift_evo_2.jpg",
          "xenoshift_evo_3.jpg",
          "xenoshift_evo_4.jpg",
        ],
        releaseDate: "2024-01-15",
        size_range: [36, 37, 38, 39, 40, 41, 42, 43, 44, 45],
        size_available: [37, 40, 43],
      },
      {
        title: "FusionFlex Max",
        price: 179.99,
        slug: "fusionflex-max",
        description:
          "Experience maximum flexibility and comfort with the FusionFlex Max. Its seamless design and adaptive sole technology provide a natural and responsive feel.",
        composition:
          "Upper: Stretchable fabric, Midsole: Flex foam, Outsole: Flexible rubber",
        entretien: "Machine washable in cold water",
        colour: ["dimgrey"],
        collection: ["Platinum"],
        likes: 3110,
        images: [
          "fusionflex_max_1.jpg",
          "fusionflex_max_2.jpg",
          "fusionflex_max_3.jpg",
          "fusionflex_max_4.jpg",
        ],
        releaseDate: "2024-01-15",
        size_range: [36, 37, 38, 39, 40, 41, 42, 43, 44, 45],
        size_available: [38, 41, 44],
      },
      {
        title: "NebulaKicks Pro",
        price: 199.99,
        slug: "nebulakicks-pro",
        description:
          "Step into the future with the NebulaKicks Pro. Its holographic upper and energy-absorbing sole deliver a unique blend of style and performance.",
        composition:
          "Upper: Synthetic holographic material, Midsole: Energy foam, Outsole: Non-marking rubber",
        entretien: "Wipe clean with a soft cloth",
        colour: ["rebeccapurple"],
        collection: ["Platinum"],
        likes: 1623,
        images: [
          "nebulakicks_pro_1.jpg",
          "nebulakicks_pro_2.jpg",
          "nebulakicks_pro_3.jpg",
          "nebulakicks_pro_4.jpg",
        ],
        releaseDate: "2024-01-15",
        size_range: [36, 37, 38, 39, 40, 41, 42, 43, 44, 45],
        size_available: [36, 37, 38, 40, 43],
      },
      {
        title: "CosmoRun Elite",
        price: 229.99,
        slug: "cosmorun-elite",
        description:
          "Embark on cosmic adventures with the CosmoRun Elite. Its anti-gravity technology and space-inspired design make it the ultimate choice for interstellar runs.",
        composition:
          "Upper: Lightweight synthetic fabric, Midsole: Anti-gravity foam, Outsole: Lunar traction rubber",
        entretien: "Spot clean with a damp cloth",
        colour: ["black"],
        collection: ["Platinum"],
        likes: 1875,
        images: [
          "cosmorun_elite_1.jpg",
          "cosmorun_elite_2.jpg",
          "cosmorun_elite_3.jpg",
          "cosmorun_elite_4.jpg",
        ],
        releaseDate: "2024-01-15",
        size_range: [36, 37, 38, 39, 40, 41, 42, 43, 44, 45],
        size_available: [39, 42, 45],
      },
      {
        title: "TechFlowX 2000",
        price: 209.99,
        slug: "techflowx-2000",
        description:
          "Experience the future of footwear technology with the TechFlowX 2000. Its advanced cushioning system and adaptive support provide a smooth and responsive ride.",
        composition:
          "Upper: Breathable synthetic mesh, Midsole: TechFlow foam, Outsole: High-traction rubber",
        entretien: "Wipe clean with a damp cloth",
        colour: ["white", "black"],
        collection: ["Ride"],
        likes: 1697,
        images: [
          "techflowx_2000_1_white.jpg",
          "techflowx_2000_2_white.jpg",
          "techflowx_2000_3_white.jpg",
          "techflowx_2000_4_white.jpg",
          "techflowx_2000_1_black.jpg",
          "techflowx_2000_2_black.jpg",
          "techflowx_2000_3_black.jpg",
          "techflowx_2000_4_black.jpg",
        ],
        releaseDate: "2023-06-15",
        size_range: [36, 37, 38, 39, 40, 41, 42, 43, 44, 45],
        size_available: [36, 38, 41, 43, 44],
      },
    ]);
    await db.insert(UsersTable).values([
      {
        firstname: "Chloé",
        lastname: "Batillet",
        email: "chloe@gmail.com",
        telephone: "0607080901",
        password: "truc",
      },
      {
        firstname: "Elon",
        lastname: "Musk",
        email: "elon@gmail.com",
        telephone: "0907080901",
        password: "truc",
      },
    ]);

    // await db.insert(OrdersTable).values([]);
    // await db.insert(OrderDetailsTable).values([]);

    console.log(`Seeded!`);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seed();
