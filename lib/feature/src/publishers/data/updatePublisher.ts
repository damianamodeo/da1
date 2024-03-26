import { useOrderlyDB } from '@data';

export const updatePublisher = async (id: string) => {
  console.log("🚀 ~ updatePublisher ~ id:", id)
  const db = await useOrderlyDB.use.db();
  const doc = db.publishers.findOne(id).exec();
  console.log('🚀 ~ updatePublisher ~ doc:', doc);

  await doc.update({
    $set: {
      firstName: 'foobar', // sets firstName to foobar
    },
  });
};
