CREATE TABLE reviews (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    restaurantId BIGINT NOT NULL REFERENCES restaurants(id),
    name varchar(50) NOT NULL,
    review TEXT,
    rating INT check(rating >= 1 AND rating <= 5) NOT NULL
);