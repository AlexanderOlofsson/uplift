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



INSERT INTO Activities (category, activity_number, description) VALUES
('Physical', 1, 'Ta en 10-minuters promenad utomhus'),
('Physical', 2, 'Gör 5 minuters stretching på morgonen'),
('Physical', 3, 'Drick 8 glas vatten under dagen'),
('Physical', 4, 'Testa en andningsövning i 5 minuter'),
('Physical', 5, 'Gör 20 knäböj'),
('Physical', 6, 'Prova att laga en näringsrik måltid'),
('Physical', 7, 'Ta en kort paus för att stå upp och sträcka på dig varje timme'),
('Physical', 8, 'Testa en enkel yogaposition i 5 minuter'),
('Physical', 9, 'Utför en snabb promenad eller jogg på 15 minuter'),
('Physical', 10, 'Släpp ner axlarna och slappna av i 1 minut');



INSERT INTO Activities (category, activity_number, description) VALUES
('Mental', 1, 'Skriv ner tre saker du är tacksam för'),
('Mental', 2, 'Prova en mindfulness-övning i 5 minuter'),
('Mental', 3, 'Skriv ner dina tankar i en journal i 10 minuter'),
('Mental', 4, 'Skapa en lista över positiva saker från dagen'),
('Mental', 5, 'Prova att läsa 5 sidor i en inspirerande bok'),
('Mental', 6, 'Gör en sak i taget utan att bli distraherad'),
('Mental', 7, 'Planera något du ser fram emot'),
('Mental', 8, 'Skriv ner ett långsiktigt mål du har och första steget mot det'),
('Mental', 9, 'Testa en guidad meditation'),
('Mental', 10, 'Gör en lista över saker som gör dig glad');



INSERT INTO Activities (category, activity_number, description) VALUES
('Social', 1, 'Skicka ett vänligt meddelande till en vän'),
('Social', 2, 'Ring en familjemedlem och prata i 5 minuter'),
('Social', 3, 'Ge en komplimang till någon'),
('Social', 4, 'Skicka ett tackmeddelande till någon som hjälpt dig'),
('Social', 5, 'Delta i en social aktivitet eller ett evenemang'),
('Social', 6, 'Prova att le mot främlingar idag'),
('Social', 7, 'Be om hjälp med något litet om du behöver'),
('Social', 8, 'Lyssna aktivt på någon utan att avbryta'),
('Social', 9, 'Gör en osjälvisk handling för någon annan'),
('Social', 10, 'Dela något positivt från din dag med någon');



SELECT * FROM Activities WHERE category = 'Physical';
SELECT * FROM Activities WHERE category = 'Mental';
SELECT * FROM Activities WHERE category = 'Social';


-- Hämtar alla kategorier och sorterar sedan via kategorier först och aktivitets nummer sedan:

SELECT * FROM Activities
ORDER BY category, activity_number;
