"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Avatar } from "@/components/avatar";
import type { Employee } from "@/types";

interface Props {
  business: { id: string; slug: string };
  initialEmployees: Employee[];
}

function slugify(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export function ManageTeam({ business, initialEmployees }: Props) {
  const router = useRouter();
  const [employees, setEmployees] = useState(initialEmployees);
  const [draftName, setDraftName] = useState("");
  const [draftRole, setDraftRole] = useState("");
  const [saving, setSaving] = useState(false);

  async function addEmployee() {
    if (!draftName.trim()) return;
    setSaving(true);
    const supabase = createClient();
    const { data } = await supabase
      .from("employees")
      .insert({
        business_id: business.id,
        slug: slugify(draftName),
        name: draftName.trim(),
        role: draftRole.trim() || "Team member",
      })
      .select()
      .single();

    if (data) {
      setEmployees((e) => [...e, data]);
      setDraftName("");
      setDraftRole("");
    }
    setSaving(false);
  }

  async function toggleActive(emp: Employee) {
    const supabase = createClient();
    await supabase.from("employees").update({ active: !emp.active }).eq("id", emp.id);
    setEmployees((es) => es.map((e) => e.id === emp.id ? { ...e, active: !e.active } : e));
  }

  return (
    <div>
      {/* Add form */}
      <div
        className="bg-paper border border-ink-10 rounded-xl p-5 mb-5"
        style={{ boxShadow: "0 1px 3px rgba(14,18,32,0.04)" }}
      >
        <div className="text-sm font-semibold text-ink mb-3">Add team member</div>
        <div className="flex gap-2">
          <input
            className="input-base flex-[2]"
            placeholder="Full name"
            value={draftName}
            onChange={(e) => setDraftName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addEmployee()}
          />
          <input
            className="input-base flex-1"
            placeholder="Role"
            value={draftRole}
            onChange={(e) => setDraftRole(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addEmployee()}
          />
          <button
            onClick={addEmployee}
            disabled={saving || !draftName.trim()}
            className="px-4 py-2.5 bg-ink text-white font-semibold rounded-xl text-sm hover:bg-ink-80 disabled:opacity-50 transition-colors whitespace-nowrap"
          >
            Add
          </button>
        </div>
      </div>

      {/* Employee list */}
      <div
        className="bg-paper border border-ink-10 rounded-xl overflow-hidden"
        style={{ boxShadow: "0 1px 3px rgba(14,18,32,0.04)" }}
      >
        {employees.length === 0 ? (
          <div className="py-12 text-center text-sm text-ink-40">
            No team members yet. Add your first one above.
          </div>
        ) : (
          employees.map((emp, i) => (
            <div
              key={emp.id}
              className="flex items-center gap-3 px-4 py-3.5"
              style={{
                borderBottom: i < employees.length - 1 ? "1px solid #e9eaee" : "none",
                opacity: emp.active ? 1 : 0.5,
              }}
            >
              <Avatar seed={emp.name} size={36} />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-ink">{emp.name}</div>
                <div className="text-xs text-ink-60">{emp.role}</div>
              </div>
              <div className="font-mono text-xs text-ink-40 bg-ink-05 px-2 py-1 rounded">
                /r/{business.slug}/{emp.slug}
              </div>
              <button
                onClick={() => toggleActive(emp)}
                className="text-xs font-medium px-2.5 py-1.5 rounded-lg transition-colors"
                style={{
                  background: emp.active ? "#e3f6ee" : "#f4f5f7",
                  color: emp.active ? "#12a66a" : "#9094a1",
                }}
              >
                {emp.active ? "Active" : "Inactive"}
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
