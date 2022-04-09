const express = require('express');
require('dotenv').config();
const morgan = require('morgan');
const db = require('./db');
const cors = require('cors');

const app = express();

// app.use((req, res, next) => {
//   console.log('Our middleware ran');
//   next();
// });

// app.use(morgan('dev '));

app.use(cors({ origin: '*' }));

app.use(express.json());
const PORT = process.env.PORT || 3001;

app.get('/api/v1/restaurants', async (req, res) => {
  try {
    const results = await db.query(
      'select * from restaurants left join (select restaurantid, COUNT(*), TRUNC(AVG(rating),1) as average_rating from reviews group by restaurantid) reviews on restaurants.id = reviews.restaurantid'
    );
    const { rows } = results;
    res.status(200).json({
      results: rows.length,
      data: {
        restaurants: rows,
      },
    });
  } catch (error) {
    console.log(error);
  }
});

app.get('/api/v1/restaurants/:id', async (req, res) => {
  try {
    const result = await db.query(
      'select * from restaurants left join (select restaurantid, COUNT(*), TRUNC(AVG(rating),1) as average_rating from reviews group by restaurantid) reviews on restaurants.id = reviews.restaurantid WHERE id = $1',
      [req.params.id]
    );
    const { rows } = result;
    res.status(rows.length ? 200 : 404).json({
      results: rows.length,
      data: {
        restaurants: rows[0],
      },
    });
  } catch (error) {
    console.log(error);
  }
});

app.post('/api/v1/restaurants', async (req, res) => {
  console.log(req);
  try {
    const results = await db.query(
      'INSERT INTO restaurants (name, location, price_range) VALUES($1, $2, $3) returning *',
      //returning returns newly created restaurant
      [req.body.name, req.body.location, req.body.price_range]
    );
    const { rows } = results;
    res.status(201).json({
      data: {
        restaurants: rows[0],
      },
    });
  } catch (error) {
    console.log(error);
  }
});

app.put('/api/v1/restaurants/:id', async (req, res) => {
  try {
    const response = await db.query(
      'UPDATE restaurants SET name = $1, location = $2, price_range = $3 WHERE id = $4 returning *',
      [req.body.name, req.body.location, req.body.price_range, req.params.id]
    );
    const { rows } = response;
    res.status(200).json({
      data: {
        restaurants: rows[0],
      },
    });
  } catch (error) {
    console.log(error);
  }
});

app.delete('/api/v1/restaurants/:id', async (req, res) => {
  try {
    await db.query('DELETE FROM restaurants WHERE id = $1', [req.params.id]);
    res.status(204).json({});
  } catch (error) {
    console.log(error);
  }
});

app.get('/api/v1/restaurants/:id/reviews', async (req, res) => {
  try {
    const response = await db.query(
      'SELECT * from reviews WHERE restaurantid = $1',
      [req.params.id]
    );
    const { rows } = response;

    res.status(200).json({
      data: {
        reviews: rows,
      },
    });
  } catch (error) {
    console.log(error);
  }
});

app.post('/api/v1/restaurants/:id/add-review', async (req, res) => {
  try {
    const response = await db.query(
      'INSERT INTO reviews (restaurantid, name, review, rating) VALUES ($1, $2, $3, $4) returning *',
      [req.body.restaurantId, req.body.name, req.body.review, req.body.rating]
    );
    const { rows } = response;
    res.status(200).json({
      data: {
        reviews: rows[0],
      },
    });
  } catch (error) {
    console.log(error);
  }
});
app.listen(PORT, () => {
  console.log(`server is up and listening on ${PORT}`);
});
