import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, ArrowRight, FileText, Plus, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Sidebar } from "@/components/dashboard/Sidebar";

interface Question {
  id: string;
  text: string;
  type: 'text' | 'number' | 'boolean';
}

export default function Questionnaire() {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState<Question[]>([
    { id: '1', text: 'How many people attended from your organization?', type: 'number' },
    { id: '2', text: 'What was the primary method of transportation?', type: 'text' }
  ]);
  const [newQuestion, setNewQuestion] = useState('');

  const addQuestion = () => {
    if (newQuestion.trim()) {
      const question: Question = {
        id: Date.now().toString(),
        text: newQuestion,
        type: 'text'
      };
      setQuestions([...questions, question]);
      setNewQuestion('');
    }
  };

  const removeQuestion = (id: string) => {
    setQuestions(questions.filter(q => q.id !== id));
  };

  const handleSubmit = () => {
    console.log("Questionnaire data:", questions);
    navigate("/events");
  };

  return (
    <div className="min-h-screen bg-dashboard">
      <div className="flex">
        <Sidebar />
        
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary via-primary/90 to-primary/80 p-8 text-primary-foreground">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <FileText className="w-10 h-10" />
              </div>
              <div>
                <h1 className="text-3xl font-bold mb-2">Create Questionnaire</h1>
                <p className="text-lg text-primary-foreground/90">
                  Build a custom questionnaire to gather emission data from suppliers
                </p>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 p-8">
            <div className="max-w-4xl mx-auto space-y-8">
              {/* Event Info Card */}
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="text-2xl">Software Expo - HMRC</CardTitle>
                  <p className="text-lg text-muted-foreground">Manchester, UK • 100 Attendees</p>
                </CardHeader>
              </Card>

              {/* Questionnaire Builder */}
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-3">
                    <FileText className="w-8 h-8" />
                    Questionnaire Questions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Existing Questions */}
                  <div className="space-y-4">
                    {questions.map((question, index) => (
                      <div key={question.id} className="p-4 border rounded-lg bg-muted/30">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <Label className="text-lg font-medium">Question {index + 1}</Label>
                            <p className="text-base mt-1">{question.text}</p>
                            <span className="text-sm text-muted-foreground capitalize">Type: {question.type}</span>
                          </div>
                          <Button
                            onClick={() => removeQuestion(question.id)}
                            variant="outline"
                            size="sm"
                            className="text-destructive hover:bg-destructive hover:text-destructive-foreground"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Add New Question */}
                  <div className="space-y-4 p-4 border-2 border-dashed rounded-lg">
                    <Label className="text-lg font-medium">Add New Question</Label>
                    <Textarea
                      value={newQuestion}
                      onChange={(e) => setNewQuestion(e.target.value)}
                      placeholder="Enter your question here..."
                      className="text-lg min-h-[100px]"
                    />
                    <Button
                      onClick={addQuestion}
                      disabled={!newQuestion.trim()}
                      className="text-lg px-6 py-3 h-auto"
                    >
                      <Plus className="w-5 h-5 mr-2" />
                      ADD QUESTION
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Navigation */}
              <div className="flex justify-between">
                <Button
                  onClick={() => navigate(-1)}
                  variant="outline"
                  size="lg"
                  className="text-lg px-8 py-4 h-auto"
                >
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  BACK
                </Button>
                <Button
                  onClick={handleSubmit}
                  size="lg"
                  className="text-lg px-8 py-4 h-auto font-semibold"
                >
                  CREATE QUESTIONNAIRE
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
