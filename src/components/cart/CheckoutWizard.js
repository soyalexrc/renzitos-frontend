import {Stepper, Step, StepLabel} from "@mui/material";

export default function CheckoutWizard({ activeStep = 0 }) {
  return (
    <Stepper activeStep={activeStep}>
      {
        ['Login', 'Shipping Address', 'Payment Method', 'Place Order'].map(
          (step) => (
            <Step key={step}>
              <StepLabel>{step}</StepLabel>
            </Step>
          )
        )
      }
    </Stepper>
  )
}
