"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { FileText, Eye, Save, RefreshCw } from "lucide-react"
import { getSiteContent, updateSiteContent, type SiteContent } from "@/lib/firebase-admin-service"

export function AdvancedContentManager() {
  const [content, setContent] = useState<SiteContent[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [activeSection, setActiveSection] = useState("hero")

  const sections = [
    { id: "hero", name: "Hero Section", description: "Main banner and call-to-action" },
    { id: "about", name: "About Product", description: "Product information and benefits" },
    { id: "features", name: "Features", description: "Product features and highlights" },
    { id: "testimonials", name: "Testimonials", description: "Customer testimonials section" },
    { id: "pricing", name: "Pricing", description: "Pricing and bundle information" },
    { id: "contact", name: "Contact", description: "Contact and ordering information" },
    { id: "footer", name: "Footer", description: "Footer content and links" },
  ]

  useEffect(() => {
    loadContent()
  }, [])

  const loadContent = async () => {
    try {
      const data = await getSiteContent()
      setContent(data)
    } catch (error) {
      console.error("Error loading content:", error)
    } finally {
      setLoading(false)
    }
  }

  const getCurrentContent = (sectionId: string): SiteContent => {
    const existing = content.find((c) => c.section === sectionId)
    if (existing) return existing

    return {
      id: sectionId,
      section: sectionId,
      title: "",
      subtitle: "",
      description: "",
      buttonText: "",
      image: "",
      isActive: true,
      seoTitle: "",
      seoDescription: "",
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  }

  const handleSave = async (sectionId: string, updatedContent: Partial<SiteContent>) => {
    setSaving(true)
    try {
      await updateSiteContent(sectionId, updatedContent)
      await loadContent()
      alert("Content updated successfully!")
    } catch (error) {
      console.error("Error saving content:", error)
      alert("Error saving content")
    } finally {
      setSaving(false)
    }
  }

  const updateCurrentContent = (sectionId: string, field: keyof SiteContent, value: any) => {
    const updatedContent = content.map((c) => (c.section === sectionId ? { ...c, [field]: value } : c))

    if (!content.find((c) => c.section === sectionId)) {
      const newContent = { ...getCurrentContent(sectionId), [field]: value }
      updatedContent.push(newContent)
    }

    setContent(updatedContent)
  }

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  const currentContent = getCurrentContent(activeSection)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Content Manager</h2>
          <p className="text-gray-600">Manage website content and copy</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={loadContent}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          <Button onClick={() => handleSave(activeSection, currentContent)} disabled={saving}>
            <Save className="w-4 h-4 mr-2" />
            {saving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="w-5 h-5 mr-2" />
              Sections
            </CardTitle>
            <CardDescription>Select a section to edit</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-1">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full text-left p-3 rounded-none border-0 transition-colors ${
                    activeSection === section.id
                      ? "bg-blue-50 text-blue-700 border-r-2 border-blue-600"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <div className="font-medium">{section.name}</div>
                  <div className="text-sm text-gray-500">{section.description}</div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>{sections.find((s) => s.id === activeSection)?.name} Content</CardTitle>
            <CardDescription>Edit the content for this section</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Tabs defaultValue="content" className="w-full">
              <TabsList>
                <TabsTrigger value="content">Content</TabsTrigger>
                <TabsTrigger value="seo">SEO</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>

              <TabsContent value="content" className="space-y-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={currentContent.title}
                    onChange={(e) => updateCurrentContent(activeSection, "title", e.target.value)}
                    placeholder="Enter section title..."
                  />
                </div>

                <div>
                  <Label htmlFor="subtitle">Subtitle</Label>
                  <Input
                    id="subtitle"
                    value={currentContent.subtitle}
                    onChange={(e) => updateCurrentContent(activeSection, "subtitle", e.target.value)}
                    placeholder="Enter section subtitle..."
                  />
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={currentContent.description}
                    onChange={(e) => updateCurrentContent(activeSection, "description", e.target.value)}
                    placeholder="Enter section description..."
                    rows={6}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="buttonText">Button Text</Label>
                    <Input
                      id="buttonText"
                      value={currentContent.buttonText || ""}
                      onChange={(e) => updateCurrentContent(activeSection, "buttonText", e.target.value)}
                      placeholder="Enter button text..."
                    />
                  </div>
                  <div>
                    <Label htmlFor="image">Image URL</Label>
                    <Input
                      id="image"
                      value={currentContent.image || ""}
                      onChange={(e) => updateCurrentContent(activeSection, "image", e.target.value)}
                      placeholder="Enter image URL..."
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="seo" className="space-y-4">
                <div>
                  <Label htmlFor="seoTitle">SEO Title</Label>
                  <Input
                    id="seoTitle"
                    value={currentContent.seoTitle || ""}
                    onChange={(e) => updateCurrentContent(activeSection, "seoTitle", e.target.value)}
                    placeholder="Enter SEO title..."
                  />
                  <p className="text-sm text-gray-500 mt-1">Recommended: 50-60 characters</p>
                </div>

                <div>
                  <Label htmlFor="seoDescription">SEO Description</Label>
                  <Textarea
                    id="seoDescription"
                    value={currentContent.seoDescription || ""}
                    onChange={(e) => updateCurrentContent(activeSection, "seoDescription", e.target.value)}
                    placeholder="Enter SEO description..."
                    rows={3}
                  />
                  <p className="text-sm text-gray-500 mt-1">Recommended: 150-160 characters</p>
                </div>
              </TabsContent>

              <TabsContent value="settings" className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="isActive">Section Active</Label>
                    <p className="text-sm text-gray-600">Show this section on the website</p>
                  </div>
                  <Switch
                    id="isActive"
                    checked={currentContent.isActive}
                    onCheckedChange={(checked) => updateCurrentContent(activeSection, "isActive", checked)}
                  />
                </div>

                <Alert>
                  <Eye className="h-4 w-4" />
                  <AlertDescription>
                    Changes will be visible on the website after saving and may take a few minutes to update.
                  </AlertDescription>
                </Alert>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default AdvancedContentManager
