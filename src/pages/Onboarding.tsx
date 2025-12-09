import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Building2, Plane, Users, CreditCard, UserCog, Check } from "lucide-react";

type CompanyType = "events" | "tmc" | "corporate" | "";
type PaymentMethod = "invoice" | "credit-card" | "";
type UserRole = "billing_manager" | "account_owner" | "user" | "";

interface OnboardingData {
  companyType: CompanyType;
  annualTurnover: string;
  businessTravelSpend: string;
  customerTravelSpend: string;
  numberOfEvents: string;
  numberOfAttendees: string;
  paymentMethod: PaymentMethod;
  users: Array<{ email: string; role: UserRole }>;
}

const Onboarding = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<OnboardingData>({
    companyType: "",
    annualTurnover: "",
    businessTravelSpend: "",
    customerTravelSpend: "",
    numberOfEvents: "",
    numberOfAttendees: "",
    paymentMethod: "",
    users: [{ email: "", role: "" }],
  });

  const totalSteps = 4;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      // Complete onboarding
      console.log("Onboarding complete:", formData);
      navigate("/");
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleCompanyTypeChange = (value: CompanyType) => {
    setFormData(prev => ({ ...prev, companyType: value }));
  };

  const handleInputChange = (field: keyof OnboardingData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleUserChange = (index: number, field: "email" | "role", value: string) => {
    const newUsers = [...formData.users];
    newUsers[index] = { ...newUsers[index], [field]: value };
    setFormData(prev => ({ ...prev, users: newUsers }));
  };

  const addUser = () => {
    setFormData(prev => ({
      ...prev,
      users: [...prev.users, { email: "", role: "" }],
    }));
  };

  const removeUser = (index: number) => {
    if (formData.users.length > 1) {
      const newUsers = formData.users.filter((_, i) => i !== index);
      setFormData(prev => ({ ...prev, users: newUsers }));
    }
  };

  const getAccountSize = (): "small" | "medium" | "large" => {
    const { companyType, annualTurnover, customerTravelSpend, numberOfAttendees } = formData;
    
    if (companyType === "corporate") {
      const turnover = parseFloat(annualTurnover) || 0;
      if (turnover > 10000000) return "large";
      if (turnover > 1000000) return "medium";
      return "small";
    }
    if (companyType === "tmc") {
      const spend = parseFloat(customerTravelSpend) || 0;
      if (spend > 50000000) return "large";
      if (spend > 5000000) return "medium";
      return "small";
    }
    if (companyType === "events") {
      const attendees = parseFloat(numberOfAttendees) || 0;
      if (attendees > 10000) return "large";
      if (attendees > 1000) return "medium";
      return "small";
    }
    return "small";
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center gap-2 mb-8">
      {Array.from({ length: totalSteps }).map((_, index) => (
        <div key={index} className="flex items-center">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
              index + 1 < currentStep
                ? "bg-primary text-primary-foreground"
                : index + 1 === currentStep
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground"
            }`}
          >
            {index + 1 < currentStep ? <Check className="w-5 h-5" /> : index + 1}
          </div>
          {index < totalSteps - 1 && (
            <div
              className={`w-16 h-1 mx-2 rounded ${
                index + 1 < currentStep ? "bg-primary" : "bg-muted"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-2">Select your company type</h2>
        <p className="text-muted-foreground">This helps us customize your experience</p>
      </div>

      <RadioGroup
        value={formData.companyType}
        onValueChange={(value) => handleCompanyTypeChange(value as CompanyType)}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        <Label
          htmlFor="events"
          className={`cursor-pointer ${
            formData.companyType === "events" ? "ring-2 ring-primary" : ""
          }`}
        >
          <Card className="h-full hover:border-primary transition-colors">
            <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">Event / Meeting Company</h3>
                <p className="text-sm text-muted-foreground">
                  Manage events, conferences, and meetings
                </p>
              </div>
              <RadioGroupItem value="events" id="events" className="sr-only" />
            </CardContent>
          </Card>
        </Label>

        <Label
          htmlFor="tmc"
          className={`cursor-pointer ${
            formData.companyType === "tmc" ? "ring-2 ring-primary" : ""
          }`}
        >
          <Card className="h-full hover:border-primary transition-colors">
            <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <Plane className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">Travel Management Company</h3>
                <p className="text-sm text-muted-foreground">
                  Manage corporate travel for clients
                </p>
              </div>
              <RadioGroupItem value="tmc" id="tmc" className="sr-only" />
            </CardContent>
          </Card>
        </Label>

        <Label
          htmlFor="corporate"
          className={`cursor-pointer ${
            formData.companyType === "corporate" ? "ring-2 ring-primary" : ""
          }`}
        >
          <Card className="h-full hover:border-primary transition-colors">
            <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <Building2 className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">Corporate</h3>
                <p className="text-sm text-muted-foreground">
                  Track and offset your company's travel
                </p>
              </div>
              <RadioGroupItem value="corporate" id="corporate" className="sr-only" />
            </CardContent>
          </Card>
        </Label>
      </RadioGroup>
    </div>
  );

  const renderStep2 = () => {
    if (formData.companyType === "corporate") {
      return (
        <div className="space-y-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-2">Tell us about your business</h2>
            <p className="text-muted-foreground">This helps us provide accurate estimates</p>
          </div>

          <div className="max-w-md mx-auto space-y-6">
            <div className="space-y-3">
              <Label htmlFor="annualTurnover" className="text-lg font-semibold text-foreground">
                Annual Turnover
              </Label>
              <Input
                id="annualTurnover"
                type="number"
                placeholder="Enter annual turnover (USD)"
                value={formData.annualTurnover}
                onChange={(e) => handleInputChange("annualTurnover", e.target.value)}
                className="h-12 text-base"
              />
            </div>

            <div className="space-y-3">
              <Label htmlFor="businessTravelSpend" className="text-lg font-semibold text-foreground">
                Business Travel Spend
              </Label>
              <Input
                id="businessTravelSpend"
                type="number"
                placeholder="Enter annual business travel spend (USD)"
                value={formData.businessTravelSpend}
                onChange={(e) => handleInputChange("businessTravelSpend", e.target.value)}
                className="h-12 text-base"
              />
            </div>
          </div>
        </div>
      );
    }

    if (formData.companyType === "tmc") {
      return (
        <div className="space-y-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-2">Tell us about your business</h2>
            <p className="text-muted-foreground">This helps us provide accurate estimates</p>
          </div>

          <div className="max-w-md mx-auto space-y-6">
            <div className="space-y-3">
              <Label htmlFor="customerTravelSpend" className="text-lg font-semibold text-foreground">
                Total Customer Travel Spend
              </Label>
              <Input
                id="customerTravelSpend"
                type="number"
                placeholder="Enter total customer travel spend (USD)"
                value={formData.customerTravelSpend}
                onChange={(e) => handleInputChange("customerTravelSpend", e.target.value)}
                className="h-12 text-base"
              />
            </div>
          </div>
        </div>
      );
    }

    if (formData.companyType === "events") {
      return (
        <div className="space-y-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-2">Tell us about your events</h2>
            <p className="text-muted-foreground">This helps us provide accurate estimates</p>
          </div>

          <div className="max-w-md mx-auto space-y-6">
            <div className="space-y-3">
              <Label htmlFor="numberOfEvents" className="text-lg font-semibold text-foreground">
                Number of Events Annually
              </Label>
              <Input
                id="numberOfEvents"
                type="number"
                placeholder="Enter number of events per year"
                value={formData.numberOfEvents}
                onChange={(e) => handleInputChange("numberOfEvents", e.target.value)}
                className="h-12 text-base"
              />
            </div>

            <div className="space-y-3">
              <Label htmlFor="numberOfAttendees" className="text-lg font-semibold text-foreground">
                Total Attendees Annually
              </Label>
              <Input
                id="numberOfAttendees"
                type="number"
                placeholder="Enter total attendees per year"
                value={formData.numberOfAttendees}
                onChange={(e) => handleInputChange("numberOfAttendees", e.target.value)}
                className="h-12 text-base"
              />
            </div>
          </div>
        </div>
      );
    }

    return null;
  };

  const renderStep3 = () => {
    const accountSize = getAccountSize();

    return (
      <div className="space-y-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-2">Billing & Payment Preferences</h2>
          <p className="text-muted-foreground">
            Based on your account size, choose your preferred payment method
          </p>
        </div>

        <RadioGroup
          value={formData.paymentMethod}
          onValueChange={(value) => handleInputChange("paymentMethod", value)}
          className="max-w-lg mx-auto space-y-4"
        >
          <Label
            htmlFor="invoice"
            className={`cursor-pointer block ${
              formData.paymentMethod === "invoice" ? "ring-2 ring-primary rounded-xl" : ""
            }`}
          >
            <Card className="hover:border-primary transition-colors">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Building2 className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">Monthly Invoice</h3>
                  <p className="text-sm text-muted-foreground">
                    Receive a monthly invoice with NET 30 payment terms
                  </p>
                </div>
                <RadioGroupItem value="invoice" id="invoice" />
              </CardContent>
            </Card>
          </Label>

          <Label
            htmlFor="credit-card"
            className={`cursor-pointer block ${
              formData.paymentMethod === "credit-card" ? "ring-2 ring-primary rounded-xl" : ""
            }`}
          >
            <Card className="hover:border-primary transition-colors">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <CreditCard className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">Monthly Credit Card Payment</h3>
                  <p className="text-sm text-muted-foreground">
                    Pay automatically each month via credit card
                  </p>
                </div>
                <RadioGroupItem value="credit-card" id="credit-card" />
              </CardContent>
            </Card>
          </Label>
        </RadioGroup>

        {accountSize === "large" && (
          <div className="max-w-lg mx-auto mt-6 p-4 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground text-center">
              As a large account, you may qualify for custom payment terms. Contact our sales team for more details.
            </p>
          </div>
        )}
      </div>
    );
  };

  const renderStep4 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-2">Account Management</h2>
        <p className="text-muted-foreground">Add team members and assign roles</p>
      </div>

      <div className="max-w-2xl mx-auto space-y-4">
        {formData.users.map((user, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <UserCog className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    type="email"
                    placeholder="Email address"
                    value={user.email}
                    onChange={(e) => handleUserChange(index, "email", e.target.value)}
                    className="h-10"
                  />
                  <Select
                    value={user.role}
                    onValueChange={(value) => handleUserChange(index, "role", value)}
                  >
                    <SelectTrigger className="h-10">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="account_owner">Account Owner</SelectItem>
                      <SelectItem value="billing_manager">Billing Manager</SelectItem>
                      <SelectItem value="user">User</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {formData.users.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeUser(index)}
                    className="text-destructive hover:text-destructive"
                  >
                    Remove
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}

        <Button
          type="button"
          variant="outline"
          onClick={addUser}
          className="w-full"
        >
          + Add Another User
        </Button>
      </div>
    </div>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return renderStep1();
      case 2:
        return renderStep2();
      case 3:
        return renderStep3();
      case 4:
        return renderStep4();
      default:
        return null;
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return !!formData.companyType;
      case 2:
        if (formData.companyType === "corporate") {
          return !!(formData.annualTurnover || formData.businessTravelSpend);
        }
        if (formData.companyType === "tmc") {
          return !!formData.customerTravelSpend;
        }
        if (formData.companyType === "events") {
          return !!(formData.numberOfEvents || formData.numberOfAttendees);
        }
        return false;
      case 3:
        return !!formData.paymentMethod;
      case 4:
        return formData.users.some(u => u.email && u.role);
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="bg-metric-card rounded-xl shadow-card border border-border overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary via-primary/90 to-primary/80 p-8 text-primary-foreground">
            <div className="text-center">
              <h1 className="text-4xl font-bold mb-2">WELCOME TO ZEERO</h1>
              <p className="text-xl opacity-90">
                Let's set up your account in a few simple steps
              </p>
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            {renderStepIndicator()}
            {renderCurrentStep()}

            {/* Navigation */}
            <div className="flex justify-between mt-12 pt-8 border-t border-border">
              <Button
                type="button"
                variant="outline"
                onClick={handleBack}
                disabled={currentStep === 1}
                className="px-8 py-3 text-base font-medium h-auto uppercase tracking-wide"
                size="lg"
              >
                BACK
              </Button>
              <Button
                type="button"
                onClick={handleNext}
                disabled={!canProceed()}
                className="px-8 py-3 text-base font-semibold h-auto uppercase tracking-wide"
                size="lg"
              >
                {currentStep === totalSteps ? "COMPLETE SETUP" : "CONTINUE"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
