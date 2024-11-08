-- Databas användare:

CREATE TABLE Users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    birth_date DATE,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(50) NOT NULL
);

-- Databas Aactivities

CREATE TABLE Activities (
    id SERIAL PRIMARY KEY,
    category VARCHAR(50) NOT NULL,
    activity_number INTEGER NOT NULL,
    description TEXT NOT NULL
);



IINSERT INTO Activities (category, activity_number, description) VALUES
('Physical', 1, 'Take a 10-minute walk outside'),
('Physical', 2, 'Do 5 minutes of stretching in the morning'),
('Physical', 3, 'Drink 8 glasses of water throughout the day'),
('Physical', 4, 'Try a 5-minute breathing exercise'),
('Physical', 5, 'Do 20 squats'),
('Physical', 6, 'Try cooking a nutritious meal'),
('Physical', 7, 'Take a short break every hour to stand up and stretch'),
('Physical', 8, 'Try a simple yoga pose for 5 minutes'),
('Physical', 9, 'Take a brisk 15-minute walk or jog'),
('Physical', 10, 'Relax your shoulders and unwind for 1 minute');



INSERT INTO Activities (category, activity_number, description) VALUES
('Mental', 1, 'Write down three things you are grateful for'),
('Mental', 2, 'Try a 5-minute mindfulness exercise'),
('Mental', 3, 'Write your thoughts in a journal for 10 minutes'),
('Mental', 4, 'Create a list of positive things from the day'),
('Mental', 5, 'Read 5 pages of an inspiring book'),
('Mental', 6, 'Do one thing at a time without distractions'),
('Mental', 7, 'Plan something you are looking forward to'),
('Mental', 8, 'Write down a long-term goal and the first step towards it'),
('Mental', 9, 'Try a guided meditation'),
('Mental', 10, 'Make a list of things that make you happy');



INSERT INTO Activities (category, activity_number, description) VALUES
('Social', 1, 'Send a kind message to a friend'),
('Social', 2, 'Call a family member and talk for 5 minutes'),
('Social', 3, 'Give a compliment to someone'),
('Social', 4, 'Send a thank you message to someone who helped you'),
('Social', 5, 'Join a social activity or event'),
('Social', 6, 'Try smiling at strangers today'),
('Social', 7, 'Ask for help with something small if you need it'),
('Social', 8, 'Listen actively to someone without interrupting'),
('Social', 9, 'Do a selfless act for someone else'),
('Social', 10, 'Share something positive from your day with someone');



SELECT * FROM Activities WHERE category = 'Physical';
SELECT * FROM Activities WHERE category = 'Mental';
SELECT * FROM Activities WHERE category = 'Social';


-- Hämtar alla kategorier och sorterar sedan via kategorier först och aktivitets nummer sedan:

SELECT * FROM Activities
ORDER BY category, activity_number;
