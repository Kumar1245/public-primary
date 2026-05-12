import React from "react";
import { Button, Modal } from "react-bootstrap";
import Buttontheme from "../../../../Component/ui/Buttontheme";
import Image from "next/image";
import { Modalclose } from "../../../../Assets/svg/Allsvgicons";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Textfield from "../../../../Component/ui/Formfields/Textfield";
import { toast } from "react-toastify";
import Lockimg from "../../../../Assets/images/lockimg.png";
import { FORGOT_PASSWORD } from "../../../../services/ApiCalls";

const schema = Yup.object().shape({
  email: Yup.string()
    .trim()
    .lowercase()
    .email("Please enter a valid email address")
    .required("Email is required"),
});

const ForgotpasswordMod = (props) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data) => {
    const payload = {
      email: data?.email || "",
    };
    try {
      const res = await FORGOT_PASSWORD(payload);
      if (res?.data?.status === "success") {
        toast.success("Password reset link sent to your email.");
        props.onhide();
      }
    } catch (err) {
      toast.error(err.message || "Something went wrong");
    }
  };

  return (
    <Modal {...props} size="md" centered className="authmodal verfycodemod">
      <Modal.Body>
        <Button onClick={props.onhide} className="modal_close">
          <Modalclose />
        </Button>

        <div className="authinner_content">
          <div className="HeadingModal text-center">
            <div className="modalimg">
              <Image
                src={Lockimg}
                alt="Forgot Password"
                className="mx-auto img-fluid"
                height={200}
                width={200}
              />
            </div>

            <h4>Forgot Password</h4>
            <p>
              Enter your registered email address. We’ll send you a secure reset
              link.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <Textfield
                    {...field}
                    type="email"
                    label="Email Address"
                    placeholder="Enter email address"
                    error={errors.email?.message}
                  />
                )}
              />
            </div>

            <Buttontheme
              type="submit"
              className="w-100 mt-3"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Send Reset Link"}
            </Buttontheme>
          </form>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ForgotpasswordMod;
