CREATE TABLE IF NOT EXISTS words (
    id INT AUTO_INCREMENT PRIMARY KEY,
    word VARCHAR(100) NOT NULL UNIQUE,
    definition TEXT,
    difficulty_level ENUM('Beginner', 'Intermediate', 'Advanced') DEFAULT 'Beginner',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS practice_sessions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    word_id INT NOT NULL,
    user_sentence TEXT NOT NULL,
    score DECIMAL(3,1),
    feedback TEXT,
    corrected_sentence TEXT,
    practiced_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (word_id) REFERENCES words(id) ON DELETE CASCADE
);

-- Example data
-- init.sql (ชุดข้อมูลใหม่ 30 คำ)

INSERT INTO words (word, definition, difficulty_level) VALUES
-- Beginner
('apple', 'A round fruit with red, green, or yellow skin', 'Beginner'),
('book', 'A set of written or printed pages, usually bound with a protective cover', 'Beginner'),
('happy', 'Feeling or showing pleasure or contentment', 'Beginner'),
('school', 'An institution for educating children', 'Beginner'),
('friend', 'A person whom one knows and with whom one has a bond of mutual affection', 'Beginner'),
('music', 'Vocal or instrumental sounds (or both) combined in such a way as to produce beauty of form', 'Beginner'),
('water', 'A colorless, transparent, odorless liquid that forms the seas, lakes, rivers, and rain', 'Beginner'),
('house', 'A building for human habitation, especially one that is lived in by a family', 'Beginner'),
('time', 'The indefinite continued progress of existence and events', 'Beginner'),
('money', 'A current medium of exchange in the form of coins and banknotes', 'Beginner'),

-- Intermediate
('ambitious', 'Having a strong desire to succeed', 'Intermediate'),
('collaborate', 'To work together with others', 'Intermediate'),
('challenge', 'A call to take part in a contest or competition', 'Intermediate'),
('solution', 'A means of solving a problem or dealing with a difficult situation', 'Intermediate'),
('environment', 'The surroundings or conditions in which a person, animal, or plant lives', 'Intermediate'),
('creative', 'Relating to or involving the imagination or original ideas', 'Intermediate'),
('decision', 'A conclusion or resolution reached after consideration', 'Intermediate'),
('popular', 'Liked, admired, or enjoyed by many people or by a particular person or group', 'Intermediate'),
('technology', 'The application of scientific knowledge for practical purposes', 'Intermediate'),
('journey', 'An act of traveling from one place to another', 'Intermediate'),

-- Advanced
('perseverance', 'Continued effort despite difficulties', 'Advanced'),
('ephemeral', 'Lasting for a very short time', 'Advanced'),
('serendipity', 'The occurrence and development of events by chance in a happy or beneficial way', 'Advanced'),
('quintessential', 'Representing the most perfect or typical example of a quality or class', 'Advanced'),
('cacophony', 'A harsh, discordant mixture of sounds', 'Advanced'),
('magnanimous', 'Very generous or forgiving, especially toward a rival or someone less powerful', 'Advanced'),
('ubiquitous', 'Present, appearing, or found everywhere', 'Advanced'),
('nefarious', 'Wicked or criminal', 'Advanced'),
('obfuscate', 'Render obscure, unclear, or unintelligible', 'Advanced'),
('eloquent', 'Fluent or persuasive in speaking or writing', 'Advanced');

