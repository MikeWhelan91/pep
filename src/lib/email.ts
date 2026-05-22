import { Resend } from "resend";
import type { Order, OrderItem } from "@prisma/client";
import { formatMoney } from "@/lib/format";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
const from = "Research Supply <orders@example.com>";

type OrderWithItems = Order & { lineItems: OrderItem[] };

async function sendEmail(to: string, subject: string, html: string) {
  if (!resend) {
    console.info(`Email skipped: ${subject} to ${to}`);
    return;
  }
  await resend.emails.send({ from, to, subject, html });
}

function orderRows(order: OrderWithItems) {
  return order.lineItems
    .map(
      (item) => `
        <tr>
          <td style="padding:8px;border-bottom:1px solid #e5e7eb">${item.productName}</td>
          <td style="padding:8px;border-bottom:1px solid #e5e7eb">${item.productSku}</td>
          <td style="padding:8px;border-bottom:1px solid #e5e7eb;text-align:right">${item.quantity}</td>
          <td style="padding:8px;border-bottom:1px solid #e5e7eb;text-align:right">${formatMoney(item.totalCents, order.currency.toUpperCase())}</td>
        </tr>`,
    )
    .join("");
}

function shell(title: string, body: string) {
  return `
    <div style="font-family:Arial,sans-serif;color:#172033;line-height:1.5">
      <h1 style="font-size:20px">${title}</h1>
      ${body}
      <p style="font-size:12px;color:#64748b;margin-top:24px">
        For laboratory research use only. Not for human or animal consumption. Not for therapeutic, diagnostic, or clinical use. No usage or dosing guidance is provided.
      </p>
    </div>`;
}

export async function sendOrderConfirmation(order: OrderWithItems) {
  await sendEmail(
    order.customerEmail,
    `Order confirmation ${order.orderNumber}`,
    shell(
      `Order ${order.orderNumber}`,
      `<p>Your order has been received and payment has been confirmed.</p>
       <table style="border-collapse:collapse;width:100%"><tbody>${orderRows(order)}</tbody></table>
       <p><strong>Total:</strong> ${formatMoney(order.totalCents, order.currency.toUpperCase())}</p>`,
    ),
  );
}

export async function sendPaymentReceived(order: OrderWithItems) {
  await sendEmail(order.customerEmail, `Payment received ${order.orderNumber}`, shell("Payment received", `<p>Payment for ${order.orderNumber} has been recorded.</p>`));
}

export async function sendOrderShipped(order: OrderWithItems) {
  const tracking = order.trackingNumber ? `<p>Tracking number: ${order.trackingNumber}</p>` : "";
  await sendEmail(order.customerEmail, `Order shipped ${order.orderNumber}`, shell("Order shipped", `<p>Your research supply order has shipped.</p>${tracking}`));
}

export async function sendOrderCancelled(order: OrderWithItems) {
  await sendEmail(order.customerEmail, `Order update ${order.orderNumber}`, shell("Order update", `<p>Order ${order.orderNumber} has been cancelled or refunded.</p>`));
}

export async function sendContactNotification(input: { name: string; email: string; institution: string; message: string }) {
  const to = process.env.ADMIN_EMAIL;
  if (!to) return;
  await sendEmail(
    to,
    `Contact form: ${input.institution}`,
    shell(
      "Contact form submission",
      `<p><strong>Name:</strong> ${input.name}</p><p><strong>Email:</strong> ${input.email}</p><p><strong>Institution:</strong> ${input.institution}</p><p>${input.message.replaceAll("\n", "<br>")}</p>`,
    ),
  );
}
