-- Migration: Add featured column to artworks table
-- Run this after the initial schema creation

ALTER TABLE artworks ADD COLUMN IF NOT EXISTS featured BOOLEAN DEFAULT false;

-- Optionally, set some artworks as featured
-- UPDATE artworks SET featured = true WHERE id IN (2, 5, 8, 11, 14);
