import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.incident.deleteMany();
  await prisma.camera.deleteMany();

  await prisma.camera.createMany({
    data: [
      { name: 'North Gate Camera', location: 'North Entrance' },
      { name: 'Lobby Camera', location: 'Main Lobby' },
      { name: 'Parking Lot Cam', location: 'Basement Parking' },
    ],
  });

  const cameras = await prisma.camera.findMany();
  const now = new Date();

  for (let i = 0; i < 12; i++) {
    const start = new Date(now.getTime() - Math.random() * 24 * 60 * 60 * 1000);
    const end = new Date(start.getTime() + 15 * 60 * 1000);
    await prisma.incident.create({
      data: {
        cameraId: cameras[Math.floor(Math.random() * cameras.length)].id,
        type: ['Motion Detected', 'Unauthorized Entry', 'Fire Alarm'][i % 3],
        tsStart: start,
        tsEnd: end,
        thumbnailUrl: `https://placehold.co/400x200?text=Incident+${i + 1}`,
        videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        resolved: i % 3 === 0,
      },
    });
  }

  console.log('Seeding complete');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
