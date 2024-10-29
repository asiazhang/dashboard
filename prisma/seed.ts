import { PrismaClient } from '@prisma/client';
import { Logger, ILogObj } from 'tslog';

const log: Logger<ILogObj> = new Logger();
const prisma = new PrismaClient();
async function seed() {
  await seedProjects();
  await seedUsers();
  await seedTestImages();
  await seedTestTasks();
}

async function seedProjects() {
  log.debug('seeding projects');

  const project1 = await prisma.project.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: '架构云',
    },
  });

  const project2 = await prisma.project.upsert({
    where: { id: 2 },
    update: {},
    create: {
      name: '大数据',
    },
  });

  const project3 = await prisma.project.upsert({
    where: { id: 3 },
    update: {},
    create: {
      name: '区块链',
    },
  });

  log.debug(project1, project2, project3);
}

async function seedUsers() {
  log.debug('seeding user data');
  const user1 = await prisma.user.upsert({
    where: { nameEn: 'pinhenzhang', id: 1 },
    update: {},
    create: {
      nameEn: 'pinhenzhang',
      name: '张恒',
      email: 'pinhenzhang@tencent.com',
      projects: {
        create: [
          {
            project: {
              connect: {
                id: 1,
              },
            },
          },
          {
            project: {
              connect: {
                id: 2,
              },
            },
          },
        ],
      },
    },
  });

  const user2 = await prisma.user.upsert({
    where: { nameEn: 'zixingdeng', id: 2 },
    update: {},
    create: {
      nameEn: 'zixingdeng',
      name: '邓子星',
      email: 'zixingdeng@tencent.com',
      projects: {
        create: [
          {
            project: {
              connect: {
                id: 1,
              },
            },
          },
          {
            project: {
              connect: {
                id: 3,
              },
            },
          },
        ],
      },
    },
  });

  const user3 = await prisma.user.upsert({
    where: { nameEn: 'dontezhang', id: 3 },
    update: {},
    create: {
      nameEn: 'dontezhang',
      name: '张磊',
      email: 'dontezhang@tencent.com',
      projects: {
        create: [
          {
            project: {
              connect: {
                id: 2,
              },
            },
          },
          {
            project: {
              connect: {
                id: 3,
              },
            },
          },
        ],
      },
    },
  });

  log.debug(user1, user2, user3);
}

async function seedTestImages() {
  log.debug('seeding test image data');
  await prisma.testImage.deleteMany({
    where: {
      id: {
        in: [1, 2, 3],
      },
    },
  });
  const image1 = await prisma.testImage.create({
    data: {
      name: 'tcr.tencent.cloud.com/party/taas/native/demo',
      toolName: 'pytest',
      userId: 1,
      count: 5,
      projectId: 1,
    },
  });
  const image2 = await prisma.testImage.create({
    data: {
      name: 'tcr.tencent.cloud.com/party/taas/fastly',
      userId: 3,
      count: 7,
      toolName: 'ginkgo',
      projectId: 1,
    },
  });
  const image3 = await prisma.testImage.create({
    data: {
      name: 'tcr.tencent.cloud.com/party/taas/pytest',
      userId: 1,
      count: 4,
      toolName: 'pytest',
      projectId: 1,
    },
  });
  const image4 = await prisma.testImage.create({
    data: {
      name: 'tcr.tencent.cloud.com/party/taas/jest-demo',
      userId: 2,
      count: 0,
      toolName: 'jest',
      projectId: 1,
    },
  });

  log.debug(image1, image2, image3, image4);
}

async function seedTestTasks() {
  log.debug('seeding test task data');
  await prisma.testTask.deleteMany({
    where: {
      id: {
        in: [1, 2, 3],
      },
    },
  });
  const task1 = await prisma.testTask.create({
    data: {
      name: 'TestSolar Dashboard E2E 自动化测试（定时验收）',
      userId: 1,
      projectId: 1,
    },
  });

  const task2 = await prisma.testTask.create({
    data: {
      name: 'NAT测试(IPv6-广州)',
      userId: 2,
      projectId: 1,
    },
  });

  const task3 = await prisma.testTask.create({
    data: {
      name: 'AI评估测试-(OpenAI/混元/千问/Claude/Gemini)',
      userId: 2,
      projectId: 1,
    },
  });

  const task4 = await prisma.testTask.create({
    data: {
      name: 'AI评估测试-(OpenAI/混元/千问/Claude/Gemini)',
      userId: 1,
      projectId: 2,
    },
  });

  log.debug(task1, task2, task3, task4);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
