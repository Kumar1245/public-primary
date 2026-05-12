import React, { useEffect, useMemo, useState } from "react";
import { Button, Modal, Row, Col } from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Buttontheme from "../../../Component/ui/Buttontheme";
import Textfield from "../../../Component/ui/Formfields/Textfield";
import { Modalclose } from "../../../Assets/svg/Allsvgicons";
import { Dropdown } from "primereact/dropdown";
import Textareafield from "../../../Component/ui/Formfields/Textareafield";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  IDEAS_CATEGORY_LIST,
  NEW_IDEAS_SUBMIT,
} from "../../../services/ApiCalls";
import { checkResponse } from "../../../Utilities/commonFunc";
import { errorToast, successToast } from "../../../Utilities/toastsMessages";

const MAX_DESCRIPTION_LENGTH = 200;

const SubmitNewdataMod = (props) => {
  const { constituency, setIdeasAdded } = props;
  const [categories, setCategories] = useState([]);
  const maxDescriptionLength = MAX_DESCRIPTION_LENGTH;

  const schema = useMemo(
    () =>
      Yup.object().shape({
        title: Yup.string().required("Title is required"),
        category: Yup.string().required("Category is required"),
        description: Yup.string()
          .required("Description is required")
          .max(
            maxDescriptionLength,
            `Description must not exceed ${maxDescriptionLength} characters`,
          ),
      }),
    [maxDescriptionLength],
  );

  const { data: categoriesData } = useQuery({
    queryKey: ["categories-data"],
    queryFn: async () => {
      const res = await IDEAS_CATEGORY_LIST();

      const success = checkResponse({ res });

      if (success) {
        return res?.data?.data;
      } else {
        return [];
      }
    },
    keepPreviousData: true,
    enabled: !!props.show,
  });


  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: "",
      category: null,
      description: "",
      constituency,
    },
  });

  const descriptionValue = watch("description") || "";

  useEffect(() => {
    if (categoriesData && categoriesData.length > 0) {
      const cateogiresoptions = categoriesData?.map((item) => ({
        name: item?.catName,
        value: item._id,
      }));
      setCategories(cateogiresoptions);

      setValue("category", cateogiresoptions[0]?.value || null, {
        shouldValidate: false,
      });
    }
  }, [categoriesData, setValue]);

  const { mutate: mutateSubmitIdea, isPending } = useMutation({
    mutationFn: NEW_IDEAS_SUBMIT,

    onSuccess: () => {
      successToast("Idea submitted successfully");
      setIdeasAdded(true);
      props.onhide();
    },

    onError: (err) => {
      errorToast(err?.response?.data?.message || "Something went wrong");
    },
  });

  const onSubmit = (data) => {
    console.log("email send", data);
    data.constituency = constituency;
    mutateSubmitIdea(data);
  };

  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="authmodal addnewdatamod"
    >
      <Modal.Body>
        <Button onClick={props.onhide} className="modal_close">
          <Modalclose />
        </Button>

        <div className="authinner_content ">
          <div className="innnerModalhead text-start">
            <h5 className="fw-bold">Add Your New Idea</h5>
            <p>
              Your voice shapes the future. Share an idea that can improve your
              community or governance.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="">
            <Row>
              <Col lg={12}>
                <div className="mb-3 field_class">
                  <Controller
                    name="title"
                    control={control}
                    render={({ field }) => (
                      <div className="position-relative">
                        <Textfield
                          {...field}
                          type="text"
                          label="Title"
                          value={{ ...field }.value || ""}
                          placeholder="Enter title"
                          error={errors.title?.message}
                        />
                      </div>
                    )}
                  />
                </div>
              </Col>

              <Col lg={12}>
                <div className="mb-3 field_class">
                  <label className="form-label">Category</label>
                  <Controller
                    name="category"
                    control={control}
                    render={({ field }) => (
                      <div className="position-relative">
                        <Dropdown
                          value={field.value}
                          onChange={(e) => field.onChange(e.value)}
                          options={categories}
                          optionLabel="name"
                          placeholder="Select..."
                          className="w-100 text_input"
                        />
                        {errors.category && (
                          <span className="text-danger m-0 fs-6">
                            {errors.category.message}
                          </span>
                        )}
                      </div>
                    )}
                  />
                </div>
              </Col>

              <Col lg={12}>
                <div className="mb-3 field_class">
                  <Controller
                    name="description"
                    control={control}
                    render={({ field }) => (
                      <div className="position-relative">
                        <div className="d-flex align-items-center justify-content-between mb-1">
                          <label className="form-label mb-0">
                            Idea Content (Max length 200)
                          </label>
                          <small className="text-muted">
                            {descriptionValue.length}/{maxDescriptionLength}
                          </small>
                        </div>
                        <Textareafield
                          {...field}
                          type="text"
                          maxLength={maxDescriptionLength}
                          value={{ ...field }.value || ""}
                          placeholder="Enter your description"
                          error={errors.description?.message}
                        />
                      </div>
                    )}
                  />
                </div>
              </Col>
            </Row>

            <Buttontheme
              type="submit"
              className="w-100 mt-3"
              disabled={!!isPending}
            >
              {isPending ? "Submitting..." : "Submit"}
            </Buttontheme>
          </form>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default SubmitNewdataMod;

// svg
