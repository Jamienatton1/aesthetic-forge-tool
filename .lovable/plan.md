

## Billing Tab Redesign: Compact Plans + Invoices

### Overview
Redesign the Billing tab to make subscription plans more compact, and add a full Invoices section with support for both card-paid (Stripe) and invoice-based billing. Access is restricted to Account Owner and Billing Manager roles (UI-level for now).

### Changes to `src/pages/OrganisationSettings.tsx`

**1. Make Subscription Plans Compact**
- Reduce plan card padding from `p-6` to `p-4`
- Reduce plan name from `text-2xl` to `text-lg`
- Reduce price from `text-4xl` to `text-2xl`
- Tighten spacing between feature list items
- This keeps all three plans visible without dominating the page

**2. Add Invoices Section (new Card below plans)**

Add mock invoice data and render a table with these columns:

| Column | Description |
|--------|-------------|
| Invoice # | e.g. INV-2024-001 |
| Date | Issue date |
| Amount | e.g. $400.00 |
| Payment Method | "Card" or "Invoice" |
| Status | Paid / Unpaid / Overdue (with coloured badges) |
| Due Date | Shown for invoice-based billing |
| Days Remaining | Calculated from due date using Net 30 terms |
| Action | "Pay by Card" button for unpaid invoices |

- Card-paid invoices (from Stripe) show status as "Paid" with no action needed
- Invoice-based entries show due date, days remaining, and a "Pay by Card" button when unpaid
- Overdue invoices (past due date) show negative days and a red "Overdue" badge

**3. Role-Based Access Control (UI-level)**

- Check the current mock user's role (from the existing `users` state)
- If the current user's role is `"user"` (not account_owner or billing_manager), show a restricted access message instead of the Billing tab content
- This is UI-only gating for now; server-side enforcement would come later with Supabase

**4. "Pay by Card" Dialog**

- Add a simple confirmation dialog when clicking "Pay by Card" on an unpaid invoice
- Shows invoice details and a confirm button
- On confirm, shows a toast: "Payment initiated" (mock behaviour)

### New State and Data

```typescript
interface Invoice {
  id: string;
  number: string;
  date: string;
  amount: number;
  paymentMethod: "card" | "invoice";
  status: "paid" | "unpaid" | "overdue";
  dueDate?: string;
}
```

Mock data will include ~5 invoices mixing card-paid and invoice-based entries.

### New Imports
- `CreditCard`, `FileText`, `Clock` from lucide-react
- `Dialog` components (already available)
- `date-fns` `differenceInDays` and `format` for date calculations

### Files Modified
- `src/pages/OrganisationSettings.tsx` -- all changes in this single file
