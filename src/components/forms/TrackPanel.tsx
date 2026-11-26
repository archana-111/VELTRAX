"use client";

import { useMemo, useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { findShipment, shipments } from "@/data/shipments";
import type { Shipment } from "@/types/content";

export function TrackPanel() {
  const initial = (useSearchParams().get("id") ?? "").trim().toUpperCase();
  const [query, setQuery] = useState(initial);
  const [submitted, setSubmitted] = useState(/^VLX-\d{5}-[A-Z]{3}$/.test(initial) ? initial : "");
  const [error, setError] = useState("");

  const result = useMemo(() => (submitted ? findShipment(submitted) : undefined), [submitted]);
  const looked = submitted.length > 0;

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = query.trim().toUpperCase();
    if (!value) {
      setError("Enter a tracking number. Sample numbers are listed below.");
      setSubmitted("");
      return;
    }
    if (!/^VLX-\d{5}-[A-Z]{3}$/.test(value)) {
      setError("Use the sample format VLX-00000-ABC.");
      setSubmitted(value);
      return;
    }
    setError("");
    setSubmitted(value);
  }

  return (
    <div className="track-layout">
      <div>
        <form className="form" onSubmit={onSubmit}>
          <div className={error ? "field has-error" : "field"}>
            <label htmlFor="tracking-number">Tracking number</label>
            <input
              id="tracking-number"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              autoComplete="off"
              spellCheck={false}
              aria-invalid={Boolean(error)}
              aria-describedby="tracking-help"
            />
            <span id="tracking-help" className="muted">Demonstration dataset only. Nothing is sent to a carrier.</span>
            {error ? <span className="field-error" role="alert">{error}</span> : null}
          </div>
          <button className="btn btn-navy" type="submit">Show sample status</button>
        </form>
        <div className="samples">
          {shipments.map((shipment) => (
            <button
              key={shipment.id}
              type="button"
              onClick={() => {
                setQuery(shipment.id);
                setError("");
                setSubmitted(shipment.id);
              }}
            >
              {shipment.id}
            </button>
          ))}
        </div>
      </div>
      <div aria-live="polite">
        {!looked ? (
          <div className="banner">
            <p>Enter a sample number to open its timeline. The record will show origin, destination, and the current milestone.</p>
          </div>
        ) : null}
        {looked && !error && !result ? (
          <div className="banner error" role="status">
            <h2>No sample shipment matches {submitted}.</h2>
            <p>Check the characters or choose one of the three demonstration numbers. This page is not connected to a live tracking provider.</p>
          </div>
        ) : null}
        {result ? <ShipmentView shipment={result} /> : null}
      </div>
    </div>
  );
}

function ShipmentView({ shipment }: { shipment: Shipment }) {
  return (
    <article>
      <p className="kicker">{shipment.id}</p>
      <h2 className="status-line">{shipment.status}</h2>
      <div
        className="meter"
        role="meter"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={shipment.progress}
        aria-label="Sample progress through the milestone list"
      >
        <span style={{ transform: `scaleX(${shipment.progress / 100})` }} />
      </div>
      <ul className="meta-list">
        <li><span className="muted">Mode</span><span>{shipment.mode}</span></li>
        <li><span className="muted">Origin</span><span>{shipment.origin}</span></li>
        <li><span className="muted">Destination</span><span>{shipment.destination}</span></li>
        <li><span className="muted">Timing</span><span>{shipment.eta}</span></li>
        <li><span className="muted">Pieces</span><span>{shipment.pieces}</span></li>
        <li><span className="muted">Weight</span><span>{shipment.weight}</span></li>
      </ul>
      <ol className="timeline">
        {shipment.milestones.map((milestone) => (
          <li key={milestone.label}>
            <span className={`dot ${milestone.state}`} aria-hidden="true" />
            <div>
              <strong>{milestone.label}</strong>
              <span className="muted"> · {milestone.state}</span>
              <p>{milestone.detail}</p>
              <p className="muted">{milestone.time}</p>
            </div>
          </li>
        ))}
      </ol>
    </article>
  );
}
