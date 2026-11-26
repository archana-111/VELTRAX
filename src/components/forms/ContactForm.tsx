"use client";

import { useState, type FormEvent } from "react";

type Values = {
  name: string;
  email: string;
  phone: string;
  company: string;
  topic: string;
  message: string;
};

const empty: Values = { name: "", email: "", phone: "", company: "", topic: "General", message: "" };

export function ContactForm({ initialTopic = "General" }: { initialTopic?: string }) {
  const [values, setValues] = useState<Values>({ ...empty, topic: initialTopic });
  const [errors, setErrors] = useState<Partial<Record<keyof Values, string>>>({});
  const [done, setDone] = useState(false);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next: Partial<Record<keyof Values, string>> = {};
    if (values.name.trim().length < 2) next.name = "Enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) next.email = "Enter a valid email address.";
    if (values.phone.trim() && values.phone.replace(/\D/g, "").length < 7) next.phone = "Enter at least 7 digits, or leave the phone blank.";
    if (values.message.trim().length < 12) next.message = "Write at least a short sentence so the desk would know why you wrote.";
    setErrors(next);
    setDone(Object.keys(next).length === 0);
  }

  if (done) {
    return (
      <div className="form-success" role="status">
        <h2>Demonstration only. Nothing was sent.</h2>
        <p>Thanks, {values.name}. This message about {values.topic.toLowerCase()} did not leave the browser.</p>
        <button className="btn btn-line" type="button" onClick={() => { setDone(false); setValues({ ...empty, topic: initialTopic }); }}>
          Clear the sample
        </button>
      </div>
    );
  }

  return (
    <form className="form" onSubmit={onSubmit} noValidate>
      <p className="form-note">Contact messages are not delivered. Use this form to check validation, then connect your own endpoint.</p>
      {Object.keys(errors).length ? (
        <div className="banner error" role="alert">Correct the highlighted fields before the demonstration can finish.</div>
      ) : null}
      <div className="form-grid two">
        <div className={errors.name ? "field has-error" : "field"}>
          <label htmlFor="contact-name">Name</label>
          <input id="contact-name" value={values.name} onChange={(event) => setValues({ ...values, name: event.target.value })} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "contact-name-error" : undefined} />
          {errors.name ? <span id="contact-name-error" className="field-error">{errors.name}</span> : null}
        </div>
        <div className={errors.email ? "field has-error" : "field"}>
          <label htmlFor="contact-email">Email</label>
          <input id="contact-email" type="email" value={values.email} onChange={(event) => setValues({ ...values, email: event.target.value })} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "contact-email-error" : undefined} />
          {errors.email ? <span id="contact-email-error" className="field-error">{errors.email}</span> : null}
        </div>
        <div className={errors.phone ? "field has-error" : "field"}>
          <label htmlFor="contact-phone">Phone</label>
          <input id="contact-phone" type="tel" value={values.phone} onChange={(event) => setValues({ ...values, phone: event.target.value })} aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? "contact-phone-error" : undefined} />
          {errors.phone ? <span id="contact-phone-error" className="field-error">{errors.phone}</span> : null}
        </div>
        <div className="field">
          <label htmlFor="contact-company">Company</label>
          <input id="contact-company" value={values.company} onChange={(event) => setValues({ ...values, company: event.target.value })} />
        </div>
      </div>
      <div className="field">
        <label htmlFor="contact-topic">Topic</label>
        <select id="contact-topic" value={values.topic} onChange={(event) => setValues({ ...values, topic: event.target.value })}>
          {["General", "Quote", "Tracking", "Careers", "Press"].map((topic) => (
            <option key={topic}>{topic}</option>
          ))}
        </select>
      </div>
      <div className={errors.message ? "field has-error" : "field"}>
        <label htmlFor="contact-message">Message</label>
        <textarea id="contact-message" value={values.message} onChange={(event) => setValues({ ...values, message: event.target.value })} aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? "contact-message-error" : undefined} />
        {errors.message ? <span id="contact-message-error" className="field-error">{errors.message}</span> : null}
      </div>
      <button className="btn btn-navy" type="submit">Send demonstration message</button>
    </form>
  );
}
