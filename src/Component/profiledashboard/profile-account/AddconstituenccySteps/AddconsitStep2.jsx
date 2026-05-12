import React, { useState } from "react";
import { Check, Plus, Trash2 } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import Buttontheme from "../../../ui/Buttontheme";

const AddconsitStep2 = ({
  isDistrict,
  districts,
  addDistrict,
  removeDistrict,
  updateDistrict,
  atLargeSeats,
  addAtLargeSeat,
  removeAtLargeSeat,
  updateAtLargeSeat,
}) => {
  return (
    <div>
      <div className="constituency-info-box constituency-info-box-green">
        <h3 className="constituency-info-title constituency-info-title-green">
          <Check size={20} />
          Confirm Constituencies
        </h3>
        <p className="constituency-info-text constituency-info-text-green">
          Review and configure your constituency structure below.
        </p>
      </div>

      {isDistrict ? (
        <div>
          <div className="constituency-section-header">
            <h4 className="constituency-section-title">Districts</h4>
            <Buttontheme
              type="button"
              className="mb-2 addsmall"
              onClick={addDistrict}
            >
              <Plus size={16} />
              Add District
            </Buttontheme>
          </div>

          <div className="d-flex gap-3 flex-wrap">
            {districts?.map((district, index) => (
              <div key={district.id} className="constituency-district-card">
                <div className="constituency-district-header">
                  <h5 className="constituency-district-title">
                    District {index + 1}
                  </h5>
                  {districts?.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeDistrict(district.id)}
                      className="constituency-delete-btn"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
                <div className="constituency-form-row d-flex gap-3 flex-wrap flex-column">
                  <input
                    type="text"
                    value={district.name}
                    onChange={(e) =>
                      updateDistrict(district.id, "name", e.target.value)
                    }
                    placeholder="District name"
                    className="constituency-form-input"
                  />
                  <input
                    type="number"
                    value={district.seats}
                    onChange={(e) =>
                      updateDistrict(district.id, "seats", e.target.value)
                    }
                    placeholder="# of seats"
                    className="constituency-form-input"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <div className="constituency-section-header">
            <h4 className="constituency-section-title">At-Large Seats</h4>
            <Buttontheme
              type="button"
              className="mb-2 addsmall"
              onClick={addAtLargeSeat}
            >
              <Plus size={16} />
              Add Seat
            </Buttontheme>
          </div>

          <div className="d-flex gap-3 flex-wrap">
            {atLargeSeats?.map((seat, index) => (
              <div key={seat.id} className="constituency-district-card">
                <div className="constituency-district-header">
                  <h5 className="constituency-district-title">
                    Seat {index + 1}
                  </h5>
                  {atLargeSeats?.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeAtLargeSeat(seat.id)}
                      className="constituency-delete-btn"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
                <input
                  type="text"
                  value={seat.name}
                  onChange={(e) => updateAtLargeSeat(seat.id, e.target.value)}
                  placeholder="Seat name"
                  className="constituency-form-input"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="constituency-note-box">
        <p className="constituency-note-text">
          <strong>Note:</strong> The user or user/voter can only be included
          into 1 district and all (At Large) constituencies.
        </p>
      </div>
    </div>
  );
};

export default AddconsitStep2;
