import { Button } from "@/components/ui/button";
import { Step, Stepper, useStepper } from "@/components/shared/stepper";
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
    <div className="w-full flex flex-col gap-4 p-4 border">
      <Stepper
        initialStep={0}
        steps={steps}
        onClickStep={(step, setStep) => {
          setStep(step);
        }}
      >
        {steps.map((stepProps) => {
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
    isDisabledStep,
    isLastStep,
  } = useStepper();
  return (
    <>
      <div className="w-full flex justify-between gap-2">
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

        {isLastStep ? (
          <Button type="submit">
            Post Ride
            <FaArrowAltCircleRight className="w-4 h-4 ml-2" />
          </Button>
        ) : (
          <Button type="button" onClick={nextStep} size="sm">
            Next
          </Button>
        )}
      </div>
    </>
  );
};
