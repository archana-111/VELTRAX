"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { freightTypes } from "@/data/services";

type Values = {
  name: string;
  email: string;
  phone: string;
  company: string;
  freight: string;
  origin: string;
  destination: string;
  weight: string;
  dimensions: string;
  message: string;
};

const empty: Values = {
  name: "",
  email: "",
  phone: "",
  company: "",
  freight: "",
  origin: "",
  destination: "",
  weight: "",
  dimensions: "",
  message: "",
};

const labels: Record<keyof Values, string> = {
  name: "Name",
  email: "Email",
  phone: "Phone",
  company: "Company",
  freight: "Freight type",
  origin: "Origin",
  destination: "Destination",
  weight: "Shipment weight (kg)",
  dimensions: "Dimensions",
  message: "Message",
};

function validate(values: Values) {
  const errors: Partial<Record<keyof Values, string>> = {};
  if (values.name.trim().length < 2) errors.name = "Enter the name of the person requesting the quote.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) errors.email = "Enter an email address with a domain.";
  if (values.phone.replace(/\D/g, "").length < 7) errors.phone = "Enter a phone number with at least 7 digits.";
  if (values.company.trim().length < 2) errors.company = "Enter the company name.";
  if (!values.freight) errors.freight = "Choose a freight type.";
  if (values.origin.trim().length < 2) errors.origin = "Enter a collection city or port.";
  if (values.destination.trim().length < 2) errors.destination = "Enter a delivery city or port.";
  const weight = Number(values.weight);
  if (!values.weight.trim() || Number.isNaN(weight) || weight <= 0) errors.weight = "Enter a weight in kilograms, greater than zero.";
  if (values.dimensions.trim() && !/^\d+(\.\d+)?\s*[x×]\s*\d+(\.\d+)?\s*[x×]\s*\d+(\.\d+)?(\s*(mm|cm|m))?$/i.test(values.dimensions.trim())) {
    errors.dimensions = "Use length × width × height, for example 120 x 80 x 100 cm.";
  }
  if (values.message.trim().length < 12) errors.message = "Add a short note about the cargo, the date, and any site constraint.";
  return errors;
}

export function QuoteForm() {
  const [values, setValues] = useState<Values>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof Values, string>>>({});
  const [status, setStatus] = useState<"idle" | "error" | "success">("idle");

  function update(key: keyof Values, value: string) {
    setValues((current) => ({ ...current, [key]: value }));
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next = validate(values);
    setErrors(next);
    if (Object.keys(next).length) {
      setStatus("error");
      return;
    }
    setStatus("success");
  }

  if (status === "success") {
    return (
      <div className="form-success" role="status">
        <h2>Demonstration only. Nothing was sent.</h2>
        <p>
          {values.name}, this quote request for {values.freight.toLowerCase()} from {values.origin} to {values.destination} stayed in your browser. Connect a form endpoint before you publish.
        </p>
        <button className="btn btn-line" type="button" onClick={() => { setValues(empty); setStatus("idle"); setErrors({}); }}>
          Write another sample
        </button>
      </div>
    );
  }

  const errorKeys = Object.keys(errors) as (keyof Values)[];

  return (
    <form className="form" onSubmit={onSubmit} noValidate>
      <p className="form-note">This form does not transmit data. It is a demonstration of validation and a success state.</p>
      {status === "error" ? (
        <div className="banner error" role="alert">
          <p>The quote needs a few corrections.</p>
          <ul>
            {errorKeys.map((key) => (
              <li key={key}>
                <a href={`#quote-${key}`}>{labels[key]}: {errors[key]}</a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
      <div className="form-grid two">
        <Field id="quote-name" label={labels.name} error={errors.name}>
          <input id="quote-name" name="name" autoComplete="name" value={values.name} onChange={(event) => update("name", event.target.value)} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "quote-name-error" : undefined} />
        </Field>
        <Field id="quote-email" label={labels.email} error={errors.email}>
          <input id="quote-email" name="email" type="email" autoComplete="email" value={values.email} onChange={(event) => update("email", event.target.value)} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "quote-email-error" : undefined} />
        </Field>
        <Field id="quote-phone" label={labels.phone} error={errors.phone}>
          <input id="quote-phone" name="phone" type="tel" autoComplete="tel" value={values.phone} onChange={(event) => update("phone", event.target.value)} aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? "quote-phone-error" : undefined} />
        </Field>
        <Field id="quote-company" label={labels.company} error={errors.company}>
          <input id="quote-company" name="company" autoComplete="organization" value={values.company} onChange={(event) => update("company", event.target.value)} aria-invalid={Boolean(errors.company)} aria-describedby={errors.company ? "quote-company-error" : undefined} />
        </Field>
        <Field id="quote-freight" label={labels.freight} error={errors.freight}>
          <select id="quote-freight" name="freight" value={values.freight} onChange={(event) => update("freight", event.target.value)} aria-invalid={Boolean(errors.freight)} aria-describedby={errors.freight ? "quote-freight-error" : undefined}>
            <option value="">Select a service</option>
            {freightTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </Field>
        <Field id="quote-weight" label={labels.weight} error={errors.weight}>
          <input id="quote-weight" name="weight" inputMode="decimal" value={values.weight} onChange={(event) => update("weight", event.target.value)} aria-invalid={Boolean(errors.weight)} aria-describedby={errors.weight ? "quote-weight-error" : undefined} />
        </Field>
        <Field id="quote-origin" label={labels.origin} error={errors.origin}>
          <input id="quote-origin" name="origin" value={values.origin} onChange={(event) => update("origin", event.target.value)} aria-invalid={Boolean(errors.origin)} aria-describedby={errors.origin ? "quote-origin-error" : undefined} />
        </Field>
        <Field id="quote-destination" label={labels.destination} error={errors.destination}>
          <input id="quote-destination" name="destination" value={values.destination} onChange={(event) => update("destination", event.target.value)} aria-invalid={Boolean(errors.destination)} aria-describedby={errors.destination ? "quote-destination-error" : undefined} />
        </Field>
      </div>
      <Field id="quote-dimensions" label={labels.dimensions} error={errors.dimensions} hint="Optional. Example: 120 x 80 x 100 cm">
        <input id="quote-dimensions" name="dimensions" value={values.dimensions} onChange={(event) => update("dimensions", event.target.value)} aria-invalid={Boolean(errors.dimensions)} aria-describedby={errors.dimensions ? "quote-dimensions-error" : "quote-dimensions-hint"} />
      </Field>
      <Field id="quote-message" label={labels.message} error={errors.message}>
        <textarea id="quote-message" name="message" value={values.message} onChange={(event) => update("message", event.target.value)} aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? "quote-message-error" : undefined} />
      </Field>
      <button className="btn btn-navy" type="submit">Submit demonstration quote</button>
    </form>
  );
}

function Field({
  id,
  label,
  error,
  hint,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <div className={error ? "field has-error" : "field"}>
      <label htmlFor={id}>{label}</label>
      {children}
      {hint ? <span id={`${id}-hint`} className="muted">{hint}</span> : null}
      {error ? <span id={`${id}-error`} className="field-error">{error}</span> : null}
    </div>
  );
}
