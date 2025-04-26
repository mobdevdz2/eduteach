"use client"

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger  } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

export default function ComponentsDemo() {
  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">ShadCN UI Components</h1>
      <p className="text-muted-foreground mb-8">
        This page showcases the installed shadcn/ui components in your application.
      </p>
      
      <Tabs defaultValue="installed">
        <TabsList className="mb-4">
          <TabsTrigger value="installed">Installed Components ({43})</TabsTrigger>
          <TabsTrigger value="failed">Failed Components ({4})</TabsTrigger>
        </TabsList>
        
        <TabsContent value="installed" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            
            <Card>
              <CardHeader>
                <CardTitle className="capitalize">accordion</CardTitle>
                <CardDescription>Installed successfully</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Import from: <code className="bg-muted p-1 rounded">@/components/ui/accordion</code>
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" asChild>
                  <a href="https://ui.shadcn.com/docs/components/accordion" target="_blank" rel="noopener noreferrer">
                    View Docs
                  </a>
                </Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="capitalize">alert</CardTitle>
                <CardDescription>Installed successfully</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Import from: <code className="bg-muted p-1 rounded">@/components/ui/alert</code>
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" asChild>
                  <a href="https://ui.shadcn.com/docs/components/alert" target="_blank" rel="noopener noreferrer">
                    View Docs
                  </a>
                </Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="capitalize">alert-dialog</CardTitle>
                <CardDescription>Installed successfully</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Import from: <code className="bg-muted p-1 rounded">@/components/ui/alert-dialog</code>
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" asChild>
                  <a href="https://ui.shadcn.com/docs/components/alert-dialog" target="_blank" rel="noopener noreferrer">
                    View Docs
                  </a>
                </Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="capitalize">aspect-ratio</CardTitle>
                <CardDescription>Installed successfully</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Import from: <code className="bg-muted p-1 rounded">@/components/ui/aspect-ratio</code>
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" asChild>
                  <a href="https://ui.shadcn.com/docs/components/aspect-ratio" target="_blank" rel="noopener noreferrer">
                    View Docs
                  </a>
                </Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="capitalize">avatar</CardTitle>
                <CardDescription>Installed successfully</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Import from: <code className="bg-muted p-1 rounded">@/components/ui/avatar</code>
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" asChild>
                  <a href="https://ui.shadcn.com/docs/components/avatar" target="_blank" rel="noopener noreferrer">
                    View Docs
                  </a>
                </Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="capitalize">badge</CardTitle>
                <CardDescription>Installed successfully</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Import from: <code className="bg-muted p-1 rounded">@/components/ui/badge</code>
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" asChild>
                  <a href="https://ui.shadcn.com/docs/components/badge" target="_blank" rel="noopener noreferrer">
                    View Docs
                  </a>
                </Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="capitalize">button</CardTitle>
                <CardDescription>Installed successfully</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Import from: <code className="bg-muted p-1 rounded">@/components/ui/button</code>
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" asChild>
                  <a href="https://ui.shadcn.com/docs/components/button" target="_blank" rel="noopener noreferrer">
                    View Docs
                  </a>
                </Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="capitalize">calendar</CardTitle>
                <CardDescription>Installed successfully</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Import from: <code className="bg-muted p-1 rounded">@/components/ui/calendar</code>
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" asChild>
                  <a href="https://ui.shadcn.com/docs/components/calendar" target="_blank" rel="noopener noreferrer">
                    View Docs
                  </a>
                </Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="capitalize">card</CardTitle>
                <CardDescription>Installed successfully</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Import from: <code className="bg-muted p-1 rounded">@/components/ui/card</code>
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" asChild>
                  <a href="https://ui.shadcn.com/docs/components/card" target="_blank" rel="noopener noreferrer">
                    View Docs
                  </a>
                </Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="capitalize">carousel</CardTitle>
                <CardDescription>Installed successfully</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Import from: <code className="bg-muted p-1 rounded">@/components/ui/carousel</code>
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" asChild>
                  <a href="https://ui.shadcn.com/docs/components/carousel" target="_blank" rel="noopener noreferrer">
                    View Docs
                  </a>
                </Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="capitalize">checkbox</CardTitle>
                <CardDescription>Installed successfully</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Import from: <code className="bg-muted p-1 rounded">@/components/ui/checkbox</code>
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" asChild>
                  <a href="https://ui.shadcn.com/docs/components/checkbox" target="_blank" rel="noopener noreferrer">
                    View Docs
                  </a>
                </Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="capitalize">collapsible</CardTitle>
                <CardDescription>Installed successfully</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Import from: <code className="bg-muted p-1 rounded">@/components/ui/collapsible</code>
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" asChild>
                  <a href="https://ui.shadcn.com/docs/components/collapsible" target="_blank" rel="noopener noreferrer">
                    View Docs
                  </a>
                </Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="capitalize">command</CardTitle>
                <CardDescription>Installed successfully</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Import from: <code className="bg-muted p-1 rounded">@/components/ui/command</code>
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" asChild>
                  <a href="https://ui.shadcn.com/docs/components/command" target="_blank" rel="noopener noreferrer">
                    View Docs
                  </a>
                </Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="capitalize">context-menu</CardTitle>
                <CardDescription>Installed successfully</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Import from: <code className="bg-muted p-1 rounded">@/components/ui/context-menu</code>
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" asChild>
                  <a href="https://ui.shadcn.com/docs/components/context-menu" target="_blank" rel="noopener noreferrer">
                    View Docs
                  </a>
                </Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="capitalize">dialog</CardTitle>
                <CardDescription>Installed successfully</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Import from: <code className="bg-muted p-1 rounded">@/components/ui/dialog</code>
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" asChild>
                  <a href="https://ui.shadcn.com/docs/components/dialog" target="_blank" rel="noopener noreferrer">
                    View Docs
                  </a>
                </Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="capitalize">drawer</CardTitle>
                <CardDescription>Installed successfully</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Import from: <code className="bg-muted p-1 rounded">@/components/ui/drawer</code>
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" asChild>
                  <a href="https://ui.shadcn.com/docs/components/drawer" target="_blank" rel="noopener noreferrer">
                    View Docs
                  </a>
                </Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="capitalize">dropdown-menu</CardTitle>
                <CardDescription>Installed successfully</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Import from: <code className="bg-muted p-1 rounded">@/components/ui/dropdown-menu</code>
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" asChild>
                  <a href="https://ui.shadcn.com/docs/components/dropdown-menu" target="_blank" rel="noopener noreferrer">
                    View Docs
                  </a>
                </Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="capitalize">form</CardTitle>
                <CardDescription>Installed successfully</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Import from: <code className="bg-muted p-1 rounded">@/components/ui/form</code>
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" asChild>
                  <a href="https://ui.shadcn.com/docs/components/form" target="_blank" rel="noopener noreferrer">
                    View Docs
                  </a>
                </Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="capitalize">hover-card</CardTitle>
                <CardDescription>Installed successfully</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Import from: <code className="bg-muted p-1 rounded">@/components/ui/hover-card</code>
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" asChild>
                  <a href="https://ui.shadcn.com/docs/components/hover-card" target="_blank" rel="noopener noreferrer">
                    View Docs
                  </a>
                </Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="capitalize">input</CardTitle>
                <CardDescription>Installed successfully</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Import from: <code className="bg-muted p-1 rounded">@/components/ui/input</code>
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" asChild>
                  <a href="https://ui.shadcn.com/docs/components/input" target="_blank" rel="noopener noreferrer">
                    View Docs
                  </a>
                </Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="capitalize">label</CardTitle>
                <CardDescription>Installed successfully</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Import from: <code className="bg-muted p-1 rounded">@/components/ui/label</code>
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" asChild>
                  <a href="https://ui.shadcn.com/docs/components/label" target="_blank" rel="noopener noreferrer">
                    View Docs
                  </a>
                </Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="capitalize">menubar</CardTitle>
                <CardDescription>Installed successfully</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Import from: <code className="bg-muted p-1 rounded">@/components/ui/menubar</code>
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" asChild>
                  <a href="https://ui.shadcn.com/docs/components/menubar" target="_blank" rel="noopener noreferrer">
                    View Docs
                  </a>
                </Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="capitalize">navigation-menu</CardTitle>
                <CardDescription>Installed successfully</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Import from: <code className="bg-muted p-1 rounded">@/components/ui/navigation-menu</code>
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" asChild>
                  <a href="https://ui.shadcn.com/docs/components/navigation-menu" target="_blank" rel="noopener noreferrer">
                    View Docs
                  </a>
                </Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="capitalize">pagination</CardTitle>
                <CardDescription>Installed successfully</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Import from: <code className="bg-muted p-1 rounded">@/components/ui/pagination</code>
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" asChild>
                  <a href="https://ui.shadcn.com/docs/components/pagination" target="_blank" rel="noopener noreferrer">
                    View Docs
                  </a>
                </Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="capitalize">popover</CardTitle>
                <CardDescription>Installed successfully</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Import from: <code className="bg-muted p-1 rounded">@/components/ui/popover</code>
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" asChild>
                  <a href="https://ui.shadcn.com/docs/components/popover" target="_blank" rel="noopener noreferrer">
                    View Docs
                  </a>
                </Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="capitalize">progress</CardTitle>
                <CardDescription>Installed successfully</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Import from: <code className="bg-muted p-1 rounded">@/components/ui/progress</code>
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" asChild>
                  <a href="https://ui.shadcn.com/docs/components/progress" target="_blank" rel="noopener noreferrer">
                    View Docs
                  </a>
                </Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="capitalize">radio-group</CardTitle>
                <CardDescription>Installed successfully</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Import from: <code className="bg-muted p-1 rounded">@/components/ui/radio-group</code>
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" asChild>
                  <a href="https://ui.shadcn.com/docs/components/radio-group" target="_blank" rel="noopener noreferrer">
                    View Docs
                  </a>
                </Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="capitalize">resizable</CardTitle>
                <CardDescription>Installed successfully</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Import from: <code className="bg-muted p-1 rounded">@/components/ui/resizable</code>
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" asChild>
                  <a href="https://ui.shadcn.com/docs/components/resizable" target="_blank" rel="noopener noreferrer">
                    View Docs
                  </a>
                </Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="capitalize">scroll-area</CardTitle>
                <CardDescription>Installed successfully</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Import from: <code className="bg-muted p-1 rounded">@/components/ui/scroll-area</code>
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" asChild>
                  <a href="https://ui.shadcn.com/docs/components/scroll-area" target="_blank" rel="noopener noreferrer">
                    View Docs
                  </a>
                </Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="capitalize">select</CardTitle>
                <CardDescription>Installed successfully</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Import from: <code className="bg-muted p-1 rounded">@/components/ui/select</code>
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" asChild>
                  <a href="https://ui.shadcn.com/docs/components/select" target="_blank" rel="noopener noreferrer">
                    View Docs
                  </a>
                </Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="capitalize">separator</CardTitle>
                <CardDescription>Installed successfully</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Import from: <code className="bg-muted p-1 rounded">@/components/ui/separator</code>
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" asChild>
                  <a href="https://ui.shadcn.com/docs/components/separator" target="_blank" rel="noopener noreferrer">
                    View Docs
                  </a>
                </Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="capitalize">sheet</CardTitle>
                <CardDescription>Installed successfully</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Import from: <code className="bg-muted p-1 rounded">@/components/ui/sheet</code>
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" asChild>
                  <a href="https://ui.shadcn.com/docs/components/sheet" target="_blank" rel="noopener noreferrer">
                    View Docs
                  </a>
                </Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="capitalize">skeleton</CardTitle>
                <CardDescription>Installed successfully</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Import from: <code className="bg-muted p-1 rounded">@/components/ui/skeleton</code>
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" asChild>
                  <a href="https://ui.shadcn.com/docs/components/skeleton" target="_blank" rel="noopener noreferrer">
                    View Docs
                  </a>
                </Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="capitalize">slider</CardTitle>
                <CardDescription>Installed successfully</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Import from: <code className="bg-muted p-1 rounded">@/components/ui/slider</code>
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" asChild>
                  <a href="https://ui.shadcn.com/docs/components/slider" target="_blank" rel="noopener noreferrer">
                    View Docs
                  </a>
                </Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="capitalize">sonner</CardTitle>
                <CardDescription>Installed successfully</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Import from: <code className="bg-muted p-1 rounded">@/components/ui/sonner</code>
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" asChild>
                  <a href="https://ui.shadcn.com/docs/components/sonner" target="_blank" rel="noopener noreferrer">
                    View Docs
                  </a>
                </Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="capitalize">switch</CardTitle>
                <CardDescription>Installed successfully</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Import from: <code className="bg-muted p-1 rounded">@/components/ui/switch</code>
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" asChild>
                  <a href="https://ui.shadcn.com/docs/components/switch" target="_blank" rel="noopener noreferrer">
                    View Docs
                  </a>
                </Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="capitalize">table</CardTitle>
                <CardDescription>Installed successfully</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Import from: <code className="bg-muted p-1 rounded">@/components/ui/table</code>
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" asChild>
                  <a href="https://ui.shadcn.com/docs/components/table" target="_blank" rel="noopener noreferrer">
                    View Docs
                  </a>
                </Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="capitalize">tabs</CardTitle>
                <CardDescription>Installed successfully</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Import from: <code className="bg-muted p-1 rounded">@/components/ui/tabs</code>
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" asChild>
                  <a href="https://ui.shadcn.com/docs/components/tabs" target="_blank" rel="noopener noreferrer">
                    View Docs
                  </a>
                </Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="capitalize">textarea</CardTitle>
                <CardDescription>Installed successfully</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Import from: <code className="bg-muted p-1 rounded">@/components/ui/textarea</code>
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" asChild>
                  <a href="https://ui.shadcn.com/docs/components/textarea" target="_blank" rel="noopener noreferrer">
                    View Docs
                  </a>
                </Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="capitalize">table</CardTitle>
                <CardDescription>Installed successfully</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Import from: <code className="bg-muted p-1 rounded">@/components/ui/table</code>
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" asChild>
                  <a href="https://ui.shadcn.com/docs/components/table" target="_blank" rel="noopener noreferrer">
                    View Docs
                  </a>
                </Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="capitalize">toggle</CardTitle>
                <CardDescription>Installed successfully</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Import from: <code className="bg-muted p-1 rounded">@/components/ui/toggle</code>
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" asChild>
                  <a href="https://ui.shadcn.com/docs/components/toggle" target="_blank" rel="noopener noreferrer">
                    View Docs
                  </a>
                </Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="capitalize">toggle-group</CardTitle>
                <CardDescription>Installed successfully</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Import from: <code className="bg-muted p-1 rounded">@/components/ui/toggle-group</code>
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" asChild>
                  <a href="https://ui.shadcn.com/docs/components/toggle-group" target="_blank" rel="noopener noreferrer">
                    View Docs
                  </a>
                </Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="capitalize">tooltip</CardTitle>
                <CardDescription>Installed successfully</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Import from: <code className="bg-muted p-1 rounded">@/components/ui/tooltip</code>
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" asChild>
                  <a href="https://ui.shadcn.com/docs/components/tooltip" target="_blank" rel="noopener noreferrer">
                    View Docs
                  </a>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="failed" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            
            <Card className="border-destructive">
              <CardHeader>
                <CardTitle className="capitalize">data-table</CardTitle>
                <CardDescription>Installation failed</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Check the log file in <code className="bg-muted p-1 rounded">.shadcn-logs/data-table-error.log</code>
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" asChild>
                  <a href="https://ui.shadcn.com/docs/components/data-table" target="_blank" rel="noopener noreferrer">
                    View Docs
                  </a>
                </Button>
              </CardFooter>
            </Card>
            <Card className="border-destructive">
              <CardHeader>
                <CardTitle className="capitalize">date-picker</CardTitle>
                <CardDescription>Installation failed</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Check the log file in <code className="bg-muted p-1 rounded">.shadcn-logs/date-picker-error.log</code>
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" asChild>
                  <a href="https://ui.shadcn.com/docs/components/date-picker" target="_blank" rel="noopener noreferrer">
                    View Docs
                  </a>
                </Button>
              </CardFooter>
            </Card>
            <Card className="border-destructive">
              <CardHeader>
                <CardTitle className="capitalize">toast</CardTitle>
                <CardDescription>Installation failed</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Check the log file in <code className="bg-muted p-1 rounded">.shadcn-logs/toast-error.log</code>
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" asChild>
                  <a href="https://ui.shadcn.com/docs/components/toast" target="_blank" rel="noopener noreferrer">
                    View Docs
                  </a>
                </Button>
              </CardFooter>
            </Card>
            <Card className="border-destructive">
              <CardHeader>
                <CardTitle className="capitalize">use-toast</CardTitle>
                <CardDescription>Installation failed</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Check the log file in <code className="bg-muted p-1 rounded">.shadcn-logs/use-toast-error.log</code>
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" asChild>
                  <a href="https://ui.shadcn.com/docs/components/use-toast" target="_blank" rel="noopener noreferrer">
                    View Docs
                  </a>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
      
      <Separator className="my-10" />
      
      <footer className="text-center text-sm text-muted-foreground">
        <p>
          Generated on 4/24/2025 | 
          <a href="https://ui.shadcn.com" className="underline ml-1" target="_blank" rel="noopener noreferrer">
            shadcn/ui documentation
          </a>
        </p>
      </footer>
    </div>
  );
}