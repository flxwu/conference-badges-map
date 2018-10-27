import logger from './logger';

// const checkIfDuplicate = async (badgesDB, name) => {
//   let isDuplicate = false;

//   const gotAll = async data => {
//     let projectsList = await data.val();
//     if (projectsList) {
//       isDuplicate = Object.values(projectsList).some(
//         project => project.url === url
//       );
//     }
//   };

//   await projectDB.on('value', gotAll);
//   return isDuplicate;
// };

const deleteProjectFromDB = async (database, key) => {
  await database.ref(`badges/${key}`)
    .remove()
    .then((res) => logger('[FIREBASE] DB Delete Success: ' + key))
    .then((err) => logger(`[FIREBASE] Error while deleting entry ${key}: ${err}`));
};

// firebase callback after push finished
const finished = err => {
  if (err) {
    logger('[FIREBASE] Error while pushing new entry: ' + err, 1);
  } else {
    logger('[FIREBASE] DB Push Success');
  }
};

module.exports = {
  paginate,
  finished,
  checkIfDuplicate,
  deleteProjectFromDB
};