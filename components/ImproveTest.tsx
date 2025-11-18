"use client";

import { useState } from "react";
import { improveText } from "@/lib/ai";

export interface ResumeSection {
  id: string;
  title: string;
  content: string;
}

interface ImproveTestProps {
  onSubmit: (section: ResumeSection) => void;
}

export default function ImproveTest({ onSubmit }: ImproveTestProps) {
  // Contact Info
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [github, setGithub] = useState("");
  const [linkedin, setLinkedin] = useState("");

  // Summary
  const [summary, setSummary] = useState("");
  const [summaryImproved, setSummaryImproved] = useState("");
  const [summaryLoading, setSummaryLoading] = useState(false);

  // Experience
  const [text, setText] = useState("");
  const [improved, setImproved] = useState("");
  const [loading, setLoading] = useState(false);
  const [jobTitle, setJobTitle] = useState("");
  const [company, setCompany] = useState("");

  // Dynamic Sections
  const [skills, setSkills] = useState<string[]>([]);
  const [languages, setLanguages] = useState<string[]>([]);
  const [interests, setInterests] = useState<string[]>([]);
  const [projects, setProjects] = useState<string[]>([]);
  const [educations, setEducations] = useState<string[]>([]);

  // Location
  const [location, setLocation] = useState("");

  // AI Improve Experience
  const handleImprove = async () => {
    if (!text.trim()) return alert("Please enter text to improve.");
    setLoading(true);
    try {
      const result = await improveText(text);
      setImproved(result);
    } catch {
      setImproved(text);
    } finally {
      setLoading(false);
    }
  };

  // AI Improve Summary
  const handleImproveSummary = async () => {
    if (!summary.trim()) return alert("Enter summary to improve.");
    setSummaryLoading(true);
    try {
      const result = await improveText(summary);
      setSummaryImproved(result);
    } catch {
      setSummaryImproved(summary);
    } finally {
      setSummaryLoading(false);
    }
  };

  // Save Contact
  const handleSubmitContact = () => {
    onSubmit({
      id: crypto.randomUUID(),
      title: "Contact Info",
      content: `Full Name: ${fullName}\nEmail: ${email}\nPhone: ${phone}\nGitHub: ${github}\nLinkedIn: ${linkedin}`,
    });

    setFullName("");
    setEmail("");
    setPhone("");
    setGithub("");
    setLinkedin("");
  };

  // Save Summary
  const handleSubmitSummary = () => {
    const finalSummary = summaryImproved || summary;
    if (!finalSummary.trim()) return;

    onSubmit({
      id: crypto.randomUUID(),
      title: "Summary",
      content: finalSummary,
    });

    setSummary("");
    setSummaryImproved("");
  };

  // Save Experience
  const handleAddExperience = () => {
    if (!jobTitle.trim()) return alert("Enter job title.");
    if (!improved.trim()) return alert("Improve with AI first.");

    onSubmit({
      id: crypto.randomUUID(),
      title: `${jobTitle} at ${company || "Company"}`,
      content: improved,
    });

    setText("");
    setImproved("");
    setJobTitle("");
    setCompany("");
  };

  // Save Location
  const handleSubmitLocation = () => {
    if (!location.trim()) return;

    onSubmit({
      id: crypto.randomUUID(),
      title: "Location",
      content: location,
    });

    setLocation("");
  };

  return (
    <div className="p-4 border rounded-lg space-y-6 bg-white shadow">
      
      {/* Contact Info */}
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Contact Info</h2>

        <input className="input" placeholder="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
        <input className="input" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className="input" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
        <input className="input" placeholder="GitHub URL" value={github} onChange={(e) => setGithub(e.target.value)} />
        <input className="input" placeholder="LinkedIn URL" value={linkedin} onChange={(e) => setLinkedin(e.target.value)} />

        <button onClick={handleSubmitContact} className="btn-green">Save Contact Info</button>
      </div>

      <hr />

      {/* Location */}
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Location</h2>
        <input className="input" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Your Location" />
        <button onClick={handleSubmitLocation} className="btn-green mt-2">Save Location</button>
      </div>

      <hr />

      {/* Summary */}
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Professional Summary</h2>

        <textarea className="input" rows={4} value={summary} onChange={(e) => setSummary(e.target.value)} />

        <button onClick={handleImproveSummary} className="btn-blue">
          {summaryLoading ? "Improving..." : "Improve with AI"}
        </button>

        {summaryImproved && (
          <div className="mt-2 p-2 bg-gray-100 rounded">
            <p>{summaryImproved}</p>
          </div>
        )}

        <button onClick={handleSubmitSummary} className="btn-green">Save Summary</button>
      </div>

      <hr />

      {/* Experience */}
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Experience</h2>

        <input className="input" placeholder="Job Title" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} />
        <textarea className="input" rows={4} placeholder="Describe your role..." value={text} onChange={(e) => setText(e.target.value)} />

        <button onClick={handleImprove} className="btn-blue">
          {loading ? "Improving..." : "Improve with AI"}
        </button>

        {improved && (
          <div className="mt-2 p-2 bg-gray-100 rounded">
            <p>{improved}</p>
            <input className="input mt-2" placeholder="Company Name" value={company} onChange={(e) => setCompany(e.target.value)} />
            <button onClick={handleAddExperience} className="btn-green mt-2">Add Experience</button>
          </div>
        )}
      </div>

      <hr />

      {/* Skills */}
      <SectionInput
        title="Skills"
        items={skills}
        onAdd={() => setSkills([...skills, ""])}
        onChange={(i, v) => setSkills(skills.map((s, idx) => idx === i ? v : s))}
        onRemove={(i) => setSkills(skills.filter((_, idx) => idx !== i))}
        onSubmit={() => {
          if (skills.some((s) => s.trim())) {
            onSubmit({ id: crypto.randomUUID(), title: "Skills", content: skills.join(", ") });
            setSkills([]);
          }
        }}
        placeholder="Skill"
      />

      <hr />

      {/* Languages */}
      <SectionInput
        title="Languages"
        items={languages}
        onAdd={() => setLanguages([...languages, ""])}
        onChange={(i, v) => setLanguages(languages.map((s, idx) => idx === i ? v : s))}
        onRemove={(i) => setLanguages(languages.filter((_, idx) => idx !== i))}
        onSubmit={() => {
          if (languages.some((s) => s.trim())) {
            onSubmit({ id: crypto.randomUUID(), title: "Languages", content: languages.join(", ") });
            setLanguages([]);
          }
        }}
        placeholder="Language"
      />

      <hr />

      {/* Interests */}
      <SectionInput
        title="Interests"
        items={interests}
        onAdd={() => setInterests([...interests, ""])}
        onChange={(i, v) => setInterests(interests.map((s, idx) => idx === i ? v : s))}
        onRemove={(i) => setInterests(interests.filter((_, idx) => idx !== i))}
        onSubmit={() => {
          if (interests.some((s) => s.trim())) {
            onSubmit({ id: crypto.randomUUID(), title: "Interests", content: interests.join(", ") });
            setInterests([]);
          }
        }}
        placeholder="Interest"
      />

      <hr />

      {/* Projects */}
      <SectionInput
        title="Projects"
        items={projects}
        onAdd={() => setProjects([...projects, ""])}
        onChange={(i, v) => setProjects(projects.map((s, idx) => idx === i ? v : s))}
        onRemove={(i) => setProjects(projects.filter((_, idx) => idx !== i))}
        onSubmit={() => {
          if (projects.some((s) => s.trim())) {
            onSubmit({ id: crypto.randomUUID(), title: "Projects", content: projects.join(", ") });
            setProjects([]);
          }
        }}
        placeholder="Project"
      />

      <hr />

      {/* Education */}
      <SectionInput
        title="Education"
        items={educations}
        onAdd={() => setEducations([...educations, ""])}
        onChange={(i, v) => setEducations(educations.map((s, idx) => idx === i ? v : s))}
        onRemove={(i) => setEducations(educations.filter((_, idx) => idx !== i))}
        onSubmit={() => {
          if (educations.some((s) => s.trim())) {
            onSubmit({ id: crypto.randomUUID(), title: "Education", content: educations.join(", ") });
            setEducations([]);
          }
        }}
        placeholder="Education"
      />
    </div>
  );
}

// Reusable Section
interface SectionInputProps {
  title: string;
  items: string[];
  onAdd: () => void;
  onChange: (idx: number, value: string) => void;
  onRemove: (idx: number) => void;
  onSubmit: () => void;
  placeholder?: string;
}

function SectionInput({ title, items, onAdd, onChange, onRemove, onSubmit, placeholder }: SectionInputProps) {
  return (
    <div className="space-y-2">
      <h2 className="text-xl font-semibold">{title}</h2>

      {items.map((item, idx) => (
        <div key={idx} className="flex gap-2 items-center">
          <input
            className="input flex-grow"
            value={item}
            placeholder={placeholder}
            onChange={(e) => onChange(idx, e.target.value)}
          />
          <button onClick={() => onRemove(idx)} className="btn-red">Remove</button>
        </div>
      ))}

      <div className="flex gap-2 mt-2">
        <button onClick={onAdd} className="btn-blue">Add</button>
        <button onClick={onSubmit} className="btn-green">Save</button>
      </div>
    </div>
  );
}
