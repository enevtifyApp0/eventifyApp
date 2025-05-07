import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { addEvent } from "../Features/EventSlice";

const AddEventForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    dispatch(addEvent(data));
    navigate("/");
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Add New Event</h2>
      <form className="styled-form" onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          className="styled-input"
          placeholder="Image URL..."
          {...register("image", { required: true })}
        />
        {errors.image && <p className="error">Image URL is required</p>}

        <input
          type="text"
          className="styled-input"
          placeholder="Title"
          {...register("title", { required: true })}
        />
        {errors.title && <p className="error">Title is required</p>}

        <input
          type="text"
          className="styled-input"
          placeholder="Description"
          {...register("description", { required: true })}
        />
        {errors.description && <p className="error">Description is required</p>}

        <input
          type="date"
          className="styled-input"
          {...register("date", { required: true })}
        />
        {errors.date && <p className="error">Date is required</p>}

        <input
          type="text"
          className="styled-input"
          placeholder="Location"
          {...register("location", { required: true })}
        />
        {errors.location && <p className="error">Location is required</p>}

        <input
          type="number"
          className="styled-input"
          placeholder="Price"
          {...register("price", { required: true })}
        />
        {errors.price && <p className="error">Price is required</p>}

        <input
          type="text"
          className="styled-input"
          placeholder="Type"
          {...register("type", { required: true })}
        />
        {errors.type && <p className="error">Type is required</p>}

        <button type="submit" className="styled-button">
          Add Event
        </button>
      </form>
    </div>
  );
};

export default AddEventForm;
