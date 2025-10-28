-- SQL migration to add new fields for artwork landing pages
-- Run this in your Neon database console

ALTER TABLE artworks 
ADD COLUMN IF NOT EXISTS story TEXT,
ADD COLUMN IF NOT EXISTS created_date DATE,
ADD COLUMN IF NOT EXISTS dimensions VARCHAR(100),
ADD COLUMN IF NOT EXISTS year INTEGER,
ADD COLUMN IF NOT EXISTS technique VARCHAR(200),
ADD COLUMN IF NOT EXISTS inspiration TEXT,
ADD COLUMN IF NOT EXISTS certificate_id VARCHAR(50);

-- Add some sample data for the existing artworks
-- You can customize these stories and details

UPDATE artworks SET 
  story = 'This piece explores the intersection of light and shadow, capturing a moment of quiet contemplation. The geometric forms dance across the canvas, creating a dialogue between structure and chaos that reflects our modern urban experience.',
  year = 2024,
  dimensions = '24" x 36"',
  technique = 'Digital mixed media',
  inspiration = 'Inspired by the early morning light filtering through my studio window',
  certificate_id = 'TWA-' || LPAD(id::text, 4, '0')
WHERE id = 1;

UPDATE artworks SET 
  story = 'A study in contrast and balance, this work represents the delicate equilibrium we seek in our daily lives. The flowing lines suggest movement and change, while the stable geometric elements provide grounding and structure.',
  year = 2024,
  dimensions = '30" x 40"',
  technique = 'Digital painting with traditional elements',
  inspiration = 'The rhythm of city life and the need for moments of stillness',
  certificate_id = 'TWA-' || LPAD(id::text, 4, '0')
WHERE id = 2;

UPDATE artworks SET 
  story = 'This abstract composition emerged from a period of deep introspection about connection and isolation in the digital age. The layered textures represent the complexity of human emotion, while the color palette evokes both warmth and distance.',
  year = 2024,
  dimensions = '20" x 24"',
  technique = 'Digital collage and painting',
  inspiration = 'The paradox of being connected yet alone in our modern world',
  certificate_id = 'TWA-' || LPAD(id::text, 4, '0')
WHERE id = 3;

-- Continue for other artworks...
-- You can add specific stories for each piece