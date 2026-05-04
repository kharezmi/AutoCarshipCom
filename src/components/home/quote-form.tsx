"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Box,
  CalendarDays,
  Car,
  CheckCircle2,
  ChevronLeft,
  Loader2,
  MapPin,
  Sparkles,
  Truck,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import {
  calculateEstimatedPrice,
  mockDistanceMiles,
} from "@/lib/quote-pricing";
import { LEGAL_ENTITY } from "@/lib/constants";

const NAVY = "bg-[#1E3A8A] hover:bg-[#172554] text-white shadow-sm";
const AMBER = "text-[#F59E0B]";

const quoteSchema = z.object({
  pickupLocation: z
    .string()
    .min(3, "Enter a pickup ZIP or city")
    .max(120, "Too long"),
  deliveryLocation: z
    .string()
    .min(3, "Enter a delivery ZIP or city")
    .max(120, "Too long"),
  vehicleYear: z
    .string()
    .regex(/^(19|20)\d{2}$/, "Select a year")
    .refine((y) => {
      const n = parseInt(y, 10);
      return n >= 1980 && n <= new Date().getFullYear() + 1;
    }, "Year out of range"),
  vehicleMake: z.string().min(1, "Make is required"),
  vehicleModel: z.string().min(1, "Model is required"),
  condition: z.enum(["running", "inoperable"]),
  transportType: z.enum(["open", "enclosed"]),
  shipDate: z.string().min(1, "Pick a ship date"),
  name: z.string().min(2, "Full name is required"),
  phone: z
    .string()
    .min(10, "Enter a valid phone")
    .regex(/^[\d\s\-+().]{10,}$/, "Enter a valid phone"),
  email: z.string().email("Valid email required"),
  smsConsent: z
    .boolean()
    .refine((val) => val === true, {
      message:
        "Check this box to agree to SMS alerts for quotes, orders, and carrier updates.",
    }),
});

type QuoteFormValues = z.infer<typeof quoteSchema>;

const STEPS = ["Route", "Vehicle", "Transport", "Contact"] as const;

const LOCATION_SUGGESTIONS: { label: string; zip: string }[] = [
  { label: "Los Angeles, CA 90012", zip: "90012" },
  { label: "San Francisco, CA 94102", zip: "94102" },
  { label: "Miami, FL 33101", zip: "33101" },
  { label: "Orlando, FL 32801", zip: "32801" },
  { label: "Dallas, TX 75201", zip: "75201" },
  { label: "Houston, TX 77002", zip: "77002" },
  { label: "Chicago, IL 60601", zip: "60601" },
  { label: "New York, NY 10001", zip: "10001" },
  { label: "Boston, MA 02108", zip: "02108" },
  { label: "Atlanta, GA 30303", zip: "30303" },
  { label: "Seattle, WA 98101", zip: "98101" },
  { label: "Denver, CO 80202", zip: "80202" },
  { label: "Phoenix, AZ 85003", zip: "85003" },
  { label: "Las Vegas, NV 89101", zip: "89101" },
  { label: "Nashville, TN 37203", zip: "37203" },
  { label: "Tampa, FL 33602", zip: "33602" },
];

const POPULAR_MAKES = [
  "Acura",
  "Audi",
  "BMW",
  "Buick",
  "Cadillac",
  "Chevrolet",
  "Chrysler",
  "Dodge",
  "Ford",
  "GMC",
  "Honda",
  "Hyundai",
  "Infiniti",
  "Jeep",
  "Kia",
  "Lexus",
  "Lincoln",
  "Mazda",
  "Mercedes-Benz",
  "Nissan",
  "Porsche",
  "Ram",
  "Subaru",
  "Tesla",
  "Toyota",
  "Volkswagen",
  "Volvo",
];

function extractZip(s: string): string | null {
  const m = s.match(/\b(\d{5})(?:-\d{4})?\b/);
  return m ? m[1] : null;
}

function filterSuggestions(query: string) {
  const q = query.trim().toLowerCase();
  if (q.length < 2) return [];
  return LOCATION_SUGGESTIONS.filter(
    (x) =>
      x.label.toLowerCase().includes(q) || x.zip.includes(q.replace(/\D/g, ""))
  ).slice(0, 6);
}

const slide = {
  initial: { opacity: 0, x: 36 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -36 },
  transition: { type: "spring" as const, stiffness: 380, damping: 34 },
};

export function QuoteForm() {
  const [step, setStep] = useState(0);
  const [miles, setMiles] = useState<number | null>(null);
  const [routeError, setRouteError] = useState<string | null>(null);
  const [loadingRoute, setLoadingRoute] = useState(false);
  const [submitPhase, setSubmitPhase] = useState<"idle" | "calculating" | "done">(
    "idle"
  );
  const [formError, setFormError] = useState<string | null>(null);

  const [pickupSuggestOpen, setPickupSuggestOpen] = useState(false);
  const [deliverySuggestOpen, setDeliverySuggestOpen] = useState(false);
  const [makeOpen, setMakeOpen] = useState(false);
  const makeWrapRef = useRef<HTMLDivElement>(null);

  const form = useForm<QuoteFormValues>({
    resolver: zodResolver(quoteSchema),
    mode: "onChange",
    defaultValues: {
      pickupLocation: "",
      deliveryLocation: "",
      vehicleYear: String(new Date().getFullYear()),
      vehicleMake: "",
      vehicleModel: "",
      condition: "running",
      transportType: "open",
      shipDate: "",
      name: "",
      phone: "",
      email: "",
      smsConsent: false,
    },
  });

  const pickup = useWatch({ control: form.control, name: "pickupLocation" });
  const delivery = useWatch({ control: form.control, name: "deliveryLocation" });
  const year = useWatch({ control: form.control, name: "vehicleYear" });
  const make = useWatch({ control: form.control, name: "vehicleMake" });
  const model = useWatch({ control: form.control, name: "vehicleModel" });
  const condition = useWatch({ control: form.control, name: "condition" });
  const transportType = useWatch({ control: form.control, name: "transportType" });
  const shipDate = useWatch({ control: form.control, name: "shipDate" });
  const name = useWatch({ control: form.control, name: "name" });
  const phone = useWatch({ control: form.control, name: "phone" });
  const email = useWatch({ control: form.control, name: "email" });
  const smsConsent = useWatch({ control: form.control, name: "smsConsent" });

  const pickupSuggestions = useMemo(
    () => filterSuggestions(pickup ?? ""),
    [pickup]
  );
  const deliverySuggestions = useMemo(
    () => filterSuggestions(delivery ?? ""),
    [delivery]
  );
  const makeFiltered = useMemo(() => {
    const q = (make ?? "").trim().toLowerCase();
    if (!q) return POPULAR_MAKES.slice(0, 8);
    return POPULAR_MAKES.filter((m) => m.toLowerCase().includes(q)).slice(0, 10);
  }, [make]);

  const estimatedTotal = useMemo(() => {
    if (miles == null) return null;
    return calculateEstimatedPrice({
      distanceMiles: miles,
      transportType: transportType ?? "open",
      condition: condition ?? "running",
    });
  }, [miles, transportType, condition]);

  const step0Valid =
    (pickup?.trim().length ?? 0) >= 3 && (delivery?.trim().length ?? 0) >= 3;
  const step1Valid =
    !!year?.match(/^(19|20)\d{2}$/) &&
    (make?.trim().length ?? 0) > 0 &&
    (model?.trim().length ?? 0) > 0;
  const step2Valid =
    (transportType === "open" || transportType === "enclosed") &&
    (shipDate?.length ?? 0) > 0;
  const step3Valid =
    (name?.trim().length ?? 0) >= 2 &&
    (phone?.length ?? 0) >= 10 &&
    !!email?.includes("@") &&
    smsConsent === true;

  const nextDisabled = useMemo(() => {
    if (loadingRoute) return true;
    if (step === 0) return !step0Valid;
    if (step === 1) return !step1Valid;
    if (step === 2) return !step2Valid;
    return true;
  }, [step, step0Valid, step1Valid, step2Valid, loadingRoute]);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (
        makeWrapRef.current &&
        !makeWrapRef.current.contains(e.target as Node)
      ) {
        setMakeOpen(false);
      }
    }
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  const resolveMiles = useCallback(async () => {
    const oz = extractZip(pickup ?? "");
    const dz = extractZip(delivery ?? "");
    if (oz && dz) {
      setLoadingRoute(true);
      setRouteError(null);
      try {
        const res = await fetch("/api/quote/estimate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ originZip: oz, destZip: dz }),
        });
        const data = await res.json();
        if (!res.ok) {
          setRouteError(data.error ?? "Could not compute distance.");
          setLoadingRoute(false);
          return false;
        }
        setMiles(data.miles as number);
      } catch {
        setRouteError("Network error. Try again.");
        setLoadingRoute(false);
        return false;
      }
      setLoadingRoute(false);
      return true;
    }
    setMiles(mockDistanceMiles(`${pickup}|${delivery}`));
    setRouteError(null);
    return true;
  }, [pickup, delivery]);

  const goNext = useCallback(async () => {
    setFormError(null);
    const fields: (keyof QuoteFormValues)[][] = [
      ["pickupLocation", "deliveryLocation"],
      ["vehicleYear", "vehicleMake", "vehicleModel", "condition"],
      ["transportType", "shipDate"],
      [],
    ];
    const ok = await form.trigger(fields[step]);
    if (!ok) return;

    if (step === 0) {
      const okMiles = await resolveMiles();
      if (!okMiles) return;
    }

    if (step < 3) setStep((s) => s + 1);
  }, [step, form, resolveMiles]);

  const goBack = useCallback(() => {
    setFormError(null);
    setRouteError(null);
    if (step > 0) setStep((s) => s - 1);
  }, [step]);

  const submitQuote = form.handleSubmit(async (values) => {
    if (miles == null) {
      setFormError("Distance not ready. Go back to route step.");
      return;
    }
    setFormError(null);
    setSubmitPhase("calculating");
    await new Promise((r) => setTimeout(r, 1100));
    try {
      const originZip =
        extractZip(values.pickupLocation) ?? values.pickupLocation;
      const destZip =
        extractZip(values.deliveryLocation) ?? values.deliveryLocation;
      const total = calculateEstimatedPrice({
        distanceMiles: miles,
        transportType: values.transportType,
        condition: values.condition,
      });
      const res = await fetch("/api/quote/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          originZip,
          destZip,
          vehicleYear: values.vehicleYear,
          vehicleMake: values.vehicleMake,
          vehicleModel: values.vehicleModel,
          condition: values.condition,
          transportType: values.transportType,
          shipDate: values.shipDate,
          expedited: false,
          name: values.name,
          phone: values.phone,
          email: values.email,
          smsConsent: values.smsConsent,
          miles,
          estimatedTotal: total,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setFormError(data.error ?? "Submit failed.");
        setSubmitPhase("idle");
        return;
      }
      setSubmitPhase("done");
    } catch {
      setFormError("Network error. Try again or call us.");
      setSubmitPhase("idle");
    }
  });

  const yearOptions = useMemo(() => {
    const y = new Date().getFullYear();
    const list: number[] = [];
    for (let i = y + 1; i >= 1980; i--) list.push(i);
    return list;
  }, []);

  const minShip = new Date().toISOString().slice(0, 10);

  return (
    <div
      id="instant-quote"
      className="rounded-2xl border border-slate-100/80 bg-white/95 p-5 shadow-[0_20px_60px_-15px_rgba(30,58,138,0.35)] ring-1 ring-slate-100 backdrop-blur-sm sm:p-7"
    >
      {submitPhase === "done" ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center gap-4 py-10 text-center"
        >
          <CheckCircle2 className="h-16 w-16 text-emerald-500" />
          <p className="font-heading text-2xl font-bold text-[#1E3A8A]">
            Request received
          </p>
          <p className="max-w-sm text-sm leading-relaxed text-slate-600">
            We have your quote request. Someone from the office will call or email with the next step. For urgent moves,
            use the phone number at the top of the page.
          </p>
        </motion.div>
      ) : (
        <form
          onSubmit={(e) => {
            if (step !== 3) {
              e.preventDefault();
              return;
            }
            void submitQuote(e);
          }}
          className="contents"
        >
          <div className="mb-6 flex items-start justify-between gap-4 border-b border-slate-100 pb-5">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Instant quote
              </p>
              <h2 className="mt-1 font-heading text-xl font-bold text-[#1E3A8A] sm:text-2xl">
                AutoCarship LLC
              </h2>
              <p className="mt-1 text-sm text-slate-600">
                Step {step + 1} of 4: {STEPS[step]}
              </p>
            </div>
            <div className="hidden shrink-0 rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-800 sm:block">
              No obligation
            </div>
          </div>

          {/* Progress */}
          <div className="mb-8 flex gap-1.5">
            {STEPS.map((_, i) => (
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
              className="min-h-[280px]"
            >
              {step === 0 && (
                <div className="space-y-6">
                  <p className="text-sm text-slate-600">ZIP or city; suggestions fill in when you type.</p>
                  <div className="relative">
                    <Label
                      htmlFor="pickupLocation"
                      className="flex items-center gap-2 text-base font-semibold text-slate-800"
                    >
                      <MapPin className={cn("h-4 w-4", AMBER)} />
                      Pickup ZIP or city
                    </Label>
                    <Input
                      id="pickupLocation"
                      autoComplete="off"
                      placeholder="e.g. 33101 or Miami, FL"
                      className="mt-2 h-14 touch-manipulation rounded-xl border-slate-200 px-4 text-base"
                      {...form.register("pickupLocation")}
                      onFocus={() => {
                        setPickupSuggestOpen(true);
                        setDeliverySuggestOpen(false);
                      }}
                      onBlur={() =>
                        setTimeout(() => setPickupSuggestOpen(false), 180)
                      }
                    />
                    {form.formState.errors.pickupLocation && (
                      <p className="mt-1.5 text-sm text-red-600/90">
                        {form.formState.errors.pickupLocation.message}
                      </p>
                    )}
                    {pickupSuggestOpen && pickupSuggestions.length > 0 && (
                      <ul
                        className="absolute z-20 mt-1 max-h-48 w-full overflow-auto rounded-xl border border-slate-200 bg-white py-1 shadow-lg"
                        role="listbox"
                      >
                        {pickupSuggestions.map((s) => (
                          <li key={s.zip + s.label}>
                            <button
                              type="button"
                              className="w-full px-4 py-3 text-left text-sm hover:bg-slate-50"
                              onMouseDown={(e) => {
                                e.preventDefault();
                                form.setValue("pickupLocation", s.label, {
                                  shouldValidate: true,
                                });
                                setPickupSuggestOpen(false);
                              }}
                            >
                              {s.label}
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <div className="relative">
                    <Label
                      htmlFor="deliveryLocation"
                      className="flex items-center gap-2 text-base font-semibold text-slate-800"
                    >
                      <MapPin className={cn("h-4 w-4 rotate-45", AMBER)} />
                      Delivery ZIP or city
                    </Label>
                    <Input
                      id="deliveryLocation"
                      autoComplete="off"
                      placeholder="e.g. 02108 or Boston, MA"
                      className="mt-2 h-14 touch-manipulation rounded-xl border-slate-200 px-4 text-base"
                      {...form.register("deliveryLocation")}
                      onFocus={() => {
                        setDeliverySuggestOpen(true);
                        setPickupSuggestOpen(false);
                      }}
                      onBlur={() =>
                        setTimeout(() => setDeliverySuggestOpen(false), 180)
                      }
                    />
                    {form.formState.errors.deliveryLocation && (
                      <p className="mt-1.5 text-sm text-red-600/90">
                        {form.formState.errors.deliveryLocation.message}
                      </p>
                    )}
                    {deliverySuggestOpen && deliverySuggestions.length > 0 && (
                      <ul className="absolute z-20 mt-1 max-h-48 w-full overflow-auto rounded-xl border border-slate-200 bg-white py-1 shadow-lg">
                        {deliverySuggestions.map((s) => (
                          <li key={s.zip + s.label + "d"}>
                            <button
                              type="button"
                              className="w-full px-4 py-3 text-left text-sm hover:bg-slate-50"
                              onMouseDown={(e) => {
                                e.preventDefault();
                                form.setValue("deliveryLocation", s.label, {
                                  shouldValidate: true,
                                });
                                setDeliverySuggestOpen(false);
                              }}
                            >
                              {s.label}
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  {routeError && (
                    <p className="text-sm text-red-600/90">{routeError}</p>
                  )}
                </div>
              )}

              {step === 1 && (
                <div className="space-y-6">
                  <div>
                    <Label
                      htmlFor="vehicleYear"
                      className="text-base font-semibold text-slate-800"
                    >
                      Year
                    </Label>
                    <select
                      id="vehicleYear"
                      className="mt-2 flex h-14 w-full touch-manipulation rounded-xl border border-slate-200 bg-white px-4 text-base text-slate-900 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E3A8A]"
                      {...form.register("vehicleYear")}
                    >
                      {yearOptions.map((y) => (
                        <option key={y} value={String(y)}>
                          {y}
                        </option>
                      ))}
                    </select>
                    {form.formState.errors.vehicleYear && (
                      <p className="mt-1.5 text-sm text-red-600/90">
                        {form.formState.errors.vehicleYear.message}
                      </p>
                    )}
                  </div>

                  <div className="relative" ref={makeWrapRef}>
                    <Label
                      htmlFor="vehicleMake"
                      className="text-base font-semibold text-slate-800"
                    >
                      Make
                    </Label>
                    <Input
                      id="vehicleMake"
                      list="makes-datalist"
                      placeholder="Search or type make"
                      className="mt-2 h-14 touch-manipulation rounded-xl border-slate-200 px-4 text-base"
                      {...form.register("vehicleMake")}
                      onFocus={() => setMakeOpen(true)}
                    />
                    <datalist id="makes-datalist">
                      {POPULAR_MAKES.map((m) => (
                        <option key={m} value={m} />
                      ))}
                    </datalist>
                    {makeOpen && (
                      <ul className="absolute z-20 mt-1 max-h-44 w-full overflow-auto rounded-xl border border-slate-200 bg-white py-1 shadow-lg">
                        {makeFiltered.map((m) => (
                          <li key={m}>
                            <button
                              type="button"
                              className="w-full px-4 py-2.5 text-left text-sm hover:bg-slate-50"
                              onMouseDown={(e) => {
                                e.preventDefault();
                                form.setValue("vehicleMake", m, {
                                  shouldValidate: true,
                                });
                                setMakeOpen(false);
                              }}
                            >
                              {m}
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                    {form.formState.errors.vehicleMake && (
                      <p className="mt-1.5 text-sm text-red-600/90">
                        {form.formState.errors.vehicleMake.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label
                      htmlFor="vehicleModel"
                      className="text-base font-semibold text-slate-800"
                    >
                      Model
                    </Label>
                    <Input
                      id="vehicleModel"
                      placeholder="e.g. Model Y, F-150"
                      className="mt-2 h-14 touch-manipulation rounded-xl border-slate-200 px-4 text-base"
                      {...form.register("vehicleModel")}
                    />
                    {form.formState.errors.vehicleModel && (
                      <p className="mt-1.5 text-sm text-red-600/90">
                        {form.formState.errors.vehicleModel.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <p className="mb-3 text-base font-semibold text-slate-800">
                      Condition
                    </p>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      <label
                        className={cn(
                          "flex cursor-pointer items-center gap-3 rounded-xl border-2 p-4 transition",
                          condition === "running"
                            ? "border-[#F59E0B] bg-amber-50/50 ring-1 ring-amber-200"
                            : "border-slate-200 hover:border-slate-300"
                        )}
                      >
                        <input
                          type="radio"
                          value="running"
                          className="h-5 w-5 accent-[#1E3A8A]"
                          {...form.register("condition")}
                        />
                        <div>
                          <p className="font-semibold text-slate-900">Running</p>
                          <p className="text-xs text-slate-600">Drives & rolls</p>
                        </div>
                        <Car className="ml-auto h-8 w-8 text-[#1E3A8A]" />
                      </label>
                      <label
                        className={cn(
                          "flex cursor-pointer items-center gap-3 rounded-xl border-2 p-4 transition",
                          condition === "inoperable"
                            ? "border-[#F59E0B] bg-amber-50/50 ring-1 ring-amber-200"
                            : "border-slate-200 hover:border-slate-300"
                        )}
                      >
                        <input
                          type="radio"
                          value="inoperable"
                          className="h-5 w-5 accent-[#1E3A8A]"
                          {...form.register("condition")}
                        />
                        <div>
                          <p className="font-semibold text-slate-900">
                            Non-running
                          </p>
                          <p className="text-xs text-slate-600">
                            +$150 in estimate
                          </p>
                        </div>
                        <Box className="ml-auto h-8 w-8 text-slate-600" />
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  <p className="text-sm text-slate-600">
                    Choose how your vehicle ships. Enclosed uses a 1.4× factor on
                    the line-haul portion of your estimate.
                  </p>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <button
                      type="button"
                      onClick={() =>
                        form.setValue("transportType", "open", {
                          shouldValidate: true,
                        })
                      }
                      className={cn(
                        "flex flex-col items-start rounded-2xl border-2 p-5 text-left transition",
                        transportType === "open"
                          ? "border-[#F59E0B] bg-amber-50/40 shadow-md ring-1 ring-amber-200"
                          : "border-slate-200 hover:border-slate-300"
                      )}
                    >
                      <Truck className="h-10 w-10 text-[#1E3A8A]" />
                      <p className="mt-3 font-heading text-lg font-bold text-slate-900">
                        Open
                      </p>
                      <p className="mt-1 text-sm text-slate-600">
                        Multi-car hauler setups that keep costs down.
                      </p>
                      <span
                        className={cn(
                          "mt-3 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wide",
                          AMBER
                        )}
                      >
                        <Sparkles className="h-3.5 w-3.5" />
                        Most popular
                      </span>
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        form.setValue("transportType", "enclosed", {
                          shouldValidate: true,
                        })
                      }
                      className={cn(
                        "flex flex-col items-start rounded-2xl border-2 p-5 text-left transition",
                        transportType === "enclosed"
                          ? "border-[#F59E0B] bg-amber-50/40 shadow-md ring-1 ring-amber-200"
                          : "border-slate-200 hover:border-slate-300"
                      )}
                    >
                      <Box className="h-10 w-10 text-[#1E3A8A]" />
                      <p className="mt-3 font-heading text-lg font-bold text-slate-900">
                        Enclosed
                      </p>
                      <p className="mt-1 text-sm text-slate-600">
                        Covered trailer routing with a 1.4x bump on mileage only.
                      </p>
                    </button>
                  </div>

                  <div>
                    <Label
                      htmlFor="shipDate"
                      className="flex items-center gap-2 text-base font-semibold text-slate-800"
                    >
                      <CalendarDays className={cn("h-4 w-4", AMBER)} />
                      Preferred ship date
                    </Label>
                    <Input
                      id="shipDate"
                      type="date"
                      min={minShip}
                      className="mt-2 h-14 touch-manipulation rounded-xl border-slate-200 px-4 text-base"
                      {...form.register("shipDate")}
                    />
                    {form.formState.errors.shipDate && (
                      <p className="mt-1.5 text-sm text-red-600/90">
                        {form.formState.errors.shipDate.message}
                      </p>
                    )}
                  </div>

                  {estimatedTotal != null && (
                    <div className="rounded-2xl border border-[#1E3A8A]/20 bg-[#1E3A8A] px-5 py-4 text-white">
                      <p className="text-xs font-semibold uppercase tracking-wide text-amber-300">
                        Estimated total
                      </p>
                      <p className="font-heading text-3xl font-bold">
                        ${estimatedTotal.toLocaleString()}
                      </p>
                      <p className="mt-1 text-xs text-slate-300">
                        ~{miles?.toLocaleString()} mi. Not binding until confirmed.
                      </p>
                    </div>
                  )}
                </div>
              )}

              {step === 3 && (
                <div className="space-y-5">
                  {estimatedTotal != null && (
                    <div className="rounded-2xl border border-amber-200 bg-amber-50/60 px-4 py-3 text-center">
                      <p className="text-xs font-semibold uppercase text-amber-900">
                        Your ballpark rate
                      </p>
                      <p className="font-heading text-2xl font-bold text-[#1E3A8A]">
                        ${estimatedTotal.toLocaleString()}
                      </p>
                    </div>
                  )}
                  <div>
                    <Label
                      htmlFor="name"
                      className="flex items-center gap-2 text-base font-semibold text-slate-800"
                    >
                      <User className={cn("h-4 w-4", AMBER)} />
                      Full name
                    </Label>
                    <Input
                      id="name"
                      className="mt-2 h-14 touch-manipulation rounded-xl border-slate-200 px-4 text-base"
                      {...form.register("name")}
                    />
                    {form.formState.errors.name && (
                      <p className="mt-1.5 text-sm text-red-600/90">
                        {form.formState.errors.name.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-base font-semibold">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      className="mt-2 h-14 touch-manipulation rounded-xl border-slate-200 px-4 text-base"
                      {...form.register("email")}
                    />
                    {form.formState.errors.email && (
                      <p className="mt-1.5 text-sm text-red-600/90">
                        {form.formState.errors.email.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-base font-semibold">
                      Phone number
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      className="mt-2 h-14 touch-manipulation rounded-xl border-slate-200 px-4 text-base"
                      {...form.register("phone")}
                    />
                    {form.formState.errors.phone && (
                      <p className="mt-1.5 text-sm text-red-600/90">
                        {form.formState.errors.phone.message}
                      </p>
                    )}
                  </div>
                  <div className="rounded-xl border border-slate-200 bg-slate-50/80 px-4 py-3">
                    <Controller
                      name="smsConsent"
                      control={form.control}
                      render={({ field }) => (
                        <label className="flex cursor-pointer gap-3 leading-snug">
                          <input
                            type="checkbox"
                            className="mt-0.5 h-4 w-4 shrink-0 rounded border-slate-300 text-[#1E3A8A] focus-visible:ring-2 focus-visible:ring-[#1E3A8A]"
                            checked={field.value}
                            onChange={(e) => field.onChange(e.target.checked)}
                            ref={field.ref}
                          />
                          <span className="text-xs text-slate-600">
                            By checking this box, you agree to receive SMS messages
                            from {LEGAL_ENTITY} related to vehicle shipping quotes,
                            order updates, and carrier status. You may reply{" "}
                            <strong>STOP</strong> to opt out at any time. Reply{" "}
                            <strong>HELP</strong> for assistance at{" "}
                            <a
                              href="tel:+15092539660"
                              className="font-semibold text-navy-800 underline decoration-amber-500 decoration-1 underline-offset-2"
                            >
                              (509) 253-9660
                            </a>
                            . Message and data rates may apply. Message frequency
                            may vary. Learn more on our{" "}
                            <Link
                              href="/privacy"
                              className="font-semibold text-[#1E3A8A] underline underline-offset-2 hover:text-[#172554]"
                            >
                              Privacy Policy
                            </Link>{" "}
                            and{" "}
                            <Link
                              href="/terms"
                              className="font-semibold text-[#1E3A8A] underline underline-offset-2 hover:text-[#172554]"
                            >
                              Terms &amp; Conditions
                            </Link>{" "}
                            pages.
                          </span>
                        </label>
                      )}
                    />
                    {form.formState.errors.smsConsent && (
                      <p className="mt-2 text-sm text-red-600/90">
                        {form.formState.errors.smsConsent.message}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {formError && (
            <p className="mt-4 text-sm text-red-600/90" role="alert">
              {formError}
            </p>
          )}

          <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex gap-2">
              {step > 0 && (
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  className="h-12 min-w-[6rem] rounded-xl border-slate-300"
                  onClick={goBack}
                  disabled={submitPhase === "calculating"}
                >
                  <ChevronLeft className="mr-1 h-4 w-4" />
                  Back
                </Button>
              )}
            </div>
            <div className="flex flex-1 justify-end gap-3">
              {step < 3 ? (
                <Button
                  type="button"
                  size="lg"
                  disabled={nextDisabled}
                  className={cn(
                    "h-12 min-w-[10rem] rounded-xl px-6 text-base font-semibold",
                    NAVY,
                    nextDisabled && "opacity-40"
                  )}
                  onClick={() => void goNext()}
                >
                  {loadingRoute ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Checking route…
                    </>
                  ) : (
                    <>
                      Next
                      <ArrowRight className="ml-1 h-5 w-5" />
                    </>
                  )}
                </Button>
              ) : (
                <Button
                  type="submit"
                  size="lg"
                  disabled={!step3Valid || submitPhase === "calculating"}
                  className={cn(
                    "h-14 min-w-full rounded-xl px-8 text-base font-bold sm:min-w-[14rem]",
                    NAVY,
                    (!step3Valid || submitPhase === "calculating") && "opacity-50"
                  )}
                >
                  {submitPhase === "calculating" ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Calculating the best rate…
                    </>
                  ) : (
                    "Get my quote"
                  )}
                </Button>
              )}
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
