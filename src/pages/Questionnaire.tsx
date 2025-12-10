import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight, FileText, Plus, Trash2, Settings, Eye, Palette, Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { EventsHeader } from "@/components/events/EventsHeader";

interface Question {
  id: string;
  text: string;
  type: 'text' | 'number' | 'boolean' | 'multiple-choice' | 'rating' | 'date';
  options?: string[];
  required: boolean;
}

interface QuestionnaireSettings {
  title: string;
  description: string;
  backgroundColor: string;
  logoUrl?: string;
  showProgress: boolean;
  excludeFromEmissionsReport: boolean;
}

export default function Questionnaire() {
  const navigate = useNavigate();
  const [settings, setSettings] = useState<QuestionnaireSettings>({
    title: 'Attendee Environmental Impact Questionnaire',
    description: 'Help us understand your environmental impact for this event by answering a few questions.',
    backgroundColor: 'default',
    showProgress: true,
    excludeFromEmissionsReport: false
  });
  
  const [questions, setQuestions] = useState<Question[]>([
    { id: '1', text: 'How many people attended from your organisation?', type: 'number', required: true },
    { id: '2', text: 'What was the primary method of transportation?', type: 'multiple-choice', options: ['Car', 'Train', 'Bus', 'Flight', 'Walking/Cycling'], required: true },
    { id: '3', text: 'How would you rate the sustainability of this event?', type: 'rating', required: false }
  ]);
  
  const [newQuestion, setNewQuestion] = useState('');
  const [newQuestionType, setNewQuestionType] = useState<Question['type']>('text');
  const [activeTab, setActiveTab] = useState('settings');

  const addQuestion = () => {
    if (newQuestion.trim()) {
      const question: Question = {
        id: Date.now().toString(),
        text: newQuestion,
        type: newQuestionType,
        required: false,
        options: newQuestionType === 'multiple-choice' ? ['Option 1', 'Option 2'] : undefined
      };
      setQuestions([...questions, question]);
      setNewQuestion('');
      setNewQuestionType('text');
    }
  };

  const removeQuestion = (id: string) => {
    setQuestions(questions.filter(q => q.id !== id));
  };

  const updateQuestion = (id: string, field: keyof Question, value: any) => {
    setQuestions(questions.map(q => 
      q.id === id ? { ...q, [field]: value } : q
    ));
  };

  const addOption = (questionId: string) => {
    setQuestions(questions.map(q => 
      q.id === questionId && q.options 
        ? { ...q, options: [...q.options, `Option ${q.options.length + 1}`] }
        : q
    ));
  };

  const removeOption = (questionId: string, optionIndex: number) => {
    setQuestions(questions.map(q => 
      q.id === questionId && q.options 
        ? { ...q, options: q.options.filter((_, i) => i !== optionIndex) }
        : q
    ));
  };

  const updateSettings = (field: keyof QuestionnaireSettings, value: any) => {
    setSettings(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    console.log("Questionnaire data:", { settings, questions });
    navigate("/events");
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <EventsHeader 
          title="Create Questionnaire" 
          subtitle="Build a custom questionnaire to gather emission data from attendees" 
        />
        
        <main className="flex-1 overflow-auto p-8">
          <div className="bg-metric-card rounded-xl shadow-card border border-border overflow-hidden">
            {/* Integrated Header */}
            <div className="bg-gradient-to-r from-primary via-primary/90 to-primary/80 p-8 text-primary-foreground">
              <h1 className="text-4xl font-bold mb-2">QUESTIONNAIRE BUILDER</h1>
              <p className="text-xl opacity-90">
                Event: Software Expo - HMRC • Manchester, UK • 100 Attendees
              </p>
            </div>

            {/* Main Content */}
            <div className="p-8">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="settings" className="flex items-center gap-2">
                    <Settings className="w-4 h-4" />
                    Settings
                  </TabsTrigger>
                  <TabsTrigger value="questions" className="flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Questions
                  </TabsTrigger>
                  <TabsTrigger value="preview" className="flex items-center gap-2">
                    <Eye className="w-4 h-4" />
                    Preview
                  </TabsTrigger>
                </TabsList>

                {/* Settings Tab */}
                <TabsContent value="settings" className="space-y-6">
                  <div className="space-y-6">
                    <div className="flex items-center gap-2 mb-6">
                      <Settings className="w-5 h-5" />
                      <h2 className="text-xl font-semibold">Questionnaire Settings</h2>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label>Title</Label>
                        <Input
                          value={settings.title}
                          onChange={(e) => updateSettings('title', e.target.value)}
                          placeholder="Enter questionnaire title"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Background Theme</Label>
                        <Select value={settings.backgroundColor} onValueChange={(value) => updateSettings('backgroundColor', value)}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="default">Default</SelectItem>
                            <SelectItem value="green">Green</SelectItem>
                            <SelectItem value="blue">Blue</SelectItem>
                            <SelectItem value="purple">Purple</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Description</Label>
                      <Textarea
                        value={settings.description}
                        onChange={(e) => updateSettings('description', e.target.value)}
                        placeholder="Enter questionnaire description"
                        className="min-h-[100px]"
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-2">
                        <Label>Show Progress Bar</Label>
                        <p className="text-sm text-muted-foreground">Display progress to users as they complete the questionnaire</p>
                      </div>
                      <Switch
                        checked={settings.showProgress}
                        onCheckedChange={(checked) => updateSettings('showProgress', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-2">
                        <Label>Exclude from Final Emissions Report</Label>
                        <p className="text-sm text-muted-foreground">Exclude all collected questionnaire data from the final emissions report</p>
                      </div>
                      <Switch
                        checked={settings.excludeFromEmissionsReport}
                        onCheckedChange={(checked) => updateSettings('excludeFromEmissionsReport', checked)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Logo Upload</Label>
                      <div className="border-2 border-dashed rounded-lg p-6 text-center">
                        <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">Click to upload your organisation's logo</p>
                        <Button variant="outline" size="sm" className="mt-2">
                          Choose File
                        </Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                {/* Questions Tab */}
                <TabsContent value="questions" className="space-y-6">
                  <div className="space-y-6">
                    <div className="flex items-center gap-2 mb-6">
                      <FileText className="w-5 h-5" />
                      <h2 className="text-xl font-semibold">Questions ({questions.length})</h2>
                    </div>
                    
                    {/* Existing Questions */}
                    <div className="space-y-4">
                      {questions.map((question, index) => (
                        <Card key={question.id} className="border-l-4 border-primary/20">
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between gap-4 mb-4">
                              <div className="flex items-center gap-2">
                                <Badge variant="secondary">Q{index + 1}</Badge>
                                <Badge variant={question.required ? "default" : "outline"}>
                                  {question.required ? 'Required' : 'Optional'}
                                </Badge>
                              </div>
                            </div>

                            <div className="space-y-4">
                              <div className="space-y-2">
                                <Label>Question</Label>
                                <div className="p-3 bg-muted rounded-md">
                                  <p className="text-foreground">{question.text}</p>
                                </div>
                              </div>
                              
                              <div className="space-y-2">
                                <Label>Type</Label>
                                <div className="p-3 bg-muted rounded-md">
                                  <p className="text-foreground capitalize">{question.type.replace('-', ' ')}</p>
                                </div>
                              </div>

                              {question.type === 'multiple-choice' && question.options && (
                                <div className="space-y-2">
                                  <Label>Options</Label>
                                  <div className="space-y-1">
                                    {question.options.map((option, optionIndex) => (
                                      <div key={optionIndex} className="p-2 bg-muted rounded-md">
                                        <p className="text-foreground text-sm">{option}</p>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                {/* Preview Tab */}
                <TabsContent value="preview" className="space-y-6">
                  <div className="space-y-6">
                    <div className="flex items-center gap-2 mb-6">
                      <Eye className="w-5 h-5" />
                      <h2 className="text-xl font-semibold">Preview</h2>
                    </div>
                    
                    <div className={`p-6 rounded-lg ${
                      settings.backgroundColor === 'green' ? 'bg-green-50' :
                      settings.backgroundColor === 'blue' ? 'bg-blue-50' :
                      settings.backgroundColor === 'purple' ? 'bg-purple-50' :
                      'bg-muted/30'
                    }`}>
                      <div className="max-w-2xl mx-auto space-y-6">
                        <div className="text-center space-y-2">
                          <h2 className="text-2xl font-bold">{settings.title}</h2>
                          <p className="text-muted-foreground">{settings.description}</p>
                          {settings.showProgress && (
                            <div className="w-full bg-background rounded-full h-2 mt-4">
                              <div className="bg-primary h-2 rounded-full w-0"></div>
                            </div>
                          )}
                        </div>
                        
                        <div className="space-y-4">
                          {questions.map((question, index) => (
                            <div key={question.id} className="bg-background p-4 rounded-lg">
                              <div className="flex items-center gap-2 mb-2">
                                <span className="text-sm font-medium">Question {index + 1}</span>
                                {question.required && <Badge variant="secondary" className="text-xs">Required</Badge>}
                              </div>
                              <p className="mb-3">{question.text}</p>
                              
                              {question.type === 'text' && (
                                <Input placeholder="Your answer..." disabled />
                              )}
                              {question.type === 'number' && (
                                <Input type="number" placeholder="Enter number..." disabled />
                              )}
                              {question.type === 'multiple-choice' && question.options && (
                                <div className="space-y-2">
                                  {question.options.map((option, optionIndex) => (
                                    <div key={optionIndex} className="flex items-center gap-2">
                                      <input type="radio" disabled />
                                      <span className="text-sm">{option}</span>
                                    </div>
                                  ))}
                                </div>
                              )}
                              {question.type === 'rating' && (
                                <div className="flex items-center gap-1">
                                  {[1, 2, 3, 4, 5].map((star) => (
                                    <div key={star} className="w-6 h-6 border rounded text-center text-sm">☆</div>
                                  ))}
                                </div>
                              )}
                              {question.type === 'boolean' && (
                                <div className="space-y-2">
                                  <div className="flex items-center gap-2">
                                    <input type="radio" disabled />
                                    <span className="text-sm">Yes</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <input type="radio" disabled />
                                    <span className="text-sm">No</span>
                                  </div>
                                </div>
                              )}
                              {question.type === 'date' && (
                                <Input type="date" disabled />
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              {/* Navigation */}
              <div className="flex justify-between gap-4 mt-12 pt-8 border-t border-border">
                <Button
                  onClick={() => navigate(-1)}
                  variant="outline"
                  className="px-8 py-3 text-base font-medium h-auto uppercase tracking-wide"
                >
                  BACK
                </Button>
                <Button
                  onClick={handleSubmit}
                  className="px-8 py-3 text-base font-semibold h-auto uppercase tracking-wide"
                >
                  CREATE QUESTIONNAIRE
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
