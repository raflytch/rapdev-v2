'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
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
import { Send, CheckCircle2, XCircle } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useSendEmail } from '@/services/mutations/mail.mutations';

/**
 * Email form validation schema
 */
const emailSchema = z.object({
  name: z.string().min(1, 'Name is required').min(2, 'Name must be at least 2 characters'),
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  subject: z.string().min(1, 'Subject is required').min(3, 'Subject must be at least 3 characters'),
  message: z.string().min(1, 'Message is required').min(10, 'Message must be at least 10 characters'),
});

type EmailFormData = z.infer<typeof emailSchema>;

/**
 * Contact section component with validated email form
 */
export function ContactSection() {
  const isMobile = useIsMobile();
  const { mutate: sendEmail, isPending } = useSendEmail();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EmailFormData>({
    resolver: zodResolver(emailSchema),
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

  const onSubmit = (data: EmailFormData) => {
    sendEmail(data, {
      onSuccess: () => {
        setDialogState({
          open: true,
          success: true,
          message: "Your message has been sent successfully! I'll get back to you soon.",
        });
        reset();
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

  return (
    <section id="contact" className="min-h-screen flex items-center justify-center p-4 md:p-6 lg:p-8">
      <div className="max-w-2xl w-full space-y-8">
        <div className="space-y-2 text-center">
          <h2 className={`font-bold text-foreground ${isMobile ? 'text-3xl' : 'text-3xl md:text-4xl'}`}>
            Get In Touch
          </h2>
          <p className="text-muted-foreground">
            Feel free to reach out for collaborations or just a friendly hello
          </p>
        </div>

        {/* Contact Form */}
        <Card className="border-2">
          <CardContent className={isMobile ? 'p-4' : 'p-6'}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-1">
                <Label htmlFor="name" className="text-sm">
                  Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="name"
                  placeholder="Your name"
                  className="border-2"
                  {...register('name')}
                />
                <div className="min-h-[20px]">
                  {errors.name && (
                    <p className="text-xs text-destructive mt-1">{errors.name.message}</p>
                  )}
                </div>
              </div>

              <div className="space-y-1">
                <Label htmlFor="email" className="text-sm">
                  Email <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  className="border-2"
                  {...register('email')}
                />
                <div className="min-h-[20px]">
                  {errors.email && (
                    <p className="text-xs text-destructive mt-1">{errors.email.message}</p>
                  )}
                </div>
              </div>

              <div className="space-y-1">
                <Label htmlFor="subject" className="text-sm">
                  Subject <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="subject"
                  placeholder="What's this about?"
                  className="border-2"
                  {...register('subject')}
                />
                <div className="min-h-[20px]">
                  {errors.subject && (
                    <p className="text-xs text-destructive mt-1">{errors.subject.message}</p>
                  )}
                </div>
              </div>

              <div className="space-y-1">
                <Label htmlFor="message" className="text-sm">
                  Message <span className="text-destructive">*</span>
                </Label>
                <Textarea
                  id="message"
                  placeholder="Your message..."
                  rows={isMobile ? 4 : 6}
                  className="border-2 resize-none"
                  {...register('message')}
                />
                <div className="min-h-[20px]">
                  {errors.message && (
                    <p className="text-xs text-destructive mt-1">{errors.message.message}</p>
                  )}
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={isPending}>
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
              <AlertDialogTitle>{dialogState.success ? 'Message Sent!' : 'Error'}</AlertDialogTitle>
            </div>
            <AlertDialogDescription className="text-base">{dialogState.message}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button onClick={() => setDialogState((prev) => ({ ...prev, open: false }))}>Close</Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </section>
  );
}
