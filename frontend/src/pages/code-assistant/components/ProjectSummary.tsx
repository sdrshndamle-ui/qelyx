import { Card, Space, Checkbox, Select, Radio, Button, Table, Typography, Row, Col, Statistic, Tabs } from 'antd';
import { PlayCircleOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { Project, ProjectObject, ConversionOptions } from '../types';
import { COMMON_TECHNOLOGIES } from '../utils/constants';
import { COMPLEXITY_COLORS } from '../utils/constants';
import ObjectManagement from './ObjectManagement';
import ValidateObjects from './ValidateObjects';
import TestCaseManagement from './TestCaseManagement';
import { saveProject } from '../utils/storage';
import './ProjectSummary.css';

const { Title, Text } = Typography;

interface ProjectSummaryProps {
  project: Project;
  selectedObjects: string[];
  setSelectedObjects: (ids: string[]) => void;
  conversionOptions: ConversionOptions;
  setConversionOptions: (options: ConversionOptions) => void;
  targetTechnology: string;
  setTargetTechnology: (tech: string) => void;
  onGenerate: () => void;
  onProjectUpdate?: (updatedProject: Project) => void;
}

const ProjectSummary = ({
  project,
  selectedObjects,
  setSelectedObjects,
  conversionOptions,
  setConversionOptions,
  targetTechnology,
  setTargetTechnology,
  onGenerate,
  onProjectUpdate,
}: ProjectSummaryProps) => {
  const handleObjectsChange = (updatedObjects: ProjectObject[]) => {
    const updatedProject = {
      ...project,
      objects: updatedObjects,
      numberOfObjects: updatedObjects.length,
    };
    saveProject(updatedProject);
    if (onProjectUpdate) {
      onProjectUpdate(updatedProject);
    }
  };
  const getTestCaseStatusForObject = (objectId: string) => {
    const testCases = project.testCases || [];
    const objectTestCases = testCases.filter((tc) => tc.objectId === objectId);
    if (objectTestCases.length === 0) return null;
    
    const passed = objectTestCases.filter((tc) => tc.outcome === 'Pass').length;
    const failed = objectTestCases.filter((tc) => tc.outcome === 'Fail').length;
    const total = objectTestCases.length;
    const passRate = total > 0 ? (passed / total) * 100 : 0;
    
    return { passed, failed, total, passRate };
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
        const testCaseStatus = getTestCaseStatusForObject(record.id);
        if (!testCaseStatus) {
          return <span style={{ color: '#949494' }}>No Test Cases</span>;
        }
        return (
          <Space direction="vertical" size={0}>
            <span style={{ color: '#52c41a' }}>Pass: {testCaseStatus.passed}/{testCaseStatus.total}</span>
            {testCaseStatus.failed > 0 && (
              <span style={{ color: '#f5222d' }}>Fail: {testCaseStatus.failed}</span>
            )}
            <span style={{ color: '#00d9ff', fontSize: '12px' }}>
              Pass Rate: {testCaseStatus.passRate.toFixed(1)}%
            </span>
          </Space>
        );
      },
    },
  ];

  const rowSelection = {
    selectedRowKeys: selectedObjects,
    onChange: (selectedRowKeys: React.Key[]) => {
      setSelectedObjects(selectedRowKeys as string[]);
    },
  };

  return (
    <div className="project-summary">
      <Title level={2} style={{ fontSize: 32, marginBottom: 12, color: '#ffffff' }}>Project Summary</Title>
      <Text style={{ fontSize: 18, marginBottom: 32, display: 'block', color: 'rgba(226, 232, 240, 0.9)' }}>
        Overview and conversion settings for {project.id}
      </Text>

      <Row gutter={[32, 32]} style={{ marginBottom: 32 }}>
        <Col xs={24} sm={12} md={6}>
          <Card style={{ background: 'rgba(15, 23, 42, 0.9)', border: '1px solid rgba(148, 163, 184, 0.3)' }}>
            <Statistic
              title="Total Objects"
              value={project.numberOfObjects}
              valueStyle={{ color: '#67e8f9', fontWeight: 800, fontSize: 56 }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card style={{ background: 'rgba(15, 23, 42, 0.9)', border: '1px solid rgba(148, 163, 184, 0.3)' }}>
            <Statistic
              title="Complexity"
              value={project.overallComplexity}
              valueStyle={{ color: '#67e8f9', fontWeight: 800, fontSize: 56 }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card style={{ background: 'rgba(15, 23, 42, 0.9)', border: '1px solid rgba(148, 163, 184, 0.3)' }}>
            <Statistic
              title="Completion"
              value={project.percentageCompletion}
              suffix="%"
              valueStyle={{ color: '#67e8f9', fontWeight: 800, fontSize: 56 }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card style={{ background: 'rgba(15, 23, 42, 0.9)', border: '1px solid rgba(148, 163, 184, 0.3)' }}>
            <Statistic
              title="Productivity Gain"
              value={project.productivityGainPercent}
              suffix="%"
              valueStyle={{ color: '#67e8f9', fontWeight: 800, fontSize: 56 }}
            />
          </Card>
        </Col>
      </Row>

      <Card title="Project Management" className="settings-card">
        <Tabs
          defaultActiveKey="objects"
          items={[
            {
              key: 'objects',
              label: `Manage Objects (${project.objects.length})`,
              children: (
                <div style={{ marginTop: 16 }}>
                  <ObjectManagement
                    objects={project.objects}
                    sourceTechnology={project.sourceTechnology}
                    onChange={handleObjectsChange}
                    project={project}
                  />
                </div>
              ),
            },
            {
              key: 'convert',
              label: 'Convert Objects',
              children: (
                <Space direction="vertical" size="large" style={{ width: '100%', marginTop: 16 }}>
                  <div>
                    <Text strong style={{ display: 'block', marginBottom: 8 }}>
                      Select Objects to Convert
                    </Text>
                    <Table
                      rowSelection={rowSelection}
                      columns={columns}
                      dataSource={project.objects}
                      rowKey="id"
                      pagination={{ pageSize: 5 }}
                      size="small"
                    />
                  </div>

                  <div>
                    <Text strong style={{ display: 'block', marginBottom: 8 }}>
                      Generation Options
                    </Text>
                    <Space direction="vertical">
                      <Checkbox
                        checked={conversionOptions.generateDocumentation}
                        onChange={(e) =>
                          setConversionOptions({
                            ...conversionOptions,
                            generateDocumentation: e.target.checked,
                          })
                        }
                      >
                        Generate Documentation
                      </Checkbox>
                      <Checkbox
                        checked={conversionOptions.extractBusinessRules}
                        onChange={(e) =>
                          setConversionOptions({
                            ...conversionOptions,
                            extractBusinessRules: e.target.checked,
                          })
                        }
                      >
                        Extract Business Rules
                      </Checkbox>
                    </Space>
                  </div>

                  <div>
                    <Text strong style={{ display: 'block', marginBottom: 8 }}>
                      Target Technology
                    </Text>
                    <Select
                      style={{ width: '100%' }}
                      placeholder="Select target technology or enter manually"
                      value={targetTechnology || undefined}
                      onChange={setTargetTechnology}
                      showSearch
                      allowClear
                      filterOption={(input, option) =>
                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                      }
                      dropdownRender={(menu) => (
                        <>
                          {menu}
                          <div style={{ padding: '8px', borderTop: '1px solid rgba(148, 163, 184, 0.3)' }}>
                            <Button
                              type="text"
                              block
                              onClick={() => {
                                const value = prompt('Enter target technology manually:');
                                if (value) {
                                  setTargetTechnology(value);
                                }
                              }}
                            >
                              + Enter manually
                            </Button>
                          </div>
                        </>
                      )}
                    >
                      {COMMON_TECHNOLOGIES.map((tech) => (
                        <Select.Option key={tech.name} value={tech.name} label={tech.name}>
                          {tech.name}
                        </Select.Option>
                      ))}
                    </Select>
                  </div>

                  <div>
                    <Text strong style={{ display: 'block', marginBottom: 8 }}>
                      Conversion Type
                    </Text>
                    <Radio.Group
                      value={conversionOptions.refactorOrRationalize}
                      onChange={(e) =>
                        setConversionOptions({
                          ...conversionOptions,
                          refactorOrRationalize: e.target.value,
                        })
                      }
                    >
                      <Radio value="refactor">Refactor Code in Target Technology</Radio>
                      <Radio value="rationalize">Rationalize Code</Radio>
                    </Radio.Group>
                  </div>

                  <Button
                    type="primary"
                    size="large"
                    icon={<PlayCircleOutlined />}
                    onClick={onGenerate}
                    disabled={selectedObjects.length === 0 || !targetTechnology}
                    style={{ width: '100%' }}
                  >
                    Generate Conversion
                  </Button>
                </Space>
              ),
            },
            {
              key: 'validate',
              label: 'Validate Objects',
              children: (
                <div style={{ marginTop: 16 }}>
                  <ValidateObjects 
                    project={project} 
                    onProjectUpdate={(updatedProject) => {
                      if (onProjectUpdate) {
                        onProjectUpdate(updatedProject);
                      }
                    }}
                  />
                </div>
              ),
            },
            {
              key: 'testcases',
              label: 'Test Cases',
              children: (
                <div style={{ marginTop: 16 }}>
                  <TestCaseManagement
                    project={project}
                    onProjectUpdate={(updatedProject) => {
                      if (onProjectUpdate) {
                        onProjectUpdate(updatedProject);
                      }
                    }}
                  />
                </div>
              ),
            },
          ]}
        />
      </Card>
    </div>
  );
};

export default ProjectSummary;
