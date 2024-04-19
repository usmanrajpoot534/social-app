// prisma/seed.ts

import { PrismaClient } from '@prisma/client';

// initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
  // create two dummy articles
  const user1 = await prisma.user.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: 'Usman Arif',
      email: 'usmanarif534@gmail.com',
      age: 25,
      country: 'United States of America',
      role: 'ADMIN',
      posts: {
        create: [
          {
            title: 'Free Palestine',
            published: true,
            categories: { create: [{ name: 'Poll' }] },
          },
        ],
      },
    },
  });

  const user2 = await prisma.user.upsert({
    where: { id: 2 },
    update: {},
    create: {
      name: 'Ali Hassan',
      email: 'alihassan@gmail.com',
      age: 25,
      country: 'Pakistan',
      posts: {
        create: [
          {
            title: 'Free Pakistan',
            published: true,
            categories: { create: [{ name: 'Poll' }] },
          },
        ],
      },
    },
  });

  console.log({ user1, user2 });
}

// execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });
