import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { AppLayout } from "@/components/AppLayout";
import {
  StickyNote,
  Plus,
  Search,
  Filter,
  Trash2,
  Pin,
  PinOff,
  Palette,
  Calendar,
  Tag,
  MoreVertical,
  Edit3,
  Save,
  X,
  Star,
  Clock,
  User,
  Sparkles,
} from "lucide-react";

interface Note {
  id: string;
  title: string;
  content: string;
  color: string;
  pinned: boolean;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  favorite: boolean;
}

export default function StickyNotes() {
  const [notes, setNotes] = useState<Note[]>([
    {
      id: "1",
      title: "Lead Follow-up",
      content:
        "Remember to call John Smith about the enterprise package. He seemed very interested and mentioned budget approval next week.",
      color: "yellow",
      pinned: true,
      tags: ["sales", "follow-up"],
      createdAt: new Date("2024-01-15T10:30:00"),
      updatedAt: new Date("2024-01-15T14:20:00"),
      favorite: true,
    },
    {
      id: "2",
      title: "Product Idea",
      content:
        "AI-powered email sequence generator that adapts based on recipient engagement patterns. Could integrate with CRM data.",
      color: "blue",
      pinned: false,
      tags: ["product", "ai", "idea"],
      createdAt: new Date("2024-01-14T16:45:00"),
      updatedAt: new Date("2024-01-14T16:45:00"),
      favorite: false,
    },
    {
      id: "3",
      title: "Meeting Notes",
      content:
        "Team sync - Q1 goals discussed. Focus on customer acquisition and product improvements. Next review in 2 weeks.",
      color: "green",
      pinned: false,
      tags: ["meeting", "team"],
      createdAt: new Date("2024-01-12T09:00:00"),
      updatedAt: new Date("2024-01-12T09:15:00"),
      favorite: false,
    },
  ]);

  const [isCreating, setIsCreating] = useState(false);
  const [newNote, setNewNote] = useState({
    title: "",
    content: "",
    color: "yellow",
    tags: "",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedColor, setSelectedColor] = useState("all");
  const [editingNote, setEditingNote] = useState<string | null>(null);

  const colors = [
    {
      name: "yellow",
      bg: "bg-yellow-200",
      border: "border-yellow-300",
      text: "text-yellow-800",
    },
    {
      name: "blue",
      bg: "bg-blue-200",
      border: "border-blue-300",
      text: "text-blue-800",
    },
    {
      name: "green",
      bg: "bg-green-200",
      border: "border-green-300",
      text: "text-green-800",
    },
    {
      name: "pink",
      bg: "bg-pink-200",
      border: "border-pink-300",
      text: "text-pink-800",
    },
    {
      name: "purple",
      bg: "bg-purple-200",
      border: "border-purple-300",
      text: "text-purple-800",
    },
    {
      name: "orange",
      bg: "bg-orange-200",
      border: "border-orange-300",
      text: "text-orange-800",
    },
  ];

  const handleCreateNote = () => {
    if (!newNote.title.trim() && !newNote.content.trim()) return;

    const note: Note = {
      id: Date.now().toString(),
      title: newNote.title || "Untitled",
      content: newNote.content,
      color: newNote.color,
      pinned: false,
      tags: newNote.tags
        .split(",")
        .map(tag => tag.trim())
        .filter(Boolean),
      createdAt: new Date(),
      updatedAt: new Date(),
      favorite: false,
    };

    setNotes(prev => [note, ...prev]);
    setNewNote({ title: "", content: "", color: "yellow", tags: "" });
    setIsCreating(false);
  };

  const togglePin = (id: string) => {
    setNotes(prev =>
      prev.map(note =>
        note.id === id ? { ...note, pinned: !note.pinned } : note,
      ),
    );
  };

  const toggleFavorite = (id: string) => {
    setNotes(prev =>
      prev.map(note =>
        note.id === id ? { ...note, favorite: !note.favorite } : note,
      ),
    );
  };

  const deleteNote = (id: string) => {
    setNotes(prev => prev.filter(note => note.id !== id));
  };

  const getColorClasses = (colorName: string) => {
    const color = colors.find(c => c.name === colorName);
    return color || colors[0];
  };

  const filteredNotes = notes
    .filter(
      note =>
        (selectedColor === "all" || note.color === selectedColor) &&
        (searchTerm === "" ||
          note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
          note.tags.some(tag =>
            tag.toLowerCase().includes(searchTerm.toLowerCase()),
          )),
    )
    .sort((a, b) => {
      if (a.pinned && !b.pinned) return -1;
      if (!a.pinned && b.pinned) return 1;
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    });

  return (
    <AppLayout>
      <div className="flex flex-col h-full bg-charcoal-900 text-white overflow-hidden">
        {/* Header */}
        <div className="bg-charcoal-800 border-b border-white/10 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                <StickyNote className="w-6 h-6 text-yellow-300" />
              </div>
              <div>
                <h1 className="text-2xl font-bold saintvision-gradient-text">
                  Sticky Notes
                </h1>
                <p className="text-white/70">Quick notes & ideas</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 w-4 h-4" />
                  <Input
                    placeholder="Search notes..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className="pl-10 bg-white/5 border-white/20 w-64"
                  />
                </div>

                <select
                  value={selectedColor}
                  onChange={e => setSelectedColor(e.target.value)}
                  className="bg-white/5 border border-white/20 rounded-md px-3 py-2 text-white text-sm"
                >
                  <option value="all">All Colors</option>
                  {colors.map(color => (
                    <option key={color.name} value={color.name}>
                      {color.name.charAt(0).toUpperCase() + color.name.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              <Button
                onClick={() => setIsCreating(true)}
                className="bg-gold-500 hover:bg-gold-600 text-charcoal-900"
              >
                <Plus className="w-4 h-4 mr-2" />
                New Note
              </Button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* New Note Creation */}
          {isCreating && (
            <div className="mb-6 p-4 bg-white/5 rounded-lg border border-white/20">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Create New Note</h3>
                <Button
                  onClick={() => setIsCreating(false)}
                  size="sm"
                  variant="ghost"
                  className="text-white/50 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              <div className="space-y-4">
                <Input
                  placeholder="Note title..."
                  value={newNote.title}
                  onChange={e =>
                    setNewNote({ ...newNote, title: e.target.value })
                  }
                  className="bg-white/5 border-white/20"
                />

                <Textarea
                  placeholder="What's on your mind?"
                  value={newNote.content}
                  onChange={e =>
                    setNewNote({ ...newNote, content: e.target.value })
                  }
                  className="bg-white/5 border-white/20 min-h-[100px]"
                />

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-white/70">Color:</span>
                    <div className="flex space-x-2">
                      {colors.map(color => (
                        <button
                          key={color.name}
                          onClick={() =>
                            setNewNote({ ...newNote, color: color.name })
                          }
                          className={`w-6 h-6 rounded-full border-2 ${
                            color.bg
                          } ${
                            newNote.color === color.name
                              ? "border-white"
                              : "border-white/30"
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Input
                      placeholder="Tags (comma separated)"
                      value={newNote.tags}
                      onChange={e =>
                        setNewNote({ ...newNote, tags: e.target.value })
                      }
                      className="bg-white/5 border-white/20 w-48"
                    />
                    <Button
                      onClick={handleCreateNote}
                      className="bg-blue-500 hover:bg-blue-600"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Save
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Notes Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredNotes.map(note => {
              const colorClasses = getColorClasses(note.color);
              return (
                <div
                  key={note.id}
                  className={`p-4 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200 ${colorClasses.bg} ${colorClasses.border} border relative group`}
                >
                  {/* Note Header */}
                  <div className="flex items-start justify-between mb-3">
                    <h3 className={`font-semibold ${colorClasses.text} pr-2`}>
                      {note.title}
                    </h3>
                    <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        onClick={() => togglePin(note.id)}
                        size="sm"
                        variant="ghost"
                        className="h-6 w-6 p-0"
                      >
                        {note.pinned ? (
                          <PinOff className="w-3 h-3 text-red-600" />
                        ) : (
                          <Pin className="w-3 h-3" />
                        )}
                      </Button>
                      <Button
                        onClick={() => toggleFavorite(note.id)}
                        size="sm"
                        variant="ghost"
                        className="h-6 w-6 p-0"
                      >
                        <Star
                          className={`w-3 h-3 ${
                            note.favorite
                              ? "text-yellow-600 fill-yellow-600"
                              : ""
                          }`}
                        />
                      </Button>
                      <Button
                        onClick={() => deleteNote(note.id)}
                        size="sm"
                        variant="ghost"
                        className="h-6 w-6 p-0"
                      >
                        <Trash2 className="w-3 h-3 text-red-600" />
                      </Button>
                    </div>
                  </div>

                  {/* Note Content */}
                  <p
                    className={`${colorClasses.text} text-sm mb-3 line-clamp-4`}
                  >
                    {note.content}
                  </p>

                  {/* Tags */}
                  {note.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-3">
                      {note.tags.map(tag => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="text-xs bg-black/20 text-black/80"
                        >
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                  )}

                  {/* Note Footer */}
                  <div
                    className={`flex items-center justify-between text-xs ${colorClasses.text} opacity-70`}
                  >
                    <div className="flex items-center space-x-2">
                      {note.pinned && <Pin className="w-3 h-3" />}
                      {note.favorite && (
                        <Star className="w-3 h-3 fill-current" />
                      )}
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{note.updatedAt.toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Empty State */}
          {filteredNotes.length === 0 && (
            <div className="text-center py-12">
              <StickyNote className="w-16 h-16 text-white/20 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white/70 mb-2">
                {searchTerm || selectedColor !== "all"
                  ? "No notes found"
                  : "No notes yet"}
              </h3>
              <p className="text-white/50 mb-4">
                {searchTerm || selectedColor !== "all"
                  ? "Try adjusting your search or filter"
                  : "Create your first sticky note to get started"}
              </p>
              {!searchTerm && selectedColor === "all" && (
                <Button
                  onClick={() => setIsCreating(true)}
                  className="bg-gold-500 hover:bg-gold-600 text-charcoal-900"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Create Note
                </Button>
              )}
            </div>
          )}
        </div>

        {/* Stats Bar */}
        <div className="bg-charcoal-800 border-t border-white/10 px-6 py-3">
          <div className="flex items-center justify-between text-sm text-white/60">
            <div className="flex items-center space-x-4">
              <span>{notes.length} total notes</span>
              <span>{notes.filter(n => n.pinned).length} pinned</span>
              <span>{notes.filter(n => n.favorite).length} favorites</span>
            </div>
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-gold-300" />
              <span className="text-gold-300">Auto-saved</span>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
