import React, { useEffect, useState } from "react";
import "./Checkout.css";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Typography from "@material-ui/core/Typography";
import SigninCheckout from "./SigninCheckout";
import AddressCheckout from "./AddressCheckout";
import PaymentCheckout from "./PaymentCheckout";
import OrderCheckout from "./OrderCheckout";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
    },
    button: {
        marginRight: theme.spacing(1),
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
}));

function getSteps() {
    return ["đăng nhập", "địa chỉ giao hàng", "thanh toán & mua hàng"];
}

const Checkout = (props) => {
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());
    const steps = getSteps();
    const auth = useSelector((state) => state.auth);
    const { authenticate } = auth;
    const [info, setInfo] = useState({});
    const [namePayment, setNamePayment] = useState("");

    function getStepContent(step) {
        switch (step) {
            case 0:
                return <SigninCheckout handleNext={handleNext} />;
            case 1:
                return (
                    <AddressCheckout
                        handleNext={handleNext}
                        handleGetInfo={(item) => handleGetInfo(item)}
                    />
                );
            case 2:
                return (
                    <PaymentCheckout
                        handleNamePayment={(item) => handleNamePayment(item)}
                        handleNext={handleNext}
                        info={info}
                    />
                );
            default:
                return "Unknown step";
        }
    }

    const handleGetInfo = (item) => {
        setInfo(item);
    };

    // eslint-disable-next-line no-unused-vars
    const isStepOptional = (step) => {
        return step === 1;
    };

    const isStepSkipped = (step) => {
        return skipped.has(step);
    };

    const handleNext = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    };

    useEffect(() => {
        if (authenticate) {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
    }, [authenticate]);

    const handleReset = () => {
        setActiveStep(0);
    };

    const handleNamePayment = (item) => {
        setNamePayment(item);
    };

    return (
        <div className="checkout">
            <div className={classes.root}>
                <Stepper activeStep={activeStep}>
                    {steps.map((label, index) => {
                        const stepProps = {};
                        const labelProps = {};
                        if (isStepSkipped(index)) {
                            stepProps.completed = false;
                        }
                        return (
                            <Step key={label} {...stepProps}>
                                <StepLabel {...labelProps}>{label}</StepLabel>
                            </Step>
                        );
                    })}
                </Stepper>
                <div>
                    {activeStep === steps.length ? (
                        <div>
                            <Typography className={classes.instructions}>
                                <OrderCheckout
                                    namePayment={namePayment}
                                    info={info}
                                    handleReset={handleReset}
                                />
                            </Typography>
                        </div>
                    ) : (
                            <div>
                                <Typography className={classes.instructions}>
                                    {getStepContent(activeStep)}
                                </Typography>
                                {/* <div>
                                    <Button
                                        disabled={activeStep === 0}
                                        onClick={handleBack}
                                        className={classes.button}
                                    >
                                        Back
                </Button>

                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={handleNext}
                                        className={classes.button}
                                    >
                                        {activeStep === steps.length - 1 ? "Finish" : "Next"}
                                    </Button>
                                </div> */}
                            </div>
                        )}
                </div>
            </div>
        </div>
        // checkout
    );
};

export default Checkout;
