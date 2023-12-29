// seed.ts

import { PrismaClient } from '../src/lib/generated';

const prisma = new PrismaClient();

async function main() {
  // Seed authors
  const authors = [
    {
      id: '918cd165-dcb4-45a2-97fb-25e07e7de643',
      name: 'Franz Kafka',
      biography: 'Biography for Franz Kafka',
      birthDate: new Date('1883-07-03'),
    },
    {
      id: '88aec512-7ab6-4273-b675-743b634eda8d',
      name: 'Fyodor Dostoevsky',
      biography: 'Biography for Fyodor Dostoevsky',
      birthDate: new Date('1821-11-11'),
    },
    {
      id: '54649730-4258-4b69-b7c5-f092dc821894',
      name: 'Alexander Dumas',
      biography: 'Biography for Alexander Dumas',
      birthDate: new Date('1802-07-24'),
    },
    {
      id: '3cb5e94e-0dce-4306-871e-b48335af8a04',
      name: 'Søren Kierkegaard',
      biography: 'Biography for Søren Kierkegaard',
      birthDate: new Date('1813-05-05'),
    },
    {
      id: '64aa3380-5730-4f58-bb08-3245c50f8327',
      name: 'Knut Hamsun',
      biography: 'Biography for Knut Hamsun',
      birthDate: new Date('1859-08-04'),
    },
  ];

  for (const authorData of authors) {
    await prisma.author.upsert({
      where: { id: authorData.id },
      update: {},
      create: authorData,
    });
  }

  // Seed genres
  const genres = [
    {
      id: '29973bea-848b-481e-b961-61a4cc3029e1',
      name: 'Novel',
      description: 'A fictional narrative in prose.',
    },
    {
      id: '15331513-d24d-4beb-a978-64e67424fd07',
      name: 'Philosophy',
      description:
        'The study of fundamental questions about existence, knowledge, values, reason, mind, and language.',
    },
    {
      id: 'd6c64ccb-24c6-44ca-a12f-bc7811fd6de3',
      name: 'Adventure',
      description:
        'A genre of fiction that involves an exciting or risky undertaking.',
    },
  ];

  for (const genreData of genres) {
    await prisma.genre.upsert({
      where: { id: genreData.id },
      update: {},
      create: genreData,
    });
  }

  // Seed books
  const books = [
    {
      id: '0acc979b-0b88-43ea-b593-31dd39c90dad',
      title: 'Metamorphosis',
      description: 'A novel about a man who wakes up as a giant insect.',
      publicationYear: 1915,
      authorName: 'Franz Kafka',
      genreName: 'Novel',
    },
    {
      id: '321a746c-915d-4159-afd7-dbab9975ab59',
      title: 'Crime and Punishment',
      description: 'A psychological novel exploring morality and guilt.',
      publicationYear: 1866,
      authorName: 'Fyodor Dostoevsky',
      genreName: 'Novel',
    },
    {
      id: '14cfc312-a26a-4f49-8d5b-7974d0b18728',
      title: 'The Count of Monte Cristo',
      description: 'An adventure novel by Alexander Dumas.',
      publicationYear: 1844,
      authorName: 'Alexander Dumas',
      genreName: 'Adventure',
    },
    {
      id: 'd175f24e-dd93-4a62-b807-0e03be53ddac',
      title: 'Fear and Trembling',
      description: 'A philosophical work by Søren Kierkegaard.',
      publicationYear: 1843,
      authorName: 'Søren Kierkegaard',
      genreName: 'Philosophy',
    },
    {
      id: '71e530d2-8d9d-40fc-9b67-276a60776f34',
      title: 'Hunger',
      description: 'A novel by Knut Hamsun.',
      publicationYear: 1890,
      authorName: 'Knut Hamsun',
      genreName: 'Novel',
    },
  ];

  for (const bookData of books) {
    const author = await prisma.author.findFirstOrThrow({
      where: { name: bookData.authorName },
    });
    const genre = await prisma.genre.findFirstOrThrow({
      where: { name: bookData.genreName },
    });

    await prisma.book.upsert({
      where: { id: bookData.id },
      update: {},
      create: {
        title: bookData.title,
        description: bookData.description,
        publicationYear: bookData.publicationYear,
        authorId: author.id,
        bookGenre: { create: { genreId: genre.id } },
      },
    });
  }

  console.log('Seed data successfully created.');
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
