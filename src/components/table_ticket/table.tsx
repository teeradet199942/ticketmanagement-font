import { useEffect, useState } from "react";
import { Button, Table, Modal, Dropdown, Form, Select, Tag, Card } from "antd";
import axios, { AxiosResponse } from "axios";
import type { ColumnsType, TableProps } from "antd/es/table";
import "./table-css.css";

interface DataItemType {
  id: string;
  title: string;
  description: string;
  status: string;
  create_date: string;
  update_date: string;
}

type Mytableprops = {
  getDataList: () => void;
  data: DataItemType[];
};

function MyTable({ getDataList, data }: Mytableprops) {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState<DataItemType | null>(null);
  const [form] = Form.useForm();

  const columns: ColumnsType<DataItemType> = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      align: 'center',
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      align: 'center',
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      align: 'center',
      filters: [
        { text: 'Pending', value: 'pending' },
        { text: 'Accepted', value: 'accepted' },
        { text: 'Resolved', value: 'resolved' },
        { text: 'Rejected', value: 'rejected' },
      ],
      onFilter: (value, record) => record.status === value,
      render: (_, { status }) => (
        <>
          <Tag
            key={status}
            color={
              status === "accepted"
                ? "green"
                : status === "rejected"
                ? "red"
                : status === "pending"
                ? "yellow"
                : "orange"
            }
          >
            {status.toUpperCase()}
          </Tag>
        </>
      ),
    },
    {
      title: "Create Date",
      dataIndex: "create_date",
      key: "create_date",
      align: 'center',
    },
    {
      title: "Update Date",
      dataIndex: "update_date",
      key: "update_date",
      align: 'center',
      sorter: {
        compare: (a, b) => {
          const dateA = new Date(a.update_date.split("/").reverse().join("-"));
          const dateB = new Date(b.update_date.split("/").reverse().join("-"));
          return dateA.getTime() - dateB.getTime();
        },
        multiple: 2,
      },
    },
    {
      title: "Action",
      dataIndex: "",
      key: "x",
      align: 'center',
      render: (text, record) => (
        <Button
          onClick={() => {
            showModal(record);
          }}
        >
          ChangeStatus
        </Button>
      ),
    },
  ];

  const onChange: TableProps<DataItemType>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  const showModal = (record: DataItemType) => {
    setModalData(record);
    setModalVisible(true);
  };

  const handleOk = () => {
    let data = JSON.stringify({
      newStatus: form.getFieldValue("STATUS"),
    });
    let config = {
      method: "patch",
      url: `http://localhost:3000/admin/update/stsatus/${modalData?.id}`,
      headers: { "Content-Type": "application/json" },
      data,
    };
    axios(config)
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          getDataList();
        }
      })
      .catch((error) => {
        console.log(error);
      });
    setModalVisible(false);
  };

  const handleCancel = () => {
    setModalData(null);
    setModalVisible(false);
  };

  useEffect(() => {
    getDataList();
  }, []);

  return (
    <>
    <h1 className="text-h1">Ticket Management</h1>
    <div className="div-con">
    <Table columns={columns} dataSource={data} onChange={onChange}  className="custom-table"/>
        <Modal
          title="Edit Data"
          visible={modalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          {modalData && (
            <>
              <Form form={form}>
                <Form.Item label={"Status"} name={"STATUS"}>
                  <Select
                    options={[
                      { label: "pending", value: "pending" },
                      { label: "accepted", value: "accepted" },
                      { label: "resolved", value: "resolved" },
                      { label: "rejected", value: "rejected" },
                    ]}
                  />
                </Form.Item>
              </Form>
            </>
          )}
        </Modal>
    </div>
    </>
  );
}

export default MyTable;
