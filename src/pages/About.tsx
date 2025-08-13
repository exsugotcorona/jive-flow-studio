import { ModernHero } from "@/components/ui/modern-hero";
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
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5">
      <ModernHero 
        title="About Dance Planet" 
        subtitle="Pure happiness! This is what dancing is all about.."
      />
      
      <div className="container mx-auto px-4 py-16 space-y-16">
        {/* Stats Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="border-primary/20 bg-card/95 backdrop-blur-sm text-center hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <stat.icon className="h-8 w-8 mx-auto mb-4 text-primary" />
                  <h3 className="text-3xl font-bold text-primary mb-2">{stat.value}</h3>
                  <p className="font-semibold mb-1">{stat.label}</p>
                  <p className="text-sm text-muted-foreground">{stat.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.section>

        {/* Notable Clients Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold mb-8">Our Esteemed Clients</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {notableClients.map((client, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Badge variant="outline" className="text-lg p-4 w-full justify-center border-primary/30 hover:bg-primary/10 transition-colors">
                  {client}
                </Badge>
              </motion.div>
            ))}
          </div>
          <p className="text-muted-foreground mt-6 text-lg">& many many more..</p>
        </motion.section>

        {/* Social Media Presence */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold mb-8">Social Media Presence</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {socialMediaStats.map((social, index) => (
              <motion.div
                key={social.platform}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="border-primary/20 bg-card/95 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <social.icon className="h-8 w-8 mx-auto mb-4 text-primary" />
                    <h3 className="text-xl font-bold mb-2">{social.platform}</h3>
                    <p className="text-2xl font-bold text-primary mb-1">{social.followers}</p>
                    {social.likes && (
                      <p className="text-lg font-semibold text-primary/80 mb-2">{social.likes}</p>
                    )}
                    <p className="text-sm text-muted-foreground">{social.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-8"
          >
            <Card className="border-primary/20 bg-gradient-to-r from-primary/10 to-primary/5 backdrop-blur-sm max-w-2xl mx-auto">
              <CardContent className="p-6">
                <p className="text-lg font-semibold text-center">
                  Our videos have crossed over <span className="text-primary font-bold">20 million views</span> & are widely shared on social media.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.section>

        {/* Founder Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold mb-8">Meet Our Founder</h2>
          <Card className="border-primary/20 bg-card/95 backdrop-blur-sm max-w-4xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-primary mb-4">Lillian Mendes</h3>
              <p className="text-lg text-muted-foreground mb-6">Founder and Principal Choreographer</p>
              <p className="text-lg mb-8 leading-relaxed">
                A recognized name in the industry, Lillian has focused on making Dance Planet the choice for 
                celebrities, recording artists, international personalities & dance companies.
              </p>
              
              <div className="space-y-4">
                <h4 className="text-xl font-semibold mb-4">Major Productions</h4>
                <div className="flex flex-wrap justify-center gap-3">
                  {majorProductions.map((production, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      <Badge variant="secondary" className="text-sm p-2">
                        {production}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
                <p className="text-muted-foreground mt-4 text-lg">& lots more.</p>
              </div>
            </CardContent>
          </Card>
        </motion.section>

        {/* Mission Statement */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center"
        >
          <Card className="border-primary/20 bg-gradient-to-r from-primary/10 via-primary/5 to-secondary/10 backdrop-blur-sm max-w-3xl mx-auto">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-xl leading-relaxed">
                At Dance Planet, we believe that dance is pure happiness. We welcome everyone from teenagers to seniors 
                and everyone in between, creating a vibrant community where passion for dance brings people together. 
                Our goal is to spread joy through movement and help every student discover their unique dance journey.
              </p>
            </CardContent>
          </Card>
        </motion.section>
      </div>
    </div>
  );
};

export default About;