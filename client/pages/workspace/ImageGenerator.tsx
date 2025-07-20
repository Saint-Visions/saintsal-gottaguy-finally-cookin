import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { AppLayout } from "@/components/AppLayout";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  ImageIcon,
  Sparkles,
  Download,
  Share,
  RefreshCw,
  Settings,
  Palette,
  Wand2,
  Camera,
  Eye,
  Heart,
  Star,
  Copy,
  Trash2,
  Grid3X3,
  Maximize,
  MoreVertical,
  Clock,
  Crown,
  Zap,
} from "lucide-react";

interface GeneratedImage {
  id: string;
  prompt: string;
  imageUrl: string;
  style: string;
  size: string;
  createdAt: Date;
  favorite: boolean;
  downloads: number;
}

export default function ImageGenerator() {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedStyle, setSelectedStyle] = useState("photorealistic");
  const [selectedSize, setSelectedSize] = useState("1024x1024");
  const [images, setImages] = useState<GeneratedImage[]>([
    {
      id: "1",
      prompt: "A futuristic AI robot working at a computer, digital art style",
      imageUrl:
        "https://cdn.builder.io/api/v1/image/assets%2F065997bd13e4442e888a08652fcd61ba%2Fdc36ab3d288a4806bc52f5b6be2d1ad4",
      style: "digital_art",
      size: "1024x1024",
      createdAt: new Date("2024-01-15T14:30:00"),
      favorite: true,
      downloads: 5,
    },
    {
      id: "2",
      prompt: "Modern office space with AI technology, professional lighting",
      imageUrl:
        "https://cdn.builder.io/api/v1/image/assets%2F065997bd13e4442e888a08652fcd61ba%2Fe36dd35399f945e5b0a19a18228b02eb",
      style: "photorealistic",
      size: "1024x1024",
      createdAt: new Date("2024-01-14T16:45:00"),
      favorite: false,
      downloads: 3,
    },
  ]);

  const styles = [
    { id: "photorealistic", name: "Photorealistic", emoji: "📸" },
    { id: "digital_art", name: "Digital Art", emoji: "🎨" },
    { id: "illustration", name: "Illustration", emoji: "✏️" },
    { id: "anime", name: "Anime Style", emoji: "🎭" },
    { id: "oil_painting", name: "Oil Painting", emoji: "🖼️" },
    { id: "watercolor", name: "Watercolor", emoji: "🎭" },
    { id: "sketch", name: "Sketch", emoji: "✏️" },
    { id: "3d_render", name: "3D Render", emoji: "🎯" },
  ];

  const sizes = [
    { id: "1024x1024", name: "Square (1024x1024)", ratio: "1:1" },
    { id: "1024x1792", name: "Portrait (1024x1792)", ratio: "9:16" },
    { id: "1792x1024", name: "Landscape (1792x1024)", ratio: "16:9" },
  ];

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setIsGenerating(true);

    // Simulate API call to DALL-E
    try {
      await new Promise(resolve => setTimeout(resolve, 3000));

      const newImage: GeneratedImage = {
        id: Date.now().toString(),
        prompt,
        imageUrl:
          "https://via.placeholder.com/512x512/4F46E5/FFFFFF?text=Generated+Image",
        style: selectedStyle,
        size: selectedSize,
        createdAt: new Date(),
        favorite: false,
        downloads: 0,
      };

      setImages(prev => [newImage, ...prev]);
      setPrompt("");
    } catch (error) {
      console.error("Image generation failed:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const toggleFavorite = (id: string) => {
    setImages(prev =>
      prev.map(img =>
        img.id === id ? { ...img, favorite: !img.favorite } : img,
      ),
    );
  };

  const downloadImage = (image: GeneratedImage) => {
    // Simulate download
    setImages(prev =>
      prev.map(img =>
        img.id === image.id ? { ...img, downloads: img.downloads + 1 } : img,
      ),
    );
  };

  const deleteImage = (id: string) => {
    setImages(prev => prev.filter(img => img.id !== id));
  };

  const getStyleEmoji = (styleId: string) => {
    return styles.find(s => s.id === styleId)?.emoji || "🎨";
  };

  return (
    <AppLayout>
      <div className="flex flex-col h-full bg-charcoal-900 text-white overflow-hidden">
        {/* Header */}
        <div className="bg-charcoal-800 border-b border-white/10 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                <ImageIcon className="w-6 h-6 text-purple-300" />
              </div>
              <div>
                <h1 className="text-2xl font-bold saintvision-gradient-text">
                  AI Image Generator
                </h1>
                <p className="text-white/70">
                  Create stunning images with AI • Powered by DALL-E
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                <Sparkles className="w-3 h-3 mr-1" />
                AI Ready
              </Badge>
              <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                <Crown className="w-3 h-3 mr-1" />
                Pro Feature
              </Badge>
            </div>
          </div>
        </div>

        {/* Generation Panel */}
        <div className="bg-charcoal-800/50 border-b border-white/10 p-6">
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Prompt Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/70">
                Describe the image you want to create
              </label>
              <Textarea
                value={prompt}
                onChange={e => setPrompt(e.target.value)}
                placeholder="A beautiful sunset over a mountain landscape, digital art style, high detail..."
                className="bg-white/5 border-white/20 text-white resize-none"
                rows={3}
              />
            </div>

            {/* Style and Size Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/70">
                  Art Style
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {styles.map(style => (
                    <button
                      key={style.id}
                      onClick={() => setSelectedStyle(style.id)}
                      className={`p-3 rounded-lg border text-left transition-all ${
                        selectedStyle === style.id
                          ? "border-purple-500 bg-purple-500/20 text-purple-200"
                          : "border-white/20 bg-white/5 text-white/70 hover:bg-white/10"
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <span className="text-lg">{style.emoji}</span>
                        <span className="text-sm font-medium">
                          {style.name}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-white/70">
                  Image Size
                </label>
                <div className="space-y-2">
                  {sizes.map(size => (
                    <button
                      key={size.id}
                      onClick={() => setSelectedSize(size.id)}
                      className={`w-full p-3 rounded-lg border text-left transition-all ${
                        selectedSize === size.id
                          ? "border-blue-500 bg-blue-500/20 text-blue-200"
                          : "border-white/20 bg-white/5 text-white/70 hover:bg-white/10"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{size.name}</span>
                        <Badge variant="secondary" className="text-xs">
                          {size.ratio}
                        </Badge>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Generate Button */}
            <div className="flex justify-center">
              <Button
                onClick={handleGenerate}
                disabled={!prompt.trim() || isGenerating}
                className="bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white px-8 py-3 text-lg"
                size="lg"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Wand2 className="w-5 h-5 mr-2" />
                    Generate Image
                  </>
                )}
              </Button>
            </div>

            {/* Progress Indicator */}
            {isGenerating && (
              <Alert className="border-blue-500/30 bg-blue-500/10">
                <Sparkles className="h-4 w-4 text-blue-300" />
                <AlertDescription className="text-blue-200">
                  <strong>Creating your image...</strong> This usually takes
                  10-30 seconds. We're using advanced AI to bring your vision to
                  life!
                </AlertDescription>
              </Alert>
            )}
          </div>
        </div>

        {/* Generated Images Gallery */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">
                Generated Images ({images.length})
              </h2>
              <div className="flex items-center space-x-2">
                <Button size="sm" variant="ghost" className="text-white/70">
                  <Grid3X3 className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="ghost" className="text-white/70">
                  <Settings className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Images Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {images.map(image => (
                <div
                  key={image.id}
                  className="group glass-morphism rounded-xl overflow-hidden hover:scale-105 transition-all duration-300"
                >
                  {/* Image */}
                  <div className="relative aspect-square overflow-hidden">
                    <img
                      src={image.imageUrl}
                      alt={image.prompt}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
                      <Button
                        onClick={() => toggleFavorite(image.id)}
                        size="sm"
                        variant="ghost"
                        className="text-white hover:bg-white/20"
                      >
                        <Heart
                          className={`w-4 h-4 ${
                            image.favorite ? "fill-red-500 text-red-500" : ""
                          }`}
                        />
                      </Button>
                      <Button
                        onClick={() => downloadImage(image)}
                        size="sm"
                        variant="ghost"
                        className="text-white hover:bg-white/20"
                      >
                        <Download className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-white hover:bg-white/20"
                      >
                        <Share className="w-4 h-4" />
                      </Button>
                      <Button
                        onClick={() => deleteImage(image.id)}
                        size="sm"
                        variant="ghost"
                        className="text-white hover:bg-white/20"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Image Info */}
                  <div className="p-4">
                    <p className="text-sm text-white/80 line-clamp-2 mb-3">
                      {image.prompt}
                    </p>

                    <div className="flex items-center justify-between text-xs text-white/60 mb-2">
                      <div className="flex items-center space-x-2">
                        <span>{getStyleEmoji(image.style)}</span>
                        <span>{image.size}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>{image.createdAt.toLocaleDateString()}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {image.favorite && (
                          <Heart className="w-3 h-3 text-red-400 fill-current" />
                        )}
                        <span className="text-xs text-white/50">
                          {image.downloads} downloads
                        </span>
                      </div>
                      <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                        <MoreVertical className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Empty State */}
            {images.length === 0 && !isGenerating && (
              <div className="text-center py-12">
                <ImageIcon className="w-16 h-16 text-white/20 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white/70 mb-2">
                  No images generated yet
                </h3>
                <p className="text-white/50 mb-4">
                  Create your first AI-generated image to get started
                </p>
                <Button
                  onClick={() => document.querySelector("textarea")?.focus()}
                  className="bg-purple-500 hover:bg-purple-600"
                >
                  <Wand2 className="w-4 h-4 mr-2" />
                  Start Creating
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Stats Bar */}
        <div className="bg-charcoal-800 border-t border-white/10 px-6 py-3">
          <div className="flex items-center justify-between text-sm text-white/60">
            <div className="flex items-center space-x-4">
              <span>{images.length} images created</span>
              <span>{images.filter(img => img.favorite).length} favorites</span>
              <span>
                {images.reduce((sum, img) => sum + img.downloads, 0)} downloads
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Zap className="w-4 h-4 text-purple-300" />
              <span className="text-purple-300">DALL-E 3 Powered</span>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
