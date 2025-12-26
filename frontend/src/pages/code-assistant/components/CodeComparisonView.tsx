import { useState } from 'react';
import { Row, Col, Card, Button, Input, Typography, Tag, Space } from 'antd';
import { SaveOutlined } from '@ant-design/icons';
// Using a simpler code display approach - syntax highlighting can be enhanced later
import './CodeComparisonView.css';

const { TextArea } = Input;
const { Text } = Typography;

interface CodeComparisonViewProps {
  originalCode: string;
  convertedCode: string;
  confidenceScore: number;
  needsReview: boolean;
  onSave: (code: string) => void;
}

const CodeComparisonView = ({
  originalCode,
  convertedCode,
  confidenceScore,
  needsReview,
  onSave,
}: CodeComparisonViewProps) => {
  const [editedCode, setEditedCode] = useState(convertedCode);
  const [isEditing, setIsEditing] = useState(false);

  const getConfidenceColor = (score: number) => {
    if (score >= 90) return '#52c41a';
    if (score >= 75) return '#faad14';
    return '#f5222d';
  };

  const highlightUnconvertedParts = (code: string) => {
    // Simple highlighting logic - in real app, this would use AST analysis
    const lines = code.split('\n');
    return lines.map((line, index) => {
      const hasUnconverted = line.includes('TODO') || line.includes('FIXME') || line.includes('REVIEW');
      return (
        <div
          key={index}
          style={{
            backgroundColor: hasUnconverted ? 'rgba(250, 173, 20, 0.2)' : 'transparent',
            padding: '2px 0',
          }}
        >
          {line}
        </div>
      );
    });
  };

  return (
    <div className="code-comparison-view">
      <div className="confidence-badge">
        <Space>
          <Text strong>Confidence Score:</Text>
          <Tag color={getConfidenceColor(confidenceScore)} style={{ fontSize: 14, padding: '4px 12px' }}>
            {confidenceScore}%
          </Tag>
          {needsReview && (
            <Tag color="warning">Needs Review</Tag>
          )}
        </Space>
      </div>

      <Row gutter={16} style={{ marginTop: 16 }}>
        <Col xs={24} lg={12}>
          <Card
            title="Original Code"
            className="code-card"
            headStyle={{ background: 'rgba(15, 23, 42, 0.9)', borderBottom: '1px solid rgba(148, 163, 184, 0.3)' }}
          >
            <pre className="code-display">
              <code>{originalCode}</code>
            </pre>
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card
            title="Converted Code"
            className="code-card"
            extra={
              !isEditing ? (
                <Button size="small" onClick={() => setIsEditing(true)}>
                  Edit
                </Button>
              ) : (
                <Space>
                  <Button
                    size="small"
                    onClick={() => {
                      setIsEditing(false);
                      setEditedCode(convertedCode);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="primary"
                    size="small"
                    icon={<SaveOutlined />}
                    onClick={() => {
                      onSave(editedCode);
                      setIsEditing(false);
                    }}
                  >
                    Save
                  </Button>
                </Space>
              )
            }
            headStyle={{ background: 'rgba(15, 23, 42, 0.9)', borderBottom: '1px solid rgba(148, 163, 184, 0.3)' }}
          >
            {isEditing ? (
              <TextArea
                value={editedCode}
                onChange={(e) => setEditedCode(e.target.value)}
                rows={20}
                style={{
                  fontFamily: 'monospace',
                  background: '#1e1e1e',
                  color: '#d4d4d4',
                  border: '1px solid rgba(148, 163, 184, 0.3)',
                }}
              />
            ) : (
              <pre className="code-display">
                <code>
                  {convertedCode.split('\n').map((line, index) => {
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
          </Card>
        </Col>
      </Row>

      {needsReview && (
        <Card
          style={{ marginTop: 16, background: 'rgba(250, 173, 20, 0.1)', borderColor: 'rgba(250, 173, 20, 0.3)' }}
        >
          <Text style={{ color: '#faad14' }}>
            ⚠️ Some parts of the code require manual review. Highlighted sections need attention.
          </Text>
        </Card>
      )}
    </div>
  );
};

export default CodeComparisonView;
