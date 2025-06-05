
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useWallet } from '../context/WalletContext';
import { toast } from '@/hooks/use-toast';
import { Building2, Plus, Users, Eye } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const CompanyPanel = () => {
  const { connected, connectWallet } = useWallet();
  const [activeTab, setActiveTab] = useState('create');
  const [jobForm, setJobForm] = useState({
    title: '',
    company: '',
    location: '',
    salary: '',
    type: 'Full-time',
    requirements: '',
    minGPA: '',
    requiredSkills: ''
  });
  const [postedJobs, setPostedJobs] = useState<any[]>([]);
  const [selectedJobForVerification, setSelectedJobForVerification] = useState<any>(null);

  useEffect(() => {
    // Load any job selected for verification from the landing page
    const jobData = localStorage.getItem('jobForVerification');
    if (jobData) {
      setSelectedJobForVerification(JSON.parse(jobData));
      setActiveTab('verify');
      localStorage.removeItem('jobForVerification');
    }

    // Load posted jobs from localStorage (in real app, this would be from blockchain)
    const stored = localStorage.getItem('postedJobs');
    if (stored) {
      setPostedJobs(JSON.parse(stored));
    }
  }, []);

  const handleSubmitJob = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!connected) {
      toast({
        title: "Wallet Not Connected",
        description: "Please connect your wallet first",
        variant: "destructive",
      });
      return;
    }

    const newJob = {
      id: Date.now(),
      ...jobForm,
      requiredSkills: jobForm.requiredSkills.split(',').map(skill => skill.trim()),
      minGPA: parseFloat(jobForm.minGPA),
      postedDate: new Date().toISOString(),
      applications: 0
    };

    const updatedJobs = [...postedJobs, newJob];
    setPostedJobs(updatedJobs);
    localStorage.setItem('postedJobs', JSON.stringify(updatedJobs));

    toast({
      title: "Job Posted Successfully!",
      description: "Your job vacancy has been posted and is now visible to students",
    });

    // Clear form
    setJobForm({
      title: '',
      company: '',
      location: '',
      salary: '',
      type: 'Full-time',
      requirements: '',
      minGPA: '',
      requiredSkills: ''
    });
  };

  if (!connected) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle>Connect Your Wallet</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-gray-600">
              Please connect your wallet to access the company panel
            </p>
            <Button onClick={connectWallet} className="w-full">
              Connect Phantom Wallet
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Company Dashboard</h1>
          <p className="text-gray-600">Post job openings and verify candidate eligibility</p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg mb-8 w-fit">
          <Button
            variant={activeTab === 'create' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('create')}
            className="flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Create Job
          </Button>
          <Button
            variant={activeTab === 'manage' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('manage')}
            className="flex items-center gap-2"
          >
            <Building2 className="w-4 h-4" />
            Manage Jobs
          </Button>
          <Button
            variant={activeTab === 'verify' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('verify')}
            className="flex items-center gap-2"
          >
            <Eye className="w-4 h-4" />
            Verify Candidates
          </Button>
        </div>

        {/* Create Job Tab */}
        {activeTab === 'create' && (
          <Card>
            <CardHeader>
              <CardTitle>Post New Job Opening</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmitJob} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="title">Job Title</Label>
                    <Input
                      id="title"
                      value={jobForm.title}
                      onChange={(e) => setJobForm({...jobForm, title: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="company">Company Name</Label>
                    <Input
                      id="company"
                      value={jobForm.company}
                      onChange={(e) => setJobForm({...jobForm, company: e.target.value})}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={jobForm.location}
                      onChange={(e) => setJobForm({...jobForm, location: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="salary">Salary Range</Label>
                    <Input
                      id="salary"
                      value={jobForm.salary}
                      onChange={(e) => setJobForm({...jobForm, salary: e.target.value})}
                      placeholder="e.g., $80,000 - $120,000"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="type">Job Type</Label>
                    <select
                      id="type"
                      value={jobForm.type}
                      onChange={(e) => setJobForm({...jobForm, type: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Full-time">Full-time</option>
                      <option value="Part-time">Part-time</option>
                      <option value="Internship">Internship</option>
                      <option value="Contract">Contract</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="minGPA">Minimum GPA</Label>
                    <Input
                      id="minGPA"
                      type="number"
                      step="0.1"
                      min="0"
                      max="4"
                      value={jobForm.minGPA}
                      onChange={(e) => setJobForm({...jobForm, minGPA: e.target.value})}
                      placeholder="e.g., 3.5"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="requirements">Job Requirements</Label>
                  <Textarea
                    id="requirements"
                    value={jobForm.requirements}
                    onChange={(e) => setJobForm({...jobForm, requirements: e.target.value})}
                    placeholder="Describe the job requirements, experience needed, education, etc."
                    rows={4}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="requiredSkills">Required Skills (comma-separated)</Label>
                  <Input
                    id="requiredSkills"
                    value={jobForm.requiredSkills}
                    onChange={(e) => setJobForm({...jobForm, requiredSkills: e.target.value})}
                    placeholder="e.g., React, TypeScript, JavaScript, Node.js"
                    required
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                >
                  Post Job Opening
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Manage Jobs Tab */}
        {activeTab === 'manage' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Your Posted Jobs</h2>
              <Badge variant="secondary" className="text-lg px-3 py-1">
                {postedJobs.length} Jobs Posted
              </Badge>
            </div>

            {postedJobs.length === 0 ? (
              <Card>
                <CardContent className="text-center py-12">
                  <Building2 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No jobs posted yet. Create your first job opening!</p>
                  <Button 
                    onClick={() => setActiveTab('create')}
                    className="mt-4"
                  >
                    Post Your First Job
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {postedJobs.map((job) => (
                  <Card key={job.id}>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span>{job.title}</span>
                        <Badge variant="outline">{job.type}</Badge>
                      </CardTitle>
                      <p className="text-gray-600">{job.company}</p>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-sm text-gray-600">📍 {job.location}</p>
                      <p className="text-sm text-gray-600">💰 {job.salary}</p>
                      <p className="text-sm text-gray-600">📊 Min GPA: {job.minGPA}</p>
                      
                      <div className="space-y-2">
                        <p className="text-sm font-medium">Required Skills:</p>
                        <div className="flex flex-wrap gap-1">
                          {job.requiredSkills.map((skill: string, index: number) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 pt-2">
                        <Users className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-600">{job.applications} applications</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Verify Candidates Tab */}
        {activeTab === 'verify' && (
          <Card>
            <CardHeader>
              <CardTitle>Candidate Verification</CardTitle>
              <p className="text-gray-600">
                Enter a candidate's public key to verify their documents and eligibility
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              {selectedJobForVerification && (
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-medium text-blue-900 mb-2">
                    Verifying for: {selectedJobForVerification.title}
                  </h3>
                  <p className="text-blue-700 text-sm">
                    Company: {selectedJobForVerification.company}
                  </p>
                </div>
              )}

              <div>
                <Label htmlFor="candidateKey">Candidate Public Key</Label>
                <div className="flex gap-2">
                  <Input
                    id="candidateKey"
                    placeholder="Enter candidate's public key for document verification"
                    className="flex-1"
                  />
                  <Button 
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                  >
                    Verify Documents
                  </Button>
                </div>
              </div>

              <div className="bg-yellow-50 p-4 rounded-lg">
                <h3 className="font-medium text-yellow-900 mb-2">AI Verification Process</h3>
                <ul className="text-yellow-800 text-sm space-y-1">
                  <li>• Fetch documents from IPFS using the public key</li>
                  <li>• Validate document authenticity</li>
                  <li>• Extract and verify academic records</li>
                  <li>• Match skills and qualifications with job requirements</li>
                  <li>• Generate eligibility report</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default CompanyPanel;
