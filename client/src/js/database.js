import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  //crteate a connection to the database
  const db = await initdb();
  //create a transaction
  const tx = db.transaction('jate', 'readwrite');
  //open up the object store
  const store = tx.objectStore('jate');
  //put the content in the object store
  await store.put(content);
  //wait for the transaction to complete
  await tx.done;
  //log that the database was updated
  console.log('jate database updated');
}

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  //create a connection to the database
  const db = await initdb();
  //create a transaction
  const tx = db.transaction('jate', 'readonly');
  //open up the object store
  const store = tx.objectStore('jate');
  //get all the content from the object store
  const allContent = await store.getAll();
  //wait for the transaction to complete
  await tx.done;
  //Check for content
  if (allContent.length === 0) {
    console.log('No content in database');
    return;
  }

  //return the content
  return allContent;
};

initdb();
