import express from 'express';
const router = express.Router();

let firebase = null;

router.get('/', (req, res, next) => {
	
});

export default function register(firebaseRef) {
  firebase = firebaseRef;
  return router;
}