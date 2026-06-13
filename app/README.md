# Web App

This is a dependency-free reader for the Markdown learning system.

Run it from the repository root:

```sh
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000/app/
```

For Vercel, deploy the repository root, not the `app/` directory. The root
`vercel.json` redirects `/` to `/app/` so the public deployment opens the app
instead of Vercel's 404 page.

Markdown remains the source of truth. The app is only a structured view over the files so the plan stays easy to edit, diff, and commit.
