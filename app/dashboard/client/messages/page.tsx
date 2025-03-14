"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Send } from "lucide-react"
import DashboardLayout from "@/components/dashboard-layout"

export default function ClientMessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState<number | null>(1)
  const [messageText, setMessageText] = useState("")

  // Mock data for conversations
  const conversations = [
    {
      id: 1,
      name: "Support Team",
      lastMessage: "We'll send a collector tomorrow morning.",
      time: "10:30 AM",
      unread: 0,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 2,
      name: "John Smith (Collector)",
      lastMessage: "I'll be at your location in 15 minutes.",
      time: "Yesterday",
      unread: 2,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 3,
      name: "Billing Department",
      lastMessage: "Your invoice for April has been generated.",
      time: "May 1",
      unread: 0,
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]

  // Mock data for messages in the selected conversation
  const messages = [
    {
      id: 1,
      conversationId: 1,
      sender: "Support Team",
      text: "Hello! How can we help you today?",
      time: "10:15 AM",
      isUser: false,
    },
    {
      id: 2,
      conversationId: 1,
      sender: "You",
      text: "Hi, I need to schedule a special collection for some large items.",
      time: "10:20 AM",
      isUser: true,
    },
    {
      id: 3,
      conversationId: 1,
      sender: "Support Team",
      text: "Of course! We can arrange that for you. What items do you need collected and when would be a good time?",
      time: "10:25 AM",
      isUser: false,
    },
    {
      id: 4,
      conversationId: 1,
      sender: "You",
      text: "I have an old sofa and some large cardboard boxes. Would tomorrow morning work?",
      time: "10:28 AM",
      isUser: true,
    },
    {
      id: 5,
      conversationId: 1,
      sender: "Support Team",
      text: "We'll send a collector tomorrow morning. Is 9:00 AM suitable for you?",
      time: "10:30 AM",
      isUser: false,
    },

    {
      id: 6,
      conversationId: 2,
      sender: "John Smith (Collector)",
      text: "Good morning! I'm your assigned waste collector for today.",
      time: "Yesterday",
      isUser: false,
    },
    {
      id: 7,
      conversationId: 2,
      sender: "John Smith (Collector)",
      text: "I'll be at your location in 15 minutes.",
      time: "Yesterday",
      isUser: false,
    },

    {
      id: 8,
      conversationId: 3,
      sender: "Billing Department",
      text: "Your invoice for April has been generated.",
      time: "May 1",
      isUser: false,
    },
    {
      id: 9,
      conversationId: 3,
      sender: "You",
      text: "Thank you. I'll review it right away.",
      time: "May 1",
      isUser: true,
    },
  ]

  const filteredMessages = messages.filter((message) => message.conversationId === selectedConversation)

  const handleSendMessage = () => {
    if (messageText.trim() === "") return
    // In a real app, this would send the message to the server
    console.log("Sending message:", messageText)
    setMessageText("")
  }

  return (
    <DashboardLayout userRole="client">
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Messages</h1>
          <p className="text-muted-foreground">Communicate with our team and collectors</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[calc(100vh-220px)]">
          <Card className="md:col-span-1 flex flex-col">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle>Conversations</CardTitle>
                <Badge variant="outline">{conversations.reduce((total, conv) => total + conv.unread, 0)}</Badge>
              </div>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Search messages..." className="pl-8" />
              </div>
            </CardHeader>
            <CardContent className="flex-1 overflow-auto">
              <Tabs defaultValue="all">
                <TabsList className="grid w-full grid-cols-2 mb-4">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="unread">Unread</TabsTrigger>
                </TabsList>
                <TabsContent value="all" className="m-0 space-y-1">
                  {conversations.map((conversation) => (
                    <div
                      key={conversation.id}
                      className={`flex items-center gap-3 rounded-lg p-3 cursor-pointer transition-colors ${
                        selectedConversation === conversation.id ? "bg-muted" : "hover:bg-muted/50"
                      }`}
                      onClick={() => setSelectedConversation(conversation.id)}
                    >
                      <Avatar>
                        <AvatarImage src={conversation.avatar} alt={conversation.name} />
                        <AvatarFallback>{conversation.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 overflow-hidden">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium truncate">{conversation.name}</h4>
                          <span className="text-xs text-muted-foreground">{conversation.time}</span>
                        </div>
                        <p className="text-sm text-muted-foreground truncate">{conversation.lastMessage}</p>
                      </div>
                      {conversation.unread > 0 && <Badge className="ml-auto">{conversation.unread}</Badge>}
                    </div>
                  ))}
                </TabsContent>
                <TabsContent value="unread" className="m-0 space-y-1">
                  {conversations
                    .filter((c) => c.unread > 0)
                    .map((conversation) => (
                      <div
                        key={conversation.id}
                        className={`flex items-center gap-3 rounded-lg p-3 cursor-pointer transition-colors ${
                          selectedConversation === conversation.id ? "bg-muted" : "hover:bg-muted/50"
                        }`}
                        onClick={() => setSelectedConversation(conversation.id)}
                      >
                        <Avatar>
                          <AvatarImage src={conversation.avatar} alt={conversation.name} />
                          <AvatarFallback>{conversation.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 overflow-hidden">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium truncate">{conversation.name}</h4>
                            <span className="text-xs text-muted-foreground">{conversation.time}</span>
                          </div>
                          <p className="text-sm text-muted-foreground truncate">{conversation.lastMessage}</p>
                        </div>
                        <Badge className="ml-auto">{conversation.unread}</Badge>
                      </div>
                    ))}
                  {conversations.filter((c) => c.unread > 0).length === 0 && (
                    <p className="text-center text-muted-foreground py-4">No unread messages</p>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <Card className="md:col-span-2 flex flex-col">
            {selectedConversation ? (
              <>
                <CardHeader className="pb-3 border-b">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage
                        src={conversations.find((c) => c.id === selectedConversation)?.avatar}
                        alt={conversations.find((c) => c.id === selectedConversation)?.name}
                      />
                      <AvatarFallback>
                        {conversations.find((c) => c.id === selectedConversation)?.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle>{conversations.find((c) => c.id === selectedConversation)?.name}</CardTitle>
                      <CardDescription>
                        {selectedConversation === 1
                          ? "Customer Support"
                          : selectedConversation === 2
                            ? "Waste Collector"
                            : "Billing"}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 overflow-auto p-4 space-y-4">
                  {filteredMessages.map((message) => (
                    <div key={message.id} className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}>
                      <div
                        className={`max-w-[80%] rounded-lg p-3 ${
                          message.isUser ? "bg-primary text-primary-foreground" : "bg-muted"
                        }`}
                      >
                        <p className="text-sm">{message.text}</p>
                        <p
                          className={`text-xs mt-1 ${message.isUser ? "text-primary-foreground/70" : "text-muted-foreground"}`}
                        >
                          {message.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </CardContent>
                <div className="p-4 border-t">
                  <div className="flex gap-2">
                    <Textarea
                      placeholder="Type your message..."
                      className="min-h-[80px]"
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault()
                          handleSendMessage()
                        }
                      }}
                    />
                    <Button className="self-end" onClick={handleSendMessage}>
                      <Send className="h-4 w-4" />
                      <span className="sr-only">Send message</span>
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center p-8">
                <div className="text-center">
                  <h3 className="text-lg font-medium mb-2">Select a conversation</h3>
                  <p className="text-muted-foreground">Choose a conversation from the list to start messaging</p>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}

