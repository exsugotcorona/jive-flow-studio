import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { Meteors } from "@/components/ui/meteors";

const Contact = () => {
  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Hero Section */}
      <section className="py-24 px-4 text-center bg-gradient-to-b from-background via-muted/20 to-background relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />
        <div className="relative z-10 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-foreground to-muted-foreground">
              Contact <span className="text-primary">Us</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Ready to start your jive journey? Get in touch with us for more information 
              about our classes, schedules, or any questions you might have.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="relative overflow-hidden border-border/50 hover:border-primary/30 transition-all duration-500 bg-gradient-to-br from-background to-muted/30">
                <Meteors number={5} />
                <CardHeader>
                  <CardTitle className="text-2xl">Send Us a Message</CardTitle>
                  <CardDescription className="text-base">
                    Fill out the form below and we'll get back to you within 24 hours.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" placeholder="John" className="border-border/50 focus:border-primary/50" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" placeholder="Doe" className="border-border/50 focus:border-primary/50" />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="john@example.com" className="border-border/50 focus:border-primary/50" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone (Optional)</Label>
                      <Input id="phone" type="tel" placeholder="(555) 123-4567" className="border-border/50 focus:border-primary/50" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input id="subject" placeholder="Class inquiry" className="border-border/50 focus:border-primary/50" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea 
                        id="message" 
                        placeholder="Tell us about your dance experience and what you're interested in learning..."
                        rows={5}
                        className="border-border/50 focus:border-primary/50"
                      />
                    </div>
                    
                    <Button type="submit" className="w-full bg-gradient-to-r from-primary to-primary-glow hover:shadow-[var(--shadow-elegant)] transition-all duration-300">
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <Card className="border-border/50 hover:border-primary/30 transition-all duration-500 bg-gradient-to-br from-background to-muted/30">
                <CardHeader>
                  <CardTitle className="text-xl">Get in Touch</CardTitle>
                  <CardDescription>
                    Here's how you can reach us directly.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {[
                    { icon: Mail, title: "Email", value: "info@danceplanet.com" },
                    { icon: Phone, title: "Phone", value: "(555) 123-JIVE" },
                    { icon: MapPin, title: "Address", value: "123 Dance Street\nRhythm City, RC 12345" }
                  ].map((contact, index) => (
                    <motion.div
                      key={contact.title}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-center space-x-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                    >
                      <contact.icon className="h-5 w-5 text-primary flex-shrink-0" />
                      <div>
                        <p className="font-medium">{contact.title}</p>
                        <p className="text-muted-foreground whitespace-pre-line">{contact.value}</p>
                      </div>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>

              <Card className="border-border/50 hover:border-primary/30 transition-all duration-500 bg-gradient-to-br from-background to-muted/30">
                <CardHeader>
                  <CardTitle className="text-xl">Studio Hours</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { day: "Monday - Friday", hours: "6:00 PM - 10:00 PM" },
                      { day: "Saturday", hours: "2:00 PM - 8:00 PM" },
                      { day: "Sunday", hours: "Closed" }
                    ].map((schedule, index) => (
                      <motion.div
                        key={schedule.day}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="flex items-center space-x-3 p-3 rounded-lg bg-muted/30"
                      >
                        <Clock className="h-4 w-4 text-primary flex-shrink-0" />
                        <div className="flex justify-between w-full">
                          <span className="font-medium">{schedule.day}</span>
                          <span className="text-muted-foreground">{schedule.hours}</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border/50 hover:border-primary/30 transition-all duration-500 bg-gradient-to-br from-background to-muted/30">
                <CardHeader>
                  <CardTitle className="text-xl">FAQ</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    {
                      question: "Do I need a partner?",
                      answer: "No! We rotate partners during class, so you can come solo."
                    },
                    {
                      question: "What should I wear?",
                      answer: "Comfortable clothes and shoes with smooth soles work best."
                    },
                    {
                      question: "Can I try a class first?",
                      answer: "Yes! Contact us to schedule a trial class for just ₹1,000."
                    }
                  ].map((faq, index) => (
                    <motion.div
                      key={faq.question}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                    >
                      <h4 className="font-medium mb-2 text-foreground">{faq.question}</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {faq.answer}
                      </p>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;