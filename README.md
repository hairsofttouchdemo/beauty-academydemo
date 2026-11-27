# SAARAAZ BEAUTY ACADEMY

Complete standalone website source, built with HTML, CSS and vanilla JavaScript.
No React, Node.js packages or build step are needed to host this version.

## Files

- `index.html` — page content, navigation, forms and metadata
- `style.css` — colors, typography, responsive layouts and animations
- `script.js` — gallery, course dialogs, navigation, form validation and WhatsApp messages
- `config.js` — editable contact details, social links, services, courses, fees and durations
- `assets/images/` — all website images
- `favicon.svg` — website icon
- `robots.txt` — crawler settings
- `GOOGLE_SHEETS_SETUP.md` — guidance for connecting private registration storage

## Upload to GitHub

1. Extract this ZIP.
2. Create a new GitHub repository.
3. Choose **Add file → Upload files**.
4. Upload the extracted files and the `assets` folder, not the ZIP itself.
5. Keep `index.html` at the repository root and commit the upload.

## Optional GitHub Pages hosting

In your repository, open **Settings → Pages**. Choose **Deploy from a branch**,
select your main branch and the root folder, then save. GitHub will show your
website URL when it is ready. This website uses relative asset paths so it can
run under a repository's Pages address.

GitHub Pages is static hosting: it does not run the private form backend.

## Customize

Start with `config.js`:

- Set `whatsappNumber` to your actual international number, digits only.
- Fill in confirmed phone, email, location, opening hours and social URLs.
- Update service names, descriptions and prices.
- Update course names, descriptions, durations, fees and details.

Edit `index.html` for page text and sections, and `style.css` for appearance.
Replace photos in `assets/images/` with your own authorized images, retaining the
filenames or updating the matching references. Existing pictures are illustrative;
they must not be presented as real academy work or students.

Google Fonts are loaded from the internet; serif and sans-serif fallback fonts
are provided if they cannot load.

## Preview on your computer

Use an editor's local web server, such as VS Code's Live Server extension.
Alternatively, with Python installed, run this in the extracted folder:

```sh
python3 -m http.server 8000
```

Then visit `http://localhost:8000`. Do not double-click `index.html` to preview:
the browser may block JavaScript modules on `file://` URLs.

## Important: forms and privacy

The registration and contact forms validate input but do not send or save it
until a working backend endpoint is configured. The website clearly states this.
WhatsApp links also remain inactive until you enter the real academy number.
Opening WhatsApp is an inquiry, not a confirmed booking or registration.

Never place Google credentials, API keys or private student records in this
repository. See `GOOGLE_SHEETS_SETUP.md` before connecting application storage.
The current script accepts same-origin backend endpoint paths only; GitHub Pages
cannot provide those endpoints by itself.
