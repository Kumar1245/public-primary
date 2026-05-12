import React, { useEffect, useState } from "react";
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

// image

const schema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  category: Yup.string().required("Categories is required"),
  description: Yup.string().required("Description is required"),
});

const EditideaMod = (props) => {
  const { idea, setIdeasAdded } = props;
  const [categories, setCategories] = useState([]);

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: idea?.title,
      category: null,
      description: idea?.description,
    },
  });

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

  useEffect(() => {
    if (categoriesData && categoriesData.length > 0) {
      const cateogiresoptions = categoriesData?.map((item) => ({
        name: item?.catName,
        value: item._id,
      }));
      setCategories(cateogiresoptions);
    }
  }, [categoriesData]);

  useEffect(() => {
    if (idea) {
      setValue("title", idea?.title);
      setValue("category", idea?.category?._id);
      setValue("description", idea?.description);
    }
  }, [idea]);

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
    console.log("email send");
    data._id = idea?._id;
    data.constituency = idea?.constituency?._id;
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
            <h5 className="fw-bold">Edit Your Idea</h5>
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
                          <span className="error">
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
                        <Textareafield
                          {...field}
                          type="text"
                          label="Description"
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

export default EditideaMod;

// svg
