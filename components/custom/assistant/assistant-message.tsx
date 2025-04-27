"use client"

import { useState } from "react"
import type { Message } from "ai"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Copy, Check, Download } from "lucide-react"
import ReactMarkdown from "react-markdown"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism"

interface AssistantMessageProps {
  message: Message
}

export function AssistantMessage({ message }: AssistantMessageProps) {
  const [copied, setCopied] = useState(false)

  const isUserMessage = message.role === "user"

  const copyToClipboard = async () => {
    if (typeof message.content === "string") {
      await navigator.clipboard.writeText(message.content)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  // Function to download message content as text file
  const downloadAsText = () => {
    if (typeof message.content !== "string") return

    const element = document.createElement("a")
    const file = new Blob([message.content], { type: "text/plain" })
    element.href = URL.createObjectURL(file)
    element.download = `assistant-message-${new Date().toISOString().slice(0, 10)}.txt`
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  return (
    <div className={`flex ${isUserMessage ? "justify-end" : "justify-start"}`}>
      <div className={`flex gap-3 max-w-[80%] ${isUserMessage ? "flex-row-reverse" : ""}`}>
        <Avatar className="h-8 w-8">
          {isUserMessage ? (
            <AvatarFallback>U</AvatarFallback>
          ) : (
            <>
              <AvatarImage src="/assistant-avatar.png" alt="Assistant" />
              <AvatarFallback>AI</AvatarFallback>
            </>
          )}
        </Avatar>

        <Card
          className={`p-3 ${
            isUserMessage ? "bg-primary text-primary-foreground" : "bg-muted"
          } shadow-sm relative group`}
        >
          {typeof message.content === "string" ? (
            <div className="prose prose-sm dark:prose-invert max-w-none">
              <ReactMarkdown
                components={{
                  code({ node, inline, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || "")
                    return !inline && match ? (
                      <SyntaxHighlighter style={vscDarkPlus} language={match[1]} PreTag="div" {...props}>
                        {String(children).replace(/\n$/, "")}
                      </SyntaxHighlighter>
                    ) : (
                      <code className={className} {...props}>
                        {children}
                      </code>
                    )
                  },
                }}
              >
                {message.content}
              </ReactMarkdown>
            </div>
          ) : (
            <div>Unsupported message format</div>
          )}

          {!isUserMessage && typeof message.content === "string" && (
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="flex gap-1">
                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={copyToClipboard}>
                  {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                </Button>
                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={downloadAsText}>
                  <Download className="h-3 w-3" />
                </Button>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}
