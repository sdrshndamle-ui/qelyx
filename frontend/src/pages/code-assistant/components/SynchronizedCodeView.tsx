import { useState, useEffect, useRef } from 'react';
import { Row, Col, Card, Select, Button, Input, Space, Tag, Typography, message } from 'antd';
import { SaveOutlined, DownloadOutlined } from '@ant-design/icons';
import { ProjectObject } from '../types';
import './SynchronizedCodeView.css';

const { TextArea } = Input;
const { Text } = Typography;
const { Option } = Select;

interface SynchronizedCodeViewProps {
  object: ProjectObject;
  sourceTechnology: string;
  onSave: (updatedObject: ProjectObject) => void;
}

const SynchronizedCodeView = ({ object, sourceTechnology, onSave }: SynchronizedCodeViewProps) => {
  const getAvailableOutputs = (obj: ProjectObject) => {
    const outputs: string[] = [];
    if (obj.documentation) outputs.push('documentation');
    if (obj.businessRules) outputs.push('businessRules');
    if (obj.convertedCode) outputs.push('convertedCode');
    return outputs;
  };

  const initialOutputs = getAvailableOutputs(object);
  const [selectedOutputs, setSelectedOutputs] = useState<string[]>(initialOutputs.length > 0 ? initialOutputs : ['documentation']);
  const [editedDocumentation, setEditedDocumentation] = useState(object.documentation || '');
  const [editedBusinessRules, setEditedBusinessRules] = useState(object.businessRules || '');
  const [editedConvertedCode, setEditedConvertedCode] = useState(object.convertedCode || '');
  const [isEditing, setIsEditing] = useState<{ [key: string]: boolean }>({});
  
  const leftPaneRef = useRef<HTMLDivElement>(null);
  const rightPaneRef = useRef<HTMLDivElement>(null);
  const isScrollingRef = useRef(false);

  useEffect(() => {
    setEditedDocumentation(object.documentation || '');
    setEditedBusinessRules(object.businessRules || '');
    setEditedConvertedCode(object.convertedCode || '');
    // Update selected outputs when object changes
    const available = getAvailableOutputs(object);
    if (available.length > 0 && selectedOutputs.length === 0) {
      setSelectedOutputs(available);
    }
  }, [object]);

  // Synchronized scrolling
  const handleLeftScroll = () => {
    if (isScrollingRef.current) return;
    isScrollingRef.current = true;
    
    const leftPane = leftPaneRef.current;
    const rightPane = rightPaneRef.current;
    
    if (leftPane && rightPane) {
      const leftScrollRatio = leftPane.scrollTop / (leftPane.scrollHeight - leftPane.clientHeight);
      const rightMaxScroll = rightPane.scrollHeight - rightPane.clientHeight;
      rightPane.scrollTop = leftScrollRatio * rightMaxScroll;
    }
    
    setTimeout(() => {
      isScrollingRef.current = false;
    }, 50);
  };

  const handleRightScroll = () => {
    if (isScrollingRef.current) return;
    isScrollingRef.current = true;
    
    const leftPane = leftPaneRef.current;
    const rightPane = rightPaneRef.current;
    
    if (leftPane && rightPane) {
      const rightScrollRatio = rightPane.scrollTop / (rightPane.scrollHeight - rightPane.clientHeight);
      const leftMaxScroll = leftPane.scrollHeight - leftPane.clientHeight;
      leftPane.scrollTop = rightScrollRatio * leftMaxScroll;
    }
    
    setTimeout(() => {
      isScrollingRef.current = false;
    }, 50);
  };

  const handleSave = (type: 'documentation' | 'businessRules' | 'convertedCode') => {
    const updatedObject = { ...object };
    
    if (type === 'documentation') {
      updatedObject.documentation = editedDocumentation;
    } else if (type === 'businessRules') {
      updatedObject.businessRules = editedBusinessRules;
    } else if (type === 'convertedCode') {
      updatedObject.convertedCode = editedConvertedCode;
    }
    
    onSave(updatedObject);
    setIsEditing({ ...isEditing, [type]: false });
    message.success(`${type === 'documentation' ? 'Documentation' : type === 'businessRules' ? 'Business Rules' : 'Converted Code'} saved successfully`);
  };

  const handleDownload = (type: 'documentation' | 'businessRules' | 'convertedCode') => {
    let content = '';
    let filename = '';
    
    if (type === 'documentation') {
      content = editedDocumentation;
      filename = `${object.name}_documentation.md`;
    } else if (type === 'businessRules') {
      content = editedBusinessRules;
      filename = `${object.name}_business_rules.md`;
    } else if (type === 'convertedCode') {
      content = editedConvertedCode;
      filename = `${object.name}_converted.${sourceTechnology === 'Java' ? 'java' : 'txt'}`;
    }
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const getConfidenceColor = (score?: number) => {
    if (!score) return '#949494';
    if (score >= 90) return '#52c41a';
    if (score >= 75) return '#faad14';
    return '#f5222d';
  };

  const renderOutput = (type: string) => {
    if (type === 'documentation' && object.documentation) {
      return (
        <div className="output-section">
          <div className="output-header">
            <Text strong style={{ color: '#ffffff' }}>Documentation</Text>
            {object.confidenceScore && (
              <Tag color={getConfidenceColor(object.confidenceScore)}>
                Confidence: {object.confidenceScore}%
              </Tag>
            )}
            <Space>
              {!isEditing.documentation ? (
                <>
                  <Button size="small" icon={<DownloadOutlined />} onClick={() => handleDownload('documentation')}>
                    Download
                  </Button>
                  <Button size="small" type="primary" onClick={() => setIsEditing({ ...isEditing, documentation: true })}>
                    Edit
                  </Button>
                </>
              ) : (
                <>
                  <Button size="small" onClick={() => {
                    setIsEditing({ ...isEditing, documentation: false });
                    setEditedDocumentation(object.documentation || '');
                  }}>
                    Cancel
                  </Button>
                  <Button size="small" type="primary" icon={<SaveOutlined />} onClick={() => handleSave('documentation')}>
                    Save
                  </Button>
                </>
              )}
            </Space>
          </div>
          {isEditing.documentation ? (
            <TextArea
              value={editedDocumentation}
              onChange={(e) => setEditedDocumentation(e.target.value)}
              rows={20}
              style={{
                fontFamily: 'monospace',
                background: '#1e1e1e',
                color: '#d4d4d4',
                border: '1px solid rgba(148, 163, 184, 0.3)',
                marginTop: 12,
              }}
            />
          ) : (
            <div
              className="output-content"
              dangerouslySetInnerHTML={{
                __html: editedDocumentation
                  .split('\n')
                  .map((line) => {
                    if (line.startsWith('# ')) return `<h1>${line.substring(2)}</h1>`;
                    if (line.startsWith('## ')) return `<h2>${line.substring(3)}</h2>`;
                    if (line.startsWith('### ')) return `<h3>${line.substring(4)}</h3>`;
                    if (line.startsWith('- ') || line.match(/^\d+\./)) return `<li>${line.substring(2)}</li>`;
                    return `<p>${line || '<br>'}</p>`;
                  })
                  .join(''),
              }}
            />
          )}
        </div>
      );
    }

    if (type === 'businessRules' && object.businessRules) {
      return (
        <div className="output-section">
          <div className="output-header">
            <Text strong style={{ color: '#ffffff' }}>Business Rules</Text>
            {object.confidenceScore && (
              <Tag color={getConfidenceColor(object.confidenceScore)}>
                Confidence: {object.confidenceScore}%
              </Tag>
            )}
            <Space>
              {!isEditing.businessRules ? (
                <>
                  <Button size="small" icon={<DownloadOutlined />} onClick={() => handleDownload('businessRules')}>
                    Download
                  </Button>
                  <Button size="small" type="primary" onClick={() => setIsEditing({ ...isEditing, businessRules: true })}>
                    Edit
                  </Button>
                </>
              ) : (
                <>
                  <Button size="small" onClick={() => {
                    setIsEditing({ ...isEditing, businessRules: false });
                    setEditedBusinessRules(object.businessRules || '');
                  }}>
                    Cancel
                  </Button>
                  <Button size="small" type="primary" icon={<SaveOutlined />} onClick={() => handleSave('businessRules')}>
                    Save
                  </Button>
                </>
              )}
            </Space>
          </div>
          {isEditing.businessRules ? (
            <TextArea
              value={editedBusinessRules}
              onChange={(e) => setEditedBusinessRules(e.target.value)}
              rows={20}
              style={{
                fontFamily: 'monospace',
                background: '#1e1e1e',
                color: '#d4d4d4',
                border: '1px solid rgba(148, 163, 184, 0.3)',
                marginTop: 12,
              }}
            />
          ) : (
            <div
              className="output-content"
              dangerouslySetInnerHTML={{
                __html: editedBusinessRules
                  .split('\n')
                  .map((line) => {
                    if (line.startsWith('# ')) return `<h1>${line.substring(2)}</h1>`;
                    if (line.startsWith('## ')) return `<h2>${line.substring(3)}</h2>`;
                    if (line.startsWith('### ')) return `<h3>${line.substring(4)}</h3>`;
                    if (line.match(/^\d+\./)) return `<li>${line.replace(/^\d+\.\s*/, '')}</li>`;
                    return `<p>${line || '<br>'}</p>`;
                  })
                  .join(''),
              }}
            />
          )}
        </div>
      );
    }

    if (type === 'convertedCode' && object.convertedCode) {
      return (
        <div className="output-section">
          <div className="output-header">
            <Text strong style={{ color: '#ffffff' }}>Converted Code</Text>
            {object.confidenceScore && (
              <Tag color={getConfidenceColor(object.confidenceScore)}>
                Confidence: {object.confidenceScore}%
              </Tag>
            )}
            {object.needsReview && <Tag color="warning">Needs Review</Tag>}
            <Space>
              {!isEditing.convertedCode ? (
                <>
                  <Button size="small" icon={<DownloadOutlined />} onClick={() => handleDownload('convertedCode')}>
                    Download
                  </Button>
                  <Button size="small" type="primary" onClick={() => setIsEditing({ ...isEditing, convertedCode: true })}>
                    Edit
                  </Button>
                </>
              ) : (
                <>
                  <Button size="small" onClick={() => {
                    setIsEditing({ ...isEditing, convertedCode: false });
                    setEditedConvertedCode(object.convertedCode || '');
                  }}>
                    Cancel
                  </Button>
                  <Button size="small" type="primary" icon={<SaveOutlined />} onClick={() => handleSave('convertedCode')}>
                    Save
                  </Button>
                </>
              )}
            </Space>
          </div>
          {isEditing.convertedCode ? (
            <TextArea
              value={editedConvertedCode}
              onChange={(e) => setEditedConvertedCode(e.target.value)}
              rows={20}
              style={{
                fontFamily: 'monospace',
                background: '#1e1e1e',
                color: '#d4d4d4',
                border: '1px solid rgba(148, 163, 184, 0.3)',
                marginTop: 12,
              }}
            />
          ) : (
            <pre className="code-display">
              <code>
                {editedConvertedCode.split('\n').map((line, index) => {
                  const needsHighlight = line.includes('TODO') || line.includes('FIXME') || line.includes('REVIEW');
                  return (
                    <div
                      key={index}
                      style={{
                        backgroundColor: needsHighlight ? 'rgba(250, 173, 20, 0.2)' : 'transparent',
                        padding: '2px 0',
                      }}
                    >
                      {line || '\u00A0'}
                    </div>
                  );
                })}
              </code>
            </pre>
          )}
        </div>
      );
    }

    return null;
  };

  const availableOutputs = [];
  if (object.documentation) availableOutputs.push({ value: 'documentation', label: 'Documentation' });
  if (object.businessRules) availableOutputs.push({ value: 'businessRules', label: 'Business Rules' });
  if (object.convertedCode) availableOutputs.push({ value: 'convertedCode', label: 'Converted Code' });

  if (availableOutputs.length === 0) {
    return (
      <Card>
        <Text>Please generate conversion first from the Project Summary page.</Text>
      </Card>
    );
  }

  return (
    <div className="synchronized-code-view">
      <Row gutter={16} style={{ height: '100%', flex: 1, minHeight: 0 }}>
        <Col xs={24} lg={12} style={{ height: '100%', display: 'flex', flexDirection: 'column', minHeight: 0 }}>
          <Card
            title="Original Code"
            className="code-pane-card"
            headStyle={{ background: 'rgba(15, 23, 42, 0.9)', borderBottom: '1px solid rgba(148, 163, 184, 0.3)' }}
            bodyStyle={{ padding: 0, flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', minHeight: 0 }}
            style={{ height: '100%', display: 'flex', flexDirection: 'column', minHeight: 0 }}
          >
            <div
              ref={leftPaneRef}
              className="code-pane left-pane"
              onScroll={handleLeftScroll}
            >
              <pre className="code-display">
                <code>{object.originalCode}</code>
              </pre>
            </div>
          </Card>
        </Col>
        <Col xs={24} lg={12} style={{ height: '100%', display: 'flex', flexDirection: 'column', minHeight: 0 }}>
          <Card
            title={
              <div className="output-selector-header">
                <Select
                  mode="multiple"
                  value={selectedOutputs}
                  onChange={setSelectedOutputs}
                  placeholder="Select outputs to display"
                  style={{ width: '100%', minWidth: 300 }}
                  maxTagCount="responsive"
                >
                  {availableOutputs.map((output) => (
                    <Option key={output.value} value={output.value}>
                      {output.label}
                    </Option>
                  ))}
                </Select>
              </div>
            }
            className="code-pane-card"
            headStyle={{ background: 'rgba(15, 23, 42, 0.9)', borderBottom: '1px solid rgba(148, 163, 184, 0.3)' }}
            bodyStyle={{ padding: 0, flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', minHeight: 0 }}
            style={{ height: '100%', display: 'flex', flexDirection: 'column', minHeight: 0 }}
          >
            <div
              ref={rightPaneRef}
              className="code-pane right-pane"
              onScroll={handleRightScroll}
            >
              <div className="outputs-container">
                {selectedOutputs.map((output) => (
                  <div key={output}>
                    {renderOutput(output)}
                  </div>
                ))}
                {selectedOutputs.length === 0 && (
                  <div style={{ padding: '24px', textAlign: 'center', color: 'rgba(226, 232, 240, 0.6)' }}>
                    Select outputs from the dropdown above to view them
                  </div>
                )}
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default SynchronizedCodeView;
