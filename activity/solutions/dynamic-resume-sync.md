# Troubleshooting Registry: Dynamic Resume Synchronization System

- **Task Name**: `dynamic-resume-sync`
- **Issue Reference**: [#8](https://github.com/v1tor2003/portfolio/issues/8)
- **Timestamp**: 2026-09-09T11:32:00-03:00

---

## 1. Issue: Route Collision between Route Handler and Page in Next.js

### Problem
In Next.js App Router, placing a Route Handler (`app/resume/route.ts`) and a Page (`app/resume/page.tsx` or `app/(public)/resume/page.tsx`) at the exact same URL path (`/resume`) causes a build error: `Conflicting route /resume`.

### Resolution
- Located the streaming API Route Handler at `app/api/resume/route.ts`.
- Located the interactive viewer Page at `app/resume/page.tsx`.
- Configured `ResumeViewer` to embed `/api/resume`, and `ResumeDownloadButton` to link to `/api/resume?download=true`.

---

## 2. Issue: Binary Buffer in Web Response Constructor

### Problem
TypeScript reported TS2345: `Argument of type 'Buffer' is not assignable to parameter of type 'BodyInit | null | undefined'`.

### Resolution
Passed `new Uint8Array(resume.buffer)` to `new Response(...)`. `Uint8Array` is universally compatible with Web API `BodyInit` and native Fetch Response.

---

## 3. Issue: Result Type Narrowing in Command API

### Problem
`client.send(command)` returns a `Result<T, Error>` union. Directly casting or accessing properties caused TS2352.

### Resolution
Utilized `@v1tor2003/command-api`'s native `isOk(result)` type guard:
```ts
const result = await this.client.send(command);
if (isOk(result) && result.data) {
  // cleanly typed as GitHubContentFileResponse
}
```
