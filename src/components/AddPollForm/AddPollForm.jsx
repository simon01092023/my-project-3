import { useState } from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';
import { Link, useNavigate } from "react-router-dom";

export default function AddPollForm({ handleAddPoll }) {

  const [state, setState] = useState({
    caption: ''

  })

  const [photos, setPhotos] = useState([])

  const navigate = useNavigate();

  function handleFileInput(e) {
    setPhotos([...photos, e.target.files[0]])
  }

  function handleChange(e) {
    setState({
      ...state,
      [e.target.name]: e.target.value
    })
  }

  function handleSubmit(e) {
    e.preventDefault()
    const formData = new FormData()
    formData.append('caption', state.caption)
    formData.append('photo1', photos[0])
    formData.append('photo2', photos[1])
    handleAddPoll(formData)
  
  }

  return (
    <Segment>
      <Form autoComplete="off" onSubmit={handleSubmit}>
        <Form.Input
          className="form-control"
          name="caption"
          value={state.caption}
          placeholder="What would you like to poll?"
          onChange={handleChange}
          required
        />
        <Form.Input
          className="form-control"
          type="file"
          name="photo1"
          placeholder="upload image"
          onChange={handleFileInput}
        />
        <Form.Input
          className="form-control"
          type="file"
          name="photo2"
          placeholder="upload image"
          onChange={handleFileInput}
        />
        <Button type="submit" className="btn">
          ADD POLL
        </Button>
      </Form>
    </Segment>

  );
}