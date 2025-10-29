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
  // --- Contact Info ---
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [github, setGithub] = useState("");
  const [linkedin, setLinkedin] = useState("");

  // --- Summary ---
  const [summary, setSummary] = useState("");
  const [summaryImproved, setSummaryImproved] = useState("");
  const [summaryLoading, setSummaryLoading] = useState(false);

  // --- Experience ---
  const [text, setText] = useState("");
  const [improved, setImproved] = useState("");
  const [loading, setLoading] = useState(false);
  const [jobTitle, setJobTitle] = useState("");
  const [company, setCompany] = useState("");

  // --- Skills ---
  const [skills, setSkills] = useState<string[]>([]);

  // --- Languages ---
  const [languages, setLanguages] = useState<string[]>([]);

  // --- Interests ---
  const [interests, setInterests] = useState<string[]>([]);

  // --- Projects ---
  const [projects, setProjects] = useState<string[]>([]);

  // --- Education ---
  const [educations, setEducations] = useState<string[]>([]);

  // --- Location ---
  const [location, setLocation] = useState("");

  // --- Handlers ---

  // Improve Experience
  const handleImprove = async () => {
    if (!text) return alert("Please enter text to improve.");
    setLoading(true);
    try {
      const result = await improveText(text);
      setImproved(result);
    } catch (err) {
      console.error("AI improvement failed:", err);
      setImproved(text);
    } finally {
      setLoading(false);
    }
  };

  // Improve Summary
  const handleImproveSummary = async () => {
    if (!summary) return alert("Please enter summary to improve.");
    setSummaryLoading(true);
    try {
      const result = await improveText(summary);
      setSummaryImproved(result);
    } catch (err) {
      console.error("AI improvement failed:", err);
      setSummaryImproved(summary);
    } finally {
      setSummaryLoading(false);
    }
  };

  // Contact Info
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

  // Summary
  const handleSubmitSummary = () => {
    const finalSummary = summaryImproved || summary;
    if (!finalSummary.trim()) return alert("Please enter a summary!");
    onSubmit({
      id: crypto.randomUUID(),
      title: "Summary",
      content: finalSummary,
    });
    setSummary("");
    setSummaryImproved("");
  };

  // Experience
  const handleAddExperience = () => {
    if (!jobTitle) return alert("Please enter Job Title!");
    if (!improved) return alert("Improve the text first!");
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

  // Skills
  const handleAddSkill = () => setSkills([...skills, ""]);
  const handleSkillChange = (idx: number, val: string) =>
    setSkills(skills.map((s, i) => (i === idx ? val : s)));
  const handleRemoveSkill = (idx: number) =>
    setSkills(skills.filter((_, i) => i !== idx));
  const handleSubmitSkills = () => {
    if (skills.length === 0 || skills.every(s => !s.trim())) return;
    onSubmit({
      id: crypto.randomUUID(),
      title: "Skills",
      content: skills.filter(s => s.trim()).join(", "),
    });
    setSkills([]);
  };

  // Languages
  const handleAddLanguage = () => setLanguages([...languages, ""]);
  const handleLanguageChange = (idx: number, val: string) =>
    setLanguages(languages.map((l, i) => (i === idx ? val : l)));
  const handleRemoveLanguage = (idx: number) =>
    setLanguages(languages.filter((_, i) => i !== idx));
  const handleSubmitLanguages = () => {
    if (languages.length === 0 || languages.every(l => !l.trim())) return;
    onSubmit({
      id: crypto.randomUUID(),
      title: "Languages",
      content: languages.filter(l => l.trim()).join(", "),
    });
    setLanguages([]);
  };

  // Interests
  const handleAddInterest = () => setInterests([...interests, ""]);
  const handleInterestChange = (idx: number, val: string) =>
    setInterests(interests.map((i, j) => (j === idx ? val : i)));
  const handleRemoveInterest = (idx: number) =>
    setInterests(interests.filter((_, j) => j !== idx));
  const handleSubmitInterests = () => {
    if (interests.length === 0 || interests.every(i => !i.trim())) return;
    onSubmit({
      id: crypto.randomUUID(),
      title: "Interests",
      content: interests.filter(i => i.trim()).join(", "),
    });
    setInterests([]);
  };

  // Projects
  const handleAddProject = () => setProjects([...projects, ""]);
  const handleProjectChange = (idx: number, val: string) =>
    setProjects(projects.map((p, i) => (i === idx ? val : p)));
  const handleRemoveProject = (idx: number) =>
    setProjects(projects.filter((_, i) => i !== idx));
  const handleSubmitProjects = () => {
    if (projects.length === 0 || projects.every(p => !p.trim())) return;
    onSubmit({
      id: crypto.randomUUID(),
      title: "Projects",
      content: projects.filter(p => p.trim()).join(", "),
    });
    setProjects([]);
  };

  // Education
  const handleAddEducation = () => setEducations([...educations, ""]);
  const handleEducationChange = (idx: number, val: string) =>
    setEducations(educations.map((e, i) => (i === idx ? val : e)));
  const handleRemoveEducation = (idx: number) =>
    setEducations(educations.filter((_, i) => i !== idx));
  const handleSubmitEducation = () => {
    if (educations.length === 0 || educations.every(e => !e.trim())) return;
    onSubmit({
      id: crypto.randomUUID(),
      title: "Education",
      content: educations.filter(e => e.trim()).join(", "),
    });
    setEducations([]);
  };

  // Location
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
        <input type="text" placeholder="Full Name" value={fullName} onChange={e => setFullName(e.target.value)} className="w-full p-2 border rounded"/>
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="w-full p-2 border rounded"/>
        <input type="text" placeholder="Phone" value={phone} onChange={e => setPhone(e.target.value)} className="w-full p-2 border rounded"/>
        <input type="text" placeholder="GitHub URL" value={github} onChange={e => setGithub(e.target.value)} className="w-full p-2 border rounded"/>
        <input type="text" placeholder="LinkedIn URL" value={linkedin} onChange={e => setLinkedin(e.target.value)} className="w-full p-2 border rounded"/>
        <button onClick={handleSubmitContact} className="px-4 py-2 bg-green-600 text-white rounded">Save Contact Info</button>
      </div>

      <hr className="my-4"/>

      {/* Location */}
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Location</h2>
        <input type="text" placeholder="Location" value={location} onChange={e => setLocation(e.target.value)} className="w-full p-2 border rounded"/>
        <button onClick={handleSubmitLocation} className="px-4 py-2 bg-green-600 text-white rounded mt-2">Save Location</button>
      </div>

      <hr className="my-4"/>

      {/* Summary with AI Improve */}
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Professional Summary</h2>
        <textarea
          value={summary}
          onChange={e => setSummary(e.target.value)}
          rows={4}
          placeholder="Write a brief summary about yourself..."
          className="w-full p-2 border rounded"
        />
        <button onClick={handleImproveSummary} disabled={summaryLoading} className="px-4 py-2 bg-blue-600 text-white rounded mt-2">
          {summaryLoading ? "Improving..." : "Improve with AI"}
        </button>
        {summaryImproved && (
          <div className="mt-2 p-2 bg-gray-100 rounded">
            <p>{summaryImproved}</p>
          </div>
        )}
        <button onClick={handleSubmitSummary} className="px-4 py-2 bg-green-600 text-white rounded mt-2">Save Summary</button>
      </div>

      <hr className="my-4"/>

      {/* Experience */}
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Experience</h2>
        <input type="text" placeholder="Job Title" value={jobTitle} onChange={e => setJobTitle(e.target.value)} className="w-full p-2 border rounded"/>
        <textarea value={text} onChange={e => setText(e.target.value)} rows={4} placeholder="Describe your role..." className="w-full p-2 border rounded"/>
        <button onClick={handleImprove} disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded">
          {loading ? "Improving..." : "Improve with AI"}
        </button>
        {improved && (
          <div className="mt-2 p-2 bg-gray-100 rounded space-y-2">
            <p>{improved}</p>
            <input type="text" placeholder="Company Name" value={company} onChange={e => setCompany(e.target.value)} className="w-full p-2 border rounded mt-2"/>
            <button onClick={handleAddExperience} className="mt-2 px-4 py-2 bg-green-600 text-white rounded">Add to Resume</button>
          </div>
        )}
      </div>

      <hr className="my-4"/>

      {/* Skills */}
      <SectionInput
        title="Skills"
        items={skills}
        onAdd={() => setSkills([...skills, ""])}
        onChange={(i, val) => setSkills(skills.map((s, idx) => idx === i ? val : s))}
        onRemove={i => setSkills(skills.filter((_, idx) => idx !== i))}
        onSubmit={handleSubmitSkills}
        placeholder="Skill"
      />

      <hr className="my-4"/>

      {/* Languages */}
      <SectionInput
        title="Languages"
        items={languages}
        onAdd={() => setLanguages([...languages, ""])}
        onChange={(i, val) => setLanguages(languages.map((l, idx) => idx === i ? val : l))}
        onRemove={i => setLanguages(languages.filter((_, idx) => idx !== i))}
        onSubmit={handleSubmitLanguages}
        placeholder="Language"
      />

      <hr className="my-4"/>

      {/* Interests */}
      <SectionInput
        title="Interests"
        items={interests}
        onAdd={() => setInterests([...interests, ""])}
        onChange={(i, val) => setInterests(interests.map((l, idx) => idx === i ? val : l))}
        onRemove={i => setInterests(interests.filter((_, idx) => idx !== i))}
        onSubmit={handleSubmitInterests}
        placeholder="Interest"
      />

      <hr className="my-4"/>

      {/* Projects */}
      <SectionInput
        title="Projects"
        items={projects}
        onAdd={() => setProjects([...projects, ""])}
        onChange={(i, val) => setProjects(projects.map((l, idx) => idx === i ? val : l))}
        onRemove={i => setProjects(projects.filter((_, idx) => idx !== i))}
        onSubmit={handleSubmitProjects}
        placeholder="Project Name"
      />

      <hr className="my-4"/>

      {/* Education */}
      <SectionInput
        title="Education"
        items={educations}
        onAdd={() => setEducations([...educations, ""])}
        onChange={(i, val) => setEducations(educations.map((l, idx) => idx === i ? val : l))}
        onRemove={i => setEducations(educations.filter((_, idx) => idx !== i))}
        onSubmit={handleSubmitEducation}
        placeholder="Education"
      />
    </div>
  );
}

// --- Reusable SectionInput Component ---
interface SectionInputProps {
  title: string;
  items: string[];
  onAdd: () => void;
  onChange: (idx: number, val: string) => void;
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
          <input type="text" placeholder={placeholder} value={item} onChange={e => onChange(idx, e.target.value)} className="flex-grow p-2 border rounded"/>
          <button onClick={() => onRemove(idx)} className="px-3 py-1 bg-red-500 text-white rounded text-sm">Remove</button>
        </div>
      ))}
      <div className="flex gap-2 mt-2">
        <button onClick={onAdd} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Add {title}</button>
        <button onClick={onSubmit} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">Save {title}</button>
      </div>
    </div>
  );
}
