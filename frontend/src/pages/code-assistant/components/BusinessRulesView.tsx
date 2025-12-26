import { useState } from 'react';
import { Card, Input, Button, Tag, Space, Typography } from 'antd';
import { SaveOutlined, DownloadOutlined } from '@ant-design/icons';
import './BusinessRulesView.css';

const { TextArea } = Input;
const { Text, Title } = Typography;

interface BusinessRulesViewProps {
  businessRules: string;
  confidenceScore: number;
  onSave: (rules: string) => void;
}

const BusinessRulesView = ({ businessRules, confidenceScore, onSave }: BusinessRulesViewProps) => {
  const [editedRules, setEditedRules] = useState(businessRules);
  const [isEditing, setIsEditing] = useState(false);

  const getConfidenceColor = (score: number) => {
    if (score >= 90) return '#52c41a';
    if (score >= 75) return '#faad14';
    return '#f5222d';
  };

  const handleDownload = () => {
    const blob = new Blob([editedRules], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'business_rules.md';
    a.click();
  };

  return (
    <div className="business-rules-view">
      <Card
        title={
          <Space>
            <Title level={4} style={{ margin: 0, color: '#ffffff' }}>
              Business Rules
            </Title>
            <Tag color={getConfidenceColor(confidenceScore)} style={{ fontSize: 14, padding: '4px 12px' }}>
              Confidence: {confidenceScore}%
            </Tag>
          </Space>
        }
        extra={
          <Space>
            {!isEditing ? (
              <>
                <Button icon={<DownloadOutlined />} onClick={handleDownload}>
                  Download
                </Button>
                <Button type="primary" onClick={() => setIsEditing(true)}>
                  Edit
                </Button>
              </>
            ) : (
              <>
                <Button onClick={() => {
                  setIsEditing(false);
                  setEditedRules(businessRules);
                }}>
                  Cancel
                </Button>
                <Button
                  type="primary"
                  icon={<SaveOutlined />}
                  onClick={() => {
                    onSave(editedRules);
                    setIsEditing(false);
                  }}
                >
                  Save
                </Button>
              </>
            )}
          </Space>
        }
        className="business-rules-card"
      >
        {isEditing ? (
          <TextArea
            value={editedRules}
            onChange={(e) => setEditedRules(e.target.value)}
            rows={25}
            style={{
              fontFamily: 'monospace',
              background: '#1e1e1e',
              color: '#d4d4d4',
              border: '1px solid rgba(148, 163, 184, 0.3)',
            }}
          />
        ) : (
          <div
            className="business-rules-content"
            dangerouslySetInnerHTML={{
              __html: editedRules
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
      </Card>
    </div>
  );
};

export default BusinessRulesView;
