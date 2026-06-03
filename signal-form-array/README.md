# Angular 21 — Signal Forms Tutorial

A hands-on tutorial project demonstrating the new **`@angular/forms/signals`** API introduced in Angular 21.  
It covers a variety of real-world reactive-form patterns, all driven by Angular Signals instead of traditional `FormControl` / `FormGroup`.

---

## 🚀 Getting Started

```bash
npm install
npm start          # serves at http://localhost:4200
npm test           # runs unit tests with Vitest
npm run build      # production build
```

---

## 📦 Tech Stack

| Package | Version |
|---|---|
| Angular | ^21.0.0 |
| Angular Material | ^21.2.3 |
| Angular CDK | ^21.2.3 |
| RxJS | ~7.8.0 |
| TypeScript | ~5.9.2 |
| Vitest | ^4.0.8 |

---

## 🗂️ Project Structure

```
src/app/
├── core/
│   └── string-date.adapter.ts       # Custom Material DateAdapter (string ↔ Date)
├── forms/
│   ├── arrays/                      # Form Array example
│   ├── contacts/                    # Basic reactive form example
│   ├── cross-fields/                # Cross-field / group-level validator example
│   ├── disabled-readonly/           # Disabled & readonly attribute binding example
│   ├── dynamic/                     # Schema-driven dynamic form example
│   └── shared/
│       ├── error-details/           # Reusable error display component
│       ├── datetime-local.util.ts   # datetime-local input helpers
│       └── debounce-signal.util.ts  # Debounced signal utility
├── home/                            # Landing page with navigation cards
└── services/
    └── theme.service.ts             # Light / dark theme toggle (persisted to localStorage)
```

---

## 📋 Examples

### 1. Contact Form — `/forms/contact`
A straightforward signal-based form with four fields: **first name**, **last name**, **email**, and **phone**.  
Demonstrates the basics of `form()` + `FieldTree`, per-field validation, and reading values from a `WritableSignal`.

### 2. Cross-Field Validation — `/forms/cross-field`
A registration-style form (**username**, **password**, **confirm password**, **date of birth**) that shows how to write a **group-level validator** that compares two fields.  
Also demonstrates integrating the Angular Material `MatDatepicker` with a signal-backed string date model via a custom `DateAdapter`.

### 3. Form Arrays — `/forms/arrays`
Demonstrates a **dynamic list of phone-number fields** backed by a plain array in the signal model.  
Shows how to add and remove items reactively and keep the `FieldTree` in sync with the signal state.

### 4. Disabled / Readonly Attributes — `/forms/attribute-disable`
Shows how to conditionally **disable** controls (including a `MatSlideToggle` and a chip-input for beverages) based on the value of another field, using the signal-forms attribute bindings rather than imperative `FormControl.disable()` calls.

### 5. Dynamic / Schema-Driven Form — `/forms/dynamic-form`
A fully **metadata-driven** form engine. A `SchemaDefinition` object describes every field (type, label, validators, options, visibility).  
The `DynamicFormComponent` renders the correct control type (text, number, email, date, select, radio, checkbox) at runtime.  
Three sample schemas are included — **Flights**, **Appointments**, and an **All Field Types** demo — rendered in a `MatTabGroup`.

---

## 🎨 Theming

The app uses a custom **McDonald's-inspired Material 3 colour palette** (Red primary, Gold secondary, Amber tertiary).

A `ThemeService` toggles between light and dark modes by adding `.light-theme` / `.dark-theme` classes to the `<html>` element, which switches the Angular Material `color-scheme` CSS variable.  
The chosen theme is **persisted to `localStorage`** and restored on the next visit.

To regenerate the theme palette:

```bash
ng generate @angular/material:theme-color
```

---

## 🔑 Key Concepts

| Concept | Where to look |
|---|---|
| `form()` + `FieldTree` | Every `*.form.ts` model file |
| `FormField` directive | Any template with `[formField]="..."` |
| Per-field validators | `array-data.form.ts`, `contact-data.form.ts` |
| Group-level (cross-field) validator | `cross-field-data.form.ts` |
| Dynamic schema definition | `form-field.constant.ts`, `dynamic-form.utils.ts` |
| Custom `DateAdapter` | `core/string-date.adapter.ts` |
| Debounced signal | `shared/debounce-signal.util.ts` |
| Theme toggling with signals | `services/theme.service.ts` |
