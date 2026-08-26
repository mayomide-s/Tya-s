# Tya’s — Afro-Caribbean Hair Network

A London-first marketplace and professional network for Afro-Caribbean hair.

## Product scope

### Goal
Help clients find credible hair professionals for specific textured-hair needs, while giving stylists a network for referrals and overflow work.

### User-facing behaviour
- Search and filter London stylists by service, area, price and mobile availability.
- View specialist profiles, advertised prices, client feedback and contact details.
- Send an enquiry to a stylist.
- Create a stylist listing.
- Post and respond to stylist-to-stylist referral requests.
- Installable PWA shell with basic offline caching.

### Not included yet
- Payments or deposits.
- Calendar/booking infrastructure.
- Authentication and identity verification.
- Real messaging delivery.
- Moderation/admin tooling.
- Production database.

### Success condition
A client can go from a specific need (for example, “knotless braids in South London under £120”) to a credible stylist and a contact action in a couple of minutes.

## Running locally

No dependencies are required.

```bash
python3 -m http.server 4173
```

Then open `http://localhost:4173`.

## Prototype data
All current stylist profiles and reviews are fictional demo data. User-created listings, referral requests and enquiries are stored in browser `localStorage` only.

## Recommended next production step
Replace localStorage with Firebase Auth + Firestore while preserving the current UI flow. Add verification, review integrity and moderation before public launch.
