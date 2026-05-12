import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import Buttontheme from "../../../Component/ui/Buttontheme";
import { Modalclose } from "../../../Assets/svg/Allsvgicons";

const EditConstituencyDetailsModal = ({
  show,
  onHide,
  initialElectionDate,
  initialLastElectionVotes,
  initialDescription,
  constituencyName,
  disputeMode = "admin",
  onSave,
  isPending = false,
}) => {
  const [formValues, setFormValues] = useState({
    disputeType: "",
    electionDate: "",
    lastElectionVotes: "",
    description: "",
  });
  const [formError, setFormError] = useState("");

  useEffect(() => {
    if (show) {
      setFormValues({
        disputeType: "",
        electionDate: initialElectionDate || "",
        lastElectionVotes:
          initialLastElectionVotes !== undefined &&
          initialLastElectionVotes !== null
            ? initialLastElectionVotes
            : "",
        description: initialDescription || "",
      });
      setFormError("");
    }
  }, [
    show,
    initialElectionDate,
    initialLastElectionVotes,
    initialDescription,
  ]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormError("");
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formValues.disputeType) {
      setFormError("Please choose a dispute option");
      return;
    }

    onSave(formValues);
  };

  const isCommunityReviewedConstituency = disputeMode === "community";

  const modalTitle = isCommunityReviewedConstituency
    ? "Dispute And Re-Enter Details"
    : "Raise Constituency Dispute";

  const modalDescription = isCommunityReviewedConstituency
    ? "Users can dispute and re-enter the correct data for "
    : "Users can only raise a dispute for ";

  const workflowNote = isCommunityReviewedConstituency
    ? "On the county and below, the information gets changed by confirmation of future users. This does not directly overwrite the live data."
    : "State-level constituencies are admin-controlled. Users can report an issue here, and admin will review and handle any final updates.";

  const electionDateLabel = isCommunityReviewedConstituency
    ? "Correct Election Date"
    : "Suggested Election Date";

  const descriptionLabel = isCommunityReviewedConstituency
    ? "Correct Description"
    : "Dispute Details";

  const lastElectionVotesLabel = isCommunityReviewedConstituency
    ? "Correct Last Election Votes"
    : "Suggested Last Election Votes";

  const descriptionPlaceholder = isCommunityReviewedConstituency
    ? "Enter the correct constituency description"
    : "Describe what looks incorrect. Admin will review and handle updates.";

  const submitButtonLabel = isCommunityReviewedConstituency
    ? "Submit Correction"
    : "Raise Dispute";

  const showElectionDateField =
    isCommunityReviewedConstituency &&
    (formValues.disputeType === "election_date" ||
      formValues.disputeType === "both");

  const showDescriptionField =
    isCommunityReviewedConstituency &&
    (formValues.disputeType === "description" ||
      formValues.disputeType === "both");

  const showLastElectionVotesField =
    formValues.disputeType === "last_election_votes";

  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      size="md"
      className="authmodal addnewdatamod"
    >
      <Modal.Body>
        <Button onClick={onHide} className="modal_close">
          <Modalclose />
        </Button>

        <div className="authinner_content ">
          <div className="innnerModalhead text-start">
            <h5 className="fw-bold">{modalTitle}</h5>
            <p>
              {modalDescription}
              <strong>{constituencyName || "this constituency"}</strong>.
            </p>
            <p className="mb-0">{workflowNote}</p>
          </div>

          <Form onSubmit={handleSubmit}>
            <Form.Group
              className="my-3 field_class"
              controlId="editDisputeType"
            >
              <Form.Label>Dispute Option</Form.Label>
              <Form.Select
                name="disputeType"
                value={formValues.disputeType}
                onChange={handleChange}
                className="text_input"
              >
                <option value="">Select dispute option</option>
                <option value="election_date">Election Date</option>
                <option value="last_election_votes">Last Election Votes</option>
                <option value="description">Description</option>
                <option value="both">Election Date and Description</option>
              </Form.Select>
              {formError ? (
                <p className="text-danger mt-2 mb-0">{formError}</p>
              ) : null}
            </Form.Group>

            {showElectionDateField && (
              <Form.Group
                className="mb-3 field_class"
                controlId="editElectionDate"
              >
                <Form.Label>{electionDateLabel}</Form.Label>
                <Form.Control
                  type="date"
                  name="electionDate"
                  value={formValues.electionDate}
                  onChange={handleChange}
                  className="text_input"
                />
              </Form.Group>
            )}

            {showLastElectionVotesField && (
              <Form.Group
                className="mb-3 field_class"
                controlId="editLastElectionVotes"
              >
                <Form.Label>{lastElectionVotesLabel}</Form.Label>
                <Form.Control
                  type="number"
                  min="0"
                  name="lastElectionVotes"
                  value={formValues.lastElectionVotes}
                  onChange={handleChange}
                  className="text_input"
                />
              </Form.Group>
            )}

            {showDescriptionField && (
              <Form.Group className="field_class" controlId="editDescription">
                <Form.Label>{descriptionLabel}</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={5}
                  name="description"
                  value={formValues.description}
                  onChange={handleChange}
                  placeholder={descriptionPlaceholder}
                  className="text_input"
                />
              </Form.Group>
            )}

            <div className="d-flex gap-2 mt-3">
              <Button
                type="button"
                onClick={onHide}
                className="w-100"
                variant="light"
                disabled={isPending}
              >
                Cancel
              </Button>
              <Buttontheme type="submit" className="w-100" disabled={isPending}>
                {isPending ? "Submitting..." : submitButtonLabel}
              </Buttontheme>
            </div>
          </Form>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default EditConstituencyDetailsModal;
