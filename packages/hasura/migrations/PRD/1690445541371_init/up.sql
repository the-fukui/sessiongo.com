SET check_function_bodies = false;
CREATE FUNCTION public.set_current_timestamp_updated_at() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$;
CREATE TABLE public.event_features (
    value text NOT NULL,
    comment text
);
CREATE TABLE public.event_participant_status (
    value text NOT NULL,
    comment text
);
CREATE TABLE public.event_participants (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    "eventId" uuid NOT NULL,
    "userId" uuid NOT NULL,
    comment text,
    status text NOT NULL,
    name text NOT NULL
);
COMMENT ON COLUMN public.event_participants.name IS '参加用の名前（Userとは別でもいい）';
CREATE TABLE public.event_status (
    value text NOT NULL,
    comment text
);
CREATE TABLE public.events (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
    title text NOT NULL,
    description text NOT NULL,
    host text,
    "startAt" timestamp with time zone DEFAULT now() NOT NULL,
    "endAt" timestamp with time zone,
    "placeId" text NOT NULL,
    status text DEFAULT 'DRAFT'::text NOT NULL,
    features jsonb DEFAULT jsonb_build_array() NOT NULL,
    images jsonb DEFAULT jsonb_build_array() NOT NULL,
    "authorId" uuid NOT NULL
);
CREATE TABLE public.users (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
    name text NOT NULL
);
ALTER TABLE ONLY public.event_features
    ADD CONSTRAINT event_features_pkey PRIMARY KEY (value);
ALTER TABLE ONLY public.event_participant_status
    ADD CONSTRAINT event_participant_status_pkey PRIMARY KEY (value);
ALTER TABLE ONLY public.event_participants
    ADD CONSTRAINT event_participants_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.event_status
    ADD CONSTRAINT event_status_pkey PRIMARY KEY (value);
ALTER TABLE ONLY public.events
    ADD CONSTRAINT events_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
CREATE TRIGGER set_public_events_updated_at BEFORE UPDATE ON public.events FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
COMMENT ON TRIGGER set_public_events_updated_at ON public.events IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE TRIGGER set_public_users_updated_at BEFORE UPDATE ON public.users FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
COMMENT ON TRIGGER set_public_users_updated_at ON public.users IS 'trigger to set value of column "updated_at" to current timestamp on row update';
ALTER TABLE ONLY public.event_participants
    ADD CONSTRAINT event_participants_status_fkey FOREIGN KEY (status) REFERENCES public.event_participant_status(value) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.events
    ADD CONSTRAINT events_author_fkey FOREIGN KEY ("authorId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY public.events
    ADD CONSTRAINT events_status_fkey FOREIGN KEY (status) REFERENCES public.event_status(value) ON UPDATE RESTRICT ON DELETE RESTRICT;
