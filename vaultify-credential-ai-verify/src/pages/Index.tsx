
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { Building2, MapPin, DollarSign, Clock } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();

  const jobVacancies = [
    {
      id: 1,
      title: "Frontend Developer",
      company: "TechCorp Solutions",
      location: "Remote",
      salary: "$80,000 - $120,000",
      type: "Full-time",
      requirements: "React, TypeScript, 2+ years experience, Bachelor's degree in CS",
      image: "https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=400&h=200&fit=crop",
      minGPA: 3.5,
      requiredSkills: ["React", "TypeScript", "JavaScript"]
    },
    {
      id: 2,
      title: "Data Scientist",
      company: "AI Innovations Inc",
      location: "San Francisco, CA",
      salary: "$100,000 - $150,000",
      type: "Full-time",
      requirements: "Python, Machine Learning, PhD preferred, 3+ years experience",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=200&fit=crop",
      minGPA: 3.7,
      requiredSkills: ["Python", "Machine Learning", "Statistics"]
    },
    {
      id: 3,
      title: "Blockchain Developer",
      company: "CryptoStartup",
      location: "New York, NY",
      salary: "$90,000 - $140,000",
      type: "Full-time",
      requirements: "Solana, Rust, Smart Contracts, 1+ years experience",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=200&fit=crop",
      minGPA: 3.4,
      requiredSkills: ["Solana", "Rust", "Smart Contracts"]
    },
    {
      id: 4,
      title: "UI/UX Designer",
      company: "Design Studio Pro",
      location: "Los Angeles, CA",
      salary: "$70,000 - $100,000",
      type: "Full-time",
      requirements: "Figma, Adobe Creative Suite, Portfolio required, Bachelor's degree",
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=200&fit=crop",
      minGPA: 3.2,
      requiredSkills: ["Figma", "Adobe Creative Suite", "UI Design"]
    },
    {
      id: 5,
      title: "DevOps Engineer",
      company: "CloudTech Systems",
      location: "Austin, TX",
      salary: "$95,000 - $130,000",
      type: "Full-time",
      requirements: "AWS, Docker, Kubernetes, 3+ years experience",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=200&fit=crop",
      minGPA: 3.5,
      requiredSkills: ["AWS", "Docker", "Kubernetes"]
    },
    {
      id: 6,
      title: "Marketing Intern",
      company: "Growth Marketing Co",
      location: "Chicago, IL",
      salary: "$25,000 - $35,000",
      type: "Internship",
      requirements: "Marketing major, Social media skills, Creative mindset",
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=200&fit=crop",
      minGPA: 3.0,
      requiredSkills: ["Marketing", "Social Media", "Content Creation"]
    }
  ];

  const handleApplyNow = (jobId: number) => {
    localStorage.setItem('selectedJob', jobId.toString());
    navigate('/user');
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">
              Welcome to Vaultify
            </h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              A decentralized platform that securely verifies student documents against company requirements using AI, 
              with data stored on IPFS and powered by Solana blockchain technology.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => navigate('/user')}
                size="lg" 
                className="bg-white text-purple-600 hover:bg-gray-100"
              >
                Student Dashboard
              </Button>
              <Button 
                onClick={() => navigate('/company')}
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-purple-600"
              >
                Company Portal
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Job Listings Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Available Opportunities
          </h2>
          <p className="text-xl text-gray-600">
            Discover exciting career opportunities from top companies
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {jobVacancies.map((job) => (
            <Card key={job.id} className="hover:shadow-lg transition-shadow duration-300 overflow-hidden">
              <div className="h-48 overflow-hidden">
                <img 
                  src={job.image} 
                  alt={job.company}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900">
                  {job.title}
                </CardTitle>
                <div className="flex items-center gap-2 text-gray-600">
                  <Building2 className="w-4 h-4" />
                  <span className="font-medium">{job.company}</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <DollarSign className="w-4 h-4" />
                  <span>{job.salary}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Clock className="w-4 h-4" />
                  <Badge variant="secondary">{job.type}</Badge>
                </div>
                
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-700">Requirements:</p>
                  <p className="text-sm text-gray-600">{job.requirements}</p>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-700">Required Skills:</p>
                  <div className="flex flex-wrap gap-1">
                    {job.requiredSkills.map((skill, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="pt-4 space-y-2">
                  <Button 
                    onClick={() => handleApplyNow(job.id)}
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                  >
                    Apply Now
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => {
                      // Store job details for company verification
                      localStorage.setItem('jobForVerification', JSON.stringify(job));
                      navigate('/company');
                    }}
                  >
                    View for Verification
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
