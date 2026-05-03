"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  ChevronLeft,
  Loader2,
  Mail,
  MapPin,
  MessageSquareText,
  Phone,
  Truck,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const NAVY_BTN =
  "bg-[#1E3A8A] hover:bg-[#172554] text-white shadow-sm disabled:opacity-45";
const AMBER = "text-[#F59E0B]";
const STEP_LABELS = ["About you", "Route", "Notes"] as const;

const slide = {
  initial: { opacity: 0, x: 28 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -28 },
  transition: { type: "spring" as const, stiffness: 380, damping: 34 },
};

const inputClass =
  "mt-2 h-14 touch-manipulation rounded-xl border-slate-200 px-4 text-base shadow-sm focus-visible:ring-[#1E3A8A]";
const textareaClass =
  "mt-2 min-h-[152px] w-full resize-y rounded-xl border border-slate-200 bg-white px-4 py-3 text-base leading-relaxed text-slate-900 shadow-sm placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E3A8A] focus-visible:ring-offset-0";

const schema = z.object({
  name: z.string().min(2, "Enter your full name"),
  email: z.string().email("Enter a valid email address"),
  phone: z
    .string()
    .min(10, "Enter a phone number we can reach you on")
    .regex(/^[\d\s\-+().]{10,}$/, "Use digits and normal phone punctuation"),
  moveType: z.enum(["consumer", "dealer", "other"]),
  origin: z.string().min(2, "Enter pickup city, state, or ZIP"),
  destination: z.string().min(2, "Enter delivery city, state, or ZIP"),
  notes: z.string().optional(),
});

type Values = z.infer<typeof schema>;

const MOVE_OPTIONS: {
  value: Values["moveType"];
  label: string;
  sub: string;
  Icon: typeof User;
}[] = [
  {
    value: "consumer",
    label: "Private owner",
    sub: "Personal move or one-off shipment",
    Icon: User,
  },
  {
    value: "dealer",
    label: "Dealer / fleet",
    sub: "Inventory, auctions, recurring lanes",
    Icon: Building2,
  },
  {
    value: "other",
    label: "Other business",
    sub: "Rental, film, relocation partner",
    Icon: Truck,
  },
];

export function ContactLeadForm() {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const form = useForm<Values>({
    resolver: zodResolver(schema),
    mode: "onTouched",
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      moveType: "consumer",
      origin: "",
      destination: "",
      notes: "",
    },
  });

  const moveType = form.watch("moveType");

  async function next() {
    setErr(null);
    const fields: (keyof Values)[][] = [
      ["name", "email", "phone", "moveType"],
      ["origin", "destination"],
      ["notes"],
    ];
    const ok = await form.trigger(fields[step]);
    if (!ok) return;
    if (step < 2) setStep((s) => s + 1);
  }

  function back() {
    setErr(null);
    if (step > 0) setStep((s) => s - 1);
  }

  async function submit() {
    setErr(null);
    const ok = await form.trigger();
    if (!ok) return;
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form.getValues()),
      });
      const data = await res.json();
      if (!res.ok) {
        setErr(data.error ?? "Failed to send.");
        setLoading(false);
        return;
      }
      setDone(true);
    } catch {
      setErr("Network error.");
    }
    setLoading(false);
  }

  return (
    <div
      className="rounded-2xl border border-slate-100/80 bg-white/95 p-5 shadow-[0_20px_60px_-15px_rgba(30,58,138,0.35)] ring-1 ring-slate-100 backdrop-blur-sm sm:p-7"
    >
      {done ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.25 }}
          className="flex flex-col items-center gap-4 py-12 text-center"
        >
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 ring-8 ring-emerald-100/80">
            <CheckCircle2 className="h-9 w-9 text-emerald-600" />
          </div>
          <div>
            <p className="font-heading text-2xl font-bold text-[#1E3A8A]">
              Message received
            </p>
            <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-slate-600">
              A coordinator will call or email shortly with next steps. If it
              is urgent, use the phone number on this page.
            </p>
          </div>
        </motion.div>
      ) : (
        <>
          <div className="mb-6 flex flex-wrap items-start justify-between gap-4 border-b border-slate-100 pb-5">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Contact dispatch
              </p>
              <h2 className="mt-1 font-heading text-xl font-bold text-[#1E3A8A] sm:text-2xl">
                Send a lead to the desk
              </h2>
              <p className="mt-1 text-sm text-slate-600">
                Step {step + 1} of 3 · {STEP_LABELS[step]}
              </p>
            </div>
            <div className="hidden shrink-0 rounded-full bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-900 sm:block">
              Same inbox as quotes
            </div>
          </div>

          <div className="mb-8 flex gap-1.5">
            {STEP_LABELS.map((_, i) => (
              <div
                key={i}
                className={cn(
                  "h-1.5 flex-1 rounded-full transition-colors duration-300",
                  i < step
                    ? "bg-[#1E3A8A]"
                    : i === step
                      ? "bg-[#F59E0B]"
                      : "bg-slate-200"
                )}
              />
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={slide.initial}
              animate={slide.animate}
              exit={slide.exit}
              transition={slide.transition}
              className="min-h-[268px]"
            >
              {step === 0 && (
                <div className="space-y-6">
                  <p className="text-sm leading-relaxed text-slate-600">
                    We route this to the same coordinators who handle instant
                    quotes—include a good phone window so we can reach you fast.
                  </p>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                      <Label
                        htmlFor="c-name"
                        className="flex items-center gap-2 text-base font-semibold text-slate-800"
                      >
                        <User className={cn("h-4 w-4 shrink-0", AMBER)} />
                        Full name
                      </Label>
                      <Input
                        id="c-name"
                        autoComplete="name"
                        placeholder="Jordan Smith"
                        className={cn(inputClass)}
                        {...form.register("name")}
                      />
                      {form.formState.errors.name && (
                        <p className="mt-1.5 text-sm text-red-600/90">
                          {form.formState.errors.name.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label
                        htmlFor="c-email"
                        className="flex items-center gap-2 text-base font-semibold text-slate-800"
                      >
                        <Mail className={cn("h-4 w-4 shrink-0", AMBER)} />
                        Email
                      </Label>
                      <Input
                        id="c-email"
                        type="email"
                        autoComplete="email"
                        placeholder="you@example.com"
                        className={cn(inputClass)}
                        {...form.register("email")}
                      />
                      {form.formState.errors.email && (
                        <p className="mt-1.5 text-sm text-red-600/90">
                          {form.formState.errors.email.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label
                        htmlFor="c-phone"
                        className="flex items-center gap-2 text-base font-semibold text-slate-800"
                      >
                        <Phone className={cn("h-4 w-4 shrink-0", AMBER)} />
                        Phone
                      </Label>
                      <Input
                        id="c-phone"
                        type="tel"
                        autoComplete="tel"
                        placeholder="(555) 123-4567"
                        className={cn(inputClass)}
                        {...form.register("phone")}
                      />
                      {form.formState.errors.phone && (
                        <p className="mt-1.5 text-sm text-red-600/90">
                          {form.formState.errors.phone.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <p className="text-base font-semibold text-slate-800">
                      You&apos;re contacting us as
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      Helps us prioritize dealer paperwork vs. consumer moves.
                    </p>
                    <div className="mt-3 grid gap-2.5 sm:grid-cols-3">
                      {MOVE_OPTIONS.map(
                        ({ value, label, sub, Icon: MoveIcon }) => {
                          const active = moveType === value;
                          return (
                            <button
                              key={value}
                              type="button"
                              onClick={() =>
                                form.setValue("moveType", value, {
                                  shouldValidate: true,
                                  shouldDirty: true,
                                })
                              }
                              className={cn(
                                "flex flex-col items-start rounded-xl border px-3 py-3.5 text-left transition-all",
                                active
                                  ? "border-[#1E3A8A] bg-navy-50/80 shadow-sm ring-2 ring-[#1E3A8A]/20"
                                  : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/80"
                              )}
                            >
                              <MoveIcon
                                className={cn(
                                  "mb-2 h-5 w-5",
                                  active ? AMBER : "text-slate-400"
                                )}
                              />
                              <span className="text-sm font-bold text-navy-900">
                                {label}
                              </span>
                              <span className="mt-0.5 text-[11px] leading-snug text-slate-500">
                                {sub}
                              </span>
                            </button>
                          );
                        }
                      )}
                    </div>
                    {form.formState.errors.moveType && (
                      <p className="mt-2 text-sm text-red-600/90">
                        {form.formState.errors.moveType.message}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {step === 1 && (
                <div className="space-y-6">
                  <p className="text-sm leading-relaxed text-slate-600">
                    City and state or ZIP is enough—we&apos;ll confirm the full
                    addresses when we call back.
                  </p>
                  <div>
                    <Label
                      htmlFor="origin"
                      className="flex items-center gap-2 text-base font-semibold text-slate-800"
                    >
                      <MapPin className={cn("h-4 w-4 shrink-0", AMBER)} />
                      Pickup city or ZIP
                    </Label>
                    <Input
                      id="origin"
                      autoComplete="off"
                      placeholder="e.g. Austin, TX or 78701"
                      className={cn(inputClass)}
                      {...form.register("origin")}
                    />
                    {form.formState.errors.origin && (
                      <p className="mt-1.5 text-sm text-red-600/90">
                        {form.formState.errors.origin.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label
                      htmlFor="destination"
                      className="flex items-center gap-2 text-base font-semibold text-slate-800"
                    >
                      <MapPin
                        className={cn(
                          "h-4 w-4 shrink-0 rotate-45",
                          AMBER
                        )}
                      />
                      Delivery city or ZIP
                    </Label>
                    <Input
                      id="destination"
                      autoComplete="off"
                      placeholder="e.g. Seattle, WA or 98101"
                      className={cn(inputClass)}
                      {...form.register("destination")}
                    />
                    {form.formState.errors.destination && (
                      <p className="mt-1.5 text-sm text-red-600/90">
                        {form.formState.errors.destination.message}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-5">
                  <div>
                    <Label
                      htmlFor="notes"
                      className="flex items-center gap-2 text-base font-semibold text-slate-800"
                    >
                      <MessageSquareText
                        className={cn("h-4 w-4 shrink-0", AMBER)}
                      />
                      Vehicle & timing
                    </Label>
                    <p className="mt-1 text-xs text-slate-500">
                      Optional but recommended—trim, enclosed vs. open,
                      must-move dates, and lienholder contacts if any.
                    </p>
                    <textarea
                      id="notes"
                      rows={5}
                      className={textareaClass}
                      placeholder="e.g. 2022 Subaru Outback · running · flexible pickup after Jan 15 · open carrier OK..."
                      {...form.register("notes")}
                    />
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {err && (
            <p
              className="mt-4 rounded-lg border border-red-100 bg-red-50 px-3 py-2 text-sm text-red-700"
              role="alert"
            >
              {err}
            </p>
          )}

          <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex gap-2">
              {step > 0 ? (
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  className="h-12 min-w-[6.25rem] rounded-xl border-slate-300 bg-white font-semibold"
                  onClick={back}
                  disabled={loading}
                >
                  <ChevronLeft className="mr-1 h-4 w-4" />
                  Back
                </Button>
              ) : (
                <span className="hidden text-sm text-slate-400 sm:inline">
                  Estimated time: under 2 minutes
                </span>
              )}
            </div>
            <div className="flex flex-1 justify-stretch sm:justify-end">
              {step < 2 ? (
                <Button
                  type="button"
                  size="lg"
                  disabled={loading}
                  className={cn(
                    "h-12 w-full rounded-xl px-6 text-base font-semibold sm:min-w-[11rem] sm:w-auto",
                    NAVY_BTN
                  )}
                  onClick={() => void next()}
                >
                  Continue
                  <ArrowRight className="ml-1 h-5 w-5" />
                </Button>
              ) : (
                <Button
                  type="button"
                  size="lg"
                  disabled={loading}
                  className={cn(
                    "h-12 w-full rounded-xl px-8 text-base font-bold sm:min-w-[12rem]",
                    NAVY_BTN
                  )}
                  onClick={() => void submit()}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Sending…
                    </>
                  ) : (
                    <>
                      Submit to dispatch
                      <ArrowRight className="ml-1 h-5 w-5" />
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
