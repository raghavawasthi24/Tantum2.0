import { Button } from "@/components/ui/button";
import {
  Step,
  StepItem,
  Stepper,
  useStepper,
} from "@/components/shared/stepper";
import { toast } from "@/components/ui/use-toast";
import SelectVehicle from "./selectVehicle";
import SelectSource from "./selectSource";
import SelectDestination from "./selectDestination";
import SelectRideDate from "./selectRideDate";

export default function StepperDemo({ form }: any) {
  const steps = [
    { label: "1", content: <SelectVehicle form={form} /> },
    { label: "2", content: <SelectSource form={form} /> },
    { label: "3", content: <SelectDestination form={form} /> },
    { label: "4", content: <SelectRideDate form={form} /> },
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
          return <Step key={stepProps.label}>{stepProps.content}</Step>;
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
              type="button"
            >
              Prev
            </Button>
            <Button size="sm" onClick={nextStep} type="button">
              {isLastStep ? "Finish" : isOptionalStep ? "Skip" : "Next"}
            </Button>
          </>
        )}
      </div>
    </>
  );
};
