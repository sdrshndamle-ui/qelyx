import { useState, useEffect } from 'react';
import {
  Card,
  Form,
  Input,
  Select,
  Button,
  Table,
  Space,
  Tag,
  Typography,
  Row,
  Col,
  message,
  Modal,
  Upload,
  Tabs,
  Statistic,
  Radio,
  Divider,
} from 'antd';
import {
  PlusOutlined,
  UploadOutlined,
  DownloadOutlined,
  DeleteOutlined,
  EditOutlined,
  ThunderboltOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import type { UploadProps } from 'antd';
import { Project, TestCase } from '../types';
import { saveProject } from '../utils/storage';
import './TestCaseManagement.css';

const { TextArea } = Input;
const { Text } = Typography;

interface TestCaseManagementProps {
  project: Project;
  onProjectUpdate?: (updatedProject: Project) => void;
}

const TestCaseManagement = ({ project, onProjectUpdate }: TestCaseManagementProps) => {
  const [form] = Form.useForm();
  const [testCases, setTestCases] = useState<TestCase[]>(project.testCases || []);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingTestCase, setEditingTestCase] = useState<TestCase | null>(null);
  const [activeTab, setActiveTab] = useState<string>('list');
  const [currentProject, setCurrentProject] = useState<Project>(project);

  useEffect(() => {
    setCurrentProject(project);
    setTestCases(project.testCases || []);
  }, [project]);

  const handleCreate = () => {
    setEditingTestCase(null);
    form.resetFields();
    form.setFieldsValue({
      projectId: project.id,
      category: 'Functional',
      testSteps: [''],
      outcome: 'Not Executed',
    });
    setIsModalVisible(true);
  };

  const handleEdit = (testCase: TestCase) => {
    setEditingTestCase(testCase);
    form.setFieldsValue({
      ...testCase,
      testSteps: testCase.testSteps.length > 0 ? testCase.testSteps : [''],
    });
    setIsModalVisible(true);
  };

  const handleDelete = (testCaseId: string) => {
    Modal.confirm({
      title: 'Delete Test Case',
      content: 'Are you sure you want to delete this test case?',
      okText: 'Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: () => {
        const updatedTestCases = testCases.filter((tc) => tc.id !== testCaseId);
        updateProjectTestCases(updatedTestCases);
        message.success('Test case deleted successfully');
      },
    });
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const testSteps = Array.isArray(values.testSteps)
        ? values.testSteps.filter((step: string) => step && step.trim())
        : [];

      const testCaseData: TestCase = {
        id: editingTestCase?.id || `tc-${Date.now()}`,
        projectId: values.projectId || project.id,
        objectId: values.objectId || undefined,
        testCaseId: values.testCaseId,
        description: values.description,
        category: values.category,
        testSteps,
        expectedResults: values.expectedResults,
        parameters: values.parameters,
        outcome: values.outcome || 'Not Executed',
        createdAt: editingTestCase?.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      let updatedTestCases: TestCase[];
      if (editingTestCase) {
        updatedTestCases = testCases.map((tc) => (tc.id === editingTestCase.id ? testCaseData : tc));
      } else {
        updatedTestCases = [...testCases, testCaseData];
      }

      updateProjectTestCases(updatedTestCases);
      setIsModalVisible(false);
      message.success(editingTestCase ? 'Test case updated successfully' : 'Test case created successfully');
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  const updateProjectTestCases = (updatedTestCases: TestCase[]) => {
    const updatedProject = {
      ...currentProject,
      testCases: updatedTestCases,
    };
    setTestCases(updatedTestCases);
    setCurrentProject(updatedProject);
    saveProject(updatedProject);
    if (onProjectUpdate) {
      onProjectUpdate(updatedProject);
    }
  };

  const handleDownloadTemplate = () => {
    const template = [
      {
        'Project ID': project.id,
        'Project Name': project.id,
        'Object ID': '',
        'Object Name': '',
        'Test Case ID': 'TC001',
        'Test Case Description': 'Sample test case description',
        Category: 'Functional',
        'Test Steps (comma separated)': 'Step 1, Step 2, Step 3',
        'Expected Results': 'Expected result description',
        Parameters: 'param1=value1, param2=value2',
        Outcome: 'Not Executed',
      },
    ];

    const csvContent = [
      Object.keys(template[0]).join(','),
      ...template.map((row) =>
        Object.values(row)
          .map((val) => `"${val}"`)
          .join(',')
      ),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'Test Case Template.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    message.success('Template downloaded successfully');
  };

  const handleBulkUpload: UploadProps['customRequest'] = async (options) => {
    const { file, onSuccess, onError } = options;
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const text = e.target?.result as string;
        const lines = text.split('\n');
        const headers = lines[0].split(',').map((h) => h.replace(/"/g, '').trim());

        const newTestCases: TestCase[] = [];
        for (let i = 1; i < lines.length; i++) {
          const line = lines[i].trim();
          if (!line) continue;

          const values = line.split(',').map((v) => v.replace(/"/g, '').trim());
          const row: any = {};
          headers.forEach((header, index) => {
            row[header] = values[index] || '';
          });

          const testSteps = row['Test Steps (comma separated)']?.split(',').map((s: string) => s.trim()) || [];

          const testCase: TestCase = {
            id: `tc-${Date.now()}-${i}`,
            projectId: row['Project ID'] || project.id,
            objectId: row['Object ID'] || undefined,
            testCaseId: row['Test Case ID'] || `TC-${Date.now()}-${i}`,
            description: row['Test Case Description'] || '',
            category: (row['Category'] as TestCase['category']) || 'Functional',
            testSteps,
            expectedResults: row['Expected Results'] || '',
            parameters: row['Parameters'] || '',
            outcome: (row['Outcome'] as TestCase['outcome']) || 'Not Executed',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };

          newTestCases.push(testCase);
        }

        const updatedTestCases = [...testCases, ...newTestCases];
        updateProjectTestCases(updatedTestCases);
        onSuccess?.({} as any);
        message.success(`Successfully uploaded ${newTestCases.length} test cases`);
      } catch (error) {
        console.error('Error parsing file:', error);
        onError?.(error as Error);
        message.error('Failed to parse uploaded file. Please check the format.');
      }
    };

    reader.readAsText(file as File);
  };

  const handleAutoGenerate = () => {
    Modal.confirm({
      title: 'Auto-Generate Test Cases',
      content: `This will generate test cases for all ${currentProject.objects.length} objects. Do you want to continue?`,
      okText: 'Generate',
      cancelText: 'Cancel',
      onOk: () => {
        const generatedTestCases: TestCase[] = [];
        const categories: TestCase['category'][] = ['Functional', 'Negative', 'Boundary', 'Regression'];

        currentProject.objects.forEach((obj) => {
          categories.forEach((category, index) => {
            const testCase: TestCase = {
              id: `tc-auto-${obj.id}-${category}-${Date.now()}-${index}`,
              projectId: project.id,
              objectId: obj.id,
              testCaseId: `TC-${obj.name}-${category}-${index + 1}`,
              description: `Auto-generated ${category} test case for ${obj.name}`,
              category,
              testSteps: [
                `Execute ${obj.name}`,
                `Verify ${obj.name} behavior`,
                `Validate ${obj.name} results`,
              ],
              expectedResults: `${obj.name} should execute successfully and return expected results`,
              parameters: `objectId=${obj.id}`,
              outcome: 'Not Executed',
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            };
            generatedTestCases.push(testCase);
          });
        });

        const updatedTestCases = [...testCases, ...generatedTestCases];
        updateProjectTestCases(updatedTestCases);
        message.success(`Generated ${generatedTestCases.length} test cases for ${currentProject.objects.length} objects`);
      },
    });
  };

  const getOutcomeColor = (outcome?: string) => {
    switch (outcome) {
      case 'Pass':
        return 'success';
      case 'Fail':
        return 'error';
      case 'Blocked':
        return 'warning';
      case 'Not Executed':
      default:
        return 'default';
    }
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      Functional: 'blue',
      Negative: 'red',
      Boundary: 'orange',
      Regression: 'purple',
      Integration: 'cyan',
      'UI/UX': 'green',
      Performance: 'gold',
    };
    return colors[category] || 'default';
  };

  const renderSummary = () => {
    const totalTestCases = testCases.length;
    const passedCount = testCases.filter((tc) => tc.outcome === 'Pass').length;
    const failedCount = testCases.filter((tc) => tc.outcome === 'Fail').length;
    const blockedCount = testCases.filter((tc) => tc.outcome === 'Blocked').length;
    const notExecutedCount = testCases.filter((tc) => !tc.outcome || tc.outcome === 'Not Executed').length;
    const passRate = totalTestCases > 0 ? (passedCount / totalTestCases) * 100 : 0;

    const objectLevelCount = testCases.filter((tc) => tc.objectId).length;
    const projectLevelCount = testCases.filter((tc) => !tc.objectId).length;

    return (
      <div className="test-case-summary">
        <Row gutter={[24, 24]} style={{ marginBottom: 24 }}>
          <Col xs={24} sm={12} md={6}>
            <Card>
              <Statistic
                title="Total Test Cases"
                value={totalTestCases}
                valueStyle={{ color: '#00d9ff', fontWeight: 800, fontSize: 36 }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card>
              <Statistic
                title="Passed"
                value={passedCount}
                valueStyle={{ color: '#52c41a', fontWeight: 800, fontSize: 36 }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card>
              <Statistic
                title="Failed"
                value={failedCount}
                valueStyle={{ color: '#f5222d', fontWeight: 800, fontSize: 36 }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card>
              <Statistic
                title="Not Executed"
                value={notExecutedCount}
                valueStyle={{ color: '#949494', fontWeight: 800, fontSize: 36 }}
              />
            </Card>
          </Col>
        </Row>

        <Row gutter={[24, 24]} style={{ marginBottom: 24 }}>
          <Col xs={24} sm={12} md={8}>
            <Card>
              <Statistic
                title="Blocked"
                value={blockedCount}
                valueStyle={{ color: '#faad14', fontWeight: 800, fontSize: 36 }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Card>
              <Statistic
                title="Pass Rate"
                value={passRate.toFixed(1)}
                suffix="%"
                valueStyle={{ color: '#52c41a', fontWeight: 800, fontSize: 36 }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Card>
              <Statistic
                title="Project Level"
                value={projectLevelCount}
                valueStyle={{ color: '#00d9ff', fontWeight: 800, fontSize: 36 }}
              />
              <Divider style={{ margin: '12px 0' }} />
              <Statistic
                title="Object Level"
                value={objectLevelCount}
                valueStyle={{ color: '#00d9ff', fontWeight: 800, fontSize: 36 }}
              />
            </Card>
          </Col>
        </Row>
      </div>
    );
  };

  const columns: ColumnsType<TestCase> = [
    {
      title: 'Test Case ID',
      dataIndex: 'testCaseId',
      key: 'testCaseId',
      width: 150,
      render: (text: string) => <span style={{ color: '#00d9ff', fontWeight: 600 }}>{text}</span>,
    },
    {
      title: 'Object Name',
      key: 'objectName',
      width: 150,
      render: (_, record) => {
        if (!record.objectId) return <Tag color="blue">Project Level</Tag>;
        const obj = currentProject.objects.find((o) => o.id === record.objectId);
        return obj ? obj.name : record.objectId;
      },
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      width: 120,
      render: (category: string) => (
        <Tag color={getCategoryColor(category)}>{category}</Tag>
      ),
    },
    {
      title: 'Outcome',
      dataIndex: 'outcome',
      key: 'outcome',
      width: 130,
      render: (outcome: string) => (
        <Tag color={getOutcomeColor(outcome)}>{outcome || 'Not Executed'}</Tag>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 120,
      fixed: 'right',
      render: (_, record) => (
        <Space>
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
            size="small"
          />
          <Button
            type="link"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.id)}
            size="small"
          />
        </Space>
      ),
    },
  ];

  return (
    <div className="test-case-management">
      <Card
        title="Test Case Management"
        className="test-case-card"
        extra={
          <Space>
            <Button icon={<ThunderboltOutlined />} onClick={handleAutoGenerate}>
              Auto-Generate
            </Button>
            <Button icon={<DownloadOutlined />} onClick={handleDownloadTemplate}>
              Download Template
            </Button>
            <Upload
              customRequest={handleBulkUpload}
              showUploadList={false}
              accept=".csv"
            >
              <Button icon={<UploadOutlined />} type="default">
                Bulk Upload
              </Button>
            </Upload>
            <Button type="primary" icon={<PlusOutlined />} onClick={handleCreate}>
              Create Test Case
            </Button>
          </Space>
        }
      >
        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          items={[
            {
              key: 'summary',
              label: 'Summary',
              children: renderSummary(),
            },
            {
              key: 'list',
              label: 'Test Cases',
              children: (
                <Table
                  columns={columns}
                  dataSource={testCases}
                  rowKey="id"
                  pagination={{ pageSize: 10 }}
                  className="test-case-table"
                  scroll={{ x: 1200 }}
                />
              ),
            },
          ]}
        />
      </Card>

      <Modal
        title={editingTestCase ? 'Edit Test Case' : 'Create Test Case'}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={handleSubmit}
        width={800}
        okText={editingTestCase ? 'Update' : 'Create'}
        cancelText="Cancel"
        className="test-case-modal"
      >
        <Form form={form} layout="vertical">
          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item label="Project Name" name="projectId" initialValue={project.id}>
                <Input disabled />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item label="Object Name" name="objectId">
                <Select
                  placeholder="Select object (leave empty for project-level)"
                  allowClear
                  showSearch
                  filterOption={(input, option) =>
                    String(option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                  }
                >
                  {currentProject.objects.map((obj) => (
                    <Select.Option key={obj.id} value={obj.id} label={obj.name}>
                      {obj.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item
                label="Test Case ID"
                name="testCaseId"
                rules={[{ required: true, message: 'Please enter test case ID' }]}
              >
                <Input placeholder="e.g., TC001" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                label="Category"
                name="category"
                rules={[{ required: true, message: 'Please select category' }]}
              >
                <Select>
                  <Select.Option value="Functional">Functional</Select.Option>
                  <Select.Option value="Negative">Negative</Select.Option>
                  <Select.Option value="Boundary">Boundary</Select.Option>
                  <Select.Option value="Regression">Regression</Select.Option>
                  <Select.Option value="Integration">Integration</Select.Option>
                  <Select.Option value="UI/UX">UI/UX</Select.Option>
                  <Select.Option value="Performance">Performance</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            label="Test Case Description"
            name="description"
            rules={[{ required: true, message: 'Please enter test case description' }]}
          >
            <TextArea rows={3} placeholder="Enter test case description" />
          </Form.Item>

          <Form.List name="testSteps">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Row key={key} gutter={8}>
                    <Col flex="auto">
                      <Form.Item
                        {...restField}
                        name={[name]}
                        label={key === 0 ? 'Test Steps' : ''}
                        rules={[{ required: true, message: 'Please enter test step' }]}
                      >
                        <Input placeholder={`Test Step ${key + 1}`} />
                      </Form.Item>
                    </Col>
                    <Col>
                      <Button
                        type="link"
                        danger
                        onClick={() => remove(name)}
                        style={{ marginTop: key === 0 ? 32 : 0 }}
                      >
                        Remove
                      </Button>
                    </Col>
                  </Row>
                ))}
                <Form.Item>
                  <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                    Add Test Step
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>

          <Form.Item
            label="Expected Results"
            name="expectedResults"
            rules={[{ required: true, message: 'Please enter expected results' }]}
          >
            <TextArea rows={3} placeholder="Enter expected results" />
          </Form.Item>

          <Form.Item label="Parameters" name="parameters">
            <Input placeholder="e.g., param1=value1, param2=value2" />
          </Form.Item>

          <Form.Item label="Outcome" name="outcome" initialValue="Not Executed">
            <Radio.Group>
              <Radio value="Pass">Pass</Radio>
              <Radio value="Fail">Fail</Radio>
              <Radio value="Blocked">Blocked</Radio>
              <Radio value="Not Executed">Not Executed</Radio>
            </Radio.Group>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default TestCaseManagement;

