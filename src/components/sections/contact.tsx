'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/atoms/card';
import { Button } from '@/components/atoms/button';
import { Input } from '@/components/atoms/input';
import { Textarea } from '@/components/atoms/textarea';
import { Label } from '@/components/atoms/label';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/atoms/alert-dialog';
import { Mail, Linkedin, Github, MapPin, Send, CheckCircle2, XCircle } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { CONTACT_DATA } from '@/constants';
import { useSendEmail } from '@/services/mutations/mail.mutations';

/**
 * Contact section component with email form
 */
export function ContactSection() {
  const isMobile = useIsMobile();
  const { mutate: sendEmail, isPending } = useSendEmail();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [dialogState, setDialogState] = useState<{
    open: boolean;
    success: boolean;
    message: string;
  }>({
    open: false,
    success: false,
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    sendEmail(formData, {
      onSuccess: () => {
        setDialogState({
          open: true,
          success: true,
          message: 'Your message has been sent successfully! I\'ll get back to you soon.',
        });
        setFormData({ name: '', email: '', subject: '', message: '' });
      },
      onError: (error: any) => {
        setDialogState({
          open: true,
          success: false,
          message: error?.response?.data?.message || 'Failed to send message. Please try again later.',
        });
      },
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const contactLinks = [
    {
      icon: Linkedin,
      label: 'LinkedIn',
      value: 'linkedin.com/in/raflyazizabdillah',
      href: CONTACT_DATA.linkedin,
      color: 'text-blue-600',
    },
    {
      icon: Github,
      label: 'GitHub',
      value: 'github.com/raflytch',
      href: CONTACT_DATA.github,
      color: 'text-foreground',
    },
    {
      icon: MapPin,
      label: 'Location',
      value: CONTACT_DATA.location,
      href: null,
      color: 'text-red-500',
    },
  ];

  return (
    <section id="contact" className="min-h-screen flex items-center justify-center p-4 md:p-8 lg:p-12">
      <div className="max-w-5xl w-full space-y-8">
        <div className="space-y-2 text-center">
          <h2 className={`font-bold text-foreground ${isMobile ? 'text-3xl' : 'text-3xl md:text-4xl'}`}>
            Get In Touch
          </h2>
          <p className="text-muted-foreground">
            Feel free to reach out for collaborations or just a friendly hello
          </p>
        </div>

        <div className={`grid gap-6 ${isMobile ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-2'}`}>
          {/* Contact Form */}
          <Card className="border-2">
            <CardContent className={isMobile ? 'p-4' : 'p-6'}>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="border-2"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="border-2"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    name="subject"
                    placeholder="What's this about?"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="border-2"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Your message..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={isMobile ? 4 : 6}
                    className="border-2 resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={isPending}
                >
                  {isPending ? (
                    <>
                      <span className="animate-spin mr-2">⏳</span>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <div className="space-y-4">
            {contactLinks.map((contact) => {
              const Icon = contact.icon;
              const isClickable = contact.href !== null;

              const cardContent = (
                <Card className="border-2 hover:border-primary/50 transition-colors h-full">
                  <CardContent className={isMobile ? 'p-4' : 'p-6'}>
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-lg border-2 border-border/50 ${contact.color}`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-foreground mb-1">{contact.label}</h3>
                        <p className={`text-muted-foreground break-all ${isMobile ? 'text-sm' : 'text-base'}`}>
                          {contact.value}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );

              if (isClickable) {
                return (
                  <a
                    key={contact.label}
                    href={contact.href!}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    {cardContent}
                  </a>
                );
              }

              return <div key={contact.label}>{cardContent}</div>;
            })}
          </div>
        </div>
      </div>

      {/* Alert Dialog */}
      <AlertDialog open={dialogState.open} onOpenChange={(open) => setDialogState((prev) => ({ ...prev, open }))}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <div className="flex items-center gap-3">
              {dialogState.success ? (
                <CheckCircle2 className="w-8 h-8 text-green-500" />
              ) : (
                <XCircle className="w-8 h-8 text-destructive" />
              )}
              <AlertDialogTitle>
                {dialogState.success ? 'Message Sent!' : 'Error'}
              </AlertDialogTitle>
            </div>
            <AlertDialogDescription className="text-base">
              {dialogState.message}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button onClick={() => setDialogState((prev) => ({ ...prev, open: false }))}>
              Close
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </section>
  );
}
