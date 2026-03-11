import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Bell, Plus, Send, Eye, MousePointerClick } from "lucide-react";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";

interface Notification {
  id: string;
  title: string;
  body: string;
  ctaLabel: string | null;
  ctaUrl: string | null;
  targeting: string;
  sendAt: string;
  expiresAt: string | null;
  isDismissible: boolean;
  sentCount: number;
  viewedCount: number;
  clickedCount: number;
  status: "sent" | "scheduled" | "draft";
}

const mockNotifications: Notification[] = [
  {
    id: "1", title: "Welcome to Trees4Travel", body: "Get started by creating your first event. Our platform makes it easy to track and offset your carbon footprint.",
    ctaLabel: "Create Event", ctaUrl: "/events/new", targeting: "All users", sendAt: "2026-03-01T09:00:00",
    expiresAt: "2026-04-01", isDismissible: true, sentCount: 52, viewedCount: 41, clickedCount: 18, status: "sent",
  },
  {
    id: "2", title: "New: Compensation Reports", body: "You can now generate detailed compensation reports for your events. Share them with stakeholders to showcase your sustainability efforts.",
    ctaLabel: "View Reports", ctaUrl: "/reports", targeting: "Pro plan", sendAt: "2026-03-05T10:00:00",
    expiresAt: null, isDismissible: true, sentCount: 14, viewedCount: 9, clickedCount: 5, status: "sent",
  },
  {
    id: "3", title: "Your trial ends soon", body: "Your free trial expires in 3 days. Upgrade now to keep access to all features and your event data.",
    ctaLabel: "Upgrade Now", ctaUrl: "/organisation-settings", targeting: "Core plan", sendAt: "2026-03-15T08:00:00",
    expiresAt: "2026-03-20", isDismissible: false, sentCount: 0, viewedCount: 0, clickedCount: 0, status: "scheduled",
  },
];

const getStatusBadge = (status: Notification["status"]) => {
  switch (status) {
    case "sent":
      return <Badge className="bg-primary/15 text-primary border-primary/30">Sent</Badge>;
    case "scheduled":
      return <Badge className="bg-chart-tertiary/15 text-chart-tertiary border-chart-tertiary/30">Scheduled</Badge>;
    case "draft":
      return <Badge variant="secondary">Draft</Badge>;
  }
};

export function OperationsNotifications() {
  const { toast } = useToast();
  const [notifications, setNotifications] = useState(mockNotifications);
  const [composeOpen, setComposeOpen] = useState(false);
  const [form, setForm] = useState({
    title: "",
    body: "",
    ctaLabel: "",
    ctaUrl: "",
    targeting: "all",
    schedule: "now",
    scheduledDate: "",
    scheduledTime: "",
    expiresAt: "",
    isDismissible: true,
  });

  const handleSend = () => {
    const newNotification: Notification = {
      id: String(Date.now()),
      title: form.title,
      body: form.body,
      ctaLabel: form.ctaLabel || null,
      ctaUrl: form.ctaLabel ? form.ctaUrl : null,
      targeting: form.targeting === "all" ? "All users" : `${form.targeting} plan`,
      sendAt: form.schedule === "now" ? new Date().toISOString() : `${form.scheduledDate}T${form.scheduledTime}:00`,
      expiresAt: form.expiresAt || null,
      isDismissible: form.isDismissible,
      sentCount: form.schedule === "now" ? 52 : 0,
      viewedCount: 0,
      clickedCount: 0,
      status: form.schedule === "now" ? "sent" : "scheduled",
    };
    setNotifications([newNotification, ...notifications]);
    setComposeOpen(false);
    setForm({ title: "", body: "", ctaLabel: "", ctaUrl: "", targeting: "all", schedule: "now", scheduledDate: "", scheduledTime: "", expiresAt: "", isDismissible: true });
    toast({ title: form.schedule === "now" ? "Notification sent" : "Notification scheduled" });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">Create and send in-app messages to targeted users</p>
        </div>
        <Button onClick={() => setComposeOpen(true)} className="gap-2">
          <Plus className="w-4 h-4" /> New Notification
        </Button>
      </div>

      {/* Notifications Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Targeting</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Send Date</TableHead>
                <TableHead className="text-center"><Send className="w-3.5 h-3.5 inline" /> Sent</TableHead>
                <TableHead className="text-center"><Eye className="w-3.5 h-3.5 inline" /> Viewed</TableHead>
                <TableHead className="text-center"><MousePointerClick className="w-3.5 h-3.5 inline" /> Clicked</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {notifications.map((n) => (
                <TableRow key={n.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium text-foreground">{n.title}</p>
                      <p className="text-xs text-muted-foreground line-clamp-1 max-w-[280px]">{n.body}</p>
                    </div>
                  </TableCell>
                  <TableCell><Badge variant="secondary" className="text-xs">{n.targeting}</Badge></TableCell>
                  <TableCell>{getStatusBadge(n.status)}</TableCell>
                  <TableCell className="text-muted-foreground text-sm">{format(new Date(n.sendAt), "dd MMM yyyy, HH:mm")}</TableCell>
                  <TableCell className="text-center font-medium text-foreground">{n.sentCount}</TableCell>
                  <TableCell className="text-center font-medium text-foreground">{n.viewedCount}</TableCell>
                  <TableCell className="text-center font-medium text-foreground">{n.clickedCount}</TableCell>
                </TableRow>
              ))}
              {notifications.length === 0 && (
                <TableRow><TableCell colSpan={7} className="text-center py-8 text-muted-foreground">No notifications yet</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Compose Dialog */}
      <Dialog open={composeOpen} onOpenChange={setComposeOpen}>
        <DialogContent className="max-w-lg max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-primary" />
              New Notification
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 mt-2">
            <div>
              <Label>Title *</Label>
              <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Notification title" className="mt-1" />
            </div>

            <div>
              <Label>Body *</Label>
              <Textarea value={form.body} onChange={(e) => setForm({ ...form, body: e.target.value })} placeholder="2–3 sentences..." rows={3} className="mt-1" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>CTA Button Label</Label>
                <Input value={form.ctaLabel} onChange={(e) => setForm({ ...form, ctaLabel: e.target.value })} placeholder="e.g. Learn More" className="mt-1" />
              </div>
              <div>
                <Label>CTA Link URL</Label>
                <Input value={form.ctaUrl} onChange={(e) => setForm({ ...form, ctaUrl: e.target.value })} placeholder="/path or https://..." className="mt-1" disabled={!form.ctaLabel} />
              </div>
            </div>

            <div>
              <Label>Targeting</Label>
              <Select value={form.targeting} onValueChange={(v) => setForm({ ...form, targeting: v })}>
                <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All users</SelectItem>
                  <SelectItem value="Core">Core plan users</SelectItem>
                  <SelectItem value="Pro">Pro plan users</SelectItem>
                  <SelectItem value="Enterprise">Enterprise plan users</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Scheduling</Label>
              <Select value={form.schedule} onValueChange={(v) => setForm({ ...form, schedule: v })}>
                <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="now">Send immediately</SelectItem>
                  <SelectItem value="scheduled">Schedule for later</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {form.schedule === "scheduled" && (
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label>Date</Label>
                  <Input type="date" value={form.scheduledDate} onChange={(e) => setForm({ ...form, scheduledDate: e.target.value })} className="mt-1" />
                </div>
                <div>
                  <Label>Time</Label>
                  <Input type="time" value={form.scheduledTime} onChange={(e) => setForm({ ...form, scheduledTime: e.target.value })} className="mt-1" />
                </div>
              </div>
            )}

            <div>
              <Label>Expiry Date (optional)</Label>
              <Input type="date" value={form.expiresAt} onChange={(e) => setForm({ ...form, expiresAt: e.target.value })} className="mt-1" />
            </div>

            <div className="flex items-center gap-3">
              <Switch checked={form.isDismissible} onCheckedChange={(v) => setForm({ ...form, isDismissible: v })} />
              <Label>Dismissible by user</Label>
            </div>
          </div>

          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setComposeOpen(false)}>Cancel</Button>
            <Button onClick={handleSend} disabled={!form.title || !form.body} className="gap-2">
              <Send className="w-4 h-4" />
              {form.schedule === "now" ? "Send Now" : "Schedule"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}