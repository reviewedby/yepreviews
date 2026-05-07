import { Resend } from "resend";

export const resend = new Resend(process.env.RESEND_API_KEY!);

interface FeedbackEmailOpts {
  ownerEmail: string;
  businessName: string;
  employeeName?: string;
  rating: number;
  categories: string[];
  body?: string;
  contactEmail?: string;
  contactPhone?: string;
  feedbackId: string;
}

export async function sendFeedbackNotification(opts: FeedbackEmailOpts) {
  const stars = "★".repeat(opts.rating) + "☆".repeat(5 - opts.rating);
  const lines = [
    opts.employeeName ? `<p><strong>Employee:</strong> ${opts.employeeName}</p>` : "",
    opts.categories.length > 0
      ? `<p><strong>Categories:</strong> ${opts.categories.join(", ")}</p>`
      : "",
    opts.body ? `<p><strong>Message:</strong> ${opts.body}</p>` : "",
    opts.contactEmail || opts.contactPhone
      ? `<p><strong>Contact:</strong> ${[opts.contactEmail, opts.contactPhone].filter(Boolean).join(" · ")}</p>`
      : "",
  ].join("");

  const dashboardUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/feedback/${opts.feedbackId}`;

  return resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL!,
    to: opts.ownerEmail,
    subject: `New ${opts.rating}-star feedback for ${opts.businessName}`,
    html: `
      <div style="font-family: Inter, sans-serif; max-width: 540px; margin: 0 auto; padding: 32px 24px; color: #0e1220;">
        <div style="font-size: 22px; font-weight: 700; margin-bottom: 4px;">${opts.businessName}</div>
        <div style="font-size: 28px; color: #f5b700; margin-bottom: 16px;">${stars}</div>
        ${lines}
        <div style="margin-top: 24px;">
          <a href="${dashboardUrl}" style="display:inline-block; background:#5a5af0; color:#fff; text-decoration:none; padding: 10px 20px; border-radius: 8px; font-weight: 600; font-size: 14px;">View in dashboard →</a>
        </div>
      </div>
    `,
  });
}
