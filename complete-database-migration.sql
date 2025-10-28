-- Complete database migration to add story and metadata columns
-- Run this in your Neon database console

-- Step 1: Add all new columns
ALTER TABLE artworks 
ADD COLUMN IF NOT EXISTS story TEXT,
ADD COLUMN IF NOT EXISTS created_date DATE,
ADD COLUMN IF NOT EXISTS dimensions VARCHAR(100),
ADD COLUMN IF NOT EXISTS year INTEGER,
ADD COLUMN IF NOT EXISTS technique VARCHAR(200),
ADD COLUMN IF NOT EXISTS inspiration TEXT,
ADD COLUMN IF NOT EXISTS certificate_id VARCHAR(50);

-- Step 2: Add stories and metadata for all artworks
-- You can customize these stories to match your actual artworks

-- TIM_IMG_001.png
UPDATE artworks SET 
  story = 'This piece explores the intersection of light and shadow, capturing a moment of quiet contemplation. The geometric forms dance across the canvas, creating a dialogue between structure and chaos that reflects our modern urban experience. Each brushstroke represents a choice between order and spontaneity, mirroring the decisions we make in our daily lives.',
  year = 2025,
  dimensions = '24" x 36"',
  technique = 'Digital mixed media',
  inspiration = 'Inspired by the early morning light filtering through my studio window, casting long shadows that seemed to tell their own stories',
  certificate_id = 'TWA-' || LPAD(id::text, 4, '0')
WHERE id = 1;

-- TIM_IMG_002.png
UPDATE artworks SET 
  story = 'A study in contrast and balance, this work represents the delicate equilibrium we seek in our daily lives. The flowing lines suggest movement and change, while the stable geometric elements provide grounding and structure. This piece emerged from a period of personal transition, where finding balance became both a necessity and an art form.',
  year = 2025,
  dimensions = '30" x 40"',
  technique = 'Digital painting with traditional elements',
  inspiration = 'The rhythm of city life and the need for moments of stillness in our fast-paced world',
  certificate_id = 'TWA-' || LPAD(id::text, 4, '0')
WHERE id = 2;

-- TIM_IMG_003.png
UPDATE artworks SET 
  story = 'This abstract composition emerged from a period of deep introspection about connection and isolation in the digital age. The layered textures represent the complexity of human emotion, while the color palette evokes both warmth and distance. It speaks to our fundamental need for authentic connection in an increasingly virtual world.',
  year = 2025,
  dimensions = '20" x 24"',
  technique = 'Digital collage and painting',
  inspiration = 'The paradox of being connected yet alone in our modern world, and the search for genuine human connection',
  certificate_id = 'TWA-' || LPAD(id::text, 4, '0')
WHERE id = 3;

-- TIM_IMG_004.png
UPDATE artworks SET 
  story = 'Born from the tension between tradition and innovation, this piece challenges conventional perspectives on form and space. The bold strokes and vibrant colors create a sense of energy and movement that speaks to the dynamic nature of artistic expression in the 21st century.',
  year = 2025,
  dimensions = '28" x 22"',
  technique = 'Mixed digital media with textural elements',
  inspiration = 'The constant evolution of artistic expression and the courage to break from conventional boundaries',
  certificate_id = 'TWA-' || LPAD(id::text, 4, '0')
WHERE id = 4;

-- TIM_IMG_005.png
UPDATE artworks SET 
  story = 'This work explores the concept of memory and time, with layers that reveal and conceal different moments and emotions. The interplay of transparent and opaque elements creates depth that invites viewers to discover their own narrative within the composition.',
  year = 2025,
  dimensions = '32" x 24"',
  technique = 'Layered digital composition',
  inspiration = 'The way memories layer upon each other, creating a complex tapestry of human experience',
  certificate_id = 'TWA-' || LPAD(id::text, 4, '0')
WHERE id = 5;

-- TIM_IMG_006.png
UPDATE artworks SET 
  story = 'A meditation on the relationship between nature and technology, this piece merges organic forms with digital precision. The resulting composition suggests a future where the boundaries between natural and artificial become beautifully blurred.',
  year = 2025,
  dimensions = '26" x 38"',
  technique = 'Bio-digital fusion technique',
  inspiration = 'The evolving relationship between humanity, nature, and technology in our changing world',
  certificate_id = 'TWA-' || LPAD(id::text, 4, '0')
WHERE id = 6;

-- TIM_IMG_007.png
UPDATE artworks SET 
  story = 'This piece captures the essence of transformation and growth. The swirling patterns and evolving forms represent the constant state of change that defines both art and life. It speaks to the beauty found in moments of transition and uncertainty.',
  year = 2025,
  dimensions = '24" x 30"',
  technique = 'Dynamic digital brushwork',
  inspiration = 'The transformative power of art to capture and express the constant evolution of human experience',
  certificate_id = 'TWA-' || LPAD(id::text, 4, '0')
WHERE id = 7;

-- TIM_IMG_008.png
UPDATE artworks SET 
  story = 'An exploration of rhythm and repetition, this work draws inspiration from musical compositions and the patterns that emerge from both structure and improvisation. The visual cadence creates a symphony of color and form that resonates with viewers on multiple levels.',
  year = 2025,
  dimensions = '36" x 24"',
  technique = 'Rhythmic composition technique',
  inspiration = 'The intersection of visual art and music, and how rhythm transcends sensory boundaries',
  certificate_id = 'TWA-' || LPAD(id::text, 4, '0')
WHERE id = 8;

-- TIM_IMG_009.png
UPDATE artworks SET 
  story = 'This contemplative piece invites viewers into a space of quiet reflection. The subtle color transitions and gentle forms create an atmosphere of peace and introspection, offering a visual sanctuary from the chaos of modern life.',
  year = 2025,
  dimensions = '22" x 28"',
  technique = 'Meditative color blending',
  inspiration = 'The importance of creating spaces for contemplation and inner peace in our busy world',
  certificate_id = 'TWA-' || LPAD(id::text, 4, '0')
WHERE id = 9;

-- TIM_IMG_010.png
UPDATE artworks SET 
  story = 'A bold statement about energy and vitality, this piece pulses with life and movement. The dynamic composition and vibrant palette capture the exhilaration of creative expression at its most uninhibited and joyful.',
  year = 2025,
  dimensions = '30" x 30"',
  technique = 'High-energy digital expression',
  inspiration = 'The pure joy and vitality that comes from uninhibited creative expression',
  certificate_id = 'TWA-' || LPAD(id::text, 4, '0')
WHERE id = 10;

-- TIM_IMG_011.png
UPDATE artworks SET 
  story = 'This piece explores the delicate balance between fragility and strength. The ethereal quality of the composition belies the powerful emotions and deep thoughts that inspired its creation, creating a work that is both gentle and profound.',
  year = 2025,
  dimensions = '24" x 32"',
  technique = 'Ethereal digital layering',
  inspiration = 'The paradox of strength found in vulnerability and the beauty of delicate resilience',
  certificate_id = 'TWA-' || LPAD(id::text, 4, '0')
WHERE id = 11;

-- TIM_IMG_012.png
UPDATE artworks SET 
  story = 'An investigation into the concept of space and dimension, this work challenges perceptual boundaries and invites viewers to question their understanding of visual reality. The interplay of depth and surface creates an engaging visual puzzle.',
  year = 2025,
  dimensions = '28" x 34"',
  technique = 'Dimensional manipulation technique',
  inspiration = 'The fascinating ways that art can challenge and expand our perception of reality and space',
  certificate_id = 'TWA-' || LPAD(id::text, 4, '0')
WHERE id = 12;

-- TIM_IMG_013.png
UPDATE artworks SET 
  story = 'This work celebrates the power of imagination and the endless possibilities that emerge when creativity is given free rein. The fantastical elements and dreamlike quality invite viewers to rediscover their own sense of wonder and possibility.',
  year = 2025,
  dimensions = '26" x 26"',
  technique = 'Imaginative digital composition',
  inspiration = 'The boundless power of imagination and the importance of maintaining wonder in our adult lives',
  certificate_id = 'TWA-' || LPAD(id::text, 4, '0')
WHERE id = 13;

-- TIM_IMG_014.png
UPDATE artworks SET 
  story = 'A synthesis of all previous explorations, this piece represents a culmination of artistic growth and experimentation. It combines elements from various techniques and themes, creating a unified work that speaks to the evolution of both artist and art.',
  year = 2025,
  dimensions = '32" x 40"',
  technique = 'Synthetic composition technique',
  inspiration = 'The journey of artistic growth and the beauty found in bringing together diverse experiences and techniques',
  certificate_id = 'TWA-' || LPAD(id::text, 4, '0')
WHERE id = 14;

-- TIM_IMG_015.png
UPDATE artworks SET 
  story = 'The newest addition to the collection, this piece represents the current moment in an ongoing artistic journey. It captures the excitement of new discoveries and the anticipation of future creative adventures, embodying the endless potential of artistic expression.',
  year = 2025,
  dimensions = '30" x 36"',
  technique = 'Contemporary digital expression',
  inspiration = 'The excitement of new beginnings and the endless potential for artistic discovery and growth',
  certificate_id = 'TWA-' || LPAD(id::text, 4, '0')
WHERE id = 15;

-- Add default values for any additional artworks that might exist
UPDATE artworks SET 
  story = COALESCE(story, 'This beautiful piece represents a unique moment in my artistic journey. Each artwork tells its own story through color, form, and emotion, inviting viewers to discover their own connection with the work.'),
  year = COALESCE(year, 2025),
  dimensions = COALESCE(dimensions, 'Contact for details'),
  technique = COALESCE(technique, 'Mixed digital media'),
  inspiration = COALESCE(inspiration, 'Inspired by the endless possibilities of artistic expression'),
  certificate_id = COALESCE(certificate_id, 'TWA-' || LPAD(id::text, 4, '0'))
WHERE story IS NULL OR year IS NULL OR dimensions IS NULL OR technique IS NULL OR inspiration IS NULL OR certificate_id IS NULL;

-- Verify the migration
SELECT id, title, LEFT(story, 50) as story_preview, year, dimensions, technique 
FROM artworks 
ORDER BY id;