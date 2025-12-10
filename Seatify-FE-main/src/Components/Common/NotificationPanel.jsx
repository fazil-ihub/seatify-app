import React from 'react';
import { Drawer, List, Typography, Button } from 'antd';
import { BellOutlined } from '@ant-design/icons';

const NotificationPanel = ({ isOpen, onClose, notifications = [] }) => {
  return (
    <Drawer
      title={
        <div className="flex items-center">
          <BellOutlined className="mr-2" />
          <Typography.Text strong>Notifications</Typography.Text>
        </div>
      }
      placement="right"
      onClose={onClose}
      open={isOpen}
      width={400}
    >
      <List
        dataSource={notifications}
        renderItem={(notification) => (
          <List.Item>
            <List.Item.Meta
              title={notification.title}
              description={notification.description}
              className="cursor-pointer hover:bg-gray-50"
            />
          </List.Item>
        )}
        locale={{ emptyText: 'No notifications' }}
      />
    </Drawer>
  );
};

export default NotificationPanel; 