-- pgAdmin

-- Table users:

CREATE TABLE IF NOT EXISTS public.users
(
    uid bigint NOT NULL DEFAULT nextval('users_uid_seq'::regclass),
    username character varying(50) COLLATE pg_catalog."default" NOT NULL,
    password character varying(200) COLLATE pg_catalog."default" NOT NULL,
    email character varying(100) COLLATE pg_catalog."default" NOT NULL,
    created timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    address character varying(100) COLLATE pg_catalog."default",
    phone character varying(15) COLLATE pg_catalog."default",
    birth_date date,
    first_name character varying(50) COLLATE pg_catalog."default" NOT NULL,
    last_name character varying(50) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT users_pkey PRIMARY KEY (uid)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.users
    OWNER to postgres;

-- Table activities

CREATE TABLE IF NOT EXISTS public.activities
(
    id integer NOT NULL DEFAULT nextval('activities_id_seq'::regclass),
    category character varying(50) COLLATE pg_catalog."default" NOT NULL,
    activity_number integer NOT NULL,
    description text COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT activities_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.activities
    OWNER to postgres;

-- Table dailyactivites

CREATE TABLE IF NOT EXISTS public.dailyactivities
(
    id integer NOT NULL DEFAULT nextval('dailyactivities_id_seq'::regclass),
    user_id integer,
    activity_id integer,
    date date DEFAULT CURRENT_DATE,
    category character varying(50) COLLATE pg_catalog."default",
    completed boolean DEFAULT false,
    CONSTRAINT dailyactivities_pkey PRIMARY KEY (id),
    CONSTRAINT unique_user_date_category UNIQUE (user_id, date, category),
    CONSTRAINT dailyactivities_activity_id_fkey FOREIGN KEY (activity_id)
        REFERENCES public.activities (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT dailyactivities_user_id_fkey FOREIGN KEY (user_id)
        REFERENCES public.users (uid) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.dailyactivities
    OWNER to postgres;

-- Mentors
CREATE TABLE IF NOT EXISTS public.mentors
(
    id SERIAL PRIMARY KEY,
    mentor_id BIGINT REFERENCES public.users(uid) ON DELETE CASCADE,
    user_id BIGINT REFERENCES public.users(uid) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT NOW(),
    CONSTRAINT unique_mentor_user UNIQUE (mentor_id, user_id)
)
TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.mentors
    OWNER TO postgres;


-- Table statistics

CREATE TABLE IF NOT EXISTS public.statistics
(
    id integer NOT NULL DEFAULT nextval('statistics_id_seq'::regclass),
    user_id integer,
    total_tasks_completed integer DEFAULT 0,
    mental_tasks_completed integer DEFAULT 0,
    physical_tasks_completed integer DEFAULT 0,
    social_tasks_completed integer DEFAULT 0,
    streak_days integer DEFAULT 0,
    updated_at timestamp without time zone DEFAULT now(),
    CONSTRAINT statistics_pkey PRIMARY KEY (id),
    CONSTRAINT statistics_user_id_fkey FOREIGN KEY (user_id)
        REFERENCES public.users (uid) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.statistics
    OWNER to postgres;


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
