-- pgAdmin

-- Sequences

CREATE SEQUENCE IF NOT EXISTS activities_id_seq;
CREATE SEQUENCE IF NOT EXISTS activities_id_seq;
CREATE SEQUENCE IF NOT EXISTS dailyactivities_id_seq;
CREATE SEQUENCE IF NOT EXISTS quotes_id_seq;
CREATE SEQUENCE IF NOT EXISTS statistics_id_seq;
CREATE SEQUENCE IF NOT EXISTS users_uid_seq;

-- Table: users
CREATE TABLE IF NOT EXISTS public.users (
    uid BIGINT NOT NULL DEFAULT nextval('users_uid_seq'::regclass),
    username VARCHAR(50) NOT NULL,
    password VARCHAR(200) NOT NULL,
    email VARCHAR(100) NOT NULL,
    created TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    birth_date DATE,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    CONSTRAINT users_pkey PRIMARY KEY (uid),
    CONSTRAINT unique_username UNIQUE (username)
);

-- Table: activities
CREATE TABLE IF NOT EXISTS public.activities (
    id BIGINT NOT NULL DEFAULT nextval('activities_id_seq'::regclass),
    category VARCHAR(50) NOT NULL,
    activity_number INTEGER NOT NULL,
    description TEXT NOT NULL,
    CONSTRAINT activities_pkey PRIMARY KEY (id)
);

-- Table: dailyactivities
CREATE TABLE IF NOT EXISTS public.dailyactivities (
    id BIGINT NOT NULL DEFAULT nextval('dailyactivities_id_seq'::regclass),
    user_id BIGINT NOT NULL,
    activity_id BIGINT NOT NULL,
    date DATE DEFAULT CURRENT_DATE,
    category VARCHAR(50),
    completed BOOLEAN DEFAULT FALSE,
    completed_date DATE,
    CONSTRAINT dailyactivities_pkey PRIMARY KEY (id),
    CONSTRAINT unique_user_activity UNIQUE (user_id, activity_id),
    CONSTRAINT unique_user_date_category UNIQUE (user_id, date, category),
    CONSTRAINT fk_activity FOREIGN KEY (activity_id) REFERENCES public.activities (id) ON UPDATE NO ACTION ON DELETE NO ACTION,
    CONSTRAINT fk_user_activity FOREIGN KEY (user_id) REFERENCES public.users (uid) ON UPDATE NO ACTION ON DELETE CASCADE
);

-- Table: statistics
CREATE TABLE IF NOT EXISTS public.statistics (
    id BIGINT NOT NULL DEFAULT nextval('statistics_id_seq'::regclass),
    user_id BIGINT NOT NULL,
    total_tasks_completed INTEGER DEFAULT 0,
    mental_tasks_completed INTEGER DEFAULT 0,
    physical_tasks_completed INTEGER DEFAULT 0,
    social_tasks_completed INTEGER DEFAULT 0,
    streak_days INTEGER DEFAULT 0,
    updated_at TIMESTAMP DEFAULT NOW(),
    CONSTRAINT statistics_pkey PRIMARY KEY (id),
    CONSTRAINT fk_statistics_user FOREIGN KEY (user_id) REFERENCES public.users (uid) ON UPDATE NO ACTION ON DELETE CASCADE
);

-- Table: quotes
CREATE TABLE IF NOT EXISTS public.quotes (
    id INTEGER NOT NULL DEFAULT nextval('quotes_id_seq'::regclass),
    quote TEXT NOT NULL,
    author VARCHAR(100),
    created_at TIMESTAMP DEFAULT NOW(),
    CONSTRAINT quotes_pkey PRIMARY KEY (id)
);



INSERT INTO Activities (category, activity_number, description) VALUES
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

INSERT INTO quotes (quote, author) VALUES
('The best time to start was yesterday. The next best time is now.', 'Anonymous'),
('You miss 100% of the shots you don’t take.', 'Wayne Gretzky'),
('Success is not final, failure is not fatal: It is the courage to continue that counts.', 'Winston Churchill'),
('What we fear of doing most is usually what we most need to do.', 'Ralph Waldo Emerson'),
('Do what you can, with what you have, where you are.', 'Theodore Roosevelt'),
('Keep your face always toward the sunshine—and shadows will fall behind you.', 'Walt Whitman'),
('The only limit to our realization of tomorrow will be our doubts of today.', 'Franklin D. Roosevelt'),
('Don’t watch the clock; do what it does. Keep going.', 'Sam Levenson'),
('Act as if what you do makes a difference. It does.', 'William James'),
('Believe you can and you’re halfway there.', 'Theodore Roosevelt'),
('Don’t be pushed around by the fears in your mind. Be led by the dreams in your heart.', 'Roy T. Bennett'),
('Strive not to be a success, but rather to be of value.', 'Albert Einstein'),
('Dream big and dare to fail.', 'Norman Vaughan'),
('It always seems impossible until it’s done.', 'Nelson Mandela'),
('Limitations live only in our minds. But if we use our imaginations, our possibilities become limitless.', 'Jamie Paolinetti'),
('With the new day comes new strength and new thoughts.', 'Eleanor Roosevelt'),
('The power of imagination makes us infinite.', 'John Muir'),
('Your only limit is your soul.', 'Ratatouille'),
('Turn your wounds into wisdom.', 'Oprah Winfrey'),
('Do what makes your soul shine.', 'Anonymous'),
('Every accomplishment starts with the decision to try.', 'John F. Kennedy'),
('The difference between ordinary and extraordinary is that little extra.', 'Jimmy Johnson'),
('When you feel like giving up, remember why you started.', 'Anonymous'),
('A little progress each day adds up to big results.', 'Anonymous'),
('Happiness is not something ready made. It comes from your own actions.', 'Dalai Lama'),
('Be not afraid of life. Believe that life is worth living, and your belief will help create the fact.', 'William James'),
('We may encounter many defeats but we must not be defeated.', 'Maya Angelou'),
('Courage is resistance to fear, mastery of fear—not absence of fear.', 'Mark Twain'),
('In the middle of every difficulty lies opportunity.', 'Albert Einstein'),
('Keep your head high and your heart open.', 'Anonymous'),
('A journey of a thousand miles begins with a single step.', 'Lao Tzu'),
('Push yourself, because no one else is going to do it for you.', 'Anonymous'),
('Failure is the condiment that gives success its flavor.', 'Truman Capote'),
('Uplift your spirit and the world will rise with you.', 'Anonymous'),
('It’s not about perfect. It’s about effort.', 'Jillian Michaels'),
('No one is perfect - that’s why pencils have erasers.', 'Wolfgang Riebe'),
('Don’t be afraid to stand for what you believe in, even if that means standing alone.', 'Anonymous'),
('Great things are done by a series of small things brought together.', 'Vincent Van Gogh'),
('When life knocks you down, try to land on your back. Because if you can look up, you can get up.', 'Les Brown'),
('A person who never made a mistake never tried anything new.', 'Albert Einstein'),
('If you fell down yesterday, stand up today.', 'H.G. Wells'),
('Opportunities don’t happen. You create them.', 'Chris Grosser'),
('The best way to predict your future is to create it.', 'Abraham Lincoln'),
('Work hard in silence, let your success be your noise.', 'Frank Ocean'),
('Don’t stop until you’re proud.', 'Anonymous'),
('Doubt kills more dreams than failure ever will.', 'Suzy Kassem'),
('Your greatness is not what you have, but what you give.', 'Alice Hocker'),
('Rise above the storm and you will find the sunshine.', 'Mario Fernández'),
('Every morning we are born again. What we do today is what matters most.', 'Buddha'),
('Small steps in the right direction can turn out to be the biggest steps of your life.', 'Anonymous'),
('Uplift others and you’ll uplift yourself.', 'Anonymous'),
('Kindness is a language which the deaf can hear and the blind can see.', 'Mark Twain'),
('The mind is everything. What you think you become.', 'Buddha'),
('The future depends on what you do today.', 'Mahatma Gandhi'),
('Be yourself; everyone else is already taken.', 'Oscar Wilde'),
('An obstacle is often a stepping stone.', 'Prescott Bush'),
('Do not wait to strike till the iron is hot; but make it hot by striking.', 'William Butler Yeats'),
('Fall seven times and stand up eight.', 'Japanese Proverb'),
('Success is walking from failure to failure with no loss of enthusiasm.', 'Winston Churchill'),
('Do what you feel in your heart to be right—for you’ll be criticized anyway.', 'Eleanor Roosevelt'),
('The only way to achieve the impossible is to believe it is possible.', 'Charles Kingsleigh'),
('Be the change that you wish to see in the world.', 'Mahatma Gandhi'),
('Life is what happens when you’re busy making other plans.', 'John Lennon'),
('Success is not how high you have climbed, but how you make a positive difference to the world.', 'Roy T. Bennett'),
('When you reach the end of your rope, tie a knot in it and hang on.', 'Franklin D. Roosevelt'),
('We rise by lifting others.', 'Robert Ingersoll'),
('Live as if you were to die tomorrow. Learn as if you were to live forever.', 'Mahatma Gandhi'),
('Nothing is impossible. The word itself says “I’m possible!”', 'Audrey Hepburn'),
('Start where you are. Use what you have. Do what you can.', 'Arthur Ashe'),
('It does not matter how slowly you go as long as you do not stop.', 'Confucius'),
('If you want to lift yourself up, lift up someone else.', 'Booker T. Washington'),
('Hardships often prepare ordinary people for an extraordinary destiny.', 'C.S. Lewis'),
('Only in the darkness can you see the stars.', 'Martin Luther King Jr.'),
('Strength doesn’t come from what you can do. It comes from overcoming the things you once thought you couldn’t.', 'Rikki Rogers'),
('Success is getting what you want. Happiness is wanting what you get.', 'Dale Carnegie'),
('Your attitude, not your aptitude, will determine your altitude.', 'Zig Ziglar'),
('Happiness depends upon ourselves.', 'Aristotle'),
('Believe in yourself and all that you are. Know that there is something inside you that is greater than any obstacle.', 'Christian D. Larson'),
('If you change the way you look at things, the things you look at change.', 'Wayne Dyer'),
('Every day may not be good... but there’s something good in every day.', 'Alice Morse Earle'),
('The best revenge is massive success.', 'Frank Sinatra'),
('Shoot for the moon. Even if you miss, you’ll land among the stars.', 'Norman Vincent Peale'),
('Uplift your thoughts, and you’ll elevate your life.', 'Anonymous'),
('Dream it. Wish it. Do it.', 'Anonymous'),
('Keep going. Everything you need will come to you at the perfect time.', 'Anonymous'),
('Challenges are what make life interesting and overcoming them is what makes life meaningful.', 'Joshua J. Marine');




SELECT * FROM Activities WHERE category = 'Physical';
SELECT * FROM Activities WHERE category = 'Mental';
SELECT * FROM Activities WHERE category = 'Social';


-- Hämtar alla kategorier och sorterar sedan via kategorier först och aktivitets nummer sedan:

SELECT * FROM Activities
ORDER BY category, activity_number;
