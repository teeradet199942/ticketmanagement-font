import React, { useState } from "react";
import "./create-css.css";
import { Col, Row, Input, Button, Card, notification } from "antd";
import { SmileOutlined } from "@ant-design/icons";
import axios from "axios";

const { TextArea } = Input;

type Mytableprops = {
  getDataList: () => void;
};

function Create({ getDataList }: Mytableprops) {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [contact, setContact] = useState<string>("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    setState: React.Dispatch<React.SetStateAction<string>>
  ) => {
    setState(e.target.value);
  };

  const handleSubmit = () => {
    let data = JSON.stringify({
      title,
      description,
      contact,
    });
    console.log(data);

    let config = {
      method: "post",
      url: "http://localhost:3000/user/createticket",
      headers: { "Content-Type": "application/json" },
      data,
    };
    axios(config)
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          notification.open({
            type: "success",
            message: "Create Suscessfully",
          });
          getDataList();
          setTitle("");
          setDescription("");
          setContact("");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleReset = () => {
    setTitle("");
    setDescription("");
    setContact("");
  };

  return (
      <div>
        <h1 className="text-create-h1">Submit a request</h1>
        <div className="div-p">
          <p>We're Here to help you!</p>
          <p>Submit a Ticket!We'll get back to you seen</p>
        </div>
        <div className="div-text-info">
          <p>Infomation</p>
          <hr />
        </div>
        <div className="div-box">
          <Card className="card-create">
            <Row className="row-create">
              <Col span={24} className="col">
                <p className="text-card">Tile</p>
                <Input
                  value={title}
                  onChange={(e) => handleChange(e, setTitle)}
                />
              </Col>
              <Col span={24} className="col">
                <p className="text-card">Description</p>{" "}
                <TextArea
                  rows={5}
                  value={description}
                  onChange={(e) => handleChange(e, setDescription)}
                />
              </Col>
              <Col span={12} className="col">
                <p className="text-card">Contact</p>{" "}
                <Input
                  value={contact}
                  onChange={(e) => handleChange(e, setContact)}
                />
              </Col>
            </Row>
            <Row className="row-btn">
              <Col>
                <Button onClick={handleReset} className="btn">
                  Reset
                </Button>
              </Col>
              {title && description && contact ? (
                <Col>
                  <Button type="primary" onClick={handleSubmit}>
                    Submit
                  </Button>
                </Col>
              ) : (
                <Col>
                  <Button type="primary" onClick={handleSubmit} disabled>
                    Submit
                  </Button>
                </Col>
              )}
            </Row>
          </Card>
        </div>
      </div>
  );
}

export default Create;
