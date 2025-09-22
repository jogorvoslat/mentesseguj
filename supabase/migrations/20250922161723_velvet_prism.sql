/*
  # Create events table

  1. New Tables
    - `events`
      - `id` (uuid, primary key)
      - `esemeny` (text, event description)
      - `kategoria` (text, category)
      - `teendo` (text, action to take)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `events` table
    - Add policy for authenticated users to read events data

  3. Sample Data
    - Insert some sample events for demonstration
*/

CREATE TABLE IF NOT EXISTS events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  esemeny text NOT NULL,
  kategoria text NOT NULL,
  teendo text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read events"
  ON events
  FOR SELECT
  TO authenticated
  USING (true);

-- Insert sample data
INSERT INTO events (esemeny, kategoria, teendo) VALUES
  ('Oltási mentességi kérelem benyújtása', 'Adminisztráció', 'Kérelem kitöltése és benyújtása az illetékes hatósághoz'),
  ('BCG oltás visszautasítása', 'Egészségügy', 'Hivatalos levél készítése és átadása a kórháznak'),
  ('Orvosi konzultáció', 'Egészségügy', 'Időpont egyeztetése szakorvossal'),
  ('Jogi tanácsadás', 'Jogi', 'Ügyvéddel való konzultáció az oltási jogokról'),
  ('Dokumentumok összegyűjtése', 'Adminisztráció', 'Szükséges orvosi leletek és dokumentumok beszerzése'),
  ('Hatósági válasz követése', 'Adminisztráció', 'Rendszeres kapcsolattartás az illetékes szervekkel'),
  ('Második vélemény kérése', 'Egészségügy', 'Másik orvos véleményének beszerzése'),
  ('Fellebbezés benyújtása', 'Jogi', 'Fellebbezési kérelem összeállítása és benyújtása'),
  ('Családi kórtörténet dokumentálása', 'Egészségügy', 'Családi egészségügyi adatok összegyűjtése'),
  ('Oltási naptár áttekintése', 'Egészségügy', 'Kötelező oltások ütemezésének ellenőrzése');