--
-- PostgreSQL database dump
--

-- Dumped from database version 14.13 (Homebrew)
-- Dumped by pg_dump version 14.13 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: client_tren; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.client_tren (
    id_client integer NOT NULL,
    id_tren integer NOT NULL
);


ALTER TABLE public.client_tren OWNER TO postgres;

--
-- Name: clients; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.clients (
    id_client integer NOT NULL,
    name_client character varying(50) NOT NULL,
    email_client character varying(50) NOT NULL,
    password_client character varying(200) NOT NULL,
    role_client character varying(50) NOT NULL
);


ALTER TABLE public.clients OWNER TO postgres;

--
-- Name: clients_id_client_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.clients_id_client_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.clients_id_client_seq OWNER TO postgres;

--
-- Name: clients_id_client_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.clients_id_client_seq OWNED BY public.clients.id_client;


--
-- Name: feedback; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.feedback (
    id_mess integer NOT NULL,
    name_client character varying(50) NOT NULL,
    phone_client character varying(50) NOT NULL
);


ALTER TABLE public.feedback OWNER TO postgres;

--
-- Name: feedback_id_mess_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.feedback_id_mess_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.feedback_id_mess_seq OWNER TO postgres;

--
-- Name: feedback_id_mess_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.feedback_id_mess_seq OWNED BY public.feedback.id_mess;


--
-- Name: schedule; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.schedule (
    id_tren integer NOT NULL,
    time_clock character varying(50) NOT NULL,
    time_min integer NOT NULL,
    zone character varying(50) NOT NULL,
    name_tren_sess character varying(50) NOT NULL,
    name_trener character varying(50) NOT NULL
);


ALTER TABLE public.schedule OWNER TO postgres;

--
-- Name: schedule_id_tren_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.schedule_id_tren_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.schedule_id_tren_seq OWNER TO postgres;

--
-- Name: schedule_id_tren_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.schedule_id_tren_seq OWNED BY public.schedule.id_tren;


--
-- Name: slider; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.slider (
    id_photo integer NOT NULL,
    url_photo character varying(100) NOT NULL
);


ALTER TABLE public.slider OWNER TO postgres;

--
-- Name: slider_id_photo_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.slider_id_photo_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.slider_id_photo_seq OWNER TO postgres;

--
-- Name: slider_id_photo_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.slider_id_photo_seq OWNED BY public.slider.id_photo;


--
-- Name: clients id_client; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.clients ALTER COLUMN id_client SET DEFAULT nextval('public.clients_id_client_seq'::regclass);


--
-- Name: feedback id_mess; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.feedback ALTER COLUMN id_mess SET DEFAULT nextval('public.feedback_id_mess_seq'::regclass);


--
-- Name: schedule id_tren; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.schedule ALTER COLUMN id_tren SET DEFAULT nextval('public.schedule_id_tren_seq'::regclass);


--
-- Name: slider id_photo; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.slider ALTER COLUMN id_photo SET DEFAULT nextval('public.slider_id_photo_seq'::regclass);


--
-- Data for Name: client_tren; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.client_tren (id_client, id_tren) FROM stdin;
6	2
6	3
11	6
11	5
1	1
1	2
7	6
9	4
9	3
7	1
7	2
7	3
7	4
\.


--
-- Data for Name: clients; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.clients (id_client, name_client, email_client, password_client, role_client) FROM stdin;
1	йй йй	22@22	$2b$10$rviGr0jioNEcYd451SAZ.OBopea8OCE60t/o1d7paacdzP/wgpaKK	user
2	йцй й	22@222	$2b$10$p6ebZBRhmBaMoL6cISXlkuPDkthmolifci11MrC7Yk7d1O9tIChhW	user
3	цц цц	22@2222	$2b$10$wKsQ5lgJVVail3t.UQb/JuffyHizp8zozsi0XhqXSmwylV2sC8mZm	user
4	йй йй	123@123	$2b$10$25I6XyIBKpC1nWz2.UfdMO4uBsL1YtixVVJGv/RP7/k1iBJTgmwNm	user
5	фывфыв фев	qw@wq	$2b$10$YGnRcRkJm3JWE.PoWmiBZuvTAUFCEhdVeD9gjoG1KN2vEcPw8ExB.	user
7	Полина Петрова	admin@root.com	$2b$10$K2Y39Zxl7t58D3Zti9Qytuv3AqC8IuzZ2VNe2Ug2oVZDSEMsF4rSK	root
8	Хуй Иванович	hddsjbkdsjn@jdfhf.com	$2b$10$jO9DRGCphqaWYY8uFSznO.gSEqCiu7.2AHf.AReVUK2z.gEo2Uz1G	user
9	там плавал	j@mail.com	$2b$10$z.Z8TYPfdnZgHnhWeHRz6e4ihUCEv/Gqh97nSTi7/QhBDjzUgHjPO	user
6	А Максим	ast@gmail.com	$2b$10$jZjxEfAo60QYkFaqLruwF.W6Kc.cKy4jTVh0mBSeq5IWIvcKChpri	user
10	Аста М	ast@gm	$2b$10$z4PVug5zgmcuMFopv4nznO0csAG0zlB/zpu07JRUj1Ma6CCSP5Eym	user
11	Астафуров Максим	astaf@gmail.com	$2b$10$DJcsQD2hQZaXQGd8RST6VulxkZpN4DJjxD2ipgKVLi0v/IuGx4NTq	user
\.


--
-- Data for Name: feedback; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.feedback (id_mess, name_client, phone_client) FROM stdin;
1	Максим	89325728572
2	Василий	89325792742
3	Евгения	89237561834
4	Виктор	89325738194
5	Артем	89325673981
6	Марина	89324785431
7	Толя	89235784391
8	Вадим	89324875451
9	Николай	89324785421
13	sdcsc	sdcsd
\.


--
-- Data for Name: schedule; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.schedule (id_tren, time_clock, time_min, zone, name_tren_sess, name_trener) FROM stdin;
1	10:00	55	Зал групповых программ	Functional Training	Алексей Василенко
2	12:00	55	Зал групповых программ	Школа Шпагата	Екатерина Иванова
3	14:00	30	Тренажерный зал	Smart Start Грудь	Максим Астафуров
4	14:00	30	Тренажерный зал	Smart Start Fullbody	Владислав Мусихин
5	16:00	55	Зал групповых программ	BODYPUMP	Екатерина Сугробова
7	18:00	30	Тренажерный зал	Smart Start Руки	Максим Астафуров
8	20:00	90	Зал групповых программ	YOGA	Андрей Харланов
6	18:00	30	Зал групповых программ	Здоровая спина	Максим Астафуров
10	string	0	string	string	string
\.


--
-- Data for Name: slider; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.slider (id_photo, url_photo) FROM stdin;
1	./assets/img/slider1.jpg
2	./assets/img/slider2.jpg
3	./assets/img/slider3.jpg
4	./assets/img/slider4.jpg
\.


--
-- Name: clients_id_client_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.clients_id_client_seq', 11, true);


--
-- Name: feedback_id_mess_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.feedback_id_mess_seq', 13, true);


--
-- Name: schedule_id_tren_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.schedule_id_tren_seq', 10, true);


--
-- Name: slider_id_photo_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.slider_id_photo_seq', 4, true);


--
-- Name: clients clients_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.clients
    ADD CONSTRAINT clients_pkey PRIMARY KEY (id_client);


--
-- Name: feedback feedback_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.feedback
    ADD CONSTRAINT feedback_pkey PRIMARY KEY (id_mess);


--
-- Name: schedule schedule_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.schedule
    ADD CONSTRAINT schedule_pkey PRIMARY KEY (id_tren);


--
-- Name: slider slider_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.slider
    ADD CONSTRAINT slider_pkey PRIMARY KEY (id_photo);


--
-- PostgreSQL database dump complete
--

