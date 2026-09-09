import type { ContactFormData } from "../schemas/contact.schema";

function escapeHtml(unsafe: string): string {
	return unsafe
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&#39;");
}

export function buildContactEmailText(data: ContactFormData): string {
	return `Name: ${data.name}\nEmail: ${data.email}\nSubject: ${data.subject}\n\nMessage:\n${data.message}`;
}

export function buildContactEmailHtml(data: ContactFormData): string {
	const safeName = escapeHtml(data.name);
	const safeEmail = escapeHtml(data.email);
	const safeSubject = escapeHtml(data.subject);
	const safeMessage = escapeHtml(data.message);
	const timestamp = new Date().toISOString();

	return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${safeSubject}</title>
</head>
<body style="margin: 0; padding: 24px; background-color: #09090b; color: #f4f4f5; font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; font-size: 14px; line-height: 1.6;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto; background-color: #121215; border: 1px solid #27272a; border-radius: 8px; overflow: hidden;">
    <thead>
      <tr>
        <th style="padding: 16px 20px; background-color: #18181b; border-bottom: 1px solid #27272a; text-align: left; font-size: 13px; font-weight: 600; color: #10b981;">
          [PORTFOLIO CONTACT TRANSMISSION] // TLS_1.3
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="padding: 20px;">
          <table width="100%" cellpadding="6" cellspacing="0" style="margin-bottom: 20px; font-size: 13px;">
            <tr>
              <td style="color: #a1a1aa; width: 90px; vertical-align: top;">From:</td>
              <td style="color: #fafafa; font-weight: 500;">${safeName} &lt;<a href="mailto:${safeEmail}" style="color: #38bdf8; text-decoration: none;">${safeEmail}</a>&gt;</td>
            </tr>
            <tr>
              <td style="color: #a1a1aa; vertical-align: top;">Subject:</td>
              <td style="color: #fafafa; font-weight: 500;">${safeSubject}</td>
            </tr>
            <tr>
              <td style="color: #a1a1aa; vertical-align: top;">Timestamp:</td>
              <td style="color: #71717a;">${timestamp}</td>
            </tr>
          </table>

          <div style="background-color: #09090b; border: 1px solid #27272a; border-radius: 6px; padding: 16px; margin-top: 12px;">
            <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em; color: #71717a; margin-bottom: 8px; border-bottom: 1px solid #18181b; padding-bottom: 4px;">Payload Content</div>
            <pre style="margin: 0; white-space: pre-wrap; font-family: inherit; font-size: 13px; color: #e4e4e7; line-height: 1.5;">${safeMessage}</pre>
          </div>
        </td>
      </tr>
      <tr>
        <td style="padding: 12px 20px; background-color: #18181b; border-top: 1px solid #27272a; text-align: right; font-size: 11px; color: #71717a;">
          vitor-pires.me &bull; automated contact dispatch
        </td>
      </tr>
    </tbody>
  </table>
</body>
</html>`;
}
