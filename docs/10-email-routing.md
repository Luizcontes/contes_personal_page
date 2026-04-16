# Email Routing

Status: Draft
Last updated: 2026-04-16

## Objective
Forward contact@yourdomain.com to personal inbox using Cloudflare Email Routing.

## Setup Checklist
- Domain is active in Cloudflare
- Email Routing feature enabled
- Destination inbox verified
- Route created for contact@ to destination inbox

## DNS Records
- Add required MX records from Cloudflare docs
- Add TXT records for SPF recommendations if needed

## Validation
- Send test email to contact@ address
- Confirm inbox delivery and spam folder behavior

## Notes
This is a manual setup and does not require app code changes.
