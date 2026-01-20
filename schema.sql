-- Create tables for the art gallery application
-- This replaces the Prisma schema

CREATE TABLE IF NOT EXISTS artworks (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    medium TEXT NOT NULL,
    available BOOLEAN DEFAULT true,
    preorder BOOLEAN DEFAULT false,
    featured BOOLEAN DEFAULT false,
    src TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS artwork_likes (
    id SERIAL PRIMARY KEY,
    artwork_id INTEGER REFERENCES artworks(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Insert the 14 artworks
INSERT INTO artworks (title, medium, available, preorder, src) VALUES
('Eternal Whispers', 'Oil on Canvas', true, false, '/gallery/1.jpg'),
('Shadows of Memory', 'Acrylic on Canvas', false, true, '/gallery/2.jpg'),
('Silent Echoes', 'Mixed Media', true, false, '/gallery/3.jpg'),
('Midnight Reverie', 'Oil on Canvas', true, false, '/gallery/4.jpg'),
('Fragmented Dreams', 'Digital Art', false, true, '/gallery/5.jpg'),
('Timeless Solitude', 'Watercolor', true, false, '/gallery/6.jpg'),
('Phantom Landscapes', 'Oil on Canvas', true, false, '/gallery/7.jpg'),
('Veiled Emotions', 'Acrylic on Canvas', false, true, '/gallery/8.jpg'),
('Mystic Horizons', 'Mixed Media', true, false, '/gallery/9.jpg'),
('Ethereal Moments', 'Oil on Canvas', true, false, '/gallery/10.jpg'),
('Subdued Reflections', 'Charcoal on Paper', false, true, '/gallery/11.jpg'),
('Infinite Depths', 'Oil on Canvas', true, false, '/gallery/12.jpg'),
('Spectral Visions', 'Digital Art', true, false, '/gallery/13.jpg'),
('Monochrome Dreams', 'Acrylic on Canvas', false, true, '/gallery/14.jpg')
ON CONFLICT DO NOTHING;