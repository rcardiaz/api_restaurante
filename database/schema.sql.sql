--
-- PostgreSQL database dump
--

\restrict jPgYtWOIt1X8G08ClCsnvIcCTMtQDxJ8WCD9KHjDaipBS6yfcHOR88GyK5vHFRB

-- Dumped from database version 18.4
-- Dumped by pg_dump version 18.4

-- Started on 2026-07-12 22:32:46

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 869 (class 1247 OID 17284)
-- Name: Estado; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."Estado" AS ENUM (
    'pendiente',
    'confirmada',
    'cancelada'
);


ALTER TYPE public."Estado" OWNER TO postgres;

--
-- TOC entry 866 (class 1247 OID 17279)
-- Name: Rol; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."Rol" AS ENUM (
    'cliente',
    'admin'
);


ALTER TYPE public."Rol" OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 222 (class 1259 OID 17238)
-- Name: mesas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.mesas (
    id integer NOT NULL,
    numero integer NOT NULL,
    capacidad integer NOT NULL,
    disponible boolean DEFAULT true NOT NULL,
    created_at timestamp(3) without time zone DEFAULT now() NOT NULL,
    activo boolean DEFAULT true NOT NULL
);


ALTER TABLE public.mesas OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 17237)
-- Name: mesas_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.mesas_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.mesas_id_seq OWNER TO postgres;

--
-- TOC entry 5052 (class 0 OID 0)
-- Dependencies: 221
-- Name: mesas_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.mesas_id_seq OWNED BY public.mesas.id;


--
-- TOC entry 224 (class 1259 OID 17252)
-- Name: reservaciones; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.reservaciones (
    id integer NOT NULL,
    fecha date NOT NULL,
    hora text NOT NULL,
    personas integer NOT NULL,
    usuario_id integer NOT NULL,
    mesa_id integer NOT NULL,
    created_at timestamp(3) without time zone DEFAULT now() NOT NULL,
    estado public."Estado" DEFAULT 'pendiente'::public."Estado" NOT NULL
);


ALTER TABLE public.reservaciones OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 17251)
-- Name: reservaciones_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.reservaciones_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.reservaciones_id_seq OWNER TO postgres;

--
-- TOC entry 5053 (class 0 OID 0)
-- Dependencies: 223
-- Name: reservaciones_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.reservaciones_id_seq OWNED BY public.reservaciones.id;


--
-- TOC entry 220 (class 1259 OID 17221)
-- Name: usuarios; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.usuarios (
    id integer NOT NULL,
    nombre text NOT NULL,
    correo text NOT NULL,
    password text NOT NULL,
    created_at timestamp(3) without time zone DEFAULT now() NOT NULL,
    rol public."Rol" DEFAULT 'cliente'::public."Rol" NOT NULL
);


ALTER TABLE public.usuarios OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 17220)
-- Name: usuarios_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.usuarios_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.usuarios_id_seq OWNER TO postgres;

--
-- TOC entry 5054 (class 0 OID 0)
-- Dependencies: 219
-- Name: usuarios_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.usuarios_id_seq OWNED BY public.usuarios.id;


--
-- TOC entry 4875 (class 2604 OID 17241)
-- Name: mesas id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mesas ALTER COLUMN id SET DEFAULT nextval('public.mesas_id_seq'::regclass);


--
-- TOC entry 4879 (class 2604 OID 17255)
-- Name: reservaciones id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reservaciones ALTER COLUMN id SET DEFAULT nextval('public.reservaciones_id_seq'::regclass);


--
-- TOC entry 4872 (class 2604 OID 17224)
-- Name: usuarios id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios ALTER COLUMN id SET DEFAULT nextval('public.usuarios_id_seq'::regclass);


--
-- TOC entry 5044 (class 0 OID 17238)
-- Dependencies: 222
-- Data for Name: mesas; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.mesas (id, numero, capacidad, disponible, created_at, activo) FROM stdin;
1	1	2	t	2026-06-26 17:26:49.45	t
2	2	4	t	2026-06-26 17:26:49.45	t
3	3	6	f	2026-06-26 17:26:49.45	t
7	99	3	t	2026-07-05 04:05:50.181	t
8	98	5	t	2026-07-08 22:46:07.62	t
9	80	2	t	2026-07-08 23:38:41.727	t
10	70	4	t	2026-07-09 15:15:02.667	t
\.


--
-- TOC entry 5046 (class 0 OID 17252)
-- Dependencies: 224
-- Data for Name: reservaciones; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.reservaciones (id, fecha, hora, personas, usuario_id, mesa_id, created_at, estado) FROM stdin;
1	2026-06-25	12:00:00	2	2	1	2026-06-26 17:26:49.45	pendiente
2	2026-06-25	14:00:00	4	3	2	2026-06-26 17:26:49.45	pendiente
3	2026-06-26	19:00:00	5	2	3	2026-06-26 17:26:49.45	pendiente
\.


--
-- TOC entry 5042 (class 0 OID 17221)
-- Dependencies: 220
-- Data for Name: usuarios; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.usuarios (id, nombre, correo, password, created_at, rol) FROM stdin;
1	Carlos Mendoza	carlos@email.com	123456	2026-06-26 17:26:49.45	cliente
2	Ana García	ana@email.com	123456	2026-06-26 17:26:49.45	cliente
3	Luis Pérez	luis@email.com	123456	2026-06-26 17:26:49.45	cliente
\.


--
-- TOC entry 5055 (class 0 OID 0)
-- Dependencies: 221
-- Name: mesas_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.mesas_id_seq', 10, true);


--
-- TOC entry 5056 (class 0 OID 0)
-- Dependencies: 223
-- Name: reservaciones_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.reservaciones_id_seq', 3, true);


--
-- TOC entry 5057 (class 0 OID 0)
-- Dependencies: 219
-- Name: usuarios_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.usuarios_id_seq', 3, true);


--
-- TOC entry 4887 (class 2606 OID 17250)
-- Name: mesas mesas_numero_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mesas
    ADD CONSTRAINT mesas_numero_key UNIQUE (numero);


--
-- TOC entry 4889 (class 2606 OID 17248)
-- Name: mesas mesas_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mesas
    ADD CONSTRAINT mesas_pkey PRIMARY KEY (id);


--
-- TOC entry 4891 (class 2606 OID 17267)
-- Name: reservaciones reservaciones_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reservaciones
    ADD CONSTRAINT reservaciones_pkey PRIMARY KEY (id);


--
-- TOC entry 4883 (class 2606 OID 17317)
-- Name: usuarios usuarios_correo_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_correo_key UNIQUE (correo);


--
-- TOC entry 4885 (class 2606 OID 17234)
-- Name: usuarios usuarios_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_pkey PRIMARY KEY (id);


--
-- TOC entry 4892 (class 2606 OID 17337)
-- Name: reservaciones reservaciones_mesa_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reservaciones
    ADD CONSTRAINT reservaciones_mesa_id_fkey FOREIGN KEY (mesa_id) REFERENCES public.mesas(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 4893 (class 2606 OID 17332)
-- Name: reservaciones reservaciones_usuario_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reservaciones
    ADD CONSTRAINT reservaciones_usuario_id_fkey FOREIGN KEY (usuario_id) REFERENCES public.usuarios(id) ON UPDATE CASCADE ON DELETE RESTRICT;


-- Completed on 2026-07-12 22:32:47

--
-- PostgreSQL database dump complete
--

\unrestrict jPgYtWOIt1X8G08ClCsnvIcCTMtQDxJ8WCD9KHjDaipBS6yfcHOR88GyK5vHFRB

