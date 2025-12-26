import { useState, useEffect } from 'react';
import { Card, Form, Input, Select, Button, Table, Space, Tag, Typography, Row, Col, InputNumber, Radio, message, Statistic, Progress, Tabs } from 'antd';
import { PlayCircleOutlined, CheckCircleOutlined, CloseCircleOutlined, ExclamationCircleOutlined, EyeOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { Project, ProjectObject } from '../types';
import { saveProject } from '../utils/storage';
import './ValidateObjects.css';

const { TextArea } = Input;
const { Title, Text } = Typography;

interface ValidateObjectsProps {
  project: Project;
  onProjectUpdate?: (updatedProject: Project) => void;
}

interface ValidationResult {
  attribute: string;
  originalValue: any;
  convertedValue: any;
  status: 'match' | 'mismatch';
  recordStatus?: 'acceptable' | 'rejected' | 'needs_investigation';
  notes?: string;
}

interface RecordValidation {
  recordId: string;
  attributes: ValidationResult[];
  overallStatus?: 'acceptable' | 'rejected' | 'needs_investigation';
  recordNotes?: string;
}

const ValidateObjects = ({ project, onProjectUpdate }: ValidateObjectsProps) => {
  const [form] = Form.useForm();
  const [connectionForm] = Form.useForm();
  const [selectedObject, setSelectedObject] = useState<string>('');
  const [validationResults, setValidationResults] = useState<RecordValidation[]>([]);
  const [tolerancePercentage, setTolerancePercentage] = useState<number>(0);
  const [isValidating, setIsValidating] = useState(false);
  const [mismatchPercentage, setMismatchPercentage] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [currentProject, setCurrentProject] = useState<Project>(project);

  useEffect(() => {
    setCurrentProject(project);
  }, [project]);

  const handleValidate = async () => {
    if (!selectedObject) {
      message.warning('Please select an object to validate');
      return;
    }

    const connectionValues = await connectionForm.validateFields();
    setIsValidating(true);

    // Update object status to in_progress
    const updatedProject = { ...currentProject };
    const objIndex = updatedProject.objects.findIndex((o) => o.id === selectedObject);
    if (objIndex >= 0) {
      updatedProject.objects[objIndex].validationStatus = 'in_progress';
      updatedProject.objects[objIndex].validationCompletion = 0;
      setCurrentProject(updatedProject);
      saveProject(updatedProject);
      if (onProjectUpdate) {
        onProjectUpdate(updatedProject);
      }
    }

    // Simulate validation process
    setTimeout(() => {
      const obj = currentProject.objects.find((o) => o.id === selectedObject);
      if (!obj || !obj.convertedCode) {
        message.warning('Selected object does not have converted code. Please generate conversion first.');
        setIsValidating(false);
        return;
      }

      // Generate sample validation results
      const sampleResults: RecordValidation[] = [
        {
          recordId: 'REC001',
          attributes: [
            { attribute: 'ID', originalValue: '1001', convertedValue: '1001', status: 'match' },
            { attribute: 'Name', originalValue: 'John Doe', convertedValue: 'John Doe', status: 'match' },
            { attribute: 'Amount', originalValue: 1500.50, convertedValue: 1500.50, status: 'match' },
            { attribute: 'Date', originalValue: '2024-01-15', convertedValue: '2024-01-15', status: 'match' },
            { attribute: 'Status', originalValue: 'Active', convertedValue: 'Active', status: 'match' },
          ],
        },
        {
          recordId: 'REC002',
          attributes: [
            { attribute: 'ID', originalValue: '1002', convertedValue: '1002', status: 'match' },
            { attribute: 'Name', originalValue: 'Jane Smith', convertedValue: 'Jane Smith', status: 'match' },
            { attribute: 'Amount', originalValue: 2500.75, convertedValue: 2500.80, status: 'mismatch' },
            { attribute: 'Date', originalValue: '2024-01-16', convertedValue: '2024-01-16', status: 'match' },
            { attribute: 'Status', originalValue: 'Pending', convertedValue: 'Pending', status: 'match' },
          ],
        },
        {
          recordId: 'REC003',
          attributes: [
            { attribute: 'ID', originalValue: '1003', convertedValue: '1003', status: 'match' },
            { attribute: 'Name', originalValue: 'Bob Johnson', convertedValue: 'Robert Johnson', status: 'mismatch' },
            { attribute: 'Amount', originalValue: 3200.00, convertedValue: 3200.00, status: 'match' },
            { attribute: 'Date', originalValue: '2024-01-17', convertedValue: '2024-01-17', status: 'match' },
            { attribute: 'Status', originalValue: 'Inactive', convertedValue: 'Inactive', status: 'match' },
          ],
        },
      ];

      // Calculate mismatch percentage
      const totalAttributes = sampleResults.reduce((sum, record) => sum + record.attributes.length, 0);
      const mismatchedAttributes = sampleResults.reduce(
        (sum, record) => sum + record.attributes.filter((attr) => attr.status === 'mismatch').length,
        0
      );
      const calculatedMismatch = totalAttributes > 0 ? (mismatchedAttributes / totalAttributes) * 100 : 0;
      setMismatchPercentage(calculatedMismatch);

      setValidationResults(sampleResults);
      
      // Update object status to completed
      const updatedProject = { ...currentProject };
      const objIndex = updatedProject.objects.findIndex((o) => o.id === selectedObject);
      if (objIndex >= 0) {
        updatedProject.objects[objIndex].validationStatus = 'completed';
        updatedProject.objects[objIndex].validationCompletion = 100;
        setCurrentProject(updatedProject);
        saveProject(updatedProject);
        if (onProjectUpdate) {
          onProjectUpdate(updatedProject);
        }
      }
      
      setIsValidating(false);
      message.success('Validation completed');
    }, 2000);
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'completed':
        return '#52c41a';
      case 'in_progress':
        return '#00d9ff';
      case 'under_review':
        return '#faad14';
      case 'not_started':
      default:
        return '#949494';
    }
  };

  const getStatusLabel = (status?: string) => {
    switch (status) {
      case 'completed':
        return 'Completed';
      case 'in_progress':
        return 'In Progress';
      case 'under_review':
        return 'Under Review';
      case 'not_started':
      default:
        return 'Not Started';
    }
  };

  const handleStartValidation = (objectId: string) => {
    setSelectedObject(objectId);
    setActiveTab('validate');
    form.setFieldsValue({ objectId });
  };

  const handleStatusChange = (objectId: string, status: 'not_started' | 'in_progress' | 'under_review' | 'completed') => {
    const updatedProject = { ...currentProject };
    const objIndex = updatedProject.objects.findIndex((o) => o.id === objectId);
    if (objIndex >= 0) {
      updatedProject.objects[objIndex].validationStatus = status;
      if (status === 'completed') {
        updatedProject.objects[objIndex].validationCompletion = 100;
      } else if (status === 'not_started') {
        updatedProject.objects[objIndex].validationCompletion = 0;
      } else if (status === 'in_progress') {
        updatedProject.objects[objIndex].validationCompletion = updatedProject.objects[objIndex].validationCompletion || 50;
      } else if (status === 'under_review') {
        updatedProject.objects[objIndex].validationCompletion = updatedProject.objects[objIndex].validationCompletion || 75;
      }
      setCurrentProject(updatedProject);
      saveProject(updatedProject);
      if (onProjectUpdate) {
        onProjectUpdate(updatedProject);
      }
    }
  };

  const renderOverview = () => {
    const objectsWithConversion = currentProject.objects.filter((obj) => obj.convertedCode);
    const totalObjects = objectsWithConversion.length;
    const completedCount = objectsWithConversion.filter((obj) => obj.validationStatus === 'completed').length;
    const inProgressCount = objectsWithConversion.filter((obj) => obj.validationStatus === 'in_progress').length;
    const underReviewCount = objectsWithConversion.filter((obj) => obj.validationStatus === 'under_review').length;
    const notStartedCount = objectsWithConversion.filter((obj) => !obj.validationStatus || obj.validationStatus === 'not_started').length;
    
    const overallCompletion = totalObjects > 0 
      ? objectsWithConversion.reduce((sum, obj) => sum + (obj.validationCompletion || 0), 0) / totalObjects 
      : 0;

    const overviewColumns: ColumnsType<ProjectObject> = [
      {
        title: 'Object Name',
        dataIndex: 'name',
        key: 'name',
        render: (name: string) => <span style={{ color: '#00d9ff', fontWeight: 600 }}>{name}</span>,
      },
      {
        title: 'Type',
        dataIndex: 'type',
        key: 'type',
      },
      {
        title: 'Validation Status',
        key: 'validationStatus',
        width: 150,
        render: (_, record) => (
          <Select
            value={record.validationStatus || 'not_started'}
            onChange={(value) => handleStatusChange(record.id, value)}
            style={{ width: '100%' }}
            size="small"
          >
            <Select.Option value="not_started">Not Started</Select.Option>
            <Select.Option value="in_progress">In Progress</Select.Option>
            <Select.Option value="under_review">Under Review</Select.Option>
            <Select.Option value="completed">Completed</Select.Option>
          </Select>
        ),
      },
      {
        title: 'Completion',
        key: 'validationCompletion',
        width: 200,
        render: (_, record) => (
          <Progress
            percent={record.validationCompletion || 0}
            size="small"
            strokeColor={{
              '0%': '#00d9ff',
              '100%': '#52c41a',
            }}
            format={(percent) => `${percent}%`}
          />
        ),
      },
      {
        title: 'Actions',
        key: 'actions',
        width: 120,
        render: (_, record) => (
          <Button
            type="primary"
            size="small"
            icon={<EyeOutlined />}
            onClick={() => handleStartValidation(record.id)}
          >
            Validate
          </Button>
        ),
      },
    ];

    return (
      <div className="validation-overview">
        <Row gutter={[24, 24]} style={{ marginBottom: 24 }}>
          <Col xs={24} sm={12} md={6}>
            <Card>
              <Statistic
                title="Total Objects"
                value={totalObjects}
                valueStyle={{ color: '#00d9ff', fontWeight: 800, fontSize: 36 }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card>
              <Statistic
                title="Not Started"
                value={notStartedCount}
                valueStyle={{ color: '#949494', fontWeight: 800, fontSize: 36 }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card>
              <Statistic
                title="In Progress"
                value={inProgressCount}
                valueStyle={{ color: '#00d9ff', fontWeight: 800, fontSize: 36 }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card>
              <Statistic
                title="Under Review"
                value={underReviewCount}
                valueStyle={{ color: '#faad14', fontWeight: 800, fontSize: 36 }}
              />
            </Card>
          </Col>
        </Row>

        <Row gutter={[24, 24]} style={{ marginBottom: 24 }}>
          <Col xs={24} sm={12} md={12}>
            <Card>
              <Statistic
                title="Completed"
                value={completedCount}
                valueStyle={{ color: '#52c41a', fontWeight: 800, fontSize: 36 }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={12}>
            <Card>
              <div style={{ marginBottom: 12 }}>
                <Text strong style={{ color: '#67e8f9', fontSize: 16 }}>Overall Validation Completion</Text>
              </div>
              <Progress
                percent={overallCompletion}
                size="default"
                strokeColor={{
                  '0%': '#00d9ff',
                  '100%': '#52c41a',
                }}
                format={(percent) => `${percent?.toFixed(1)}%`}
                style={{ marginTop: 8 }}
              />
            </Card>
          </Col>
        </Row>

        <Card title="Object Validation Status" className="status-table-card">
          <Table
            columns={overviewColumns}
            dataSource={objectsWithConversion}
            rowKey="id"
            pagination={{ pageSize: 10 }}
            className="validation-status-table"
          />
        </Card>
      </div>
    );
  };

  const handleAttributeStatusChange = (recordId: string, attribute: string, status: 'acceptable' | 'rejected' | 'needs_investigation') => {
    setValidationResults((prev) =>
      prev.map((record) => ({
        ...record,
        attributes: record.attributes.map((attr) =>
          attr.attribute === attribute && record.recordId === recordId
            ? { ...attr, recordStatus: status }
            : attr
        ),
      }))
    );
  };

  const handleRecordStatusChange = (recordId: string, status: 'acceptable' | 'rejected' | 'needs_investigation') => {
    setValidationResults((prev) =>
      prev.map((record) => (record.recordId === recordId ? { ...record, overallStatus: status } : record))
    );
  };

  const handleNotesChange = (recordId: string, attribute: string, notes: string) => {
    setValidationResults((prev) =>
      prev.map((record) => ({
        ...record,
        attributes: record.attributes.map((attr) =>
          attr.attribute === attribute && record.recordId === recordId ? { ...attr, notes } : attr
        ),
      }))
    );
  };

  const handleRecordNotesChange = (recordId: string, notes: string) => {
    setValidationResults((prev) =>
      prev.map((record) => (record.recordId === recordId ? { ...record, recordNotes: notes } : record))
    );
  };

  const renderValidationTable = () => {
    if (validationResults.length === 0) return null;

    return validationResults.map((record) => {
      const attributeColumns: ColumnsType<ValidationResult> = [
        {
          title: 'Attribute',
          dataIndex: 'attribute',
          key: 'attribute',
          width: 150,
          render: (text: string) => <span style={{ color: '#00d9ff', fontWeight: 600 }}>{text}</span>,
        },
        {
          title: 'Original Output',
          dataIndex: 'originalValue',
          key: 'originalValue',
          width: 200,
          render: (value: any) => <span style={{ color: 'rgba(226, 232, 240, 0.86)' }}>{String(value)}</span>,
        },
        {
          title: 'Converted Output',
          dataIndex: 'convertedValue',
          key: 'convertedValue',
          width: 200,
          render: (value: any, record: ValidationResult) => (
            <span
              style={{
                color: record.status === 'match' ? '#52c41a' : '#f5222d',
                fontWeight: record.status === 'mismatch' ? 600 : 400,
              }}
            >
              {String(value)}
            </span>
          ),
        },
        {
          title: 'Status',
          dataIndex: 'status',
          key: 'status',
          width: 120,
          render: (status: string) => (
            <Tag color={status === 'match' ? 'success' : 'error'} icon={status === 'match' ? <CheckCircleOutlined /> : <CloseCircleOutlined />}>
              {status === 'match' ? 'Match' : 'Mismatch'}
            </Tag>
          ),
        },
        {
          title: 'Action',
          key: 'action',
          width: 200,
          render: (_, attr: ValidationResult) => (
            <Radio.Group
              size="small"
              value={attr.recordStatus}
              onChange={(e) => handleAttributeStatusChange(record.recordId, attr.attribute, e.target.value)}
            >
              <Radio.Button value="acceptable" style={{ color: '#52c41a' }}>
                Accept
              </Radio.Button>
              <Radio.Button value="rejected" style={{ color: '#f5222d' }}>
                Reject
              </Radio.Button>
              <Radio.Button value="needs_investigation" style={{ color: '#faad14' }}>
                Review
              </Radio.Button>
            </Radio.Group>
          ),
        },
        {
          title: 'Notes',
          key: 'notes',
          width: 250,
          render: (_, attr: ValidationResult) => (
            <TextArea
              placeholder="Add notes..."
              value={attr.notes}
              onChange={(e) => handleNotesChange(record.recordId, attr.attribute, e.target.value)}
              rows={2}
              style={{ fontSize: 12 }}
            />
          ),
        },
      ];

      return (
        <Card
          key={record.recordId}
          title={
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>Record: {record.recordId}</span>
              <Space>
                <Text strong>Overall Status:</Text>
                <Radio.Group
                  size="small"
                  value={record.overallStatus}
                  onChange={(e) => handleRecordStatusChange(record.recordId, e.target.value)}
                >
                  <Radio.Button value="acceptable" style={{ color: '#52c41a' }}>
                    Accept
                  </Radio.Button>
                  <Radio.Button value="rejected" style={{ color: '#f5222d' }}>
                    Reject
                  </Radio.Button>
                  <Radio.Button value="needs_investigation" style={{ color: '#faad14' }}>
                    Review
                  </Radio.Button>
                </Radio.Group>
              </Space>
            </div>
          }
          className="validation-record-card"
          style={{ marginBottom: 24 }}
          extra={
            <TextArea
              placeholder="Record-level notes..."
              value={record.recordNotes}
              onChange={(e) => handleRecordNotesChange(record.recordId, e.target.value)}
              rows={2}
              style={{ width: 300, fontSize: 12 }}
            />
          }
        >
          <Table
            columns={attributeColumns}
            dataSource={record.attributes}
            rowKey="attribute"
            pagination={false}
            size="small"
            className="validation-table"
          />
        </Card>
      );
    });
  };

  return (
    <div className="validate-objects">
      <Card title="Object Validation" className="validation-card">
        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          items={[
            {
              key: 'overview',
              label: 'Validation Overview',
              children: renderOverview(),
            },
            {
              key: 'validate',
              label: 'Run Validation',
              children: (
                <Space direction="vertical" size="large" style={{ width: '100%' }}>
                  <Form form={form} layout="vertical">
                    <Row gutter={16}>
                      <Col xs={24} md={12}>
                        <Form.Item label="Select Object" name="objectId" rules={[{ required: true, message: 'Please select an object' }]}>
                          <Select
                            placeholder="Select object to validate"
                            value={selectedObject}
                            onChange={setSelectedObject}
                            showSearch
                            filterOption={(input, option) =>
                              (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                            }
                          >
                            {currentProject.objects
                              .filter((obj) => obj.convertedCode)
                              .map((obj) => (
                                <Select.Option key={obj.id} value={obj.id} label={obj.name}>
                                  {obj.name} ({obj.type})
                                </Select.Option>
                              ))}
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col xs={24} md={12}>
                        <Form.Item label="Tolerance Percentage" name="tolerance">
                          <InputNumber
                            min={0}
                            max={100}
                            value={tolerancePercentage}
                            onChange={(value) => setTolerancePercentage(value || 0)}
                            formatter={(value) => `${value}%`}
                            parser={(value) => {
                              const parsed = value?.replace('%', '') || '0';
                              return parseInt(parsed, 10) || 0;
                            }}
                            style={{ width: '100%' }}
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Form>

                  <Card title="Source Connection Details" className="connection-card">
            <Form form={connectionForm} layout="vertical">
              <Row gutter={16}>
                <Col xs={24} md={12}>
                  <Form.Item
                    label="Connection Type"
                    name="connectionType"
                    rules={[{ required: true, message: 'Please select connection type' }]}
                  >
                    <Select placeholder="Select connection type">
                      <Select.Option value="database">Database</Select.Option>
                      <Select.Option value="api">API</Select.Option>
                      <Select.Option value="file">File</Select.Option>
                      <Select.Option value="other">Other</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item
                    label="Host/Endpoint"
                    name="host"
                    rules={[{ required: true, message: 'Please enter host/endpoint' }]}
                  >
                    <Input placeholder="Enter host or endpoint" />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item label="Port" name="port">
                    <InputNumber placeholder="Enter port" style={{ width: '100%' }} />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item label="Database/Schema" name="database">
                    <Input placeholder="Enter database or schema name" />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item label="Username" name="username" rules={[{ required: true, message: 'Please enter username' }]}>
                    <Input placeholder="Enter username" />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please enter password' }]}>
                    <Input.Password placeholder="Enter password" />
                  </Form.Item>
                </Col>
                <Col xs={24}>
                  <Form.Item label="Additional Parameters" name="parameters">
                    <TextArea rows={3} placeholder="Enter additional connection parameters (JSON format)" />
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Card>

          <Button
            type="primary"
            size="large"
            icon={<PlayCircleOutlined />}
            onClick={handleValidate}
            loading={isValidating}
            disabled={!selectedObject}
            style={{ width: '100%' }}
          >
            Run Validation
          </Button>

                  {validationResults.length > 0 && (
                    <Card title="Validation Results" className="results-card">
                      <div className="validation-summary">
                        <Row gutter={24}>
                          <Col xs={24} md={8}>
                            <Card>
                              <Statistic
                                title="Total Records"
                                value={validationResults.length}
                                valueStyle={{ color: '#00d9ff' }}
                              />
                            </Card>
                          </Col>
                          <Col xs={24} md={8}>
                            <Card>
                              <Statistic
                                title="Mismatch Percentage"
                                value={mismatchPercentage.toFixed(2)}
                                suffix="%"
                                valueStyle={{ color: mismatchPercentage > tolerancePercentage ? '#f5222d' : '#52c41a' }}
                              />
                            </Card>
                          </Col>
                          <Col xs={24} md={8}>
                            <Card>
                              <Statistic
                                title="Tolerance"
                                value={tolerancePercentage}
                                suffix="%"
                                valueStyle={{ color: '#67e8f9' }}
                              />
                            </Card>
                          </Col>
                        </Row>
                        {mismatchPercentage > tolerancePercentage && (
                          <div style={{ marginTop: 16, padding: 12, background: 'rgba(245, 34, 45, 0.1)', borderRadius: 8, border: '1px solid rgba(245, 34, 45, 0.3)' }}>
                            <Text style={{ color: '#f5222d' }}>
                              <ExclamationCircleOutlined /> Mismatch percentage ({mismatchPercentage.toFixed(2)}%) exceeds tolerance ({tolerancePercentage}%)
                            </Text>
                          </div>
                        )}
                      </div>

                      <div className="validation-results" style={{ marginTop: 24 }}>
                        {renderValidationTable()}
                      </div>
                    </Card>
                  )}
                </Space>
              ),
            },
          ]}
        />
      </Card>
    </div>
  );
};

export default ValidateObjects;
