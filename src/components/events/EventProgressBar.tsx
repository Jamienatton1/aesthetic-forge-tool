import { ArrowRight, Check } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface EventProgressBarProps {
  currentStep: number;
  completedSteps?: number[];
}

const EventProgressBar = ({ currentStep, completedSteps = [] }: EventProgressBarProps) => {
  const steps = [
    { id: 1, label: "Event Details" },
    { id: 2, label: "Select Emission Categories" },
    { id: 3, label: "Enter Suppliers" },
    { id: 4, label: "Provide Emissions Data" },
    { id: 5, label: "Generate Report" }
  ];

  const progressValue = (completedSteps.length / steps.length) * 100;

  const getStepStatus = (stepId: number) => {
    if (completedSteps.includes(stepId)) return "completed";
    if (stepId === currentStep) return "current";
    return "future";
  };

  const getStepClasses = (status: string) => {
    switch (status) {
      case "completed":
        return "text-accent";
      case "current":
        return "text-foreground";
      default:
        return "text-muted-foreground";
    }
  };

  const renderStepIndicator = (stepId: number, status: string) => {
    if (status === "completed") {
      return <Check className="w-4 h-4" />;
    }
    if (status === "current") {
      return (
        <div className="w-4 h-4 rounded-full border-2 border-primary flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-primary"></div>
        </div>
      );
    }
    return <div className="w-4 h-4 rounded-full border-2 border-muted-foreground/30"></div>;
  };

  return (
    <div className="bg-background border-b border-border px-8 py-6">
      <div className="flex items-center justify-between text-sm">
        {steps.map((step, index) => {
          const status = getStepStatus(step.id);
          return (
            <div key={step.id} className="flex items-center">
              <div className={`flex items-center gap-2 ${getStepClasses(status)}`}>
                {renderStepIndicator(step.id, status)}
                <span className="font-medium">{`Step ${step.id}: ${step.label}`}</span>
              </div>
              {index < steps.length - 1 && (
                <ArrowRight className="w-4 h-4 text-muted-foreground mx-4" />
              )}
            </div>
          );
        })}
      </div>
      <Progress value={progressValue} className="mt-3" />
    </div>
  );
};

export { EventProgressBar };