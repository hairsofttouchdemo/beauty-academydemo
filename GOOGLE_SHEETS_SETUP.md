# Connecting student applications to Google Sheets

The website does **not** save or submit applications until a real backend endpoint has been configured. Client-side validation alone is not a submission.

## Recommended connection

1. Connect the academy's own Google Sheets account using the workspace's Google Sheets integration.
2. Create a private spreadsheet accessible only to authorized academy staff. Do not publish it to the web or grant public link access.
3. Implement a same-origin server endpoint for registration, for example `api/student-applications`. Authenticate the server's Google Sheets connection on the server, never in browser JavaScript.
4. Set `registrationEndpoint` in `config.js` to the endpoint's URL. If the site is later hosted under a prefix, include that prefix in the endpoint URL.
5. Confirm a real row has been written before the endpoint returns JSON `{ "success": true }` with a successful HTTP status.

The frontend is prepared to send a JSON object from the registration form. Match the form field names in `index.html` and its serialization in `script.js` when implementing the server. Keep the endpoint unset until the connection is working.

## Server requirements

- Accept only POST requests with JSON and enforce a small request-body limit.
- Validate every field independently of the browser: names, contact numbers, email, dates, address, course selection and message length.
- Allow only course values listed in `config.js`.
- Reject future birth dates and past preferred start dates.
- Add rate limiting, bot protection, origin checks and appropriate privacy controls.
- Neutralize spreadsheet formula injection in user-supplied strings beginning with `=`, `+`, `-`, `@`, tabs or carriage returns before writing cells. Store all input as plain text rather than executable formulas.
- Use a fixed spreadsheet and range controlled by the server; never let visitors choose these.
- Do not log request bodies, dates of birth, contact details or addresses.
- Never create a public endpoint for listing student applications.
- Return `{ "success": true }` only after Google Sheets confirms the write. Return a non-2xx error and a safe error message on failure.
- Define who can access applications, how long they are retained and how applicants request correction or deletion.

## Contact inquiries

The contact form has its own configurable endpoint. It must likewise remain unset until a real server handler or email delivery service is connected. Do not display a delivery confirmation based only on browser validation.

## WhatsApp

WhatsApp click-to-chat does not need an API account. Set the central WhatsApp number in `config.js` to the actual academy number in international digits-only format, without `+`, spaces or punctuation. Booking and course links generate pre-filled messages.

Opening WhatsApp is only an inquiry; the visitor must send the message, and the academy must confirm availability. A chat opening is not a confirmed booking or completed registration. Avoid including sensitive information such as birth dates or home addresses in click-to-chat URLs.
