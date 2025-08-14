import { ModernHero } from "@/components/ui/modern-hero";
import { ModernCard } from "@/components/ui/modern-card";
import { ModernSection } from "@/components/ui/modern-section";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Users, Play, Heart, Star, Facebook, Instagram, MessageCircle, Youtube } from "lucide-react";

const About = () => {
  const stats = [
    { icon: Users, label: "Students", value: "12,000+", description: "From teenagers to seniors" },
    { icon: Play, label: "Video Views", value: "20M+", description: "Across social media" },
    { icon: Heart, label: "Facebook Likes", value: "46,000+", description: "Active community" },
    { icon: Star, label: "Years of Excellence", value: "15+", description: "Industry experience" }
  ];

  const notableClients = [
    "Mr. Niranjan Hiranandani",
    "Erica Fernandes (TV Celebrity)",
    "Mohinder Amarnath (Cricketer)",
    "Adhuna Bhabani (BBlunt)",
  ];

  const socialMediaStats = [
    {
      platform: "Facebook",
      icon: Facebook,
      followers: "140,000+",
      likes: "46,000+",
      description: "followers & likes"
    },
    {
      platform: "Instagram",
      icon: Instagram,
      followers: "47,800",
      likes: "3,800",
      description: "Dance Planet & Lillian Mendes"
    },
    {
      platform: "WhatsApp",
      icon: MessageCircle,
      followers: "5,000+",
      likes: "",
      description: "dance enthusiasts network"
    },
    {
      platform: "YouTube",
      icon: Youtube,
      followers: "8,100",
      likes: "",
      description: "subscribers"
    }
  ];

  const majorProductions = [
    "NETFLIX (The Chelsea Handler show)",
    "Madhuri Dixit - Dance with Madhuri",
    "BBC Worldwide - Jhalak Dikhla Jaa 3",
    "STAR PLUS - Nach Baliye",
    "Just Dance (Hrithik Roshan as judge)"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-primary/10">
      <ModernHero 
        title="About Dance Planet" 
        subtitle="Pure happiness! This is what dancing is all about.."
      />
      
      <div className="container mx-auto px-4 py-16 space-y-24">
        {/* Stats Section */}
        <ModernSection className="text-center">
          <h2 className="text-4xl font-bold mb-12 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Our Impact
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <ModernCard
                key={stat.label}
                variant="glow"
                meteors={index === 0}
                className="text-center group hover:scale-105 transition-transform duration-300"
              >
                <CardContent className="p-8">
                  <stat.icon className="h-12 w-12 mx-auto mb-6 text-primary group-hover:animate-pulse" />
                  <h3 className="text-4xl font-bold text-primary mb-3">{stat.value}</h3>
                  <p className="font-semibold text-lg mb-2">{stat.label}</p>
                  <p className="text-muted-foreground">{stat.description}</p>
                </CardContent>
              </ModernCard>
            ))}
          </div>
        </ModernSection>

        {/* Notable Clients Section */}
        <ModernSection className="text-center">
          <h2 className="text-4xl font-bold mb-12 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Our Esteemed Clients
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {notableClients.map((client, index) => (
              <ModernCard
                key={index}
                variant="gradient"
                className="group hover:scale-105 transition-all duration-300"
              >
                <CardContent className="p-6">
                  <p className="text-lg font-semibold text-center group-hover:text-primary transition-colors">
                    {client}
                  </p>
                </CardContent>
              </ModernCard>
            ))}
          </div>
          <p className="text-muted-foreground mt-8 text-xl font-medium">& many many more..</p>
        </ModernSection>

        {/* Social Media Presence */}
        <ModernSection className="text-center">
          <h2 className="text-4xl font-bold mb-12 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Social Media Presence
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {socialMediaStats.map((social, index) => (
              <ModernCard
                key={social.platform}
                variant="glow"
                meteors={social.platform === "Facebook"}
                className="text-center group hover:scale-105 transition-transform duration-300"
              >
                <CardContent className="p-8">
                  <social.icon className="h-12 w-12 mx-auto mb-6 text-primary group-hover:animate-pulse" />
                  <h3 className="text-xl font-bold mb-3">{social.platform}</h3>
                  <p className="text-3xl font-bold text-primary mb-2">{social.followers}</p>
                  {social.likes && (
                    <p className="text-lg font-semibold text-primary/80 mb-3">{social.likes}</p>
                  )}
                  <p className="text-muted-foreground">{social.description}</p>
                </CardContent>
              </ModernCard>
            ))}
          </div>
          <ModernCard
            variant="gradient"
            className="mt-12 max-w-3xl mx-auto hover:scale-105 transition-transform duration-300"
          >
            <CardContent className="p-8">
              <p className="text-xl font-semibold text-center">
                Our videos have crossed over <span className="text-primary font-bold text-2xl">20 million views</span> & are widely shared on social media.
              </p>
            </CardContent>
          </ModernCard>
        </ModernSection>

        {/* Founder Section */}
        <ModernSection className="text-center">
          <h2 className="text-4xl font-bold mb-12 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Meet Our Founder
          </h2>
          <ModernCard 
            variant="glow" 
            meteors={true}
            className="max-w-6xl mx-auto overflow-hidden group hover:scale-[1.02] transition-transform duration-500"
          >
            <CardContent className="p-0">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                {/* Image Section */}
                <div className="relative overflow-hidden">
                  <img 
                    src="/lovable-uploads/9d6885e4-f63a-482d-b9ec-9caa04c30a4d.png"
                    alt="Lillian Mendes - Founder and Principal Choreographer"
                    className="w-full h-[500px] object-cover rounded-l-lg group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
                
                {/* Content Section */}
                <div className="p-8 text-left">
                  <h3 className="text-4xl font-bold text-primary mb-4">Lillian Mendes</h3>
                  <p className="text-xl text-muted-foreground mb-8 font-medium">Founder and Principal Choreographer</p>
                  <p className="text-lg mb-8 leading-relaxed">
                    A recognized name in the industry, Lillian has focused on making Dance Planet the choice for 
                    celebrities, recording artists, international personalities & dance companies.
                  </p>
                  
                  <div className="space-y-6">
                    <h4 className="text-2xl font-semibold mb-6 text-primary">Major Productions</h4>
                    <div className="grid grid-cols-1 gap-3">
                      {majorProductions.map((production, index) => (
                        <ModernCard
                          key={index}
                          variant="gradient"
                          className="hover:scale-105 transition-transform duration-300"
                        >
                          <CardContent className="p-4">
                            <p className="text-sm font-medium text-center">
                              {production}
                            </p>
                          </CardContent>
                        </ModernCard>
                      ))}
                    </div>
                    <p className="text-muted-foreground text-lg font-medium">& lots more.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </ModernCard>
        </ModernSection>

        {/* Mission Statement */}
        <ModernSection className="text-center">
          <ModernCard 
            variant="gradient" 
            meteors={true}
            className="max-w-4xl mx-auto hover:scale-[1.02] transition-transform duration-500"
          >
            <CardContent className="p-12">
              <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Our Mission
              </h2>
              <p className="text-xl leading-relaxed text-muted-foreground">
                At Dance Planet, we believe that dance is pure happiness. We welcome everyone from teenagers to seniors 
                and everyone in between, creating a vibrant community where passion for dance brings people together. 
                Our goal is to spread joy through movement and help every student discover their unique dance journey.
              </p>
            </CardContent>
          </ModernCard>
        </ModernSection>
      </div>
    </div>
  );
};

export default About;