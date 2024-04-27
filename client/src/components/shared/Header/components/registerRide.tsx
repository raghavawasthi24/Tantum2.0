import { Button } from "@/components/ui/button";
import {
  Step,
  StepItem,
  Stepper,
  useStepper,
} from "@/components/shared/stepper";
import { toast } from "@/components/ui/use-toast";
import SelectVehicle from "./selectVehicle";

export default function StepperDemo() {
  const steps = [
    { label: "1", content: <SelectVehicle /> },
    { label: "2", content: <SelectVehicle /> },
    { label: "3", content: <SelectVehicle /> },
  ];
  return (
    <div className="flex w-full flex-col gap-4">
      <Stepper
        initialStep={0}
        steps={steps}
        onClickStep={(step, setStep) => {
          toast({
            title: "Step clicked",
            description:
              "This event is executed globally for all steps. If you want to have an event for a specific step, use the `onClickStep` prop of the independent step.",
          });
          setStep(step);
        }}
      >
        {steps.map((stepProps, index) => {
          return (
            <Step key={stepProps.label}>
              {stepProps.content}
            </Step>
          );
        })}
        <Footer />
      </Stepper>
    </div>
  );
}

const Footer = () => {
  const {
    nextStep,
    prevStep,
    resetSteps,
    isDisabledStep,
    hasCompletedAllSteps,
    isLastStep,
    isOptionalStep,
  } = useStepper();
  return (
    <>
      {hasCompletedAllSteps && (
        <div className="h-40 flex items-center justify-center my-2 border bg-secondary text-primary rounded-md">
          <h1 className="text-xl">Woohoo! All steps completed! 🎉</h1>
        </div>
      )}
      <div className="w-full flex justify-end gap-2">
        {hasCompletedAllSteps ? (
          <Button size="sm" onClick={resetSteps}>
            Reset
          </Button>
        ) : (
          <>
            <Button
              disabled={isDisabledStep}
              onClick={prevStep}
              size="sm"
              variant="secondary"
            >
              Prev
            </Button>
            <Button size="sm" onClick={nextStep}>
              {isLastStep ? "Finish" : isOptionalStep ? "Skip" : "Next"}
            </Button>
          </>
        )}
      </div>
    </>
  );
};
