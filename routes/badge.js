import express from 'express';
const router = express.Router();
import fs from 'fs';
import axios from 'axios';
import stringSimilarity from 'string-similarity';

let rekognition = null;

/**
 * POST upload image to get text
 */
router.post('/upload', (req, res) => {
  const encodedImage = req.body.imageb64;

  var base64Image = encodedImage.split("data:image/jpeg;base64,")[1];
  const buffer = new Buffer(base64Image, 'base64');

  let params = {
    Image: {
      Bytes: buffer
    }
  };

  rekognition.detectText(params, function(err, data) {
    if (err) {
      console.error(err, err.stack); // an error occurred
    } else {
      res.send(
        data.TextDetections.reduce(function(filtered, option) {
          if (option.Confidence > 97) {
            filtered.push({
              text: option.DetectedText,
              confidence: option.Confidence
            });
          }
          return filtered;
        }, [])
      );
    }
  });
});

// define the about route
router.get('/conference', async (req, res) => {
  const conference = req.query.conf;
  const year = req.query.year || new Date().getFullYear();

  const conferences = await axios.get('https://webconf-api-2018.glitch.me/');

  let mostLikelyConf = {};
  let maxStringSimilarity = 0;

  for (let month in conferences.data) {
    for (let conf of conferences.data[month]) {
      if (
        new Date(conf.date.start).getFullYear() === year ||
        new Date(conf.date.end).getFullYear() === year
      ) {
        let similarity = stringSimilarity.compareTwoStrings(
          conference,
          conf.name
        );
        if (similarity > maxStringSimilarity) {
          maxStringSimilarity = similarity;
          mostLikelyConf = conf;
        }
      }
    }
	}
	
	res.json(mostLikelyConf);
});

export default function register(rekognitionRef) {
  rekognition = rekognitionRef;
  return router;
}
