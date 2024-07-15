import { Button } from "@/components/ui/button";
import { Step, Stepper, useStepper } from "@/components/shared/stepper";
import { GrFormPreviousLink } from "react-icons/gr";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema } from "@/schemas/Login";
import { z } from "zod";
import { registerAction } from "@/actions/Auth/auth";
import toast from "react-hot-toast";
import { Form } from "@/components/ui/form";
import EmailPasswordLogin from "./email-password-login";
import BasicDetails from "./basic-details";

export default function RegisterStepper({form}: any) {


  const steps = [
    { label: "1", content: <EmailPasswordLogin form={form} /> },
    { label: "2", content: <BasicDetails form={form} /> },
  ];

  return (
   
        <div className="w-full flex flex-col gap-4">
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
            <Footer/>
          </Stepper>
        </div>
     
  );
}

const Footer = () => {
  const { nextStep, prevStep, isDisabledStep, isLastStep } = useStepper();
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

        {isLastStep ? <Button type="submit">
            Post Ride
            <FaArrowAltCircleRight className="w-4 h-4 ml-2" />
          </Button>:null}

        {isLastStep ? (
         null
        ) : (
          <Button type="button" onClick={nextStep} size="sm">
            Next
          </Button>
        )}
      </div>
    </>
  );
};
