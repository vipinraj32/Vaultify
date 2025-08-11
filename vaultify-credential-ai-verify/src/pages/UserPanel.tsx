
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useWallet } from '../context/WalletContext';
import { toast } from '@/hooks/use-toast';
import { Upload, Check, FileText } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const UserPanel = () => {
  const { connected, connectWallet } = useWallet();
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [applicationForm, setApplicationForm] = useState({
    name: '',
    mobile: '',
    email: '',
    publicKey: ''
  });
  const [documents, setDocuments] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedToIPFS, setUploadedToIPFS] = useState(false);
  const [eligibilityStatus, setEligibilityStatus] = useState<'pending' | 'eligible' | 'not-eligible' | null>(null);

  useEffect(() => {
    const jobId = localStorage.getItem('selectedJob');
    if (jobId) {
      // In a real app, you'd fetch job details from an API
      const jobVacancies = [
        {
          id: 1,
          title: "Frontend Developer",
          company: "TechCorp Solutions",
          requirements: "React, TypeScript, 2+ years experience, Bachelor's degree in CS",
          minGPA: 3.5,
          requiredSkills: ["React", "TypeScript", "JavaScript"]
        },
        {
          id: 2,
          title: "Data Scientist",
          company: "AI Innovations Inc",
          requirements: "Python, Machine Learning, PhD preferred, 3+ years experience",
          minGPA: 3.7,
          requiredSkills: ["Python", "Machine Learning", "Statistics"]
        },
        {
          id: 3,
          title: "Blockchain Developer",
          company: "CryptoStartup",
          requirements: "Solana, Rust, Smart Contracts, 1+ years experience",
          minGPA: 3.4,
          requiredSkills: ["Solana", "Rust", "Smart Contracts"]
        }
      ];
      const job = jobVacancies.find(j => j.id === parseInt(jobId));
      setSelectedJob(job);
    }
  }, []);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setDocuments(files);
    
    if (files.length > 0) {
      setIsUploading(true);
      
      // Simulate IPFS upload
      setTimeout(() => {
        setIsUploading(false);
        setUploadedToIPFS(true);
        toast({
          title: "Documents Uploaded",
          description: `${files.length} documents uploaded to IPFS successfully`,
        });
      }, 2000);
    }
  };

  const checkEligibility = async () => {
    if (!applicationForm.publicKey) {
      toast({
        title: "Public Key Required",
        description: "Please enter your public key to check eligibility",
        variant: "destructive",
      });
      return;
    }

    setEligibilityStatus('pending');
    
    // Simulate AI verification process
    setTimeout(() => {
      // Random eligibility for demo purposes
      const isEligible = Math.random() > 0.3;
      setEligibilityStatus(isEligible ? 'eligible' : 'not-eligible');
      
      toast({
        title: isEligible ? "Eligible!" : "Not Eligible",
        description: isEligible 
          ? "Your documents match the job requirements" 
          : "Your documents don't meet all the job requirements",
        variant: isEligible ? "default" : "destructive",
      });
    }, 3000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!connected) {
      toast({
        title: "Wallet Not Connected",
        description: "Please connect your wallet first",
        variant: "destructive",
      });
      return;
    }

    if (!uploadedToIPFS) {
      toast({
        title: "Documents Required",
        description: "Please upload your documents first",
        variant: "destructive",
      });
      return;
    }

    if (eligibilityStatus !== 'eligible') {
      toast({
        title: "Eligibility Check Required",
        description: "Please check your eligibility first",
        variant: "destructive",
      });
      return;
    }

    // Simulate application submission
    toast({
      title: "Application Submitted!",
      description: "Your application has been submitted successfully",
    });

    // Clear form
    setApplicationForm({ name: '', mobile: '', email: '', publicKey: '' });
    setDocuments([]);
    setUploadedToIPFS(false);
    setEligibilityStatus(null);
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
              Please connect your Phantom wallet to access the student panel
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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Student Dashboard</h1>
          <p className="text-gray-600">Upload documents, apply for jobs, and verify your eligibility</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Document Upload Section */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="w-5 h-5" />
                Upload Documents to IPFS
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="documents">Academic Records & Certificates</Label>
                <Input
                  id="documents"
                  type="file"
                  multiple
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleFileUpload}
                  className="mt-1"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Upload transcripts, certificates, IDs, etc.
                </p>
              </div>

              {isUploading && (
                <div className="flex items-center gap-2 text-blue-600">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                  <span className="text-sm">Uploading to IPFS...</span>
                </div>
              )}

              {uploadedToIPFS && (
                <div className="flex items-center gap-2 text-green-600">
                  <Check className="w-4 h-4" />
                  <span className="text-sm">Documents uploaded successfully</span>
                </div>
              )}

              {documents.length > 0 && (
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Uploaded Files:</Label>
                  {documents.map((file, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <FileText className="w-4 h-4 text-gray-500" />
                      <span className="truncate">{file.name}</span>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Application Form */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>
                {selectedJob ? `Apply for ${selectedJob.title}` : 'Job Application'}
              </CardTitle>
              {selectedJob && (
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">Company: {selectedJob.company}</p>
                  <p className="text-sm text-gray-600">Requirements: {selectedJob.requirements}</p>
                  <div className="flex flex-wrap gap-1">
                    {selectedJob.requiredSkills?.map((skill: string, index: number) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={applicationForm.name}
                      onChange={(e) => setApplicationForm({...applicationForm, name: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="mobile">Mobile Number</Label>
                    <Input
                      id="mobile"
                      type="tel"
                      value={applicationForm.mobile}
                      onChange={(e) => setApplicationForm({...applicationForm, mobile: e.target.value})}
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={applicationForm.email}
                    onChange={(e) => setApplicationForm({...applicationForm, email: e.target.value})}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="publicKey">Public Key</Label>
                  <div className="flex gap-2">
                    <Input
                      id="publicKey"
                      value={applicationForm.publicKey}
                      onChange={(e) => setApplicationForm({...applicationForm, publicKey: e.target.value})}
                      placeholder="Enter your document verification public key"
                      required
                    />
                    <Button 
                      type="button"
                      onClick={checkEligibility}
                      disabled={!applicationForm.publicKey || eligibilityStatus === 'pending'}
                      className="whitespace-nowrap"
                    >
                      {eligibilityStatus === 'pending' ? (
                        <div className="flex items-center gap-2">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                          Checking...
                        </div>
                      ) : (
                        'Check Eligible'
                      )}
                    </Button>
                  </div>
                  
                  {eligibilityStatus && eligibilityStatus !== 'pending' && (
                    <div className={`mt-2 p-2 rounded-md text-sm ${
                      eligibilityStatus === 'eligible' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {eligibilityStatus === 'eligible' 
                        ? 'You are eligible for this position!' 
                        : 'You do not meet the requirements for this position.'}
                    </div>
                  )}
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                  disabled={!uploadedToIPFS || eligibilityStatus !== 'eligible'}
                >
                  Submit Application
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UserPanel;
