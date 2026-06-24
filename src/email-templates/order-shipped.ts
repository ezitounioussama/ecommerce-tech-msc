import type { Order } from "@/types";

export function orderShippedEmail(order: Order): string {
  const itemsHtml = order.items
    .map(
      (item) => `
        <tr>
          <td style="padding:10px;border-bottom:1px solid #eee">${item.name}</td>
          <td style="padding:10px;border-bottom:1px solid #eee;text-align:center">${item.quantity}</td>
          <td style="padding:10px;border-bottom:1px solid #eee;text-align:right">$${item.price.toLocaleString()}</td>
          <td style="padding:10px;border-bottom:1px solid #eee;text-align:right">$${(item.price * item.quantity).toLocaleString()}</td>
        </tr>
      `,
    )
    .join("");

  return `
    <div style="font-family:system-ui,sans-serif;max-width:600px;margin:0 auto">
      <h1 style="font-size:24px;margin-bottom:4px">Your order is on its way! 🚚</h1>
      <p style="color:#666;margin-top:0">Order #${order._id.slice(0, 8)}</p>

      <hr style="border:none;border-top:1px solid #eee;margin:24px 0" />

      <p style="font-size:15px;line-height:1.6">
        Hi <strong>${order.customerName}</strong>,<br /><br />
        Great news! Your order has been shipped and is now on its way to you.
      </p>

      <table style="border-collapse:collapse;width:100%;margin:20px 0">
        <thead>
          <tr style="background:#f5f5f5">
            <th style="padding:10px;text-align:left;font-size:13px">Item</th>
            <th style="padding:10px;text-align:center;font-size:13px">Qty</th>
            <th style="padding:10px;text-align:right;font-size:13px">Price</th>
            <th style="padding:10px;text-align:right;font-size:13px">Total</th>
          </tr>
        </thead>
        <tbody>
          ${itemsHtml}
        </tbody>
        <tfoot>
          <tr>
            <td colspan="3" style="padding:10px;text-align:right;font-weight:bold">Total</td>
            <td style="padding:10px;text-align:right;font-weight:bold">$${order.total.toLocaleString()}</td>
          </tr>
        </tfoot>
      </table>

      <hr style="border:none;border-top:1px solid #eee;margin:24px 0" />

      <h3 style="font-size:14px;margin-bottom:8px">Shipping Address</h3>
      <p style="color:#666;font-size:14px;margin:0;line-height:1.5">
        ${order.customerName}<br />
        ${order.shippingAddress.street}<br />
        ${order.shippingAddress.city}${order.shippingAddress.state ? `, ${order.shippingAddress.state}` : ""} ${order.shippingAddress.zip}<br />
        ${order.shippingAddress.country}
      </p>

      <hr style="border:none;border-top:1px solid #eee;margin:24px 0" />

      <p style="color:#999;font-size:12px">
        If you have any questions about your order, please contact our support team.
      </p>
    </div>
  `;
}
