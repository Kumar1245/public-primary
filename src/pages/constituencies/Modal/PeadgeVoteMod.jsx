import React from "react";
import { Button, Modal, Spinner } from "react-bootstrap";
import Buttontheme from "../../../Component/ui/Buttontheme";
import { Modalclose } from "../../../Assets/svg/Allsvgicons";
import Image from "next/image";
import Pledemodimg from "../../../Assets/images/pledemodimg.png";
import {
  CONSTITUENCY_DETAIL,
  NEW_VOTE_PLEDGE,
} from "../../../services/ApiCalls";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { checkResponse } from "../../../Utilities/commonFunc";
import { errorToast, successToast } from "../../../Utilities/toastsMessages";

const PeadgeVoteMod = (props) => {
  const { candidate, setVotePledgeAdded } = props;
  const queryClient = useQueryClient();
  const {
    data: constituency,
    isLoading: constituencyLoading,
    isFetching: constituencyFetching,
  } = useQuery({
    queryKey: ["constituency-detail", candidate?.constituency],
    queryFn: async () => {
      const res = await CONSTITUENCY_DETAIL(candidate?.constituency);

      const success = checkResponse({ res });

      if (success) {
        return res?.data?.data;
      } else {
        return [];
      }
    },
    keepPreviousData: true,
    enabled: !!candidate?.constituency && !!props.show,
  });

  const isConstituencyLoading = constituencyLoading || constituencyFetching;

  const { mutate: mutateVotePledge, isPending } = useMutation({
    mutationFn: NEW_VOTE_PLEDGE,

    // onSuccess: (res) => {
    //   successToast(res?.data?.message);
    //   setVotePledgeAdded(true)
    //   props.onhide();
    // },
    onSuccess: (res) => {
      successToast(res?.data?.message);
      queryClient.invalidateQueries({
        queryKey: ["candidate-detail", candidate?._id],
      });

      queryClient.invalidateQueries({
        queryKey: ["candidate-list"],
      });
      setVotePledgeAdded(true);
      props.onhide();
    },

    onError: (err) => {
      errorToast(err?.response?.data?.message || "Something went wrong");
    },
  });

  const onSubmit = (e) => {
    e.preventDefault();

    if (!candidate?._id || !constituency?._id) {
      return;
    }

    const payload = {
      candidateId: candidate?._id,
      constituencyId: constituency?._id,
    };
    mutateVotePledge(payload);
  };

  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="authmodal pledgevotmod"
    >
      <Modal.Body>
        <Button onClick={props.onhide} className="modal_close">
          <Modalclose />
        </Button>

        {isConstituencyLoading ? (
          <div className="py-5 text-center">
            <Spinner animation="border" />
            <p className="mt-3 mb-0">Loading pledge details...</p>
          </div>
        ) : (
          <>
            <div className="pledgevotmod_header d-flex align-items-center gap-2">
              <div className="pledgevotmodUser">
                <Image
                  src={constituency?.image?.link || Pledemodimg}
                  alt="img"
                  width={100}
                  height={100}
                  className="img-fluid"
                />
              </div>
              <div className="pledgevotmodUser_content">
                <h5>{constituency?.name}</h5>
                <div>United States - {constituency?.type}</div>
                <div>{constituency?.code}</div>
              </div>
            </div>

            <p className="text-center px-lg-5 py-4">
              A pledge is not a final vote. It is a public expression of early
              support.
            </p>

            <Buttontheme
              className="confirmbutton w-100 mt-3"
              onClick={onSubmit}
              disabled={!!isPending || !constituency?._id}
            >
              {isPending ? "Processing..." : "Confirm Pledge"}
            </Buttontheme>
          </>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default PeadgeVoteMod;
