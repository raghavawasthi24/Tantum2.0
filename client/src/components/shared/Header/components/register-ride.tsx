import { Button } from "@/components/ui/button";
import {
  Step,
  Stepper,
  useStepper,
} from "@/components/shared/stepper";
import { toast } from "@/components/ui/use-toast";
import SelectVehicle from "./select-vehicle";
import SelectPerson from "./select-persons";
import { GrFormPreviousLink } from "react-icons/gr";
import SelectPickDrop from "./select-pick-drop";
import ScheduleRide from "./schedule-ride";
import { FaArrowAltCircleRight } from "react-icons/fa";

export default function RegisterRide({ form }: any) {
  const steps = [
    { label: "1", content: <SelectPickDrop form={form} /> },
    { label: "2", content: <ScheduleRide form={form} /> },
    { label: "3", content: <SelectVehicle form={form} /> },
    { label: "4", content: <SelectPerson form={form} /> },
  ];
  
  return (
    <div className="w-full flex flex-col gap-4 px-4">
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
      <div className="w-full flex justify-between gap-2">
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
              variant="ghost"
              type="button"
            >
              <GrFormPreviousLink className="w-4 h-4 mr-2" />
              Back
            </Button>
            <Button size="sm" onClick={nextStep} type="submit">
              {isLastStep ? "Post Ride" : isOptionalStep ? "Skip" : "Next"}
              {isLastStep?<FaArrowAltCircleRight className="w-4 h-4 ml-2" />:null}
            </Button>
          </>
        )}
      </div>
    </>
  );
};
