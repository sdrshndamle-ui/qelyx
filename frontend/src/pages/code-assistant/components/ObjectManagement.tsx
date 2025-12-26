import { useState } from 'react';
import { Table, Button, Modal, Form, Input, Select, Space, message, Popconfirm } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { ProjectObject, Project } from '../types';
import './ObjectManagement.css';

const { TextArea } = Input;

interface ObjectManagementProps {
  objects: ProjectObject[];
  sourceTechnology: string;
  onChange: (objects: ProjectObject[]) => void;
  project?: Project;
}

const ObjectManagement = ({ objects, sourceTechnology, onChange, project }: ObjectManagementProps) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingObject, setEditingObject] = useState<ProjectObject | null>(null);
  const [form] = Form.useForm();

  const objectTypes = ['Class', 'Function', 'Procedure', 'Module', 'Script', 'Component', 'Service', 'Other'];

  const handleAdd = () => {
    setEditingObject(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEdit = (obj: ProjectObject) => {
    setEditingObject(obj);
    form.setFieldsValue({
      name: obj.name,
      type: obj.type,
      originalCode: obj.originalCode,
    });
    setIsModalVisible(true);
  };

  const handleDelete = (objId: string) => {
    const updated = objects.filter((o) => o.id !== objId);
    onChange(updated);
    message.success('Object deleted successfully');
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const newObject: ProjectObject = {
        id: editingObject?.id || `obj-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        name: values.name,
        type: values.type,
        originalCode: values.originalCode,
        convertedCode: editingObject?.convertedCode,
        documentation: editingObject?.documentation,
        businessRules: editingObject?.businessRules,
        confidenceScore: editingObject?.confidenceScore,
        needsReview: editingObject?.needsReview,
      };

      if (editingObject) {
        const updated = objects.map((o) => (o.id === editingObject.id ? newObject : o));
        onChange(updated);
        message.success('Object updated successfully');
      } else {
        onChange([...objects, newObject]);
        message.success('Object added successfully');
      }

      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  const columns: ColumnsType<ProjectObject> = [
    {
      title: 'Object Name',
      dataIndex: 'name',
      key: 'name',
      render: (name: string) => <span style={{ color: '#00d9ff' }}>{name}</span>,
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Conversion Status',
      key: 'status',
      render: (_, record) => (
        <span style={{ color: record.convertedCode ? '#52c41a' : '#faad14' }}>
          {record.convertedCode ? 'Converted' : 'Pending'}
        </span>
      ),
    },
    {
      title: 'Test Case Results',
      key: 'testCaseStatus',
      render: (_, record) => {
        if (!project?.testCases) {
          return <span style={{ color: '#949494' }}>No Test Cases</span>;
        }
        const testCases = project.testCases.filter((tc) => tc.objectId === record.id);
        if (testCases.length === 0) {
          return <span style={{ color: '#949494' }}>No Test Cases</span>;
        }
        const passed = testCases.filter((tc) => tc.outcome === 'Pass').length;
        const failed = testCases.filter((tc) => tc.outcome === 'Fail').length;
        const total = testCases.length;
        const passRate = total > 0 ? (passed / total) * 100 : 0;
        return (
          <Space direction="vertical" size={0}>
            <span style={{ color: '#52c41a' }}>Pass: {passed}/{total}</span>
            {failed > 0 && <span style={{ color: '#f5222d' }}>Fail: {failed}</span>}
            <span style={{ color: '#00d9ff', fontSize: '12px' }}>
              Pass Rate: {passRate.toFixed(1)}%
            </span>
          </Space>
        );
      },
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 150,
      render: (_, record) => (
        <Space>
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
            style={{ color: '#00d9ff' }}
          />
          <Popconfirm
            title="Delete Object"
            description="Are you sure you want to delete this object?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="text" danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="object-management">
      <div className="object-management-header">
        <h3>Project Objects</h3>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
          Add Object
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={objects}
        rowKey="id"
        pagination={{ pageSize: 5 }}
        size="small"
        className="objects-table"
      />

      <Modal
        title={editingObject ? 'Edit Object' : 'Add New Object'}
        open={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          form.resetFields();
        }}
        footer={[
          <Button key="cancel" onClick={() => {
            setIsModalVisible(false);
            form.resetFields();
          }}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleSubmit}>
            {editingObject ? 'Update' : 'Add'}
          </Button>,
        ]}
        width={800}
        className="object-modal"
      >
        <Form
          form={form}
          layout="vertical"
          requiredMark={false}
        >
          <Form.Item
            label="Object Name"
            name="name"
            rules={[{ required: true, message: 'Please enter object name' }]}
          >
            <Input placeholder="Enter object name (e.g., UserService, calculateTotal, etc.)" />
          </Form.Item>

          <Form.Item
            label="Object Type"
            name="type"
            rules={[{ required: true, message: 'Please select object type' }]}
          >
            <Select placeholder="Select object type">
              {objectTypes.map((type) => (
                <Select.Option key={type} value={type}>
                  {type}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label={`Source Code (${sourceTechnology})`}
            name="originalCode"
            rules={[{ required: true, message: 'Please enter source code' }]}
          >
            <TextArea
              rows={15}
              placeholder={`Paste or enter your ${sourceTechnology} code here...`}
              style={{
                fontFamily: 'monospace',
                fontSize: '13px',
              }}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ObjectManagement;
