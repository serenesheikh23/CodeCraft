"use client";

import { Plus, Trash2 } from "lucide-react";

type SectionType =
  | "hero"
  | "features"
  | "pricing"
  | "faq"
  | "cta"
  | "gallery"
  | "stats"
  | "logos"
  | "custom-text"
  | "services"
  | "projects"
  | "testimonials"
  | "contact";

const DB_BACKED: SectionType[] = ["services", "projects", "testimonials", "contact"];

interface SectionContentEditorProps {
  type: SectionType;
  content: Record<string, unknown>;
  updateContent: (patch: Record<string, unknown>) => void;
}

const inputCls = "w-full bg-background border border-border rounded-lg px-4 py-3 text-text focus:outline-none focus:border-primary";
const labelCls = "block text-xs font-medium text-text-muted mb-1.5";

export default function SectionContentEditor({
  type,
  content,
  updateContent,
}: SectionContentEditorProps) {
  if (DB_BACKED.includes(type)) {
    return (
      <div className="bg-primary/10 border border-primary/30 rounded-lg p-4 text-sm text-text-muted">
        This section pulls live data from your database. Content is managed through the respective admin pages.
      </div>
    );
  }

  if (type === "hero") {
    return (
      <div className="space-y-4">
        <div>
          <label className={labelCls}>Badge (optional)</label>
          <input
            type="text"
            value={(content.badge as string) || ""}
            onChange={(e) => updateContent({ badge: e.target.value })}
            className={inputCls}
          />
        </div>
        <div>
          <label className={labelCls}>Headline</label>
          <textarea
            rows={2}
            value={(content.headline as string) || ""}
            onChange={(e) => updateContent({ headline: e.target.value })}
            className={inputCls}
          />
        </div>
        <div>
          <label className={labelCls}>Subheadline</label>
          <textarea
            rows={2}
            value={(content.subheadline as string) || ""}
            onChange={(e) => updateContent({ subheadline: e.target.value })}
            className={inputCls}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>Button 1 Label</label>
            <input
              type="text"
              value={(content.cta1Label as string) || ""}
              onChange={(e) => updateContent({ cta1Label: e.target.value })}
              className={inputCls}
            />
          </div>
          <div>
            <label className={labelCls}>Button 1 Href</label>
            <input
              type="text"
              value={(content.cta1Href as string) || ""}
              onChange={(e) => updateContent({ cta1Href: e.target.value })}
              className={inputCls}
            />
          </div>
          <div>
            <label className={labelCls}>Button 2 Label</label>
            <input
              type="text"
              value={(content.cta2Label as string) || ""}
              onChange={(e) => updateContent({ cta2Label: e.target.value })}
              className={inputCls}
            />
          </div>
          <div>
            <label className={labelCls}>Button 2 Href</label>
            <input
              type="text"
              value={(content.cta2Href as string) || ""}
              onChange={(e) => updateContent({ cta2Href: e.target.value })}
              className={inputCls}
            />
          </div>
        </div>
      </div>
    );
  }

  if (type === "features" || type === "faq" || type === "gallery" || type === "stats" || type === "logos" || type === "pricing") {
    const items = (content.items as Record<string, unknown>[]) || (content.plans as Record<string, unknown>[]) || [];
    const key = content.plans ? "plans" : "items";
    const addItem = () => {
      const blank =
        type === "features"
          ? { icon: "layout", title: "", description: "" }
          : type === "faq"
          ? { question: "", answer: "" }
          : type === "gallery"
          ? { url: "", caption: "" }
          : type === "stats"
          ? { value: "", label: "" }
          : type === "logos"
          ? { url: "", alt: "" }
          : {
              name: "",
              price: 0,
              period: "project",
              features: "",
              ctaLabel: "",
              ctaHref: "",
              featured: false,
            };
      updateContent({ [key]: [...items, blank] });
    };
    const removeItem = (i: number) => updateContent({ [key]: items.filter((_, idx) => idx !== i) });
    const updateItem = (i: number, patch: Record<string, unknown>) =>
      updateContent({ [key]: items.map((item, idx) => (idx === i ? { ...item, ...patch } : item)) });

    return (
      <div className="space-y-4">
        {items.map((item, i) => (
          <div key={i} className="bg-background border border-border rounded-lg p-4 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs font-medium text-text-muted">Item {i + 1}</span>
              <button type="button" onClick={() => removeItem(i)} className="text-red-400 hover:text-red-300">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            {type === "features" && (
              <>
                <input
                  type="text"
                  placeholder="Icon (e.g. layout)"
                  value={(item.icon as string) || ""}
                  onChange={(e) => updateItem(i, { icon: e.target.value })}
                  className={inputCls}
                />
                <input
                  type="text"
                  placeholder="Title"
                  value={(item.title as string) || ""}
                  onChange={(e) => updateItem(i, { title: e.target.value })}
                  className={inputCls}
                />
                <input
                  type="text"
                  placeholder="Description"
                  value={(item.description as string) || ""}
                  onChange={(e) => updateItem(i, { description: e.target.value })}
                  className={inputCls}
                />
              </>
            )}
            {type === "faq" && (
              <>
                <input
                  type="text"
                  placeholder="Question"
                  value={(item.question as string) || ""}
                  onChange={(e) => updateItem(i, { question: e.target.value })}
                  className={inputCls}
                />
                <textarea
                  rows={2}
                  placeholder="Answer"
                  value={(item.answer as string) || ""}
                  onChange={(e) => updateItem(i, { answer: e.target.value })}
                  className={inputCls}
                />
              </>
            )}
            {type === "gallery" && (
              <>
                <input
                  type="text"
                  placeholder="Image URL"
                  value={(item.url as string) || ""}
                  onChange={(e) => updateItem(i, { url: e.target.value })}
                  className={inputCls}
                />
                <input
                  type="text"
                  placeholder="Caption"
                  value={(item.caption as string) || ""}
                  onChange={(e) => updateItem(i, { caption: e.target.value })}
                  className={inputCls}
                />
              </>
            )}
            {type === "stats" && (
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Value (e.g. 50+)"
                  value={(item.value as string) || ""}
                  onChange={(e) => updateItem(i, { value: e.target.value })}
                  className={inputCls}
                />
                <input
                  type="text"
                  placeholder="Label"
                  value={(item.label as string) || ""}
                  onChange={(e) => updateItem(i, { label: e.target.value })}
                  className={inputCls}
                />
              </div>
            )}
            {type === "logos" && (
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Logo URL"
                  value={(item.url as string) || ""}
                  onChange={(e) => updateItem(i, { url: e.target.value })}
                  className={inputCls}
                />
                <input
                  type="text"
                  placeholder="Alt text"
                  value={(item.alt as string) || ""}
                  onChange={(e) => updateItem(i, { alt: e.target.value })}
                  className={inputCls}
                />
              </div>
            )}
            {type === "pricing" && (
              <>
                <input
                  type="text"
                  placeholder="Plan name"
                  value={(item.name as string) || ""}
                  onChange={(e) => updateItem(i, { name: e.target.value })}
                  className={inputCls}
                />
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="number"
                    placeholder="Price"
                    value={(item.price as number) || 0}
                    onChange={(e) => updateItem(i, { price: Number(e.target.value) })}
                    className={inputCls}
                  />
                  <input
                    type="text"
                    placeholder="Period"
                    value={(item.period as string) || ""}
                    onChange={(e) => updateItem(i, { period: e.target.value })}
                    className={inputCls}
                  />
                </div>
                <input
                  type="text"
                  placeholder="Features (comma separated)"
                  value={(item.features as string) || ""}
                  onChange={(e) => updateItem(i, { features: e.target.value })}
                  className={inputCls}
                />
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="CTA Label"
                    value={(item.ctaLabel as string) || ""}
                    onChange={(e) => updateItem(i, { ctaLabel: e.target.value })}
                    className={inputCls}
                  />
                  <input
                    type="text"
                    placeholder="CTA Href"
                    value={(item.ctaHref as string) || ""}
                    onChange={(e) => updateItem(i, { ctaHref: e.target.value })}
                    className={inputCls}
                  />
                </div>
              </>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={addItem}
          className="w-full py-3 border border-dashed border-border rounded-lg text-text-muted hover:text-text hover:border-primary transition-colors flex items-center justify-center gap-2 text-sm"
        >
          <Plus className="w-4 h-4" />
          Add Item
        </button>
      </div>
    );
  }

  if (type === "cta") {
    return (
      <div className="space-y-4">
        <div>
          <label className={labelCls}>Headline</label>
          <input
            type="text"
            value={(content.headline as string) || ""}
            onChange={(e) => updateContent({ headline: e.target.value })}
            className={inputCls}
          />
        </div>
        <div>
          <label className={labelCls}>Subheadline</label>
          <input
            type="text"
            value={(content.subheadline as string) || ""}
            onChange={(e) => updateContent({ subheadline: e.target.value })}
            className={inputCls}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>Button Label</label>
            <input
              type="text"
              value={(content.buttonLabel as string) || ""}
              onChange={(e) => updateContent({ buttonLabel: e.target.value })}
              className={inputCls}
            />
          </div>
          <div>
            <label className={labelCls}>Button Href</label>
            <input
              type="text"
              value={(content.buttonHref as string) || ""}
              onChange={(e) => updateContent({ buttonHref: e.target.value })}
              className={inputCls}
            />
          </div>
        </div>
      </div>
    );
  }

  if (type === "custom-text") {
    return (
      <div>
        <label className={labelCls}>Body</label>
        <textarea
          rows={8}
          value={(content.body as string) || ""}
          onChange={(e) => updateContent({ body: e.target.value })}
          className={inputCls}
        />
      </div>
    );
  }

  return null;
}