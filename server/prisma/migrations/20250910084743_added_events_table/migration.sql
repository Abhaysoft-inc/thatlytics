-- CreateTable
CREATE TABLE "public"."Event" (
    "event_id" TEXT NOT NULL,
    "session_id" TEXT NOT NULL,
    "event_name" TEXT NOT NULL,
    "utm_source" TEXT,
    "referrer" TEXT,
    "user_agent" TEXT NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("event_id")
);
