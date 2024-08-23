const { PrismaClient } = require("@prisma/client");
const database = new PrismaClient();

async function main() {
  try {
    // Define the new category structure
    const categories = [
      {
        name: "IT & Software",
        subCategories: {
          create: [
            { name: "Web Development" },
            { name: "Data Science" },
            { name: "Cybersecurity" },
            { name: "Others" },
          ],
        },
      },
      {
        name: "Web Development",
        subCategories: {
          create: [
            { name: "Frontend Development" },
            { name: "Backend Development" },
            { name: "Full Stack Development" },
            { name: "Others" },
          ],
        },
      },
      {
        name: "Data Science",
        subCategories: {
          create: [
            { name: "Machine Learning" },
            { name: "Deep Learning" },
            { name: "Data Visualization" },
            { name: "Others" },
          ],
        },
      },
      {
        name: "Cybersecurity",
        subCategories: {
          create: [
            { name: "Network Security" },
            { name: "Application Security" },
            { name: "Information Security" },
            { name: "Others" },
          ],
        },
      },
    ];

    // Sequentially create each category with its subcategories
    for (const category of categories) {
      await database.category.create({
        data: {
          name: category.name,
          subCategories: category.subCategories,
        },
        include: {
          subCategories: true,
        },
      });
    }

    // Create levels
    await database.level.createMany({
      data: [
        { name: "Beginner" },
        { name: "Intermediate" },
        { name: "Expert" },
        { name: "All levels" },
      ],
    });

    console.log("Seeding successfully");
  } catch (error) {
    console.log("Seeding failed", error);
  } finally {
    await database.$disconnect();
  }
}

main();
